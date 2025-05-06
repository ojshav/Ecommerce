import React, { useState, useRef, useCallback } from 'react';
import { PhotoIcon, TrashIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';
import { useDropzone } from 'react-dropzone';

type MediaProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

type MediaFile = {
  id: string;
  name: string;
  url: string;
  file: File;
  type: 'image' | 'video';
  thumbnail?: string;
};

type ImageFile = MediaFile & { type: 'image' };
type VideoFile = MediaFile & { type: 'video' };

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB
const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 7;

const Media: React.FC<MediaProps> = ({ data, updateData, errors }) => {
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null);
    
    const newMedia: MediaFile[] = [];
    
    for (const file of acceptedFiles) {
      // Validate file size
      if (file.type.startsWith('image/') && file.size > MAX_IMAGE_SIZE) {
        setUploadError(`Image ${file.name} exceeds 1MB limit`);
        continue;
      }
      
      if (file.type.startsWith('video/') && file.size > MAX_VIDEO_SIZE) {
        setUploadError(`Video ${file.name} exceeds 5MB limit`);
        continue;
      }

      // Create media object
      const mediaFile: MediaFile = {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        file,
        type: file.type.startsWith('image/') ? 'image' : 'video'
      } as MediaFile;

      // Generate thumbnail for videos
      if (mediaFile.type === 'video') {
        const video = document.createElement('video');
        video.src = mediaFile.url;
        video.onloadeddata = () => {
          video.currentTime = 1;
          video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            (mediaFile as VideoFile).thumbnail = canvas.toDataURL();
            updateData({ videos: [...data.videos, mediaFile as VideoFile] });
          };
        };
      }

      newMedia.push(mediaFile);
    }

    // Update state based on media type
    const newImages = newMedia.filter((m): m is ImageFile => m.type === 'image');
    const newVideos = newMedia.filter((m): m is VideoFile => m.type === 'video');

    if (newImages.length > 0) {
      const updatedImages = [...data.images, ...newImages];
      updateData({ 
        images: updatedImages.slice(0, MAX_IMAGES),
        primaryImage: data.primaryImage === null ? 0 : data.primaryImage
      });
    }

    if (newVideos.length > 0) {
      updateData({ videos: [...data.videos, ...newVideos] });
    }
  }, [data, updateData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'video/*': ['.mp4', '.webm', '.mkv']
    },
    maxFiles: MAX_IMAGES - data.images.length
  });

  const removeImage = (index: number) => {
    const updatedImages = [...data.images];
    updatedImages.splice(index, 1);
    
    let newPrimaryIndex = data.primaryImage;
    if (data.primaryImage === index) {
      newPrimaryIndex = updatedImages.length > 0 ? 0 : null;
    } else if (data.primaryImage !== null && data.primaryImage > index) {
      newPrimaryIndex = data.primaryImage - 1;
    }
    
    updateData({ 
      images: updatedImages,
      primaryImage: newPrimaryIndex
    });
  };

  const removeVideo = (index: number) => {
    const updatedVideos = [...data.videos];
    updatedVideos.splice(index, 1);
    updateData({ videos: updatedVideos });
  };

  const setPrimaryImage = (index: number) => {
    updateData({ primaryImage: index });
  };

  const reorderImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...data.images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    
    let newPrimaryIndex = data.primaryImage;
    if (data.primaryImage === fromIndex) {
      newPrimaryIndex = toIndex;
    } else if (data.primaryImage !== null) {
      if (data.primaryImage > fromIndex && data.primaryImage <= toIndex) {
        newPrimaryIndex = data.primaryImage - 1;
      } else if (data.primaryImage < fromIndex && data.primaryImage >= toIndex) {
        newPrimaryIndex = data.primaryImage + 1;
      }
    }
    
    updateData({ 
      images: updatedImages,
      primaryImage: newPrimaryIndex
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-4 mb-6">Product Media</h2>
      
      <div className="space-y-6">
        {/* Images Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
          <p className="text-sm text-gray-600 mb-4">Image resolution should be 560px X 609px (max 1MB per image)</p>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
            {/* Image Upload Box */}
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-40 cursor-pointer relative
                ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="h-10 w-10 text-gray-400" />
              <div className="mt-2 text-sm text-center text-gray-500">
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <>
                    <p>Drag & drop images here</p>
                    <p className="text-xs">or click to browse</p>
                    <p className="text-xs mt-1">png, jpeg, jpg (max 1MB)</p>
                  </>
                )}
              </div>
            </div>
            
            {/* Image Thumbnails */}
            {data.images.map((image, index) => (
              <div 
                key={image.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', index.toString());
                  setDraggedOver(index.toString());
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDraggedOver(index.toString());
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  reorderImage(fromIndex, index);
                  setDraggedOver(null);
                }}
                onDragEnd={() => setDraggedOver(null)}
                className={`relative border-2 rounded-lg h-40 overflow-hidden cursor-move
                  ${data.primaryImage === index ? 'ring-2 ring-primary-500 border-primary-300' : 'border-gray-300'}
                  ${draggedOver === index.toString() ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img 
                  src={image.url} 
                  alt={`Product ${index + 1}`} 
                  className="h-full w-full object-cover"
                />
                
                {/* Primary badge */}
                {data.primaryImage === index && (
                  <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-md shadow-sm">
                    Front
                  </div>
                )}
                
                {/* Actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setPrimaryImage(index)}
                    className="text-xs hover:text-primary-300 flex items-center"
                  >
                    <StarIcon className={`h-4 w-4 mr-1 ${data.primaryImage === index ? 'text-yellow-400' : ''}`} />
                    {data.primaryImage === index ? 'Primary' : 'Set as Front'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-xs text-red-300 hover:text-red-100"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {uploadError && (
            <p className="text-sm text-red-600 mt-2">{uploadError}</p>
          )}

          {/* Image slots showing usage */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-6">
            <div className="text-center">
              <div className="border-2 border-gray-200 rounded-lg h-24 flex items-center justify-center">
                <span className="text-sm text-gray-500">Front</span>
              </div>
            </div>
            <div className="text-center">
              <div className="border-2 border-gray-200 rounded-lg h-24 flex items-center justify-center">
                <span className="text-sm text-gray-500">Next</span>
              </div>
            </div>
            <div className="text-center">
              <div className="border-2 border-gray-200 rounded-lg h-24 flex items-center justify-center">
                <span className="text-sm text-gray-500">Next</span>
              </div>
            </div>
            <div className="text-center">
              <div className="border-2 border-gray-200 rounded-lg h-24 flex items-center justify-center">
                <span className="text-sm text-gray-500">Zoom</span>
              </div>
            </div>
            <div className="text-center">
              <div className="border-2 border-gray-200 rounded-lg h-24 flex items-center justify-center">
                <span className="text-sm text-gray-500">Use Cases</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Videos Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Videos</h3>
          <p className="text-sm text-gray-600 mb-4">Maximum video size: 5MB (mp4, webm, mkv)</p>
          
          {/* Video Upload Box */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-40 cursor-pointer relative
              ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            <input {...getInputProps()} />
            <PlusIcon className="h-10 w-10 text-gray-400" />
            <div className="mt-2 text-sm text-center text-gray-500">
              {isDragActive ? (
                <p>Drop the video here...</p>
              ) : (
                <>
                  <p>Drag & drop video here</p>
                  <p className="text-xs">or click to browse</p>
                  <p className="text-xs mt-1">mp4, webm, mkv (max 5MB)</p>
                </>
              )}
            </div>
          </div>
          
          {/* Video List */}
          {data.videos.length > 0 && (
            <div className="mt-4 space-y-3">
              {data.videos.map((video, index) => (
                <div key={video.id} className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs">Video</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{video.name}</p>
                      <p className="text-xs text-gray-500">{(video.file.size / (1024 * 1024)).toFixed(2)}MB</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media; 