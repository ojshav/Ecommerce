import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Package, 
  X,
  ArrowLeft,
  Store,
  FolderOpen,
  Filter,
  ExternalLink
} from 'lucide-react';
import { shopManagementService, Shop, ShopCategory, ShopBrand, ShopProduct } from '../../../services/shopManagementService';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useToastHelpers } from '../../../context/ToastContext';

const ShopProducts: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | null>(null);
  const [brands, setBrands] = useState<ShopBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<ShopBrand | null>(null);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [formData, setFormData] = useState({
    product_name: '',
    sku: '',
    product_description: '',
    cost_price: 0,
    selling_price: 0,
    special_price: 0,
    special_start: '',
    special_end: '',
    is_on_special_offer: false,
    is_published: true,
    active_flag: true
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    min_price: '',
    max_price: '',
    is_published: '',
    is_on_special_offer: ''
  });
  const { showSuccess, showError } = useToastHelpers();

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (selectedShop) {
      fetchCategories();
    }
  }, [selectedShop]);

  useEffect(() => {
    if (selectedShop && selectedCategory) {
      fetchBrands();
    }
  }, [selectedShop, selectedCategory]);

  useEffect(() => {
    if (selectedShop && selectedCategory) {
      fetchProducts();
    }
  }, [selectedShop, selectedCategory, selectedBrand]);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const data = await shopManagementService.getShops();
      setShops(data);
    } catch (error) {
      showError('Failed to fetch shops');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (!selectedShop) return;
    try {
      const data = await shopManagementService.getCategoriesByShop(selectedShop.shop_id);
      setCategories(data);
    } catch (error) {
      showError('Failed to fetch categories');
    }
  };

  const fetchBrands = async () => {
    if (!selectedShop || !selectedCategory) return;
    try {
      const data = await shopManagementService.getBrandsByShopCategory(selectedShop.shop_id, selectedCategory.category_id);
      setBrands(data);
    } catch (error) {
      showError('Failed to fetch brands');
    }
  };

  const fetchProducts = async () => {
    if (!selectedShop || !selectedCategory) return;
    try {
      setLoading(true);
      const filterParams = {
        shop_id: selectedShop.shop_id,
        category_id: selectedCategory.category_id,
        ...(selectedBrand && { brand_id: selectedBrand.brand_id }),
        ...(filters.min_price && { min_price: parseFloat(filters.min_price) }),
        ...(filters.max_price && { max_price: parseFloat(filters.max_price) }),
        ...(filters.is_published && { is_published: filters.is_published === 'true' }),
        ...(filters.is_on_special_offer && { is_on_special_offer: filters.is_on_special_offer === 'true' }),
        ...(searchTerm && { search: searchTerm })
      };
      
      const response = await shopManagementService.getShopProducts(filterParams);
      setProducts(response.data || []);
    } catch (error) {
      showError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const generateSKU = (name: string) => {
    return name.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 8) + '-' + Date.now().toString().slice(-4);
  };

  const handleNameChange = (name: string) => {
    setFormData({ 
      ...formData, 
      product_name: name,
      sku: editingProduct ? formData.sku : generateSKU(name)
    });
  };

  const handleImageUpload = (file: File | null, url: string | null) => {
    setProductImage(file);
    setProductImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop || !selectedCategory) return;

    try {
      setSubmitting(true);
      
      const productData = {
        ...formData,
        shop_id: selectedShop.shop_id,
        category_id: selectedCategory.category_id,
        brand_id: selectedBrand?.brand_id || undefined,
        price: formData.selling_price,
        special_price: formData.is_on_special_offer ? formData.special_price : undefined,
      };

      if (editingProduct) {
        await shopManagementService.updateProduct(editingProduct.product_id, productData);
        showSuccess('Product updated successfully');
      } else {
        await shopManagementService.createProduct(productData);
        showSuccess('Product created successfully');
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      showError(error.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: ShopProduct) => {
    setEditingProduct(product);
    setFormData({
      product_name: product.product_name,
      sku: product.sku,
      product_description: product.product_description,
      cost_price: product.cost_price,
      selling_price: product.selling_price,
      special_price: product.special_price || 0,
      special_start: product.special_start || '',
      special_end: product.special_end || '',
      is_on_special_offer: product.is_on_special_offer,
      is_published: product.is_published,
      active_flag: product.active_flag
    });
    setShowModal(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await shopManagementService.deleteProduct(productId);
      showSuccess('Product deleted successfully');
      fetchProducts();
    } catch (error: any) {
      showError(error.message || 'Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      product_name: '',
      sku: '',
      product_description: '',
      cost_price: 0,
      selling_price: 0,
      special_price: 0,
      special_start: '',
      special_end: '',
      is_on_special_offer: false,
      is_published: true,
      active_flag: true
    });
    setProductImage(null);
    setProductImageUrl(null);
  };

  const resetFilters = () => {
    setFilters({
      min_price: '',
      max_price: '',
      is_published: '',
      is_on_special_offer: ''
    });
    setSelectedBrand(null);
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Shop Selection View
  if (!selectedShop) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shop Products</h1>
          <p className="text-gray-600">Select a shop to manage its products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <button
              key={shop.shop_id}
              onClick={() => setSelectedShop(shop)}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Store className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    shop.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {shop.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Category Selection View
  if (!selectedCategory) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedShop(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back to Shops</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedShop.name} - Categories</h1>
              <p className="text-gray-600">Select a category to manage its products</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => setSelectedCategory(category)}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Products Management View
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Categories</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedShop.name} {'>'} {selectedCategory.name} - Products
            </h1>
            <p className="text-gray-600">Manage products for this category</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={selectedBrand?.brand_id || ''}
                onChange={(e) => {
                  const brand = brands.find(b => b.brand_id === parseInt(e.target.value));
                  setSelectedBrand(brand || null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                step="0.01"
                value={filters.min_price}
                onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                step="0.01"
                value={filters.max_price}
                onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="999.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.is_published}
                onChange={(e) => setFilters({ ...filters, is_published: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={resetFilters}
              className="text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
            <button
              onClick={fetchProducts}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.product_id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-200">
                {product.primary_image ? (
                  <img
                    src={product.primary_image}
                    alt={product.product_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="text-gray-400" size={48} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{product.product_name}</h3>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => window.open(`/product/${product.product_id}`, '_blank')}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="View Product"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit Product"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.product_description}</p>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">₹{product.selling_price}</span>
                    {product.is_on_special_offer && product.special_price && (
                      <span className="text-sm text-red-500 line-through ml-2">₹{product.special_price}</span>
                    )}
                  </div>
                  {product.brand_name && (
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{product.brand_name}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      product.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.is_published ? 'Published' : 'Draft'}
                    </span>
                    {product.is_on_special_offer && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Special Offer
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.active_flag ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.active_flag ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating a new product'}
          </p>
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.product_name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter product SKU"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      value={formData.product_description}
                      onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.cost_price}
                        onChange={(e) => setFormData({ ...formData, cost_price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.selling_price}
                        onChange={(e) => setFormData({ ...formData, selling_price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Special Offers & Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <ImageUpload
                      value={editingProduct?.primary_image}
                      onChange={handleImageUpload}
                      showViewButton={true}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_on_special_offer"
                      checked={formData.is_on_special_offer}
                      onChange={(e) => setFormData({ ...formData, is_on_special_offer: e.target.checked })}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_on_special_offer" className="ml-2 block text-sm text-gray-900">Special Offer</label>
                  </div>

                  {formData.is_on_special_offer && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.special_price}
                          onChange={(e) => setFormData({ ...formData, special_price: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="datetime-local"
                            value={formData.special_start}
                            onChange={(e) => setFormData({ ...formData, special_start: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                          <input
                            type="datetime-local"
                            value={formData.special_end}
                            onChange={(e) => setFormData({ ...formData, special_end: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_published"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">Published</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="active_flag"
                        checked={formData.active_flag}
                        onChange={(e) => setFormData({ ...formData, active_flag: e.target.checked })}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="active_flag" className="ml-2 block text-sm text-gray-900">Active</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProducts;
