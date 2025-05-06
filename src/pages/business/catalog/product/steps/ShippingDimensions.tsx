import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';
import { ProductData } from '../AddProduct';

type Unit = 'cm' | 'inches' | 'kg' | 'lbs';

interface ShippingDimensionsData {
  length: string;
  width: string;
  height: string;
  weight: string;
  dimensionUnit: Unit;
  weightUnit: Unit;
}

type ShippingDimensionsProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
  isReadOnly: boolean;
};

const ShippingDimensions: React.FC<ShippingDimensionsProps> = ({ data, updateData, errors, isReadOnly }) => {
  const [volumetricWeight, setVolumetricWeight] = useState<string>('');
  const [dimensionUnit, setDimensionUnit] = useState<Unit>('cm');
  const [weightUnit, setWeightUnit] = useState<Unit>('kg');

  // Calculate volumetric weight when dimensions change
  useEffect(() => {
    const length = parseFloat(data.length) || 0;
    const width = parseFloat(data.width) || 0;
    const height = parseFloat(data.height) || 0;

    if (length > 0 && width > 0 && height > 0) {
      // Convert to cm if in inches
      const multiplier = dimensionUnit === 'inches' ? 2.54 : 1;
      const volWeight = (length * width * height * multiplier) / 5000; // Standard volumetric divisor
      setVolumetricWeight(volWeight.toFixed(2));
    } else {
      setVolumetricWeight('');
    }
  }, [data.length, data.width, data.height, dimensionUnit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers and decimal points
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      updateData({ [name]: value });
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'dimension' | 'weight') => {
    const newUnit = e.target.value as Unit;
    if (type === 'dimension') {
      setDimensionUnit(newUnit);
    } else {
      setWeightUnit(newUnit);
    }
  };

  const getTooltipContent = (field: string) => {
    switch (field) {
      case 'dimensions':
        return 'Length, Width, and Height are optional but help with packaging and carrier rates.';
      case 'weight':
        return 'Weight is required to calculate shipping charges correctly.';
      case 'volumetric':
        return 'Volumetric weight is calculated based on the package dimensions. Carriers may use the greater of actual or volumetric weight.';
      default:
        return '';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-4 mb-6">Shipping</h2>
      
      <div className="space-y-6">
        {/* Dimensions Unit Selection */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700">Dimensions Unit</span>
            <Popover className="relative ml-2">
              <Popover.Button className="focus:outline-none">
                <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
                {getTooltipContent('dimensions')}
              </Popover.Panel>
            </Popover>
          </div>
          <select
            value={dimensionUnit}
            onChange={(e) => handleUnitChange(e, 'dimension')}
            className="block w-32 py-2 px-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 shadow-sm text-base transition-all duration-200"
            disabled={isReadOnly}
          >
            <option value="cm">cm</option>
            <option value="inches">inches</option>
          </select>
        </div>

        {/* Length */}
        <div className="space-y-2 mb-6">
          <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
            Length
          </label>
          <div className="relative">
            <input
              type="text"
              id="length"
              name="length"
              value={data.length}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                errors.length
                  ? 'border-2 border-red-300 pr-12 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                  : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
              }`}
              readOnly={isReadOnly}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">{dimensionUnit}</span>
            </div>
            {errors.length && (
              <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.length && <p className="mt-1 text-sm text-red-600">{errors.length}</p>}
        </div>
        
        {/* Width */}
        <div className="space-y-2 mb-6">
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <div className="relative">
            <input
              type="text"
              id="width"
              name="width"
              value={data.width}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                errors.width
                  ? 'border-2 border-red-300 pr-12 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                  : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
              }`}
              readOnly={isReadOnly}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">{dimensionUnit}</span>
            </div>
            {errors.width && (
              <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.width && <p className="mt-1 text-sm text-red-600">{errors.width}</p>}
        </div>
        
        {/* Height */}
        <div className="space-y-2 mb-6">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <div className="relative">
            <input
              type="text"
              id="height"
              name="height"
              value={data.height}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                errors.height
                  ? 'border-2 border-red-300 pr-12 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                  : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
              }`}
              readOnly={isReadOnly}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">{dimensionUnit}</span>
            </div>
            {errors.height && (
              <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
        </div>

        {/* Weight Unit Selection */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700">Weight Unit</span>
            <Popover className="relative ml-2">
              <Popover.Button className="focus:outline-none">
                <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
                {getTooltipContent('weight')}
              </Popover.Panel>
            </Popover>
          </div>
          <select
            value={weightUnit}
            onChange={(e) => handleUnitChange(e, 'weight')}
            className="block w-32 py-2 px-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 shadow-sm text-base transition-all duration-200"
            disabled={isReadOnly}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
        
        {/* Weight */}
        <div className="space-y-2 mb-6">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="weight"
              name="weight"
              value={data.weight}
              onChange={handleChange}
              placeholder="0.00"
              className={`block w-full py-3 px-4 text-base shadow-sm rounded-md ${
                errors.weight
                  ? 'border-2 border-red-300 pr-12 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                  : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
              }`}
              readOnly={isReadOnly}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">{weightUnit}</span>
            </div>
            {errors.weight && (
              <div className="absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
        </div>

        {/* Volumetric Weight */}
        {volumetricWeight && (
          <div className="space-y-2 mb-6">
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Volumetric Weight
              </label>
              <Popover className="relative ml-2">
                <Popover.Button className="focus:outline-none">
                  <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-64 p-3 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
                  {getTooltipContent('volumetric')}
                </Popover.Panel>
              </Popover>
            </div>
            <div className="relative">
              <input
                type="text"
                value={volumetricWeight}
                readOnly
                className="block w-full py-3 px-4 text-base shadow-sm border-2 border-gray-200 rounded-md bg-gray-50"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-base">kg</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              These values are used to calculate shipping rates and packaging. All dimensions should be in {dimensionUnit} and weight in {weightUnit}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDimensions; 