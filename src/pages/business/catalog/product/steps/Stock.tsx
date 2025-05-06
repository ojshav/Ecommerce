import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';

interface StockData {
  manageStock: boolean;
  stockQuantity: string;
  lowStockThreshold: string;
  pendingOrderedQty: number;
}

type StockProps = {
  data: StockData;
  updateData: (data: Partial<StockData>) => void;
  errors: Record<string, string>;
  isReadOnly: boolean;
};

const Stock: React.FC<StockProps> = ({ data, updateData, errors, isReadOnly }) => {
  const [stockStatus, setStockStatus] = useState<'in-stock' | 'low-stock' | 'out-of-stock'>('in-stock');

  // Calculate stock status
  useEffect(() => {
    if (!data.manageStock) {
      setStockStatus('in-stock');
      return;
    }

    const stockQty = parseInt(data.stockQuantity) || 0;
    const lowThreshold = parseInt(data.lowStockThreshold) || 0;

    if (stockQty <= 0) {
      setStockStatus('out-of-stock');
    } else if (stockQty <= lowThreshold) {
      setStockStatus('low-stock');
    } else {
      setStockStatus('in-stock');
    }
  }, [data.stockQuantity, data.lowStockThreshold, data.manageStock]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    updateData({ [name]: type === 'checkbox' ? checked : value });
  };

  const getStatusColor = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-4 mb-6">Stock Management</h2>
      
      {/* Manage Stock Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center">
          <span className="text-base font-medium text-gray-700">Manage Stock</span>
          <Popover className="relative ml-2">
            <Popover.Button className="focus:outline-none">
              <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </Popover.Button>
            <Popover.Panel className="absolute z-10 w-72 p-3 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
              Enable this to track inventory levels. When disabled, stock will be considered unlimited.
            </Popover.Panel>
          </Popover>
        </div>
        <div className="relative inline-block w-14 h-7 align-middle select-none">
          <input
            type="checkbox"
            name="manageStock"
            id="manageStock"
            checked={data.manageStock}
            onChange={handleChange}
            disabled={isReadOnly}
            className="absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
            style={{ 
              top: '0', 
              right: data.manageStock ? '0' : '7px',
              transition: 'right 0.3s ease-in-out',
              borderColor: data.manageStock ? '#4F46E5' : '#D1D5DB',
            }}
          />
          <label
            htmlFor="manageStock"
            className={`block h-7 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ${
              data.manageStock ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          ></label>
        </div>
      </div>

      {data.manageStock ? (
        <div className="space-y-6">
          {/* Stock Status */}
          <div className="flex items-center mb-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor()}`}>
              <span className={`w-3 h-3 rounded-full mr-2 ${
                stockStatus === 'in-stock' ? 'bg-green-400' :
                stockStatus === 'low-stock' ? 'bg-yellow-400' :
                'bg-red-400'
              }`}></span>
              {getStatusText()}
            </div>
          </div>

          {/* Stock Quantity */}
          <div className="space-y-2 mb-6">
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={data.stockQuantity}
                onChange={handleChange}
                min="0"
                className={`block w-full py-3 text-base shadow-sm rounded-md ${
                  errors.stockQuantity
                    ? 'border-2 border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 transition-all duration-200'
                    : 'border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200'
                }`}
                readOnly={isReadOnly}
              />
              {errors.stockQuantity && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
          </div>

          {/* Low Stock Threshold */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center mb-1">
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700">
                Low Stock Threshold
              </label>
              <Popover className="relative ml-2">
                <Popover.Button className="focus:outline-none">
                  <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-72 p-3 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
                  You'll receive a notification if stock drops below this value.
                </Popover.Panel>
              </Popover>
            </div>
            <div>
              <input
                type="number"
                id="lowStockThreshold"
                name="lowStockThreshold"
                value={data.lowStockThreshold}
                onChange={handleChange}
                min="0"
                className="block w-full py-3 text-base shadow-sm border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200"
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Pending Ordered Quantity */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-400"></div>
            <span className="text-base text-gray-700">
              Pending Ordered Qty: <strong>{data.pendingOrderedQty}</strong>
            </span>
            {data.pendingOrderedQty > 0 && parseInt(data.stockQuantity) > 0 && 
             data.pendingOrderedQty >= parseInt(data.stockQuantity) * 0.8 && (
              <span className="text-sm font-medium text-yellow-600 ml-2 bg-yellow-50 px-2 py-1 rounded">
                High pending orders
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-400"></div>
          <span className="text-base font-medium text-green-700">Unlimited Stock</span>
        </div>
      )}
    </div>
  );
};

export default Stock; 