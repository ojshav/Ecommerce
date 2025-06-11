import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  FunnelIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Product {
  product_id: number;
  product_name: string;
  sku: string;
  category_id: number;
  brand_id: number;
  cost_price: number;
  selling_price: number;
  special_price: number | null;
  special_start: string | null;
  special_end: string | null;
  active_flag: boolean;
  approval_status: 'pending' | 'approved' | 'rejected';
  approved_at: string | null;
  approved_by: number | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  parent_product_id: number | null;
  stock_qty: number;
  low_stock_threshold: number;
  category?: {
    category_id: number;
    name: string;
  };
  brand?: {
    brand_id: number;
    name: string;
  };
  media?: Array<{
    media_id: number;
    url: string;
    type: 'IMAGE' | 'VIDEO';
  }>;
  variants?: Array<{
    product_id: number;
    sku: string;
    selling_price: number;
    stock_qty: number;
    attributes: Array<{
      name: string;
      value: string;
    }>;
    media?: Array<{
      media_id: number;
      media_url: string;
      media_type: string;
      is_primary: boolean;
    }>;
  }>;
}

// Status badge component
const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => {
  const bgColor = active ? 'bg-green-100' : 'bg-gray-100';
  const textColor = active ? 'text-green-800' : 'text-gray-800';
  const status = active ? 'Active' : 'Inactive';
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

// Approval Status Badge component
const ApprovalStatusBadge: React.FC<{ status: 'pending' | 'approved' | 'rejected', reason?: string | null }> = ({ status, reason }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
      default:
        return 'Pending';
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
        {getStatusText()}
      </span>
      {status === 'rejected' && reason && (
        <span className="text-xs text-red-600">{reason}</span>
      )}
    </div>
  );
};

// Add INR formatter
const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending';
  }>({
    key: null,
    direction: 'ascending',
  });
  const [showDeleteModal, setShowDeleteModal] = useState<{ visible: boolean; productId: number | null; productName: string; isBulk: boolean; } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching products from API...');
      
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log('Products data received:', data);
      
      // Group products by parent_product_id
      const parentProducts = data.filter((product: Product) => !product.parent_product_id);
      const variantProducts = data.filter((product: Product) => product.parent_product_id);

      // Attach variants to their parent products
      const productsWithVariants = parentProducts.map((parent: Product) => ({
        ...parent,
        variants: variantProducts.filter((variant: Product) => variant.parent_product_id === parent.product_id)
      }));

      console.log('Final products with variants:', productsWithVariants);
      setProducts(productsWithVariants);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (productId: number, productName: string) => {
    setShowDeleteModal({ visible: true, productId, productName, isBulk: false });
  };

  const handleBulkDeleteClick = () => {
    setShowDeleteModal({ visible: true, productId: null, productName: `${selectedItems.length} products`, isBulk: true });
  };

  const handleConfirmDelete = async () => {
    if (!showDeleteModal) return;

    setIsDeleting(true);
    try {
      if (showDeleteModal.isBulk) {
        // Delete products one by one
        await Promise.all(
          selectedItems.map(productId =>
            fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
              },
            })
          )
        );
        toast.success(`Successfully deleted ${selectedItems.length} products`);
        setSelectedItems([]);
      } else if (showDeleteModal.productId) {
        const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${showDeleteModal.productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        toast.success(`Successfully deleted ${showDeleteModal.productName}`);
      }
      
      // Refresh the product list
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product(s):', error);
      toast.error(showDeleteModal.isBulk ? 'Failed to delete some products' : 'Failed to delete product');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(null);
  };

  // Handle sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter products based on search, category, status, and price
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory =
      selectedCategory === 'All Categories' || 
      product.category?.name === selectedCategory;
    
    // Status filter
    const matchesStatus =
      selectedStatus === 'All' || 
      (selectedStatus === 'Active' && product.active_flag) ||
      (selectedStatus === 'Inactive' && !product.active_flag);
    
    // Price filter
    const matchesMinPrice = minPrice === '' || product.selling_price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.selling_price <= parseFloat(maxPrice);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesMinPrice && matchesMaxPrice;
  });
  
  // Sort products
  const sortedProducts = React.useMemo(() => {
    const sortableProducts = [...filteredProducts];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Product] as string | number;
        const bValue = b[sortConfig.key as keyof Product] as string | number;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [filteredProducts, sortConfig]);
  
  // Generate sort indicator
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDownIcon className="h-4 w-4 ml-1" />
    );
  };

  // Toggle selection of all products
  const toggleSelectAll = () => {
    if (selectedItems.length === sortedProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedProducts.map(product => product.product_id));
    }
  };

  // Toggle selection of single product
  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedStatus('All');
    setMinPrice('');
    setMaxPrice('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <div className="flex space-x-3">
          <Link
            to="/business/catalog/products/import"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            Import Products
          </Link>
          <Link
            to="/business/catalog/product/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </div>
      </div>
      
      {/* Search, Filter, and Sort */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Search products by name or SKU..."
              />
            </div>
            
            {/* Basic Filters */}
            <div className="flex space-x-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 focus:outline-none"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="price-min" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="price-min"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  <input
                    type="number"
                    id="price-max"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 focus:outline-none mr-2"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              {selectedItems.length} product(s) selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDeleteClick}
                className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete Selected
              </button>
            </div>
          </div>
        )}
        
        {/* Product List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    checked={selectedItems.length === sortedProducts.length && sortedProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('product_name')}>
                    Name / SKU
                    {getSortIndicator('product_name')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('selling_price')}>
                    Price
                    {getSortIndicator('selling_price')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category / Brand
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('active_flag')}>
                    Status
                    {getSortIndicator('active_flag')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('approval_status')}>
                    Approval
                    {getSortIndicator('approval_status')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProducts.map((product) => (
                <React.Fragment key={product.product_id}>
                  {/* Parent Product Row */}
                  <tr className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap w-8">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        checked={selectedItems.includes(product.product_id)}
                        onChange={() => toggleSelectItem(product.product_id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.media && product.media[0] && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-sm object-cover" 
                              src={product.media[0].url} 
                              alt={product.product_name} 
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                          <div className="text-sm text-gray-500">SKU - {product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatINR(product.selling_price)}
                        {product.special_price && (
                          <span className="ml-2 text-red-600">
                            Special: {formatINR(product.special_price)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category?.name || 'No Category'}</div>
                      <div className="text-sm text-gray-500">{product.brand?.name || 'No Brand'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge active={product.active_flag} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ApprovalStatusBadge status={product.approval_status} reason={product.rejection_reason} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <Link to={`/business/catalog/product/${product.product_id}/edit`} className="text-orange-600 hover:text-orange-700">
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(product.product_id, product.product_name)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Variants Rows */}
                  {product.variants && product.variants.length > 0 && product.variants.map((variant) => (
                    <tr key={variant.product_id} className="bg-gray-50 hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap w-8">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          checked={selectedItems.includes(variant.product_id)}
                          onChange={() => toggleSelectItem(variant.product_id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center pl-8">
                          {variant.media && variant.media[0] && (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-sm object-cover" 
                                src={variant.media[0].media_url} 
                                alt={`${product.product_name} variant`} 
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm text-gray-900">
                              {variant.attributes?.map((attr, index) => (
                                <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1">
                                  {attr.name}: {attr.value}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">SKU - {variant.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatINR(variant.selling_price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Stock: {variant.stock_qty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge active={product.active_flag} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ApprovalStatusBadge status={product.approval_status} reason={product.rejection_reason} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <Link to={`/business/catalog/product/${variant.product_id}/edit`} className="text-orange-600 hover:text-orange-700">
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(variant.product_id, `${product.product_name} variant`)}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-orange-600 font-medium hover:text-orange-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && showDeleteModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="flex items-center justify-start mb-4">
              <AlertCircle className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete {showDeleteModal.isBulk ? 
                  `the selected ${showDeleteModal.productName}` : 
                  `the product '${showDeleteModal.productName}'`}? This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                disabled={isDeleting}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleConfirmDelete}
              >
                {isDeleting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  'Delete'
                )}
              </button>
              <button
                type="button"
                disabled={isDeleting}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;