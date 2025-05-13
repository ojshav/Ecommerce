import React, { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../../../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Types
type Attribute = {
  id: number;
  name: string;
  type: 'text' | 'dropdown' | 'multiselect';
  required: boolean;
  options?: string[];
  helpText?: string;
  is_category_specific: boolean;
  category_id?: number;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
};

type Brand = {
  id: number;
  name: string;
  status: 'approved' | 'pending' | 'rejected';
  category_id?: number;
  category?: {
    id: number;
    name: string;
  };
  added_by?: number;  // Add merchant ID
};

type Color = {
  id: number;
  name: string;
  hex_code: string;
  is_approved: boolean;
};

type Size = {
  id: number;
  name: string;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
};

// Categories that require sizes
const SIZED_CATEGORIES = ['clothing', 'shoes'];

type CustomAttribute = {
  id: number;
  name: string;
  value: string;
  type: 'text' | 'dropdown' | 'multiselect';
  required: boolean;
  options?: string[];
  helpText?: string;
};

type NewAttribute = {
  name: string;
  type: 'text' | 'dropdown' | 'multiselect';
  options?: string[];
  helpText?: string;
  required: boolean;
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
  subSubCategory: string;
  errors: Record<string, string>;
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

const AddCustomAttributeModal = ({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (attribute: NewAttribute) => void;
}) => {
  const [attributeName, setAttributeName] = useState('');
  const [attributeType, setAttributeType] = useState<'text' | 'dropdown' | 'multiselect'>('text');
  const [options, setOptions] = useState<string[]>(['']);
  const [helpText, setHelpText] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    const newAttribute: NewAttribute = {
      name: attributeName,
      type: attributeType,
      required: isRequired,
      helpText: helpText.trim() || undefined,
      options: attributeType !== 'text' ? options.filter(opt => opt.trim() !== '') : undefined
    };
    onSubmit(newAttribute);
    // Reset form
    setAttributeName('');
    setAttributeType('text');
    setOptions(['']);
    setHelpText('');
    setIsRequired(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add New Custom Attribute</h3>
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
            <label htmlFor="attributeName" className="block text-sm font-medium text-gray-700">
              Attribute Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="attributeName"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter attribute name"
            />
          </div>

          <div>
            <label htmlFor="attributeType" className="block text-sm font-medium text-gray-700">
              Attribute Type <span className="text-red-500">*</span>
            </label>
            <select
              id="attributeType"
              value={attributeType}
              onChange={(e) => setAttributeType(e.target.value as 'text' | 'dropdown' | 'multiselect')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="text">Text</option>
              <option value="dropdown">Dropdown</option>
              <option value="multiselect">Multi-select</option>
            </select>
          </div>

          {(attributeType === 'dropdown' || attributeType === 'multiselect') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Options <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={`Option ${index + 1}`}
                    />
                    {options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Option
                </button>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="helpText" className="block text-sm font-medium text-gray-700">
              Help Text
            </label>
            <textarea
              id="helpText"
              value={helpText}
              onChange={(e) => setHelpText(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter help text (optional)"
              rows={2}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isRequired"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isRequired" className="ml-2 block text-sm text-gray-700">
              Required field
            </label>
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
            onClick={handleSubmit}
            disabled={!attributeName.trim() || (attributeType !== 'text' && options.some(opt => !opt.trim()))}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Add Attribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Attributes({ data, updateData, category, subCategory, subSubCategory, errors }: AttributesProps) {
  const { user } = useAuth();
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState({
    brands: false,
    colors: false,
    sizes: false,
    attributes: false
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [customAttributes, setCustomAttributes] = useState<CustomAttribute[]>([]);
  const [availableAttributes, setAvailableAttributes] = useState<CustomAttribute[]>([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState<number | null>(null);
  const [attributeValue, setAttributeValue] = useState('');
  const [isAddCustomAttributeModalOpen, setIsAddCustomAttributeModalOpen] = useState(false);

  // Fetch brands based on selected subcategory and sub-subcategory
  useEffect(() => {
    const fetchBrands = async () => {
      if (!subCategory) {
        setBrands([]); // Clear brands if no subcategory is selected
        return;
      }

      try {
        setLoading(prev => ({ ...prev, brands: true }));
        
        // Build the query parameters
        const params = new URLSearchParams();
        if (subSubCategory) {
          params.append('category_id', subSubCategory);
          params.append('parent_category_id', subCategory);
        } else {
          params.append('category_id', subCategory);
        }
        
        const response = await fetch(`${API_BASE_URL}/api/catalog/brands?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch brands');
        }
        
        setBrands(data.brands);
        setError(prev => ({ ...prev, brands: '' }));
      } catch (err) {
        setError(prev => ({ 
          ...prev, 
          brands: err instanceof Error ? err.message : 'Failed to fetch brands' 
        }));
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(prev => ({ ...prev, brands: false }));
      }
    };

    fetchBrands();
  }, [subCategory, subSubCategory]);

  // Fetch colors
  useEffect(() => {
    const fetchColors = async () => {
      try {
        setLoading(prev => ({ ...prev, colors: true }));
        const response = await fetch(`${API_BASE_URL}api/catalog/colors`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch colors');
        }
        
        setColors(data.colors);
        setError(prev => ({ ...prev, colors: '' }));
      } catch (err) {
        setError(prev => ({ 
          ...prev, 
          colors: err instanceof Error ? err.message : 'Failed to fetch colors' 
        }));
        console.error('Error fetching colors:', err);
      } finally {
        setLoading(prev => ({ ...prev, colors: false }));
      }
    };

    fetchColors();
  }, []);

  // Fetch sizes with category filter
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        setLoading(prev => ({ ...prev, sizes: true }));
        
        // Build the query parameters
        const params = new URLSearchParams();
        if (subSubCategory) {
          params.append('category_id', subSubCategory);
          params.append('parent_category_id', subCategory);
        } else if (subCategory) {
          params.append('category_id', subCategory);
        }
        
        const response = await fetch(`${API_BASE_URL}/api/catalog/sizes?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch sizes');
        }
        
        setSizes(data.sizes);
        setError(prev => ({ ...prev, sizes: '' }));
      } catch (err) {
        setError(prev => ({ 
          ...prev, 
          sizes: err instanceof Error ? err.message : 'Failed to fetch sizes' 
        }));
        console.error('Error fetching sizes:', err);
      } finally {
        setLoading(prev => ({ ...prev, sizes: false }));
      }
    };

    // Only fetch sizes if we have a category selected
    if (subCategory) {
      fetchSizes();
    } else {
      setSizes([]); // Clear sizes if no category is selected
    }
  }, [subCategory, subSubCategory]);

  // Fetch attributes
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        setLoading(prev => ({ ...prev, attributes: true }));
        const response = await fetch(`${API_BASE_URL}/api/catalog/attributes?category_id=${category}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch attributes');
        }
        
        setAttributes(data.attributes);
        setError(prev => ({ ...prev, attributes: '' }));
      } catch (err) {
        setError(prev => ({ 
          ...prev, 
          attributes: err instanceof Error ? err.message : 'Failed to fetch attributes' 
        }));
        console.error('Error fetching attributes:', err);
      } finally {
        setLoading(prev => ({ ...prev, attributes: false }));
      }
    };

    if (category) {
      fetchAttributes();
    }
  }, [category]);

  // Fetch available attributes from backend
  useEffect(() => {
    const fetchAvailableAttributes = async () => {
      try {
        setLoading(prev => ({ ...prev, attributes: true }));
        const response = await fetch(`${API_BASE_URL}/api/catalog/attributes`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch attributes');
        }
        
        setAvailableAttributes(data.attributes);
        setError(prev => ({ ...prev, attributes: '' }));
      } catch (err) {
        setError(prev => ({ 
          ...prev, 
          attributes: err instanceof Error ? err.message : 'Failed to fetch attributes' 
        }));
        console.error('Error fetching attributes:', err);
      } finally {
        setLoading(prev => ({ ...prev, attributes: false }));
      }
    };

    fetchAvailableAttributes();
  }, []);

  // Filter brands based on search term
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandChange = (brandId: string) => {
    updateData({ brand: brandId });
  };

  const handleColorChange = (colorId: string) => {
    const newColors = data.colors.includes(colorId)
      ? data.colors.filter(id => id !== colorId)
      : [...data.colors, colorId];
    updateData({ colors: newColors });
  };

  const handleCustomAttributeChange = (attributeId: string, value: string | string[]) => {
    updateData({
      customAttributes: {
        ...data.customAttributes,
        [attributeId]: value
      }
    });
  };

  const handleAddBrand = async (brandName: string) => {
    if (!subCategory) {
      alert('Please select a subcategory first');
      return;
    }

    if (!user) {
      alert('You must be logged in to add a brand');
      return;
    }

    try {
      // Use the user ID directly from the auth context
      const merchantId = user.id;

      // Build the request body with merchant ID
      const requestBody = {
        name: brandName,
        category_id: subSubCategory || subCategory,
        parent_category_id: subSubCategory ? subCategory : null,
        added_by: merchantId,
        is_approved: true  // Auto-approve for merchants
      };

      const response = await fetch(`${API_BASE_URL}/api/catalog/brands`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add brand');
      }

      // Refresh brands list
      const params = new URLSearchParams();
      if (subSubCategory) {
        params.append('category_id', subSubCategory);
        params.append('parent_category_id', subCategory);
      } else {
        params.append('category_id', subCategory);
      }
      
      const brandsResponse = await fetch(`${API_BASE_URL}/api/catalog/brands?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const brandsData = await brandsResponse.json();
      setBrands(brandsData.brands);
      
      alert('Brand added successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add brand');
      console.error('Error adding brand:', err);
    }
  };

  const handleSizeChange = (sizeId: string) => {
    const newSizes = data.sizes.includes(sizeId)
      ? data.sizes.filter(id => id !== sizeId)
      : [...data.sizes, sizeId];
    updateData({ sizes: newSizes });
  };

  const handleAddExistingAttribute = () => {
    if (selectedAttributeId && attributeValue.trim()) {
      const selectedAttribute = availableAttributes.find(attr => attr.id === selectedAttributeId);
      if (selectedAttribute) {
        const newAttribute: CustomAttribute = {
          ...selectedAttribute,
          value: attributeValue.trim()
        };
        setCustomAttributes([...customAttributes, newAttribute]);
        setSelectedAttributeId(null);
        setAttributeValue('');
        
        // Update the parent component's data
        updateData({
          customAttributes: {
            ...data.customAttributes,
            [selectedAttribute.name]: attributeValue.trim()
          }
        });
      }
    }
  };

  const handleAddCustomAttribute = async (newAttribute: NewAttribute) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/catalog/attributes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newAttribute,
          category_id: subSubCategory || subCategory,
          parent_category_id: subSubCategory ? subCategory : null
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to add attribute');
      }

      // Refresh available attributes
      const attributesResponse = await fetch(`${API_BASE_URL}/api/catalog/attributes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const attributesData = await attributesResponse.json();
      setAvailableAttributes(attributesData.attributes);
      
      alert('Custom attribute added successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add custom attribute');
      console.error('Error adding custom attribute:', err);
    }
  };

  const handleRemoveCustomAttribute = (index: number) => {
    const updatedAttributes = [...customAttributes];
    const removedAttribute = updatedAttributes[index];
    updatedAttributes.splice(index, 1);
    setCustomAttributes(updatedAttributes);
    
    // Update the parent component's data
    const updatedCustomAttributes = { ...data.customAttributes };
    delete updatedCustomAttributes[removedAttribute.name];
    updateData({ customAttributes: updatedCustomAttributes });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-4 mb-6">Product Attributes</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">General Attributes</h3>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Brand Selection */}
            <div className="space-y-2">
              <div className="flex items-center mb-1">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
                <div className="ml-2">
                  <Tooltip content={`Select the brand of your product. Brands are filtered by the selected ${subSubCategory ? 'sub-subcategory' : 'subcategory'}.`} />
                </div>
              </div>
              
              {!subCategory ? (
                <div className="text-sm text-gray-500">
                  Please select a subcategory first to view available brands.
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full py-3 px-4 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                  />
                  
                  <div className="mt-2 max-h-48 overflow-y-auto border-2 border-gray-200 rounded-md">
                    {loading.brands ? (
                      <div className="px-4 py-3 text-sm text-gray-500">Loading brands...</div>
                    ) : error.brands ? (
                      <div className="px-4 py-3 text-sm text-red-500">{error.brands}</div>
                    ) : filteredBrands.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">No brands found for this subcategory.</div>
                    ) : (
                      filteredBrands.map(brand => (
                        <div
                          key={brand.id}
                          className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                            data.brand === brand.id.toString() ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleBrandChange(brand.id.toString())}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-900">{brand.name}</span>
                              {brand.category && (
                                <span className="ml-2 text-xs text-gray-500">
                                  ({brand.category.name})
                                </span>
                              )}
                            </div>
                            {brand.status === 'pending' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setIsAddBrandModalOpen(true)}
                    className="mt-3 inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add New Brand
                  </button>
                </div>
              )}
            </div>
            
            {/* Color Selection */}
            <div className="space-y-2">
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Colors
                </label>
                <div className="ml-2">
                  <Tooltip content="Select the colors available for this product. Used for filters and product variants." />
                </div>
              </div>
              
              {loading.colors ? (
                <div className="text-sm text-gray-500">Loading colors...</div>
              ) : error.colors ? (
                <div className="text-sm text-red-500">{error.colors}</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <label
                      key={color.id}
                      className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium cursor-pointer ${
                        data.colors.includes(color.id.toString())
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={data.colors.includes(color.id.toString())}
                        onChange={() => handleColorChange(color.id.toString())}
                        className="sr-only"
                      />
                      {color.name}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Size Selection */}
            {subCategory && (
              <div className="space-y-2">
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Sizes <span className="text-red-500">*</span>
                  </label>
                  <div className="ml-2">
                    <Tooltip content="Select the sizes available for this product. Used for product variants." />
                  </div>
                </div>
                
                {loading.sizes ? (
                  <div className="text-sm text-gray-500">Loading sizes...</div>
                ) : error.sizes ? (
                  <div className="text-sm text-red-500">{error.sizes}</div>
                ) : sizes.length === 0 ? (
                  <div className="text-sm text-gray-500">No sizes available for this category.</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <label
                        key={size.id}
                        className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium cursor-pointer ${
                          data.sizes.includes(size.id.toString())
                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={data.sizes.includes(size.id.toString())}
                          onChange={() => handleSizeChange(size.id.toString())}
                          className="sr-only"
                        />
                        {size.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Custom Attributes Form */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-6">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Custom Attributes</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add values for additional attributes specific to your product
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCustomAttributeModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add New Attribute
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Add New Attribute Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="attributeSelect" className="block text-sm font-medium text-gray-700">
                  Select Attribute
                </label>
                <select
                  id="attributeSelect"
                  value={selectedAttributeId || ''}
                  onChange={(e) => setSelectedAttributeId(Number(e.target.value))}
                  className="mt-1 block w-full py-3 px-4 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                >
                  <option value="">Select an attribute</option>
                  {availableAttributes
                    .filter(attr => !customAttributes.some(customAttr => customAttr.id === attr.id))
                    .map(attr => (
                      <option key={attr.id} value={attr.id}>
                        {attr.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="attributeValue" className="block text-sm font-medium text-gray-700">
                  Value
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="attributeValue"
                    value={attributeValue}
                    onChange={(e) => setAttributeValue(e.target.value)}
                    placeholder="Enter value"
                    className="block w-full py-3 px-4 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddExistingAttribute}
                    disabled={!selectedAttributeId || !attributeValue.trim()}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Existing Custom Attributes */}
            {customAttributes.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Added Attributes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customAttributes.map((attr, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <span className="text-sm font-medium text-gray-900">{attr.name}</span>
                        <span className="mx-2 text-gray-500">:</span>
                        <span className="text-sm text-gray-600">{attr.value}</span>
                        {attr.helpText && (
                          <div className="mt-1 text-xs text-gray-500">{attr.helpText}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomAttribute(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Category-Specific Attributes */}
        {attributes.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">Category-Specific Attributes</h3>
              <p className="mt-1 text-sm text-gray-500">
                These attributes are specific to your selected category. Please provide accurate information.
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {loading.attributes ? (
                <div className="text-sm text-gray-500">Loading attributes...</div>
              ) : error.attributes ? (
                <div className="text-sm text-red-500">{error.attributes}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attributes.map(attribute => (
                    <div key={attribute.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <label htmlFor={attribute.id.toString()} className="block text-sm font-medium text-gray-700">
                            {attribute.name}
                            {attribute.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {attribute.helpText && (
                            <div className="ml-2">
                              <Tooltip content={attribute.helpText} />
                            </div>
                          )}
                        </div>
                        {errors[`attribute_${attribute.id}`] && (
                          <span className="text-sm text-red-500">{errors[`attribute_${attribute.id}`]}</span>
                        )}
                      </div>
                      
                      {attribute.type === 'dropdown' && (
                        <select
                          id={attribute.id.toString()}
                          value={data.customAttributes[attribute.id.toString()] as string || ''}
                          onChange={(e) => handleCustomAttributeChange(attribute.id.toString(), e.target.value)}
                          className={`block w-full py-3 px-4 text-base shadow-sm border-2 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200 ${
                            errors[`attribute_${attribute.id}`] ? 'border-red-300' : 'border-gray-200'
                          }`}
                          required={attribute.required}
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
                          id={attribute.id.toString()}
                          value={data.customAttributes[attribute.id.toString()] as string || ''}
                          onChange={(e) => handleCustomAttributeChange(attribute.id.toString(), e.target.value)}
                          className={`block w-full py-3 px-4 text-base shadow-sm border-2 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200 ${
                            errors[`attribute_${attribute.id}`] ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder={attribute.placeholder || `Enter ${attribute.name.toLowerCase()}`}
                          required={attribute.required}
                          minLength={attribute.validation?.min}
                          maxLength={attribute.validation?.max}
                          pattern={attribute.validation?.pattern}
                        />
                      )}

                      {attribute.type === 'multiselect' && (
                        <div className="space-y-2">
                          {attribute.options?.map(option => (
                            <label
                              key={option}
                              className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium cursor-pointer ${
                                (data.customAttributes[attribute.id.toString()] as string[] || []).includes(option)
                                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-100'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={(data.customAttributes[attribute.id.toString()] as string[] || []).includes(option)}
                                onChange={(e) => {
                                  const currentValues = (data.customAttributes[attribute.id.toString()] as string[] || []);
                                  const newValues = e.target.checked
                                    ? [...currentValues, option]
                                    : currentValues.filter(v => v !== option);
                                  handleCustomAttributeChange(attribute.id.toString(), newValues);
                                }}
                                className="sr-only"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}

                      {attribute.helpText && (
                        <p className="mt-1 text-sm text-gray-500">{attribute.helpText}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Add Brand Modal */}
      <AddBrandModal
        isOpen={isAddBrandModalOpen}
        onClose={() => setIsAddBrandModalOpen(false)}
        onSubmit={handleAddBrand}
      />
      
      {/* Add Custom Attribute Modal */}
      <AddCustomAttributeModal
        isOpen={isAddCustomAttributeModalOpen}
        onClose={() => setIsAddCustomAttributeModalOpen(false)}
        onSubmit={handleAddCustomAttribute}
      />
    </div>
  );
} 