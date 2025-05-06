import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon, ArrowPathIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Mock product data type
type ProductData = {
  name: Record<string, string>;
  sku: string;
  productNumber: string;
  urlKey: string;
  taxCategory: string;
  metaTitle: Record<string, string>;
  metaDescription: Record<string, string>;
  metaKeywords: string;
  category: string;
  subCategory: string;
};

type BasicInfoProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

// Available languages
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' }
];

// Tax categories
const TAX_CATEGORIES = [
  { value: '', label: 'Select' },
  { value: 'standard', label: 'Standard Rate' },
  { value: 'reduced', label: 'Reduced Rate' },
  { value: 'none', label: 'None' }
];

// Main categories
const MAIN_CATEGORIES = [
  { id: 'clothing', name: 'Clothing & Fashion' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home & Decor' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Outdoors' },
  { id: 'books', name: 'Books & Stationery' }
];

// Sub-categories mapping
const SUB_CATEGORIES: Record<string, Array<{ id: string; name: string }>> = {
  clothing: [
    { id: 'mens', name: "Men's Clothing" },
    { id: 'womens', name: "Women's Clothing" },
    { id: 'kids', name: "Kid's Clothing" },
    { id: 'accessories', name: 'Fashion Accessories' }
  ],
  electronics: [
    { id: 'laptops', name: 'Laptops & Computers' },
    { id: 'phones', name: 'Mobile Phones' },
    { id: 'tablets', name: 'Tablets' },
    { id: 'accessories', name: 'Electronics Accessories' }
  ],
  home: [
    { id: 'furniture', name: 'Furniture' },
    { id: 'decor', name: 'Home Decor' },
    { id: 'kitchen', name: 'Kitchen & Dining' },
    { id: 'bath', name: 'Bath & Bedding' }
  ],
  beauty: [
    { id: 'skincare', name: 'Skincare' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'fragrances', name: 'Fragrances' },
    { id: 'haircare', name: 'Hair Care' }
  ],
  sports: [
    { id: 'fitness', name: 'Fitness Equipment' },
    { id: 'outdoor', name: 'Outdoor Sports' },
    { id: 'team', name: 'Team Sports' },
    { id: 'accessories', name: 'Sports Accessories' }
  ],
  books: [
    { id: 'fiction', name: 'Fiction Books' },
    { id: 'nonfiction', name: 'Non-Fiction Books' },
    { id: 'stationery', name: 'Stationery' },
    { id: 'magazines', name: 'Magazines' }
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

type TranslatableFields = 'name' | 'metaTitle' | 'metaDescription';

export default function BasicInfo({ data, updateData, errors }: BasicInfoProps) {
  const [activeLanguage, setActiveLanguage] = useState('en');
  
  // Initialize empty language fields if they don't exist
  useEffect(() => {
    const ensureLanguageFields = () => {
      const fields: TranslatableFields[] = ['name', 'metaTitle', 'metaDescription'];
      const updatedData = {...data};
      let hasChanges = false;
      
      fields.forEach(field => {
        if (!updatedData[field]) {
          updatedData[field] = {};
          hasChanges = true;
        }
        
        LANGUAGES.forEach(lang => {
          if (!updatedData[field][lang.code]) {
            updatedData[field][lang.code] = '';
            hasChanges = true;
          }
        });
      });
      
      if (hasChanges) {
        updateData(updatedData);
      }
    };
    
    ensureLanguageFields();
  }, []);
  
  const generateUrlKey = () => {
    const name = data.name?.[activeLanguage] || '';
    const urlKey = name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    updateData({ urlKey });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };
  
  const handleLanguageChange = (field: TranslatableFields, value: string) => {
    updateData({
      [field]: {
        ...data[field],
        [activeLanguage]: value
      }
    });
    
    // Auto-generate URL key when product name changes in the primary language (English)
    if (field === 'name' && activeLanguage === 'en') {
      const urlKey = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      updateData({ urlKey });
    }
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Product Information</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-medium text-gray-900">General</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Category Selection */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Main Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={data.category || ''}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {MAIN_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {data.category && (
              <div className="space-y-1">
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  value={data.subCategory || ''}
                  onChange={handleChange}
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Sub Category</option>
                  {SUB_CATEGORIES[data.category]?.map(subCategory => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Product Name - with language tabs */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              
              <div className="flex space-x-1 text-xs">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setActiveLanguage(lang.code)}
                    className={`px-2 py-1 rounded ${
                      activeLanguage === lang.code
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-1 relative">
              <input
                type="text"
                id={`name-${activeLanguage}`}
                value={data.name?.[activeLanguage] || ''}
                onChange={(e) => handleLanguageChange('name', e.target.value)}
                className={`block w-full shadow-sm sm:text-sm rounded-md ${
                  errors.name 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
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
          <div className="space-y-1">
            <div className="flex items-center">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                SKU <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="A unique identifier used to track inventory and manage your products." />
              </div>
            </div>
            <div className="mt-1 relative">
              <input
                type="text"
                id="sku"
                name="sku"
                value={data.sku || ''}
                onChange={handleChange}
                className={`block w-full shadow-sm sm:text-sm rounded-md ${
                  errors.sku 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.sku && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
          </div>
          
          {/* Product Number */}
          <div className="space-y-1">
            <div className="flex items-center">
              <label htmlFor="productNumber" className="block text-sm font-medium text-gray-700">
                Product Number
              </label>
              <div className="ml-2">
                <Tooltip content="Optional internal reference number for your product." />
              </div>
            </div>
            <input
              type="text"
              id="productNumber"
              name="productNumber"
              value={data.productNumber || ''}
              onChange={handleChange}
              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* URL Key - with regenerate button and preview */}
          <div className="space-y-1">
            <div className="flex items-center">
              <label htmlFor="urlKey" className="block text-sm font-medium text-gray-700">
                URL Key <span className="text-red-500">*</span>
              </label>
              <div className="ml-2">
                <Tooltip content="The URL-friendly version of your product name that appears in the browser address bar." />
              </div>
            </div>
            <div className="mt-1 relative flex">
              <input
                type="text"
                id="urlKey"
                name="urlKey"
                value={data.urlKey || ''}
                onChange={handleChange}
                className="flex-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={generateUrlKey}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowPathIcon className="h-4 w-4" />
              </button>
            </div>
            {/* URL Preview */}
            <div className="text-sm text-gray-500 mt-1 truncate">
              Preview: <span className="text-blue-600">/products/{data.urlKey || 'product-url'}</span>
            </div>
          </div>
          
          {/* Tax Category */}
          <div className="space-y-1">
            <div className="flex items-center">
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
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10 appearance-none"
              >
                {TAX_CATEGORIES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO Fields */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-medium text-gray-900">SEO Information</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600 italic mb-4">
            Optimize your product for search engines to improve visibility.
          </p>
          
          {/* Meta Title - with language tabs */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <div className="ml-2">
                  <Tooltip content="The title that appears in search engine results. If left blank, the product name will be used." />
                </div>
              </div>
              
              <div className="flex space-x-1 text-xs">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setActiveLanguage(lang.code)}
                    className={`px-2 py-1 rounded ${
                      activeLanguage === lang.code
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-1">
              <input
                type="text"
                id={`metaTitle-${activeLanguage}`}
                value={data.metaTitle?.[activeLanguage] || ''}
                onChange={(e) => handleLanguageChange('metaTitle', e.target.value)}
                placeholder={data.name?.[activeLanguage] || 'Title displayed in search results'}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Recommended length: 50-60 characters
                </p>
                <p className={`text-xs ${
                  (data.metaTitle?.[activeLanguage]?.length || 0) > 60 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {data.metaTitle?.[activeLanguage]?.length || 0}/60
                </p>
              </div>
            </div>
          </div>
          
          {/* Meta Description - with language tabs */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <div className="ml-2">
                  <Tooltip content="A brief summary of the product shown in search engine results." />
                </div>
              </div>
              
              <div className="flex space-x-1 text-xs">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setActiveLanguage(lang.code)}
                    className={`px-2 py-1 rounded ${
                      activeLanguage === lang.code
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-1">
              <textarea
                id={`metaDescription-${activeLanguage}`}
                rows={3}
                value={data.metaDescription?.[activeLanguage] || ''}
                onChange={(e) => handleLanguageChange('metaDescription', e.target.value)}
                placeholder="Brief summary of the product for search engines"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Recommended length: 150-160 characters
                </p>
                <p className={`text-xs ${
                  (data.metaDescription?.[activeLanguage]?.length || 0) > 160 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {data.metaDescription?.[activeLanguage]?.length || 0}/160
                </p>
              </div>
            </div>
          </div>
          
          {/* Meta Keywords */}
          <div className="space-y-1">
            <div className="flex items-center">
              <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
                Meta Keywords
              </label>
              <div className="ml-2">
                <Tooltip content="Comma-separated keywords relevant to the product. Limited influence on SEO but may be used by some search engines." />
              </div>
            </div>
            <div className="mt-1">
              <input
                type="text"
                id="metaKeywords"
                name="metaKeywords"
                value={data.metaKeywords || ''}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Product, Category, Brand, etc."
              />
              <p className="mt-1 text-xs text-gray-500">
                Comma separated keywords relevant to the product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}