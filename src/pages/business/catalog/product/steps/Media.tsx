import React, { useState } from 'react';
import { PhotoIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';

type MediaProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

const Media: React.FC<MediaProps> = ({ data, updateData, errors }) => {
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real application, you would upload these files to a server
    // For now, we'll just create mock image objects
    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file
    }));

    const updatedImages = [...data.images, ...newImages];
    updateData({ 
      images: updatedImages,
      primaryImage: data.primaryImage === null ? 0 : data.primaryImage
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real application, you would upload these files to a server
    // For now, we'll just create mock video objects
    const newVideos = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file
    }));

    updateData({ videos: [...data.videos, ...newVideos] });
  };

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

  return (
    <div className="space-y-6">
      {/* Images Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Images</h2>
        <p className="text-sm text-gray-600 mb-4">Image resolution should be like 560px X 600px</p>
        
        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
          {/* Image Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-36 hover:bg-gray-50 cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <PhotoIcon className="h-10 w-10 text-gray-400" />
            <div className="mt-2 text-sm text-center text-gray-500">
              Add Image
              <p className="text-xs">png, jpeg, jpg</p>
            </div>
          </div>
          
          {/* Image Thumbnails */}
          {data.images.map((image, index) => (
            <div 
              key={index}
              className={`relative border rounded-lg h-36 overflow-hidden ${
                data.primaryImage === index ? 'ring-2 ring-primary-500' : 'border-gray-300'
              }`}
            >
              <img 
                src={image.url} 
                alt={`Product ${index + 1}`} 
                className="h-full w-full object-cover"
              />
              
              {/* Primary badge */}
              {data.primaryImage === index && (
                <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                  Front
                </div>
              )}
              
              {/* Actions */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between">
                <button 
                  type="button"
                  onClick={() => setPrimaryImage(index)}
                  className="text-xs hover:text-primary-300"
                >
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

        {/* Image slots showing usage */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
          <div className="text-center">
            <div className="border border-gray-300 rounded-lg h-24 flex items-center justify-center">
              <span className="text-sm text-gray-500">Front</span>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-300 rounded-lg h-24 flex items-center justify-center">
              <span className="text-sm text-gray-500">Next</span>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-300 rounded-lg h-24 flex items-center justify-center">
              <span className="text-sm text-gray-500">Next</span>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-300 rounded-lg h-24 flex items-center justify-center">
              <span className="text-sm text-gray-500">Zoom</span>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-300 rounded-lg h-24 flex items-center justify-center">
              <span className="text-sm text-gray-500">Use Cases</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Videos Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Videos</h2>
        <p className="text-sm text-gray-600 mb-4">Maximum video size should be like 2M</p>
        
        {/* Video Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-36 hover:bg-gray-50 cursor-pointer relative">
          <input
            type="file"
            accept="video/mp4,video/webm,video/mkv"
            onChange={handleVideoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <PlusIcon className="h-10 w-10 text-gray-400" />
          <div className="mt-2 text-sm text-center text-gray-500">
            Add Video
            <p className="text-xs">mp4, webm, mkv</p>
          </div>
        </div>
        
        {/* Video List */}
        {data.videos.length > 0 && (
          <div className="mt-4 space-y-3">
            {data.videos.map((video, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Video</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{video.name}</p>
                    <p className="text-xs text-gray-500">Video {index + 1}</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Media; 