import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Trash, Plus } from 'lucide-react';

// Type definitions
interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
  });

  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  const [tempSubcategories, setTempSubcategories] = useState<Subcategory[]>([]);
  const [subcategoryFormData, setSubcategoryFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const mockData: Category[] = [
      {
        id: '1',
        name: "Men's",
        description: 'Clothing and accessories for men',
        subcategories: [
          { id: '101', name: "Men's Shirts", description: 'Formal and casual shirts for men', productCount: 8 },
          { id: '102', name: "Men's Pants", description: 'Formal and casual pants for men', productCount: 4 },
        ],
      },
      {
        id: '2',
        name: "Women's",
        description: 'Clothing and accessories for women',
        subcategories: [
          { id: '201', name: "Women's Dresses", description: 'All types of dresses for women', productCount: 12 },
          { id: '202', name: "Women's Tops", description: 'Tops, blouses, and shirts for women', productCount: 6 },
        ],
      },
      {
        id: '3',
        name: "Kids",
        description: 'Clothing and accessories for kids',
        subcategories: [
          { id: '301', name: "Kids Clothes", description: 'All types of clothes for kids', productCount: 8 },
        ],
      },
      {
        id: '4',
        name: "Accessories",
        description: 'Fashion accessories',
        subcategories: [],
      },
    ];
    setCategories(mockData);
  }, []);

  const handleOpenDialog = () => {
    setCategoryFormData({ name: '', description: '', image: null });
    setFormErrors({ name: '', description: '' });
    setTempSubcategories([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCategoryId(null);
    setTempSubcategories([]);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryFormData({
      ...categoryFormData,
      [name]: value,
    });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoryFormData({
        ...categoryFormData,
        image: e.target.files[0],
      });
    }
  };

  const validateForm = () => {
    // No validation required - all fields are optional
    return true;
  };

  const validateSubcategoryForm = () => {
    // No validation required - all fields are optional
    return true;
  };

  const handleAddCategoryAndContinue = () => {
    if (!validateForm()) return;

    const id = `cat-${Date.now()}`;
    const newCategory: Category = {
      id,
      name: categoryFormData.name,
      description: categoryFormData.description,
      imageUrl: categoryFormData.image ? URL.createObjectURL(categoryFormData.image) : undefined,
      subcategories: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryId(id);
  };

  const handleAddSubcategoryContinue = () => {
    if (!validateSubcategoryForm()) return;

    const newSubcategory: Subcategory = {
      id: `subcat-${Date.now()}`,
      name: subcategoryFormData.name,
      description: subcategoryFormData.description,
      productCount: 0,
    };

    setTempSubcategories([...tempSubcategories, newSubcategory]);
    setSubcategoryFormData({ name: '', description: '' });
  };

  const handleSaveAllSubcategories = () => {
    if (!newCategoryId) return;

    const updatedCategories = categories.map(category => {
      if (category.id === newCategoryId) {
        return {
          ...category,
          subcategories: [...category.subcategories, ...tempSubcategories],
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    handleCloseDialog();
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.filter(subcat => subcat.id !== subcategoryId),
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          onClick={handleOpenDialog}
        >
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-10 px-2 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Products</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => {
              const isExpanded = expandedCategories[category.id] || false;
              const productCount = category.subcategories.reduce((sum, subcat) => sum + subcat.productCount, 0);

              return (
                <React.Fragment key={category.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-2 py-4">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-200" 
                        onClick={() => toggleCategoryExpand(category.id)}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {category.imageUrl && (
                          <img 
                            src={category.imageUrl} 
                            alt={category.name}
                            className="w-8 h-8 mr-2 rounded-full"
                          />
                        )}
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4">{productCount}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="p-1 text-gray-500 hover:text-red-600 rounded" 
                        onClick={() => handleDeleteCategory(category.id)}
                        title="Delete Category"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>

                  {isExpanded &&
                    category.subcategories.map((subcategory) => (
                      <tr key={subcategory.id} className="bg-gray-50">
                        <td className="px-2 py-3"></td>
                        <td className="px-6 py-3 pl-12 whitespace-nowrap">
                          {subcategory.name}
                        </td>
                        <td className="px-6 py-3">{subcategory.description}</td>
                        <td className="px-6 py-3">{subcategory.productCount}</td>
                        <td className="px-6 py-3 text-right">
                          <button
                            className="p-1 text-gray-500 hover:text-red-600 rounded"
                            onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                            title="Delete Subcategory"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog for Categories and Subcategories */}
      {openDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {newCategoryId ? 'Add Subcategories' : 'Add Category'}
              </h2>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCloseDialog}
              >
                &times;
              </button>
            </div>
            
            {!newCategoryId ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={categoryFormData.name}
                    onChange={handleCategoryChange}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={categoryFormData.description}
                    onChange={handleCategoryChange}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Image
                  </label>
                  <label className="inline-block px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    Upload Image
                    <input 
                      type="file" 
                      hidden 
                      accept="image/*" 
                      onChange={handleImageChange} 
                    />
                  </label>
                  {categoryFormData.image && (
                    <p className="mt-2 text-sm text-gray-600">
                      {categoryFormData.image.name}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={subcategoryFormData.name}
                    onChange={(e) => setSubcategoryFormData({ ...subcategoryFormData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={subcategoryFormData.description}
                    onChange={(e) => setSubcategoryFormData({ ...subcategoryFormData, description: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                  )}
                </div>

                {tempSubcategories.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700">Subcategories Added:</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {tempSubcategories.map((sub) => (
                        <li key={sub.id}>
                          <span className="font-medium">{sub.name}</span> - {sub.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              
              {!newCategoryId ? (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAddCategoryAndContinue}
                >
                  Continue
                </button>
              ) : (
                <>
                  <button
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    onClick={handleAddSubcategoryContinue}
                  >
                    Continue
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={handleSaveAllSubcategories}
                  >
                    Save All
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

