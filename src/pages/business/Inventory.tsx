
import { useState } from 'react';
import { Search, Filter, AlertCircle, Package, DollarSign, Edit } from 'lucide-react';

export default function Inventory() {
  const [filter, setFilter] = useState('');
  
  // Mock inventory data
  const products = [
    { id: 1, name: 'iPhone 14', sku: 'iP14', category: 'Mobiles', brand: 'Apple', stock: 120, available: 100 },
    { id: 2, name: 'Samsung Galaxy S21', sku: 'SG21', category: 'Headphones', brand: 'Samsung', stock: 50, available: 45 },
    { id: 3, name: 'Sony WH-1000x', sku: 'SW100', category: 'Laptops', brand: 'Sony', stock: 75, available: 65 },
    { id: 4, name: 'Dell XPS 13', sku: 'DXPS13', category: 'Shoes', brand: 'Dell', stock: 30, available: 25 },
    { id: 5, name: 'Nike Air Zoom Pegasus', sku: 'NAZP', category: 'In Stock', brand: 'Nike', stock: 150, available: 135 },
  ];

  // Calculate metrics
  const totalProducts = products.length;
  const lowStockAlerts = products.filter(p => p.stock - p.available < 25).length;
  const outOfStockItems = products.filter(p => p.available < 5).length;
  const inventoryValue = 1500000; // Mock fixed value as shown in the image

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">INVENTORY MANAGEMENT</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5 flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Alerts</p>
              <p className="text-2xl font-bold">{lowStockAlerts}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Out of Stock Items</p>
              <p className="text-2xl font-bold">{outOfStockItems}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inventory Value</p>
              <p className="text-2xl font-bold">{inventoryValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onChange={(e) => setFilter(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option value="">Category</option>
              <option value="mobiles">Mobiles</option>
              <option value="headphones">Headphones</option>
              <option value="laptops">Laptops</option>
              <option value="shoes">Shoes</option>
            </select>
            
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option value="">Brand</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="sony">Sony</option>
              <option value="dell">Dell</option>
              <option value="nike">Nike</option>
            </select>
            
            <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option value="">In Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                        <img 
                          src="/api/placeholder/50/50" 
                          alt={product.name} 
                          className="h-10 w-10 rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.available}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="flex items-center text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4 mr-1" />
                        <span>Edit/Update</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">5</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex mt-4 space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905v.714L7.5 5.5A2 2 0 006 7.414V13a2 2 0 002 2h3" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904v-.92c0-.347-.282-.626-.628-.631a1.926 1.926 0 01-1.384-.569 2.002 2.002 0 01-.593-1.397c-.001-.64.267-1.254.733-1.679" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600 ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}