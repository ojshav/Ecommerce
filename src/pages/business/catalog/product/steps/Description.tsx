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

  // Function to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Function to generate slug from text
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Rich text editor toolbar buttons
  const RichTextToolbar = () => (
    <div className="flex items-center space-x-1 px-3 py-2 border-b border-gray-300 bg-gray-50">
      <button className="p-1 rounded hover:bg-gray-200" title="Bold">
        <span className="font-bold">B</span>
      </button>
      <button className="p-1 rounded hover:bg-gray-200" title="Italic">
        <span className="italic">I</span>
      </button>
      <button className="p-1 rounded hover:bg-gray-200" title="Underline">
        <span className="underline">U</span>
      </button>
      <div className="h-4 border-l border-gray-300 mx-1"></div>
      <button className="p-1 rounded hover:bg-gray-200" title="Bullet List">
        <span>•</span>
      </button>
      <button className="p-1 rounded hover:bg-gray-200" title="Numbered List">
        <span>1.</span>
      </button>
      <div className="h-4 border-l border-gray-300 mx-1"></div>
      <button className="p-1 rounded hover:bg-gray-200" title="Heading 2">
        <span className="font-bold">H2</span>
      </button>
      <button className="p-1 rounded hover:bg-gray-200" title="Heading 3">
        <span className="font-bold">H3</span>
      </button>
      <div className="h-4 border-l border-gray-300 mx-1"></div>
      <button className="p-1 rounded hover:bg-gray-200" title="Link">
        <span>🔗</span>
      </button>
      <button className="p-1 rounded hover:bg-gray-200" title="Image">
        <span>🖼️</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Short Description */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Short Description</h2>
        <div className="space-y-1">
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
            Short Description <span className="text-red-500">*</span>
            <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="border border-gray-300 rounded-md">
            <RichTextToolbar />
            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={3}
              value={data.shortDescription}
              onChange={handleChange}
              className="block w-full sm:text-sm border-0 focus:ring-0"
              placeholder="Enter a brief description (1-2 lines) that will appear in product listings"
            />
          </div>
          <div className="text-right text-xs text-gray-500">
            {countWords(data.shortDescription)} words
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Full Description</h2>
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Full Description <span className="text-red-500">*</span>
            <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="border border-gray-300 rounded-md">
            <RichTextToolbar />
            <textarea
              id="description"
              name="description"
              rows={8}
              value={data.description}
              onChange={handleChange}
              className="block w-full sm:text-sm border-0 focus:ring-0"
              placeholder="Enter detailed product description with formatting options"
            />
          </div>
          <div className="text-right text-xs text-gray-500">
            {countWords(data.description)} words
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Meta Information</h2>
        
        {/* URL Key / Slug */}
        <div className="space-y-1 mb-6">
          <label htmlFor="urlKey" className="block text-sm font-medium text-gray-700">
            URL Key / Slug <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="urlKey"
              name="urlKey"
              value={data.urlKey}
              onChange={(e) => {
                const slug = generateSlug(e.target.value);
                updateData({ urlKey: slug });
              }}
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.urlKey
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
              placeholder="product-name-with-hyphens"
            />
            {errors.urlKey && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.urlKey && <p className="mt-1 text-sm text-red-600">{errors.urlKey}</p>}
        </div>

        {/* Meta Title */}
        <div className="space-y-1 mb-6">
          <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
            Meta Title <span className="text-red-500">*</span>
            <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={data.metaTitle.en}
              onChange={handleChange}
              maxLength={60}
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.metaTitle
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
              placeholder="Enter meta title (max 60 characters)"
            />
            {errors.metaTitle && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{data.metaTitle.en.length}/60 characters</span>
            <button 
              type="button"
              className="text-primary-600 hover:text-primary-800"
              onClick={() => {
                // Open preview in new tab
                window.open(`https://www.google.com/search?q=${encodeURIComponent(data.metaTitle.en)}`, '_blank');
              }}
            >
              Preview in Google
            </button>
          </div>
          {errors.metaTitle && <p className="mt-1 text-sm text-red-600">{errors.metaTitle}</p>}
        </div>

        {/* Meta Description */}
        <div className="space-y-1 mb-6">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
            Meta Description <span className="text-red-500">*</span>
            <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows={3}
              value={data.metaDescription.en}
              onChange={handleChange}
              maxLength={155}
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.metaDescription
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
              placeholder="Enter meta description (max 155 characters)"
            />
            {errors.metaDescription && (
              <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{data.metaDescription.en.length}/155 characters</span>
            <button 
              type="button"
              className="text-primary-600 hover:text-primary-800"
              onClick={() => {
                // Open preview in new tab
                window.open(`https://www.google.com/search?q=${encodeURIComponent(data.metaDescription.en)}`, '_blank');
              }}
            >
              Preview in Google
            </button>
          </div>
          {errors.metaDescription && <p className="mt-1 text-sm text-red-600">{errors.metaDescription}</p>}
        </div>

        {/* Meta Keywords */}
        <div className="space-y-1">
          <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
            Meta Keywords
            <span className="text-gray-500 text-xs pl-1">English</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              id="metaKeywords"
              name="metaKeywords"
              rows={2}
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
          <div className="text-xs text-gray-500 mt-1">
            Separate keywords with commas
          </div>
          {errors.metaKeywords && <p className="mt-1 text-sm text-red-600">{errors.metaKeywords}</p>}
        </div>
      </div>
    </div>
  );
};

export default Description; 