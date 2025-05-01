import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ProductData } from '../AddProduct';

type RelatedProductsProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

// Mock products to choose from
const AVAILABLE_PRODUCTS = [
  {
    id: 101,
    name: "Louis Philippe Men's Solid Regular Fit T-Shirt",
    image: 'https://placehold.co/80x80',
    sku: 'SKU001',
    price: 29.99
  },
  {
    id: 102,
    name: "Nike Men's Running Shoes",
    image: 'https://placehold.co/80x80',
    sku: 'SKU002',
    price: 89.99
  },
  {
    id: 103,
    name: "Women's Casual Dress",
    image: 'https://placehold.co/80x80',
    sku: 'SKU003',
    price: 49.99
  },
  {
    id: 104,
    name: "Kids Backpack",
    image: 'https://placehold.co/80x80',
    sku: 'SKU004',
    price: 24.99
  }
];

const RelatedProducts: React.FC<RelatedProductsProps> = ({ data, updateData, errors }) => {
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(
    data.relatedProducts.map(product => product.id)
  );

  // Search function for filtering products
  const filteredProducts = searchTerm.trim() === '' 
    ? AVAILABLE_PRODUCTS 
    : AVAILABLE_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Handle adding a product to related products
  const handleAddRelatedProduct = (product: typeof AVAILABLE_PRODUCTS[0]) => {
    if (!selectedProductIds.includes(product.id)) {
      const updatedRelatedProducts = [...data.relatedProducts, product];
      updateData({ relatedProducts: updatedRelatedProducts });
      setSelectedProductIds([...selectedProductIds, product.id]);
    }
  };
  
  // Handle removing a product from related products
  const handleRemoveRelatedProduct = (productId: number) => {
    const updatedRelatedProducts = data.relatedProducts.filter(
      product => product.id !== productId
    );
    updateData({ relatedProducts: updatedRelatedProducts });
    setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Related Products</h2>
        <button
          type="button"
          onClick={() => setShowProductSelector(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>
      
      <p className="text-sm text-gray-600">
        In addition to the product the customer is viewing, they are presented with related products.
      </p>
      
      {/* Selected Related Products */}
      <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
        {data.relatedProducts.length === 0 ? (
          <div className="text-center p-8">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="mt-4 text-gray-500">No related products added yet.</p>
            <button
              type="button"
              onClick={() => setShowProductSelector(true)}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              Add related products
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.relatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-sm object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleRemoveRelatedProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Selector Modal */}
      {showProductSelector && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add Related Products
                    </h3>
                    
                    {/* Search Input */}
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    {/* Product List */}
                    <div className="mt-4 max-h-60 overflow-y-auto">
                      <ul className="divide-y divide-gray-200">
                        {filteredProducts.map((product) => (
                          <li
                            key={product.id}
                            className="py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleAddRelatedProduct(product)}
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-sm object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {product.sku} | ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddRelatedProduct(product);
                              }}
                              className={`inline-flex items-center p-1 border border-transparent rounded-full ${
                                selectedProductIds.includes(product.id)
                                  ? 'text-green-600 bg-green-100'
                                  : 'text-primary-600 hover:bg-primary-100'
                              }`}
                              disabled={selectedProductIds.includes(product.id)}
                            >
                              {selectedProductIds.includes(product.id) ? (
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <PlusIcon className="h-5 w-5" />
                              )}
                            </button>
                          </li>
                        ))}
                        {filteredProducts.length === 0 && (
                          <li className="py-4 text-center text-gray-500">
                            No products found matching your search.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowProductSelector(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={() => setShowProductSelector(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts; 