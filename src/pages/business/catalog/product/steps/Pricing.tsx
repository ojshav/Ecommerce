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
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Price</h2>
      
      {/* Price Fields */}
      <div className="grid grid-cols-1 gap-6">
        {/* Regular Price */}
        <div className="space-y-1">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`pl-7 block w-full shadow-sm sm:text-sm rounded-md ${
                errors.price
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
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
        <div className="space-y-1">
          <div className="flex items-center">
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
              Cost Price
            </label>
            <Popover className="relative">
              <Popover.Button className="ml-1">
                <InformationCircleIcon className="h-4 w-4 text-gray-400" />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg">
                Used for calculating margins. Not shown to customers.
              </Popover.Panel>
            </Popover>
          </div>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="cost"
              name="cost"
              value={data.cost}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="pl-7 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              readOnly={isReadOnly}
            />
          </div>
        </div>

        {/* Discount Buttons */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Quick Discount
          </label>
          <div className="flex flex-wrap gap-2">
            {STANDARD_DISCOUNTS.map((discount) => (
              <button
                key={discount}
                type="button"
                onClick={() => handleDiscountClick(discount)}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  discountPercentage === discount
                    ? 'bg-primary-600 text-white'
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
        <div className="space-y-1">
          <label htmlFor="specialPrice" className="block text-sm font-medium text-gray-700">
            Special Price
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="specialPrice"
              name="specialPrice"
              value={data.specialPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="pl-7 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              readOnly={isReadOnly}
            />
          </div>
          {discountPercentage && (
            <p className="mt-1 text-sm text-green-600">
              You're giving a {discountPercentage}% discount!
            </p>
          )}
        </div>

        {/* Special Price Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Special Price From */}
          <div className="space-y-1">
            <label htmlFor="specialPriceFrom" className="block text-sm font-medium text-gray-700">
              Special Price From
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                id="specialPriceFrom"
                name="specialPriceFrom"
                value={data.specialPriceFrom}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10"
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
          <div className="space-y-1">
            <label htmlFor="specialPriceTo" className="block text-sm font-medium text-gray-700">
              Special Price To
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                id="specialPriceTo"
                name="specialPriceTo"
                value={data.specialPriceTo}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-10"
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