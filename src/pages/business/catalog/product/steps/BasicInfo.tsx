import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon, ArrowPathIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Product data type
type ProductData = {
  name: string;
  sku: string;
  urlKey: string;
  taxCategory: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  category: string;
  subCategory: string;
  subSubCategory: string;
};

// Default empty product data
const defaultProductData: ProductData = {
  name: '',
  sku: '',
  urlKey: '',
  taxCategory: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  category: '',
  subCategory: '',
  subSubCategory: ''
};

type BasicInfoProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
  onSubmit?: (data: ProductData) => Promise<void>;
};

// Tax categories
const TAX_CATEGORIES = [
  { value: '', label: 'Select' },
  { value: 'standard', label: 'Standard Rate' },
  { value: 'reduced', label: 'Reduced Rate' },
  { value: 'none', label: 'None' }
];

// Category type from API
type Category = {
  id: number;
  name: string;
  parent_id: number | null;
  subcategories: Category[];
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

export default function BasicInfo({ data = defaultProductData, updateData, errors, onSubmit }: BasicInfoProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch categories');
        }
        
        setCategories(data.categories);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get main categories (those without parent_id)
  const mainCategories = categories.filter(cat => !cat.parent_id);

  // Get subcategories for a given parent category
  const getSubCategories = (parentId: number) => {
    return categories.filter(cat => cat.parent_id === parentId);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    // Clear subcategories when main category changes
    updateData({ 
      category: value,
      subCategory: '',
      subSubCategory: ''
    });
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    // Clear sub-subcategory when subcategory changes
    updateData({ 
      subCategory: value,
      subSubCategory: ''
    });
  };

  const handleSubSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateData({ subSubCategory: value });
  };

  const generateUrlKey = () => {
    const productName = data.name || '';
    if (!productName) {
      return;
    }

    // Convert to lowercase and replace special characters with hyphens
    let urlKey = productName
      .toLowerCase()
      .trim()
      // Replace special characters and spaces with hyphens
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '');
    
    updateData({ urlKey });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Update the name and generate URL key
    const urlKey = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    updateData({ 
      name: value,
      urlKey
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If the name field is being updated, also update the URL key
    if (name === 'name') {
      const urlKey = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
        
      updateData({ 
        [name]: value,
        urlKey
      });
    } else {
      updateData({ [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (submitLoading) return;

    try {
      setSubmitLoading(true);
      setSubmitError(null);

      // Prepare the data for API submission
      const productData = {
        product_name: data.name || '',
        sku: data.sku || '',
        url_key: data.urlKey || '',
        tax_category: data.taxCategory || '',
        meta_title: data.metaTitle || '',
        meta_description: data.metaDescription || '',
        meta_keywords: data.metaKeywords || '',
        category_id: data.category ? parseInt(data.category) : null,
        sub_category_id: data.subCategory ? parseInt(data.subCategory) : null,
        sub_sub_category_id: data.subSubCategory ? parseInt(data.subSubCategory) : null
      };

      // Make API call to create product
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create product');
      }

      // If onSubmit prop is provided, call it with the response data
      if (onSubmit) {
        await onSubmit(data);
      }

      // Show success message or handle success case
      console.log('Product created successfully:', responseData);

    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Product Information</h2>
        <button
          type="submit"
          disabled={submitLoading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            submitLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700'
          } transition-colors duration-200`}
        >
          {submitLoading ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      {submitError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">General</h3>
        
          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Main Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Main Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={data.category || ''}
                onChange={handleCategoryChange}
                className="block w-full shadow-sm px-4 py-3 text-base border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                disabled={loading}
              >
                <option value="">Select Category</option>
                {mainCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {loading && <p className="text-sm text-gray-500">Loading categories...</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            {/* Sub Category */}
            {data.category && (
              <div className="space-y-2">
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  value={data.subCategory || ''}
                  onChange={handleSubCategoryChange}
                  className="block w-full shadow-sm px-4 py-3 text-base border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                  disabled={loading}
                >
                  <option value="">Select Sub Category</option>
                  {getSubCategories(Number(data.category)).map(subCategory => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sub-Sub Category */}
            {data.subCategory && (
              <div className="space-y-2">
                <label htmlFor="subSubCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-Sub Category
                </label>
                <select
                  id="subSubCategory"
                  name="subSubCategory"
                  value={data.subSubCategory || ''}
                  onChange={handleSubSubCategoryChange}
                  className="block w-full shadow-sm px-4 py-3 text-base border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                  disabled={loading}
                >
                  <option value="">Select Sub-Sub Category</option>
                  {getSubCategories(Number(data.subCategory)).map(subSubCategory => (
                    <option key={subSubCategory.id} value={subSubCategory.id}>
                      {subSubCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Product Name */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center mb-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="Enter the product name. The URL key will be automatically generated from this name." />
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleNameChange}
                className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                  errors.name 
                    ? 'border-2 border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300' 
                    : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300'
                } transition-all duration-200`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          {/* SKU */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center mb-1">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                SKU <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="A unique identifier used to track inventory and manage your products." />
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="sku"
                name="sku"
                value={data.sku || ''}
                onChange={handleChange}
                className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                  errors.sku 
                    ? 'border-2 border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300' 
                    : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300'
                } transition-all duration-200`}
              />
              {errors.sku && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
          </div>
          
          {/* URL Key */}
          <div className="space-y-2">
            <div className="flex items-center mb-1">
              <label htmlFor="urlKey" className="block text-sm font-medium text-gray-700">
                URL Key <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="The URL-friendly version of your product name. This will be automatically generated from the product name, but you can edit it if needed." />
              </div>
            </div>
            <div className="relative flex">
              <input
                type="text"
                id="urlKey"
                name="urlKey"
                value={data.urlKey || ''}
                onChange={handleChange}
                className={`flex-1 block w-full py-3 px-4 text-base shadow-sm rounded-l-md ${
                  errors.urlKey 
                    ? 'border-2 border-red-300 text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300' 
                    : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300'
                } transition-all duration-200`}
                placeholder="product-url"
              />
              <button
                type="button"
                onClick={generateUrlKey}
                className="inline-flex items-center px-4 py-3 border-2 border-l-0 border-gray-200 bg-gray-50 text-gray-700 rounded-r-md hover:bg-gray-100 focus:outline-none"
                title="Generate URL from product name"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
            {/* URL Preview */}
            <div className="text-sm text-gray-500 mt-2 truncate">
              Preview: <span className="text-blue-600">/products/{data.urlKey || 'product-url'}</span>
            </div>
            {errors.urlKey && <p className="mt-1 text-sm text-red-600">{errors.urlKey}</p>}
          </div>
          
          {/* Tax Category */}
          <div className="space-y-2">
            <div className="flex items-center mb-1">
              <label htmlFor="taxCategory" className="block text-sm font-medium text-gray-700">
                Tax Category <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="The tax category determines what tax rate applies to this product." />
              </div>
            </div>
            <div className="relative">
              <select
                id="taxCategory"
                name="taxCategory"
                value={data.taxCategory || ''}
                onChange={handleChange}
                className="block w-full py-3 px-4 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200 pr-10 appearance-none"
              >
                {TAX_CATEGORIES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.taxCategory && <p className="mt-1 text-sm text-red-600">{errors.taxCategory}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}