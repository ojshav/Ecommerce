import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';

type SettingsProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

const Settings: React.FC<SettingsProps> = ({ data, updateData, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    updateData({ [name]: type === 'checkbox' ? checked : value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === '' || /^[0-9]+$/.test(value)) {
      updateData({ [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      
      {/* Toggle Switches */}
      <div className="space-y-4">
        {/* New */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">New</span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="isNew"
              id="isNew"
              checked={data.isNew}
              onChange={handleChange}
              className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
              style={{ 
                top: '0', 
                right: data.isNew ? '0' : '6px',
                transition: 'right 0.2s',
                borderColor: data.isNew ? '#4F46E5' : '#D1D5DB',
              }}
            />
            <label
              htmlFor="isNew"
              className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                data.isNew ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            ></label>
          </div>
        </div>
        
        {/* Featured */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Featured</span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={data.isFeatured}
              onChange={handleChange}
              className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
              style={{ 
                top: '0', 
                right: data.isFeatured ? '0' : '6px',
                transition: 'right 0.2s',
                borderColor: data.isFeatured ? '#4F46E5' : '#D1D5DB',
              }}
            />
            <label
              htmlFor="isFeatured"
              className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                data.isFeatured ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            ></label>
          </div>
        </div>
        
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status <span className="text-red-500">*</span></span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={data.status}
              onChange={handleChange}
              className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
              style={{ 
                top: '0', 
                right: data.status ? '0' : '6px',
                transition: 'right 0.2s',
                borderColor: data.status ? '#4F46E5' : '#D1D5DB',
              }}
            />
            <label
              htmlFor="status"
              className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                data.status ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            ></label>
          </div>
        </div>
        
        {/* Visible Individually */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Visible Individually <span className="text-red-500">*</span></span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="visibleIndividually"
              id="visibleIndividually"
              checked={data.visibleIndividually}
              onChange={handleChange}
              className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
              style={{ 
                top: '0', 
                right: data.visibleIndividually ? '0' : '6px',
                transition: 'right 0.2s',
                borderColor: data.visibleIndividually ? '#4F46E5' : '#D1D5DB',
              }}
            />
            <label
              htmlFor="visibleIndividually"
              className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                data.visibleIndividually ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            ></label>
          </div>
        </div>
        
        {/* Guest Checkout */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Guest Checkout <span className="text-red-500">*</span></span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="allowGuestCheckout"
              id="allowGuestCheckout"
              checked={data.allowGuestCheckout}
              onChange={handleChange}
              className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
              style={{ 
                top: '0', 
                right: data.allowGuestCheckout ? '0' : '6px',
                transition: 'right 0.2s',
                borderColor: data.allowGuestCheckout ? '#4F46E5' : '#D1D5DB',
              }}
            />
            <label
              htmlFor="allowGuestCheckout"
              className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                data.allowGuestCheckout ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            ></label>
          </div>
        </div>
      </div>
      
      {/* Inventories Section */}
      <div className="pt-6">
        <h3 className="text-md font-medium text-gray-900 mb-4">Inventories</h3>
        
        <div className="space-y-4">
          {/* Manage Stock */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Manage Stock</span>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="manageStock"
                id="manageStock"
                checked={data.manageStock}
                onChange={handleChange}
                className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
                style={{ 
                  top: '0', 
                  right: data.manageStock ? '0' : '6px',
                  transition: 'right 0.2s',
                  borderColor: data.manageStock ? '#4F46E5' : '#D1D5DB',
                }}
              />
              <label
                htmlFor="manageStock"
                className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                  data.manageStock ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              ></label>
            </div>
          </div>
          
          {/* Stock Quantity */}
          {data.manageStock && (
            <div className="space-y-1">
              <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                Default
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={data.stockQuantity}
                  onChange={handleNumberChange}
                  className={`block w-full shadow-sm sm:text-sm rounded-md ${
                    errors.stockQuantity
                      ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                />
                {errors.stockQuantity && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
            </div>
          )}
          
          {/* Pending Ordered Quantity */}
          {data.manageStock && (
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-sm text-gray-700">Pending Ordered Qty: 0</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 