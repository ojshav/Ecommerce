import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Trash, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type definitions
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  icon_url?: string;
  created_at: string;
  updated_at: string;
  subcategories?: Category[];
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    icon: null as File | null,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    slug: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/superadmin/categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const categoriesData = await response.json();
      
      // Organize categories into parent-child structure
      const parentCategories = categoriesData.filter((cat: Category) => !cat.parent_id);
      const categoriesWithSubs = parentCategories.map((parent: Category) => ({
        ...parent,
        subcategories: categoriesData.filter((cat: Category) => cat.parent_id === parent.id)
      }));
      
      setCategories(categoriesWithSubs);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setCategoryFormData({
      name: '',
      slug: '',
      description: '',
      parent_id: '',
      icon: null,
    });
    setFormErrors({
      name: '',
      slug: '',
      description: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
        icon: e.target.files[0],
      });
    }
  };

  const validateForm = () => {
    const errors = {
      name: '',
      slug: '',
      description: '',
    };
    let isValid = true;

    if (!categoryFormData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!categoryFormData.slug.trim()) {
      errors.slug = 'Slug is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', categoryFormData.name);
      formData.append('slug', categoryFormData.slug);
      if (categoryFormData.description) {
        formData.append('description', categoryFormData.description);
      }
      if (categoryFormData.parent_id) {
        formData.append('parent_id', categoryFormData.parent_id);
      }
      if (categoryFormData.icon) {
        formData.append('icon_file', categoryFormData.icon);
      }

      const response = await fetch(`${API_BASE_URL}/api/superadmin/categories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create category');
      }

      toast.success('Category created successfully');
      handleCloseDialog();
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/superadmin/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete category');
      }

      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategoryExpand = (categoryId: number) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => {
              const isExpanded = expandedCategories[category.id] || false;

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
                        {category.icon_url && (
                          <img 
                            src={category.icon_url} 
                            alt={category.name}
                            className="w-8 h-8 mr-2 rounded-full"
                          />
                        )}
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{category.slug}</td>
                    <td className="px-6 py-4">{category.description}</td>
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

                  {isExpanded && category.subcategories && category.subcategories.map((subcategory) => (
                    <tr key={subcategory.id} className="bg-gray-50">
                      <td className="px-2 py-3"></td>
                      <td className="px-6 py-3 pl-12 whitespace-nowrap">
                        {subcategory.name}
                      </td>
                      <td className="px-6 py-3">{subcategory.slug}</td>
                      <td className="px-6 py-3">{subcategory.description}</td>
                      <td className="px-6 py-3 text-right">
                        <button
                          className="p-1 text-gray-500 hover:text-red-600 rounded"
                          onClick={() => handleDeleteCategory(subcategory.id)}
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

      {/* Modal Dialog for Categories */}
      {openDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Category</h2>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCloseDialog}
              >
                &times;
              </button>
            </div>
            
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
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={categoryFormData.slug}
                  onChange={handleCategoryChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.slug ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.slug && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.slug}</p>
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
                  Parent Category
                </label>
                <select
                  name="parent_id"
                  value={categoryFormData.parent_id}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">None (Top Level Category)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Icon
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
                {categoryFormData.icon && (
                  <p className="mt-2 text-sm text-gray-600">
                    {categoryFormData.icon.name}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

