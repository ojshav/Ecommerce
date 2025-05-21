import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Trash, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type definitions
interface Category {
  category_id: number;
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
    parent_id: '',
    icon: null as File | null,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    slug: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add function to organize categories into a tree structure
  const organizeCategories = (categories: Category[]): Category[] => {
    const categoryMap = new Map<number, Category>();
    const rootCategories: Category[] = [];

    // First pass: Create a map of all categories
    categories.forEach(category => {
      categoryMap.set(category.category_id, { ...category, subcategories: [] });
    });

    // Second pass: Organize into tree structure
    categories.forEach(category => {
      const categoryWithSubs = categoryMap.get(category.category_id)!;
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.subcategories = parent.subcategories || [];
          parent.subcategories.push(categoryWithSubs);
        }
      } else {
        rootCategories.push(categoryWithSubs);
      }
    });

    return rootCategories;
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(${API_BASE_URL}/api/superadmin/categories, {
        headers: {
          'Authorization': Bearer ${localStorage.getItem('access_token')},
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const categoriesData = await response.json();
      const organizedCategories = organizeCategories(categoriesData);
      setCategories(organizedCategories);
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
      parent_id: '',
      icon: null,
    });
    setFormErrors({
      name: '',
      slug: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Add function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      // Generate slug when name changes
      const newSlug = generateSlug(value);
      setCategoryFormData({
        ...categoryFormData,
        name: value,
        slug: newSlug,
      });
    } else {
      setCategoryFormData({
        ...categoryFormData,
        [name]: value,
      });
    }

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
    };
    let isValid = true;

    if (!categoryFormData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!categoryFormData.slug.trim()) {
      errors.slug = 'Slug is required';
      isValid = false;
    } else {
      // Add slug validation
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(categoryFormData.slug.trim())) {
        errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', categoryFormData.name.trim());
      formData.append('slug', categoryFormData.slug.trim());
      
      // Handle parent_id - convert empty string to null
      if (categoryFormData.parent_id === '') {
        formData.append('parent_id', '');
      } else if (categoryFormData.parent_id) {
        formData.append('parent_id', categoryFormData.parent_id);
      }

      if (categoryFormData.icon) {
        formData.append('icon_file', categoryFormData.icon);
      }

      const response = await fetch(${API_BASE_URL}/api/superadmin/categories, {
        method: 'POST',
        headers: {
          'Authorization': Bearer ${localStorage.getItem('access_token')},
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create category');
      }

      toast.success('Category created successfully');
      handleCloseDialog();
      await fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!categoryId) {
      toast.error('Invalid category ID');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setLoading(true);
      const response = await fetch(${API_BASE_URL}/api/superadmin/categories/${categoryId}, {
        method: 'DELETE',
        headers: {
          'Authorization': Bearer ${localStorage.getItem('access_token')},
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete category' }));
        throw new Error(errorData.message || 'Failed to delete category');
      }

      toast.success('Category deleted successfully');
      await fetchCategories(); // Refresh the categories list
    } catch (error) {
      console.error('Error deleting category:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Network error: Please check your connection and try again');
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to delete category');
      }
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

  // Add function to render category rows recursively
  const renderCategoryRows = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories[category.category_id] || false;
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    return (
      <React.Fragment key={category.category_id}>
        <tr className="hover:bg-gray-50">
          <td className="px-2 py-4">
            {hasSubcategories && (
              <button 
                className="p-1 rounded-full hover:bg-gray-200" 
                onClick={() => toggleCategoryExpand(category.category_id)}
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center" style={{ paddingLeft: ${level * 2}rem }}>
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
          <td className="px-6 py-4 text-right">
            <button 
              className="p-1 text-gray-500 hover:text-red-600 rounded" 
              onClick={() => handleDeleteCategory(category.category_id)}
              title="Delete Category"
            >
              <Trash size={16} />
            </button>
          </td>
        </tr>

        {isExpanded && category.subcategories && category.subcategories.map(subcategory => 
          renderCategoryRows(subcategory, level + 1)
        )}
      </React.Fragment>
    );
  };

  // Update the getAllCategories function to handle nested categories
  const getAllCategories = (categories: Category[]): Category[] => {
    let allCategories: Category[] = [];
    categories.forEach(category => {
      allCategories.push(category);
      if (category.subcategories) {
        allCategories = [...allCategories, ...getAllCategories(category.subcategories)];
      }
    });
    return allCategories;
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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(category => renderCategoryRows(category))}
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
                  className={w-full px-3 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}}
                  placeholder="Enter category name"
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
                  className={w-full px-3 py-2 border rounded-md ${formErrors.slug ? 'border-red-500' : 'border-gray-300'}}
                  placeholder="Auto-generated from name"
                  readOnly
                />
                {formErrors.slug && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.slug}</p>
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
                  {getAllCategories(categories).map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
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
