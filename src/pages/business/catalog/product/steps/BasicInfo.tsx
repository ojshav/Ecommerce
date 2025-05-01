import React, { useState } from 'react';
import { ExclamationCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';

type BasicInfoProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

// Mock categories for dropdowns
const TAX_CATEGORIES = [
  { value: '', label: 'Select' },
  { value: 'standard', label: 'Standard Rate' },
  { value: 'reduced', label: 'Reduced Rate' },
  { value: 'zero', label: 'Zero Rate' }
];

const COLORS = [
  { value: '', label: 'Select' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' }
];

const SIZES = [
  { value: '', label: 'Select' },
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' }
];

const BRANDS = [
  { value: '', label: 'Select' },
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'puma', label: 'Puma' },
  { value: 'reebok', label: 'Reebok' }
];

const BasicInfo: React.FC<BasicInfoProps> = ({ data, updateData, errors }) => {
  const [showSeo, setShowSeo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateData({ [name]: checked });
  };

  const handleURLKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert input to valid URL key (slug) format
    let value = e.target.value;
    value = value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    updateData({ urlKey: value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">Product Information</h2>
      
      {/* Basic Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base font-medium text-gray-900">General</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* SKU */}
          <div className="space-y-1">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="sku"
                name="sku"
                value={data.sku}
                onChange={handleChange}
                className={`block w-full shadow-sm sm:text-sm rounded-md ${
                  errors.sku 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
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
            <label htmlFor="productNumber" className="block text-sm font-medium text-gray-700">
              Product Number
            </label>
            <input
              type="text"
              id="productNumber"
              name="productNumber"
              value={data.productNumber}
              onChange={handleChange}
              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          {/* Product Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className={`block w-full shadow-sm sm:text-sm rounded-md ${
                  errors.name 
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
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
          
          {/* URL Key */}
          <div className="space-y-1">
            <label htmlFor="urlKey" className="block text-sm font-medium text-gray-700">
              URL Key <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                English
              </span>
              <input
                type="text"
                id="urlKey"
                name="urlKey"
                value={data.urlKey}
                onChange={handleURLKeyChange}
                className="flex-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-none rounded-r-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          {/* Tax Category */}
          <div className="space-y-1">
            <label htmlFor="taxCategory" className="block text-sm font-medium text-gray-700">
              Tax Category
            </label>
            <div className="relative">
              <select
                id="taxCategory"
                name="taxCategory"
                value={data.taxCategory}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10 appearance-none"
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
          
          {/* Color */}
          <div className="space-y-1">
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <div className="relative">
              <select
                id="color"
                name="color"
                value={data.color}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10 appearance-none"
              >
                {COLORS.map(option => (
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
          
          {/* Size */}
          <div className="space-y-1">
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <div className="relative">
              <select
                id="size"
                name="size"
                value={data.size}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10 appearance-none"
              >
                {SIZES.map(option => (
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
          
          {/* Brand */}
          <div className="space-y-1">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <div className="relative">
              <select
                id="brand"
                name="brand"
                value={data.brand}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10 appearance-none"
              >
                {BRANDS.map(option => (
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
          
          {/* Short Description */}
          <div className="space-y-1">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
              Short Description <span className="text-gray-500 text-xs pl-1">English</span>
            </label>
            <div className="border border-gray-300 rounded-md">
              <div className="flex items-center border-b border-gray-300 bg-gray-50 p-2">
                <button className="p-1 text-gray-700 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <button className="p-1 text-gray-700 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                value={data.shortDescription}
                onChange={handleChange}
                className="block w-full sm:text-sm border-0 focus:ring-0"
              />
            </div>
            <div className="text-right text-xs text-gray-500">0 words</div>
          </div>
        </div>
      </div>
      
      {/* SEO Fields - Collapsible */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <button 
          type="button" 
          onClick={() => setShowSeo(!showSeo)}
          className="w-full px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between text-left"
        >
          <h3 className="text-base font-medium text-gray-900">SEO Information</h3>
          {showSeo ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {showSeo && (
          <div className="p-6 space-y-5">
            <p className="text-sm text-gray-600 italic mb-4">
              Optimize your product for search engines to improve visibility.
            </p>
            
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={data.metaTitle}
                  onChange={handleChange}
                  placeholder="Title displayed in search results"
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended length: 50-60 characters
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <div className="mt-1">
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={3}
                  value={data.metaDescription}
                  onChange={handleChange}
                  placeholder="Brief summary of the product for search engines"
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended length: 150-160 characters
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
                Meta Keywords
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  value={data.metaKeywords}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Product, Category, Brand, etc."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Comma separated keywords relevant to the product
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo; 