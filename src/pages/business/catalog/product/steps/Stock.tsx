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
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Stock Management</h2>
      
      {/* Manage Stock Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">Manage Stock</span>
          <Popover className="relative ml-2">
            <Popover.Button className="focus:outline-none">
              <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
            </Popover.Button>
            <Popover.Panel className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg">
              Enable this to track inventory levels. When disabled, stock will be considered unlimited.
            </Popover.Panel>
          </Popover>
        </div>
        <div className="relative inline-block w-12 mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="manageStock"
            id="manageStock"
            checked={data.manageStock}
            onChange={handleChange}
            disabled={isReadOnly}
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

      {data.manageStock ? (
        <div className="space-y-4">
          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              <span className={`w-2 h-2 rounded-full mr-1.5 ${
                stockStatus === 'in-stock' ? 'bg-green-400' :
                stockStatus === 'low-stock' ? 'bg-yellow-400' :
                'bg-red-400'
              }`}></span>
              {getStatusText()}
            </div>
          </div>

          {/* Stock Quantity */}
          <div className="space-y-1">
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative">
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={data.stockQuantity}
                onChange={handleChange}
                min="0"
                className={`block w-full shadow-sm sm:text-sm rounded-md ${
                  errors.stockQuantity
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
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
          <div className="space-y-1">
            <div className="flex items-center">
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700">
                Low Stock Threshold
              </label>
              <Popover className="relative ml-2">
                <Popover.Button className="focus:outline-none">
                  <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg">
                  You'll receive a notification if stock drops below this value.
                </Popover.Panel>
              </Popover>
            </div>
            <div className="mt-1">
              <input
                type="number"
                id="lowStockThreshold"
                name="lowStockThreshold"
                value={data.lowStockThreshold}
                onChange={handleChange}
                min="0"
                className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Pending Ordered Quantity */}
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-sm text-gray-700">
              Pending Ordered Qty: {data.pendingOrderedQty}
            </span>
            {data.pendingOrderedQty > 0 && parseInt(data.stockQuantity) > 0 && 
             data.pendingOrderedQty >= parseInt(data.stockQuantity) * 0.8 && (
              <span className="text-sm text-yellow-600">
                (High pending orders)
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-sm text-gray-700">Unlimited Stock</span>
        </div>
      )}
    </div>
  );
};

export default Stock; 