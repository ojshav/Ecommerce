import React, { useState } from 'react';
import { PlusIcon, XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Types
type Attribute = {
  id: string;
  name: string;
  type: 'text' | 'dropdown' | 'multiselect';
  required: boolean;
  options?: string[];
  helpText?: string;
};

type Brand = {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'rejected';
};

type AttributesProps = {
  data: {
    brand: string;
    colors: string[];
    sizes: string[];
    customAttributes: Record<string, string | string[]>;
  };
  updateData: (data: Partial<AttributesProps['data']>) => void;
  category: string;
  subCategory: string;
  errors: Record<string, string>;
};

// Mock data
const BRANDS: Brand[] = [
  { id: 'nike', name: 'Nike', status: 'approved' },
  { id: 'adidas', name: 'Adidas', status: 'approved' },
  { id: 'puma', name: 'Puma', status: 'approved' },
  { id: 'reebok', name: 'Reebok', status: 'approved' },
  { id: 'under-armour', name: 'Under Armour', status: 'pending' }
];

const COLORS = [
  { id: 'red', name: 'Red' },
  { id: 'blue', name: 'Blue' },
  { id: 'black', name: 'Black' },
  { id: 'white', name: 'White' },
  { id: 'green', name: 'Green' },
  { id: 'yellow', name: 'Yellow' },
  { id: 'purple', name: 'Purple' },
  { id: 'orange', name: 'Orange' }
];

const CLOTHING_SIZES = [
  { id: 'xs', name: 'XS' },
  { id: 's', name: 'S' },
  { id: 'm', name: 'M' },
  { id: 'l', name: 'L' },
  { id: 'xl', name: 'XL' },
  { id: 'xxl', name: 'XXL' }
];

const SHOE_SIZES = [
  { id: '36', name: '36' },
  { id: '37', name: '37' },
  { id: '38', name: '38' },
  { id: '39', name: '39' },
  { id: '40', name: '40' },
  { id: '41', name: '41' },
  { id: '42', name: '42' },
  { id: '43', name: '43' },
  { id: '44', name: '44' }
];

// Category-specific attributes
const CATEGORY_ATTRIBUTES: Record<string, Attribute[]> = {
  clothing: [
    {
      id: 'fabric',
      name: 'Fabric',
      type: 'dropdown',
      required: true,
      options: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen'],
      helpText: 'The material used to make the clothing item'
    },
    {
      id: 'pattern',
      name: 'Pattern',
      type: 'dropdown',
      required: false,
      options: ['Solid', 'Striped', 'Plaid', 'Floral', 'Geometric'],
      helpText: 'The design pattern of the fabric'
    }
  ],
  electronics: [
    {
      id: 'ram',
      name: 'RAM',
      type: 'dropdown',
      required: true,
      options: ['4GB', '8GB', '16GB', '32GB'],
      helpText: 'Random Access Memory capacity'
    },
    {
      id: 'storage',
      name: 'Storage',
      type: 'dropdown',
      required: true,
      options: ['64GB', '128GB', '256GB', '512GB', '1TB'],
      helpText: 'Internal storage capacity'
    }
  ],
  furniture: [
    {
      id: 'material',
      name: 'Material',
      type: 'dropdown',
      required: true,
      options: ['Wood', 'Metal', 'Glass', 'Plastic', 'Fabric'],
      helpText: 'Primary material used in construction'
    },
    {
      id: 'dimensions',
      name: 'Dimensions',
      type: 'text',
      required: true,
      helpText: 'Product dimensions in format: L x W x H (cm)'
    }
  ]
};

const Tooltip = ({ content }: { content: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-gray-400 hover:text-gray-500 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <QuestionMarkCircleIcon className="h-4 w-4" />
      </button>
      
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-left text-gray-600 bg-white rounded-md shadow-lg border border-gray-200">
          {content}
        </div>
      )}
    </div>
  );
};

const AddBrandModal = ({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (brandName: string) => void;
}) => {
  const [brandName, setBrandName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add New Brand</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter brand name"
            />
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Note</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>New brand requests will be reviewed by administrators before approval.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit(brandName);
              setBrandName('');
              onClose();
            }}
            disabled={!brandName.trim()}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Attributes({ data, updateData, category, subCategory, errors }: AttributesProps) {
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get available sizes based on category
  const getAvailableSizes = () => {
    if (category === 'clothing') {
      return CLOTHING_SIZES;
    } else if (category === 'shoes') {
      return SHOE_SIZES;
    }
    return [];
  };

  // Filter brands based on search term
  const filteredBrands = BRANDS.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get category-specific attributes
  const categoryAttributes = CATEGORY_ATTRIBUTES[category] || [];

  const handleBrandChange = (brandId: string) => {
    updateData({ brand: brandId });
  };

  const handleColorChange = (colorId: string) => {
    const newColors = data.colors.includes(colorId)
      ? data.colors.filter(id => id !== colorId)
      : [...data.colors, colorId];
    updateData({ colors: newColors });
  };

  const handleSizeChange = (sizeId: string) => {
    const newSizes = data.sizes.includes(sizeId)
      ? data.sizes.filter(id => id !== sizeId)
      : [...data.sizes, sizeId];
    updateData({ sizes: newSizes });
  };

  const handleCustomAttributeChange = (attributeId: string, value: string | string[]) => {
    updateData({
      customAttributes: {
        ...data.customAttributes,
        [attributeId]: value
      }
    });
  };

  const handleAddBrand = (brandName: string) => {
    // In a real application, this would make an API call to submit the brand for review
    console.log('New brand submitted for review:', brandName);
    // Show success message
    alert('Brand submitted for review. You will be notified once it is approved.');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Product Attributes</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-medium text-gray-900">General Attributes</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Brand Selection */}
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Brand <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="Select the brand of your product. If your brand is not listed, you can request to add it." />
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              
              <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md">
                {filteredBrands.map(brand => (
                  <div
                    key={brand.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                      data.brand === brand.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleBrandChange(brand.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{brand.name}</span>
                      {brand.status === 'pending' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => setIsAddBrandModalOpen(true)}
                className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add New Brand
              </button>
            </div>
          </div>
          
          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700">
                Colors
              </label>
              <div className="ml-2">
                <Tooltip content="Select the colors available for this product. Used for filters and product variants." />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {COLORS.map(color => (
                <label
                  key={color.id}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer ${
                    data.colors.includes(color.id)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.colors.includes(color.id)}
                    onChange={() => handleColorChange(color.id)}
                    className="sr-only"
                  />
                  {color.name}
                </label>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          {getAvailableSizes().length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <div className="ml-2">
                  <Tooltip content="Select the sizes available for this product. Used for filters and product variants." />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {getAvailableSizes().map(size => (
                  <label
                    key={size.id}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer ${
                      data.sizes.includes(size.id)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={data.sizes.includes(size.id)}
                      onChange={() => handleSizeChange(size.id)}
                      className="sr-only"
                    />
                    {size.name}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Category-Specific Attributes */}
      {categoryAttributes.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base font-medium text-gray-900">Category-Specific Attributes</h3>
          </div>
          
          <div className="p-6 space-y-6">
            {categoryAttributes.map(attribute => (
              <div key={attribute.id} className="space-y-2">
                <div className="flex items-center">
                  <label htmlFor={attribute.id} className="block text-sm font-medium text-gray-700">
                    {attribute.name}
                    {attribute.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {attribute.helpText && (
                    <div className="ml-2">
                      <Tooltip content={attribute.helpText} />
                    </div>
                  )}
                </div>
                
                {attribute.type === 'dropdown' && (
                  <select
                    id={attribute.id}
                    value={data.customAttributes[attribute.id] as string || ''}
                    onChange={(e) => handleCustomAttributeChange(attribute.id, e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select {attribute.name}</option>
                    {attribute.options?.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                
                {attribute.type === 'text' && (
                  <input
                    type="text"
                    id={attribute.id}
                    value={data.customAttributes[attribute.id] as string || ''}
                    onChange={(e) => handleCustomAttributeChange(attribute.id, e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={`Enter ${attribute.name.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add Brand Modal */}
      <AddBrandModal
        isOpen={isAddBrandModalOpen}
        onClose={() => setIsAddBrandModalOpen(false)}
        onSubmit={handleAddBrand}
      />
    </div>
  );
} 