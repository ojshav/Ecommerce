import React, { useState } from 'react';
import { Edit, Trash2, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
}

interface Promotion {
  id: string;
  categoryId: string;
  categoryName: string;
  discountRate: number;
  promotionCode: string;
  isActive: boolean;
}

const Promotions: React.FC = () => {
  // Mock data for demonstration
  const [categories] = useState<Category[]>([
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home & Garden' },
    { id: '4', name: 'Sports' },
    { id: '5', name: 'Books' }
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      categoryId: '1',
      categoryName: 'Electronics',
      discountRate: 15,
      promotionCode: 'ELECTRONICS15OFF',
      isActive: true
    },
    {
      id: '2',
      categoryId: '2',
      categoryName: 'Clothing',
      discountRate: 25,
      promotionCode: 'CLOTHING25OFF',
      isActive: false
    },
    {
      id: '3',
      categoryId: '3',
      categoryName: 'Home & Garden',
      discountRate: 10,
      promotionCode: 'HOMEGARDEN10OFF',
      isActive: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [promotionCode, setPromotionCode] = useState('');
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState<{ visible: boolean; promotionId: string | null; promotionName: string; } | null>(null);

  const generatePromotionCode = (categoryName: string, discountRate: string): string => {
    const cleanCategoryName = categoryName.toUpperCase().replace(/\s+/g, '');
    return `${cleanCategoryName}${discountRate}OFF`;
  };

  // Auto-generate promo code when category or discount rate changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const selectedCategoryObj = categories.find(cat => cat.id === categoryId);
    if (selectedCategoryObj && discountRate) {
      const generatedCode = generatePromotionCode(selectedCategoryObj.name, discountRate);
      setPromotionCode(generatedCode);
    }
  };

  const handleDiscountRateChange = (rate: string) => {
    setDiscountRate(rate);
    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
    if (selectedCategoryObj && rate) {
      const generatedCode = generatePromotionCode(selectedCategoryObj.name, rate);
      setPromotionCode(generatedCode);
    }
  };

  // Filter promotions based on search and category filter
  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.promotionCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || promotion.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
    if (!selectedCategoryObj) return;

    const newPromotion: Promotion = {
      id: editingPromotion?.id || Date.now().toString(),
      categoryId: selectedCategory,
      categoryName: selectedCategoryObj.name,
      discountRate: Number(discountRate),
      promotionCode: promotionCode || generatePromotionCode(selectedCategoryObj.name, discountRate),
      isActive: true
    };

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingPromotion) {
        setPromotions(promotions.map(p => p.id === editingPromotion.id ? newPromotion : p));
        setEditingPromotion(null);
        toast.success('Promotion updated successfully');
      } else {
        setPromotions([...promotions, newPromotion]);
        toast.success('Promotion created successfully');
      }

      setSelectedCategory('');
      setDiscountRate('');
      setPromotionCode('');
      setLoading(false);
    }, 500);
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setSelectedCategory(promotion.categoryId);
    setDiscountRate(promotion.discountRate.toString());
    setPromotionCode(promotion.promotionCode);
  };

  const handleDeleteClick = (id: string, categoryName: string) => {
    setShowDeleteModal({ visible: true, promotionId: id, promotionName: categoryName });
  };

  const handleConfirmDelete = async () => {
    if (!showDeleteModal || !showDeleteModal.promotionId) return;

    const promotionIdToDelete = showDeleteModal.promotionId;
    const promotionNameToDelete = showDeleteModal.promotionName;
    setShowDeleteModal(null); // Close the dialog immediately

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setPromotions(promotions.filter(p => p.id !== promotionIdToDelete));
      toast.success(`Promotion for ${promotionNameToDelete} deleted successfully`);
    } catch (err) {
      console.error('Error deleting promotion:', err);
      toast.error('Failed to delete promotion');
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(null);
  };

  const handleToggleActive = async (id: string) => {
    const promotion = promotions.find(p => p.id === id);
    if (!promotion) return;

    setLoading(true);
    
    setTimeout(() => {
      setPromotions(promotions.map(p => 
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ));
      toast.success(`Promotion ${promotion.isActive ? 'deactivated' : 'activated'} successfully`);
      setLoading(false);
    }, 300);
  };

  const cancelEdit = () => {
    setEditingPromotion(null);
    setSelectedCategory('');
    setDiscountRate('');
    setPromotionCode('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Promotions Management</h1>
      
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Rate (%)
            </label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => handleDiscountRateChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              min="0"
              max="100"
              placeholder="Enter discount percentage"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Code
            </label>
            <input
              type="text"
              value={promotionCode}
              onChange={(e) => setPromotionCode(e.target.value.toUpperCase())}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono"
              placeholder="Auto-generated or enter custom code"
              required
            />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : (editingPromotion ? 'Update Promotion' : 'Create Promotion')}
          </button>
          
          {editingPromotion && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Promotions
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by category or promotion code..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {(searchTerm || filterCategory) && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing {filteredPromotions.length} of {promotions.length} promotions
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
              }}
              className="text-sm text-orange-600 hover:text-orange-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promotion Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPromotions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {promotions.length === 0 
                      ? "No promotions found. Create your first promotion above."
                      : "No promotions match your search criteria."
                    }
                  </td>
                </tr>
              ) : (
                filteredPromotions.map((promotion) => (
                  <tr key={promotion.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {promotion.categoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {promotion.discountRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono bg-gray-50 rounded px-2 py-1">
                      {promotion.promotionCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          promotion.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {promotion.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(promotion)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit promotion"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(promotion.id, promotion.categoryName)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete promotion"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(promotion.id)}
                          className={`${
                            promotion.isActive ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'
                          } transition-colors`}
                          title={promotion.isActive ? 'Deactivate promotion' : 'Activate promotion'}
                        >
                          {promotion.isActive ? (
                            <ToggleRight size={18} />
                          ) : (
                            <ToggleLeft size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
                Are you sure you want to delete the promotion for '<strong>{showDeleteModal.promotionName}</strong>'? This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500"></div>
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;