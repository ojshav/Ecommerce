import React, { useState } from 'react';
import { ExclamationCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { ProductData } from '../AddProduct';

type PricingProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

const Pricing: React.FC<PricingProps> = ({ data, updateData, errors }) => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupPrice, setNewGroupPrice] = useState({ group: '', price: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleAddCustomerGroupPrice = () => {
    if (newGroupPrice.group && newGroupPrice.price) {
      const updatedGroupPrices = [...data.customerGroupPrices, { ...newGroupPrice }];
      updateData({ customerGroupPrices: updatedGroupPrices });
      setNewGroupPrice({ group: '', price: '' });
      setShowAddGroup(false);
    }
  };

  const handleRemoveCustomerGroupPrice = (index: number) => {
    const updatedGroupPrices = [...data.customerGroupPrices];
    updatedGroupPrices.splice(index, 1);
    updateData({ customerGroupPrices: updatedGroupPrices });
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
              type="text"
              id="price"
              name="price"
              value={data.price}
              onChange={handleChange}
              className={`pl-7 block w-full shadow-sm sm:text-sm rounded-md ${
                errors.price
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              }`}
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
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
            Cost
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              id="cost"
              name="cost"
              value={data.cost}
              onChange={handleChange}
              className="pl-7 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
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
              type="text"
              id="specialPrice"
              name="specialPrice"
              value={data.specialPrice}
              onChange={handleChange}
              className="pl-7 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Special Price Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Special Price From */}
          <div className="space-y-1">
            <label htmlFor="specialPriceFrom" className="block text-sm font-medium text-gray-700">
              Special Price From
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="specialPriceFrom"
                name="specialPriceFrom"
                value={data.specialPriceFrom}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Special Price To */}
          <div className="space-y-1">
            <label htmlFor="specialPriceTo" className="block text-sm font-medium text-gray-700">
              Special Price To
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="specialPriceTo"
                name="specialPriceTo"
                value={data.specialPriceTo}
                onChange={handleChange}
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Group Price */}
      <div className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-gray-900">Customer Group Price</h3>
          <button
            type="button"
            onClick={() => setShowAddGroup(true)}
            className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add New
          </button>
        </div>

        {/* Customer Groups Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Group
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.customerGroupPrices.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No customer group prices defined
                  </td>
                </tr>
              ) : (
                data.customerGroupPrices.map((group, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {group.group}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${group.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomerGroupPrice(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {showAddGroup && (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={newGroupPrice.group}
                      onChange={(e) => setNewGroupPrice({ ...newGroupPrice, group: e.target.value })}
                      className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a group</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Retail">Retail</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        value={newGroupPrice.price}
                        onChange={(e) => setNewGroupPrice({ ...newGroupPrice, price: e.target.value })}
                        className="pl-7 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={handleAddCustomerGroupPrice}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddGroup(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Special pricing for customers belonging to a specific group.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 