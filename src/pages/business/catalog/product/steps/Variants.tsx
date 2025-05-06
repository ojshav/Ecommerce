import React, { useState, useRef, useCallback } from 'react';
import { PhotoIcon, TrashIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';
import { useDropzone } from 'react-dropzone';

type VariantsProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
  isReadOnly?: boolean;
};

type VariantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (variant: ProductData['variants'][0]) => void;
  availableAttributes: {
    colors: string[];
    sizes: string[];
    customAttributes: Record<string, string | string[]>;
  };
};

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB
const MAX_IMAGES = 7;

const VariantModal: React.FC<VariantModalProps> = ({
  isOpen,
  onClose,
  onSave,
  availableAttributes
}) => {
  const [variantData, setVariantData] = useState<Partial<ProductData['variants'][0]>>({
    sku: '',
    attributes: {},
    customAttributes: {},
    price: '',
    stockQuantity: '0',
    images: []
  });
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null);
    
    const newImages = acceptedFiles.map(file => {
      if (file.size > MAX_IMAGE_SIZE) {
        setUploadError(`Image ${file.name} exceeds 1MB limit`);
        return null;
      }

      return {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        file,
        type: 'image' as const
      };
    }).filter((img): img is NonNullable<typeof img> => img !== null);

    setVariantData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages].slice(0, MAX_IMAGES),
      primaryImage: prev.primaryImage === null ? 0 : prev.primaryImage
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: MAX_IMAGES - (variantData.images?.length || 0)
  });

  const handleAttributeChange = (key: string, value: string) => {
    setVariantData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value
      }
    }));
  };

  const handleCustomAttributeChange = (key: string, value: string | string[]) => {
    setVariantData(prev => ({
      ...prev,
      customAttributes: {
        ...prev.customAttributes,
        [key]: value
      }
    }));
  };

  const removeImage = (index: number) => {
    setVariantData(prev => {
      const updatedImages = [...(prev.images || [])];
      updatedImages.splice(index, 1);
      
      let newPrimaryIndex = prev.primaryImage ?? null;
      if (prev.primaryImage === index) {
        newPrimaryIndex = updatedImages.length > 0 ? 0 : null;
      } else if (prev.primaryImage !== null && prev.primaryImage !== undefined && prev.primaryImage > index) {
        newPrimaryIndex = prev.primaryImage - 1;
      }
      
      return {
        ...prev,
        images: updatedImages,
        primaryImage: newPrimaryIndex
      };
    });
  };

  const setPrimaryImage = (index: number) => {
    setVariantData(prev => ({
      ...prev,
      primaryImage: index
    }));
  };

  const reorderImage = (fromIndex: number, toIndex: number) => {
    setVariantData(prev => {
      const updatedImages = [...(prev.images || [])];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      
      let newPrimaryIndex = prev.primaryImage ?? null;
      if (prev.primaryImage === fromIndex) {
        newPrimaryIndex = toIndex;
      } else if (prev.primaryImage !== null && prev.primaryImage !== undefined) {
        if (prev.primaryImage > fromIndex && prev.primaryImage <= toIndex) {
          newPrimaryIndex = prev.primaryImage - 1;
        } else if (prev.primaryImage < fromIndex && prev.primaryImage >= toIndex) {
          newPrimaryIndex = prev.primaryImage + 1;
        }
      }
      
      return {
        ...prev,
        images: updatedImages,
        primaryImage: newPrimaryIndex
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (variantData.sku && variantData.price) {
      onSave({
        id: Math.random().toString(36).substr(2, 9),
        sku: variantData.sku,
        attributes: variantData.attributes || {},
        customAttributes: variantData.customAttributes || {},
        price: variantData.price,
        stockQuantity: variantData.stockQuantity || '0',
        images: variantData.images || [],
        primaryImage: variantData.primaryImage ?? null
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Add Product Variant</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Basic Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="variant-sku" className="block text-sm font-medium text-gray-700 mb-1">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="variant-sku"
                    value={variantData.sku}
                    onChange={(e) => setVariantData(prev => ({ ...prev, sku: e.target.value }))}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="variant-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="variant-price"
                    value={variantData.price}
                    onChange={(e) => setVariantData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    min="0"
                    step="0.01"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Standard Attributes */}
            {(availableAttributes.colors.length > 0 || availableAttributes.sizes.length > 0) && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Standard Attributes</h4>
                <div className="grid grid-cols-2 gap-4">
                  {availableAttributes.colors.length > 0 && (
                    <div>
                      <label htmlFor="variant-color" className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <select
                        id="variant-color"
                        value={variantData.attributes?.color || ''}
                        onChange={(e) => handleAttributeChange('color', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">Select Color</option>
                        {availableAttributes.colors.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {availableAttributes.sizes.length > 0 && (
                    <div>
                      <label htmlFor="variant-size" className="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <select
                        id="variant-size"
                        value={variantData.attributes?.size || ''}
                        onChange={(e) => handleAttributeChange('size', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">Select Size</option>
                        {availableAttributes.sizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Custom Attributes */}
            {Object.entries(availableAttributes.customAttributes).length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Custom Attributes</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(availableAttributes.customAttributes).map(([key, options]) => (
                    <div key={key}>
                      <label htmlFor={`variant-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <select
                        id={`variant-${key}`}
                        value={variantData.customAttributes?.[key] as string || ''}
                        onChange={(e) => handleCustomAttributeChange(key, e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">Select {key}</option>
                        {Array.isArray(options) ? options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        )) : (
                          <option value={options}>{options}</option>
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Stock Information</h4>
              <div>
                <label htmlFor="variant-stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="variant-stock"
                  value={variantData.stockQuantity}
                  onChange={(e) => setVariantData(prev => ({ ...prev, stockQuantity: e.target.value }))}
                  min="0"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Variant Images */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Variant Images</h4>
              <p className="text-sm text-gray-600">Image resolution should be 560px X 609px (max 1MB per image)</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                {/* Image Upload Box */}
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-36 cursor-pointer relative
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
                {variantData.images?.map((image, index) => (
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
                    className={`relative border rounded-lg h-36 overflow-hidden cursor-move
                      ${variantData.primaryImage === index ? 'ring-2 ring-primary-500' : 'border-gray-300'}
                      ${draggedOver === index.toString() ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img 
                      src={image.url} 
                      alt={`Variant ${index + 1}`} 
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Primary badge */}
                    {variantData.primaryImage === index && (
                      <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                        Front
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between">
                      <button 
                        type="button"
                        onClick={() => setPrimaryImage(index)}
                        className="text-xs hover:text-primary-300 flex items-center"
                      >
                        <StarIcon className={`h-4 w-4 mr-1 ${variantData.primaryImage === index ? 'text-yellow-400' : ''}`} />
                        {variantData.primaryImage === index ? 'Primary' : 'Set as Front'}
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
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Variant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Variants: React.FC<VariantsProps> = ({ data, updateData, errors, isReadOnly }) => {
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  const handleAddVariant = (variant: ProductData['variants'][0]) => {
    updateData({
      variants: [...data.variants, variant]
    });
  };

  const handleDeleteVariant = (variantId: string) => {
    updateData({
      variants: data.variants.filter(v => v.id !== variantId)
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
          {!isReadOnly && (
            <button
              type="button"
              onClick={() => setIsVariantModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Variant
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {data.variants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No variants added yet. Click "Add Variant" to create one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.variants.map(variant => (
              <div key={variant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {variant.images[0] && (
                    <img
                      src={variant.images[0].url}
                      alt={variant.sku}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">SKU: {variant.sku}</p>
                    <p className="text-sm text-gray-500">
                      {Object.entries(variant.attributes)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </p>
                    {Object.entries(variant.customAttributes).length > 0 && (
                      <p className="text-sm text-gray-500">
                        {Object.entries(variant.customAttributes)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">Price: ${variant.price}</p>
                    <p className="text-sm text-gray-500">Stock: {variant.stockQuantity}</p>
                  </div>
                </div>
                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => handleDeleteVariant(variant.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <VariantModal
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onSave={handleAddVariant}
        availableAttributes={{
          colors: data.colors,
          sizes: data.sizes,
          customAttributes: data.customAttributes
        }}
      />
    </div>
  );
};

export default Variants; 