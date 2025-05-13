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
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-4 mb-6">Product Description</h2>
      
      <div className="space-y-6">
        {/* Short Description */}
        <div className="bg-white rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Short Description</h3>
          <div className="space-y-2">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs pl-1">English</span>
            </label>
            <div className="border-2 border-gray-200 rounded-md overflow-hidden">
              <RichTextToolbar />
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                value={data.shortDescription}
                onChange={handleChange}
                className="block w-full text-base border-0 focus:ring-0 focus:outline-none p-3"
                placeholder="Enter a brief description (1-2 lines) that will appear in product listings"
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-2">
              {countWords(data.shortDescription)} words
            </div>
            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>
            )}
          </div>
        </div>

        {/* Full Description */}
        <div className="bg-white rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Full Description</h3>
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Full Description <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs pl-1">English</span>
            </label>
            <div className="border-2 border-gray-200 rounded-md overflow-hidden">
              <RichTextToolbar />
              <textarea
                id="description"
                name="description"
                rows={8}
                value={data.description}
                onChange={handleChange}
                className="block w-full text-base border-0 focus:ring-0 focus:outline-none p-3"
                placeholder="Enter detailed product description with formatting options"
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-2">
              {countWords(data.description)} words
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Meta Information */}
        <div className="bg-white rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Information</h3>
          
          {/* Meta Keywords */}
          <div className="space-y-2">
            <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Keywords
              <span className="text-gray-500 text-xs pl-1">English</span>
            </label>
            <div className="relative">
              <textarea
                id="metaKeywords"
                name="metaKeywords"
                rows={2}
                value={data.metaKeywords}
                onChange={handleChange}
                placeholder="Enter keywords separated by commas"
                className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                  errors.metaKeywords
                    ? 'border-2 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                    : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
                }`}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Separate keywords with commas
            </div>
            {errors.metaKeywords && <p className="mt-1 text-sm text-red-600">{errors.metaKeywords}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description; 