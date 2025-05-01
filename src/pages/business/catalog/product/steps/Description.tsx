import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';

type DescriptionProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

const Description: React.FC<DescriptionProps> = ({ data, updateData, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="border border-gray-300 rounded-md">
            <div className="flex items-center border-b border-gray-300 bg-gray-50 p-2">
              <button className="p-1 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm2 3a1 1 0 00-1 1v1a1 1 0 001 1h4a1 1 0 001-1V9a1 1 0 00-1-1H7z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-1 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-1 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="p-1 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={data.description}
              onChange={handleChange}
              className="block w-full sm:text-sm border-0 focus:ring-0"
            />
          </div>
          <div className="text-right text-xs text-gray-500">0 words</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Meta Description</h2>
        <div className="mb-4">
          <a href="http://kea.mywire.org:5500/" className="text-primary-600 hover:text-primary-800 text-sm" target="_blank" rel="noopener noreferrer">
            http://kea.mywire.org:5500/
          </a>
        </div>
        
        {/* Meta Title */}
        <div className="space-y-1 mb-6">
          <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
            Meta Title <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={data.metaTitle}
              onChange={handleChange}
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.metaTitle
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.metaTitle && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.metaTitle && <p className="mt-1 text-sm text-red-600">{errors.metaTitle}</p>}
        </div>
        
        {/* Meta Keywords */}
        <div className="space-y-1 mb-6">
          <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
            Meta Keywords <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              id="metaKeywords"
              name="metaKeywords"
              rows={3}
              value={data.metaKeywords}
              onChange={handleChange}
              placeholder="Enter keywords separated by commas"
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.metaKeywords
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.metaKeywords && (
              <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.metaKeywords && <p className="mt-1 text-sm text-red-600">{errors.metaKeywords}</p>}
        </div>
        
        {/* Meta Description */}
        <div className="space-y-1">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
            Meta Description <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows={3}
              value={data.metaDescription}
              onChange={handleChange}
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.metaDescription
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.metaDescription && (
              <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.metaDescription && <p className="mt-1 text-sm text-red-600">{errors.metaDescription}</p>}
        </div>
      </div>
    </div>
  );
};

export default Description; 