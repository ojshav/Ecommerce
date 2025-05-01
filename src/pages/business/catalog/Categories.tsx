import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Mock category data
const CATEGORIES = [
  {
    id: 1,
    name: 'Men\'s',
    description: 'Clothing and accessories for men',
    parent_id: null,
    status: 'Active',
    productCount: 12,
    children: [
      {
        id: 5,
        name: 'Men\'s Shirts',
        description: 'Formal and casual shirts for men',
        parent_id: 1,
        status: 'Active',
        productCount: 8,
        children: []
      },
      {
        id: 6,
        name: 'Men\'s Pants',
        description: 'Formal and casual pants for men',
        parent_id: 1,
        status: 'Active',
        productCount: 4,
        children: []
      }
    ]
  },
  {
    id: 2,
    name: 'Women\'s',
    description: 'Clothing and accessories for women',
    parent_id: null,
    status: 'Active',
    productCount: 18,
    children: [
      {
        id: 7,
        name: 'Women\'s Dresses',
        description: 'All types of dresses for women',
        parent_id: 2,
        status: 'Active',
        productCount: 12,
        children: []
      },
      {
        id: 8,
        name: 'Women\'s Tops',
        description: 'Tops, blouses, and shirts for women',
        parent_id: 2,
        status: 'Active',
        productCount: 6,
        children: []
      }
    ]
  },
  {
    id: 3,
    name: 'Kids',
    description: 'Clothing and accessories for kids',
    parent_id: null,
    status: 'Active',
    productCount: 8,
    children: []
  },
  {
    id: 4,
    name: 'Accessories',
    description: 'Fashion accessories for all',
    parent_id: null,
    status: 'Inactive',
    productCount: 5,
    children: []
  }
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Inactive':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

type Category = {
  id: number;
  name: string;
  description: string;
  parent_id: number | null;
  status: string;
  productCount: number;
  children: Category[];
};

type CategoryRowProps = {
  category: Category;
  level: number;
  expandedCategories: number[];
  onToggleExpand: (id: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
};

const CategoryRow: React.FC<CategoryRowProps> = ({ 
  category, 
  level, 
  expandedCategories, 
  onToggleExpand, 
  onEdit, 
  onDelete 
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedCategories.includes(category.id);
  
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div style={{ width: `${level * 20}px` }} className="flex-shrink-0"></div>
            {hasChildren && (
              <button 
                onClick={() => onToggleExpand(category.id)}
                className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isExpanded ? (
                  <ChevronDownIcon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-7"></div>}
            <div className="ml-2">
              <div className="text-sm font-medium text-gray-900">{category.name}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{category.description}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {category.productCount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={category.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-3">
            <button 
              onClick={() => onEdit(category)} 
              className="text-blue-600 hover:text-blue-900"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onDelete(category.id)} 
              className="text-red-600 hover:text-red-900"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </td>
      </tr>
      
      {/* Render children if expanded */}
      {isExpanded && 
        category.children.map(child => (
          <CategoryRow 
            key={child.id}
            category={child}
            level={level + 1}
            expandedCategories={expandedCategories}
            onToggleExpand={onToggleExpand}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      }
    </>
  );
};

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<Category>) => void;
  category: Partial<Category> | null;
  categories: Category[];
};

const CategoryModal: React.FC<CategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  category,
  categories
}) => {
  const [formData, setFormData] = useState<Partial<Category>>(
    category || { name: '', description: '', parent_id: null, status: 'Active' }
  );
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  // Flatten categories for parent selection (exclude self and children)
  const getFlatCategories = (cats: Category[], exclude: number | null = null): Category[] => {
    let flat: Category[] = [];
    for (const cat of cats) {
      if (cat.id !== exclude) {
        flat.push(cat);
        if (cat.children && cat.children.length > 0) {
          flat = [...flat, ...getFlatCategories(cat.children, exclude)];
        }
      }
    }
    return flat;
  };
  
  const flatCategories = getFlatCategories(categories, category?.id);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {category?.id ? 'Edit Category' : 'Add New Category'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                id="parent_id"
                name="parent_id"
                value={formData.parent_id === null ? '' : formData.parent_id}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : parseInt(e.target.value);
                  setFormData({
                    ...formData,
                    parent_id: value
                  });
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">None (Top Level)</option>
                {flatCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasProducts: boolean;
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  hasProducts
}) => {
  const [moveProducts, setMoveProducts] = useState<boolean>(true);
  const [targetCategory, setTargetCategory] = useState<string>('');
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Confirm Deletion
          </h3>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this category?
          </p>
          
          {hasProducts && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700">
                <strong>Warning:</strong> This category contains products.
              </p>
              
              <div className="mt-3">
                <div className="flex items-center">
                  <input
                    id="move-products"
                    name="deleteOption"
                    type="radio"
                    checked={moveProducts}
                    onChange={() => setMoveProducts(true)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="move-products" className="ml-2 block text-sm text-gray-700">
                    Move products to another category
                  </label>
                </div>
                
                {moveProducts && (
                  <select
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select target category</option>
                    <option value="1">Men's</option>
                    <option value="2">Women's</option>
                    <option value="3">Kids</option>
                  </select>
                )}
                
                <div className="flex items-center mt-2">
                  <input
                    id="delete-products"
                    name="deleteOption"
                    type="radio"
                    checked={!moveProducts}
                    onChange={() => setMoveProducts(false)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="delete-products" className="ml-2 block text-sm text-gray-700">
                    Delete all products in this category
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  
  // Toggle category expansion
  const toggleCategoryExpand = (id: number) => {
    if (expandedCategories.includes(id)) {
      setExpandedCategories(expandedCategories.filter(catId => catId !== id));
    } else {
      setExpandedCategories([...expandedCategories, id]);
    }
  };
  
  // Filter categories based on search
  const filteredCategories = searchTerm
    ? categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;
  
  // Open modal to add new category
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setIsModalOpen(true);
  };
  
  // Open modal to edit category
  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };
  
  // Open modal to confirm deletion
  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  // Handle category save (add/edit)
  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (categoryData.id) {
      // Edit existing category
      setCategories(prevCategories => 
        updateCategoryInTree(prevCategories, categoryData as Category)
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.max(...getIdsFromCategories(categories)) + 1,
        name: categoryData.name || '',
        description: categoryData.description || '',
        parent_id: categoryData.parent_id ?? null,
        status: categoryData.status || 'Active',
        productCount: 0,
        children: []
      };
      
      if (newCategory.parent_id === null) {
        // Add as top-level category
        setCategories([...categories, newCategory]);
      } else {
        // Add as child of parent
        setCategories(prevCategories => 
          addChildToParent(prevCategories, newCategory)
        );
      }
    }
    
    setIsModalOpen(false);
  };
  
  // Handle category deletion
  const handleConfirmDelete = () => {
    if (categoryToDelete !== null) {
      setCategories(prevCategories => 
        removeCategoryFromTree(prevCategories, categoryToDelete)
      );
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };
  
  // Helper to get all IDs from category tree
  const getIdsFromCategories = (cats: Category[]): number[] => {
    let ids: number[] = [];
    for (const cat of cats) {
      ids.push(cat.id);
      if (cat.children && cat.children.length > 0) {
        ids = [...ids, ...getIdsFromCategories(cat.children)];
      }
    }
    return ids;
  };
  
  // Helper to update a category in the tree
  const updateCategoryInTree = (cats: Category[], updatedCat: Category): Category[] => {
    return cats.map(cat => {
      if (cat.id === updatedCat.id) {
        return { ...cat, ...updatedCat, children: cat.children };
      }
      if (cat.children && cat.children.length > 0) {
        return { ...cat, children: updateCategoryInTree(cat.children, updatedCat) };
      }
      return cat;
    });
  };
  
  // Helper to add a child to a parent category
  const addChildToParent = (cats: Category[], child: Category): Category[] => {
    return cats.map(cat => {
      if (cat.id === child.parent_id) {
        return { ...cat, children: [...cat.children, child] };
      }
      if (cat.children && cat.children.length > 0) {
        return { ...cat, children: addChildToParent(cat.children, child) };
      }
      return cat;
    });
  };
  
  // Helper to remove a category from the tree
  const removeCategoryFromTree = (cats: Category[], idToRemove: number): Category[] => {
    return cats.filter(cat => cat.id !== idToRemove)
      .map(cat => {
        if (cat.children && cat.children.length > 0) {
          return { ...cat, children: removeCategoryFromTree(cat.children, idToRemove) };
        }
        return cat;
      });
  };
  
  // Check if a category has products
  const categoryHasProducts = (id: number): boolean => {
    const findCategory = (cats: Category[]): boolean => {
      for (const cat of cats) {
        if (cat.id === id) {
          return cat.productCount > 0;
        }
        if (cat.children && cat.children.length > 0) {
          const found = findCategory(cat.children);
          if (found) return true;
        }
      }
      return false;
    };
    
    return findCategory(categories);
  };
  
  return (
    <div className="space-y-6">
      {/* Page Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        <button
          onClick={handleAddCategory}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search categories..."
            />
          </div>
        </div>
        
        {/* Categories Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. of Products
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map(category => (
                <CategoryRow 
                  key={category.id}
                  category={category}
                  level={0}
                  expandedCategories={expandedCategories}
                  onToggleExpand={toggleCategoryExpand}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500 text-lg">No categories found.</p>
              <button
                onClick={handleAddCategory}
                className="mt-2 text-primary-600 font-medium hover:text-primary-700"
              >
                Add your first category
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Category Modal */}
      <CategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={currentCategory}
        categories={categories}
      />
      
      {/* Delete Confirmation Modal */}
      {categoryToDelete !== null && (
        <DeleteConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          hasProducts={categoryHasProducts(categoryToDelete)}
        />
      )}
    </div>
  );
};

export default Categories; 