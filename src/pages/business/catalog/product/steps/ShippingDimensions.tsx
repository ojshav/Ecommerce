import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';

type ShippingDimensionsProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

const ShippingDimensions: React.FC<ShippingDimensionsProps> = ({ data, updateData, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers and decimal points
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      updateData({ [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Shipping</h2>
      
      <div className="space-y-6">
        {/* Length */}
        <div className="space-y-1">
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            Length
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="length"
              name="length"
              value={data.length}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.length
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.length && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.length && <p className="mt-1 text-sm text-red-600">{errors.length}</p>}
        </div>
        
        {/* Width */}
        <div className="space-y-1">
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">
            Width
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="width"
              name="width"
              value={data.width}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.width
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.width && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.width && <p className="mt-1 text-sm text-red-600">{errors.width}</p>}
        </div>
        
        {/* Height */}
        <div className="space-y-1">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="height"
              name="height"
              value={data.height}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.height
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.height && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
        </div>
        
        {/* Weight */}
        <div className="space-y-1">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="weight"
              name="weight"
              value={data.weight}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full shadow-sm sm:text-sm rounded-md ${
                errors.weight
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
            />
            {errors.weight && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
          <p className="text-xs text-gray-500">Weight in kilograms</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              For accurate shipping rates, all dimensions should be in centimeters and weight in kilograms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDimensions; 