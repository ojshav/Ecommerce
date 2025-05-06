import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { Popover } from '@headlessui/react';

// Define the ProductData type here since there are issues with importing it
interface ProductData {
  price: string;
  cost: string;
  specialPrice: string;
  specialPriceFrom: string;
  specialPriceTo: string;
}

type PricingProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
  isReadOnly: boolean;
};

const STANDARD_DISCOUNTS = [5, 10, 15, 20, 25, 30];

const Pricing: React.FC<PricingProps> = ({ data, updateData, errors, isReadOnly }) => {
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);

  // Calculate discount percentage when price or special price changes
  useEffect(() => {
    if (data.price && data.specialPrice) {
      const price = parseFloat(data.price);
      const specialPrice = parseFloat(data.specialPrice);
      if (price > 0 && specialPrice < price) {
        const percentage = ((price - specialPrice) / price) * 100;
        setDiscountPercentage(Math.round(percentage));
      } else {
        setDiscountPercentage(null);
      }
    } else {
      setDiscountPercentage(null);
    }
  }, [data.price, data.specialPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleDiscountClick = (percentage: number) => {
    if (data.price) {
      const price = parseFloat(data.price);
      const discountedPrice = (price * (100 - percentage) / 100).toFixed(2);
      updateData({ specialPrice: discountedPrice });
      setDiscountPercentage(percentage);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-4 mb-6">Price</h2>
      
      {/* Price Fields */}
      <div className="space-y-6">
        {/* Regular Price */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`pl-8 block w-full py-3 text-base shadow-sm rounded-md ${
                errors.price
                  ? 'border-2 border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                  : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
              }`}
              readOnly={isReadOnly}
            />
            {errors.price && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        {/* Cost */}
        <div className="space-y-2">
          <div className="flex items-center mb-1">
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
              Cost Price
            </label>
            <Popover className="relative ml-2">
              <Popover.Button className="focus:outline-none">
                <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
                Used for calculating margins. Not shown to customers.
              </Popover.Panel>
            </Popover>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">$</span>
            </div>
            <input
              type="number"
              id="cost"
              name="cost"
              value={data.cost}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="pl-8 block w-full py-3 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
              readOnly={isReadOnly}
            />
          </div>
        </div>

        {/* Discount Buttons */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Discount
          </label>
          <div className="flex flex-wrap gap-3">
            {STANDARD_DISCOUNTS.map((discount) => (
              <button
                key={discount}
                type="button"
                onClick={() => handleDiscountClick(discount)}
                className={`px-4 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                  discountPercentage === discount
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={isReadOnly}
              >
                {discount}% OFF
              </button>
            ))}
          </div>
        </div>

        {/* Special Price */}
        <div className="space-y-2">
          <label htmlFor="specialPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Special Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">$</span>
            </div>
            <input
              type="number"
              id="specialPrice"
              name="specialPrice"
              value={data.specialPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="pl-8 block w-full py-3 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
              readOnly={isReadOnly}
            />
          </div>
          {discountPercentage && (
            <p className="mt-2 text-sm font-medium text-green-600">
              You're giving a {discountPercentage}% discount!
            </p>
          )}
        </div>

        {/* Special Price Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Special Price From */}
          <div className="space-y-2">
            <label htmlFor="specialPriceFrom" className="block text-sm font-medium text-gray-700 mb-1">
              Special Price From
            </label>
            <div className="relative">
              <input
                type="date"
                id="specialPriceFrom"
                name="specialPriceFrom"
                value={data.specialPriceFrom}
                onChange={handleChange}
                className="block w-full py-3 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200 pr-10"
                readOnly={isReadOnly}
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => {
                  const dateInput = document.getElementById('specialPriceFrom') as HTMLInputElement;
                  if (dateInput) dateInput.click();
                }}
              >
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Special Price To */}
          <div className="space-y-2">
            <label htmlFor="specialPriceTo" className="block text-sm font-medium text-gray-700 mb-1">
              Special Price To
            </label>
            <div className="relative">
              <input
                type="date"
                id="specialPriceTo"
                name="specialPriceTo"
                value={data.specialPriceTo}
                onChange={handleChange}
                className="block w-full py-3 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200 pr-10"
                readOnly={isReadOnly}
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => {
                  const dateInput = document.getElementById('specialPriceTo') as HTMLInputElement;
                  if (dateInput) dateInput.click();
                }}
              >
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 