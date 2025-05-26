import React, { useState, useCallback, useEffect } from 'react';
import { CloudArrowUpIcon, XMarkIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Media {
  media_id: number;
  url: string;
  type: string; // Should be 'IMAGE' or 'VIDEO' (uppercase from your API example)
  sort_order: number;
  // Add other fields if needed from your API
}

interface MediaStats {
  total_count: number;
  image_count: number;
  video_count: number;
  max_allowed: number;
  remaining_slots: number;
}

interface ProductMediaUploadProps {
  productId: number;
  onMediaChange?: (media: Media[]) => void; // Callback with the current list of media objects
  // maxFiles prop is not used as API provides remaining_slots
  maxSize?: number; // in bytes
  onUploadComplete?: (newMedia: Media) => void; // Callback for each successful upload
  onUploadError?: (error: string, fileName?: string) => void;
  onDeleteComplete?: (deletedMediaId: number) => void;
}

const ProductMediaUpload: React.FC<ProductMediaUploadProps> = ({
  productId,
  onMediaChange,
  maxSize = 10 * 1024 * 1024, // 10MB
  onUploadComplete,
  onUploadError,
  onDeleteComplete,
}) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [stats, setStats] = useState<MediaStats | null>(null);
  const [isLoading, setIsLoading] = useState(false); // For fetching initial media/stats
  const [isProcessing, setIsProcessing] = useState(false); // For upload/delete operations
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});


  const fetchData = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    setFetchError(null);
    try {
      const [mediaResponse, statsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/media`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
        }),
        fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/media/stats`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
        }),
      ]);

      if (!mediaResponse.ok) throw new Error('Failed to fetch media');
      const mediaData = await mediaResponse.json();
      setMedia(mediaData);
      onMediaChange?.(mediaData);

      if (!statsResponse.ok) throw new Error('Failed to fetch media stats');
      const statsData = await statsResponse.json();
      setStats(statsData);

    } catch (err) {
      console.error('Error fetching media data:', err);
      const msg = err instanceof Error ? err.message : 'Failed to load media information.';
      setFetchError(msg);
      onUploadError?.(msg); // Notify parent about fetch error
    } finally {
      setIsLoading(false);
    }
  }, [productId, onMediaChange, onUploadError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!productId) {
        setOperationError('Product ID is required for media upload.');
        onUploadError?.('Product ID is required.'); return;
      }
      if (!stats || stats.remaining_slots <= 0) {
        setOperationError(`No remaining slots to upload files. Max allowed: ${stats?.max_allowed || 0}.`);
        onUploadError?.('No remaining slots.'); return;
      }
      if (stats.remaining_slots < acceptedFiles.length) {
        setOperationError(`Cannot upload ${acceptedFiles.length} files. Only ${stats.remaining_slots} slots remaining.`);
        onUploadError?.(`Too many files. Only ${stats.remaining_slots} slots left.`); return;
      }

      setIsProcessing(true);
      setOperationError(null);

      for (const file of acceptedFiles) {
        const tempId = file.name + Date.now(); // Temporary ID for progress tracking
        setUploadProgress(prev => ({ ...prev, [tempId]: 0 }));
        
        const formData = new FormData();
        formData.append('media_file', file);
        formData.append('type', file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE');
        // sort_order might be handled by backend or based on current media.length
        formData.append('sort_order', (media.length + 1).toString());

        try {
          // Simulate progress for demo; replace with actual XHR progress if available
          let currentProgress = 0;
          const progressInterval = setInterval(() => {
            currentProgress += 10;
            if (currentProgress <= 90) { // Don't go to 100 until success
                setUploadProgress(prev => ({ ...prev, [tempId]: currentProgress }));
            }
          }, 200);


          const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/media`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
            body: formData,
          });
          
          clearInterval(progressInterval); // Clear interval once request is done

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Upload failed for ${file.name}`);
          }
          const newMediaItem: Media = await response.json();
          setUploadProgress(prev => ({ ...prev, [tempId]: 100 })); // Mark as complete
          
          setMedia(prev => {
            const updatedMedia = [...prev, newMediaItem].sort((a,b) => a.sort_order - b.sort_order);
            onMediaChange?.(updatedMedia);
            return updatedMedia;
          });
          onUploadComplete?.(newMediaItem);
          // Refresh stats after successful upload
          const statsResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/media/stats`, {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
          });
          if (statsResponse.ok) setStats(await statsResponse.json());

        } catch (err) {
          console.error(`Error uploading ${file.name}:`, err);
          const msg = err instanceof Error ? err.message : `Failed to upload ${file.name}.`;
          setOperationError(msg); // Show error for this specific file
          onUploadError?.(msg, file.name);
          setUploadProgress(prev => { // Remove progress for failed upload
            const newProgress = { ...prev };
            delete newProgress[tempId];
            return newProgress;
          });
        }
      }
      setIsProcessing(false);
    },
    [productId, stats, media, onMediaChange, onUploadComplete, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'], 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] },
    maxSize,
    disabled: isProcessing || !productId || (stats?.remaining_slots !== null && stats?.remaining_slots <= 0),
  });

  const removeMedia = async (mediaId: number) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return;
    setIsProcessing(true);
    setOperationError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/media/${mediaId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      });
      if (!response.ok) throw new Error('Failed to delete media');
      
      setMedia(prev => {
        const updatedMedia = prev.filter(m => m.media_id !== mediaId);
        onMediaChange?.(updatedMedia);
        return updatedMedia;
      });
      onDeleteComplete?.(mediaId);
      // Refresh stats
      const statsResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/media/stats`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (statsResponse.ok) setStats(await statsResponse.json());

    } catch (err) {
      console.error('Error deleting media:', err);
      const msg = err instanceof Error ? err.message : 'Failed to delete media.';
      setOperationError(msg);
      onUploadError?.(msg); // Use onUploadError for general operation errors
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-600">Loading media...</p>
      </div>
    );
  }
  
  const dropzoneDisabled = isProcessing || !productId || (stats?.remaining_slots !== null && stats?.remaining_slots <= 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
      {fetchError && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm flex justify-between items-center">
          <span>{fetchError}</span>
          <button onClick={fetchData} className="ml-2 p-1 text-red-600 hover:text-red-800">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      {operationError && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
            {operationError}
        </div>
      )}

      {stats && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
              <p className="text-xl font-semibold text-gray-800">{stats.total_count}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Images</p>
              <p className="text-xl font-semibold text-gray-800">{stats.image_count}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Videos</p>
              <p className="text-xl font-semibold text-gray-800">{stats.video_count}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Slots Left</p>
              <p className={`text-xl font-semibold ${stats.remaining_slots > 0 ? 'text-green-600' : 'text-red-600'}`}>{stats.remaining_slots}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Max {stats.max_allowed} media items allowed.</p>
        </div>
      )}

      {(!stats || stats.remaining_slots > 0) && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-150 ease-in-out
            ${isDragActive ? 'border-primary-500 bg-primary-50 text-primary-700' 
            : dropzoneDisabled ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'border-gray-300 hover:border-primary-400 bg-white hover:bg-gray-50 text-gray-600'}
          `}
        >
          <input {...getInputProps()} />
          <CloudArrowUpIcon className={`mx-auto h-12 w-12 mb-2 ${isDragActive ? 'text-primary-600' : dropzoneDisabled ? 'text-gray-300' : 'text-gray-400'}`} />
          <p className="text-sm font-medium">
            {isProcessing ? 'Processing files...' : isDragActive ? 'Drop files here!' : 'Drag & drop files or click to browse'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Max {maxSize / 1024 / 1024}MB per file. Images & Videos.
          </p>
          {dropzoneDisabled && !isProcessing && <p className="text-xs text-red-500 mt-1">Upload disabled (no slots or product not ready).</p>}
        </div>
      )}
       {fileRejections.length > 0 && (
        <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-400">
          <h4 className="text-sm font-medium text-red-700">Rejected Files:</h4>
          <ul className="list-disc list-inside text-xs text-red-600">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} - {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}


      {Object.entries(uploadProgress).map(([fileName, progress]) => progress < 100 && (
        <div key={fileName} className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-primary-700 truncate max-w-xs">{fileName.split(Date.now().toString())[0]}</span>
            <span className="text-xs font-medium text-primary-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-primary-600 h-1.5 rounded-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ))}

      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
          {media.map((item) => (
            <div key={item.media_id} className="relative group aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-md border border-gray-200 bg-gray-100">
              {item.type.toUpperCase() === 'IMAGE' ? (
                <img src={item.url} alt="Product media" className="w-full h-full object-cover" />
              ) : item.type.toUpperCase() === 'VIDEO' ? (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <video src={item.url} className="max-w-full max-h-full object-contain" controls={false} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity">
                    <PlayIcon className="h-10 w-10 text-white opacity-80" />
                  </div>
                </div>
              ) : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Unsupported</div> }
              
              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  type="button"
                  onClick={() => removeMedia(item.media_id)}
                  className="p-1.5 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Delete media"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-xs text-white font-medium capitalize truncate">{item.type.toLowerCase()}</p>
                 {/* <p className="text-xxs text-gray-300">Order: {item.sort_order}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
      {media.length === 0 && !isLoading && !fetchError && (
        <p className="text-sm text-gray-500 text-center py-4">No media items uploaded yet.</p>
      )}
    </div>
  );
};

export default ProductMediaUpload;