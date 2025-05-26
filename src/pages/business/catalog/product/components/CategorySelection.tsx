import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
// Assuming BrandSelection is imported if used directly here, or logic is self-contained
import BrandSelection from './BrandSelection'; // Import BrandSelection

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Category {
  category_id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: Category[];
}

// Brand interface is defined in BrandSelection, but if needed here:
// interface Brand {
//   brand_id: number;
//   name: string;
//   slug: string;
// }

interface CategorySelectionProps {
  onCategorySelect: (categoryId: number) => void;
  selectedCategoryId: number | null;
  onBrandSelect: (brandId: number) => void; // Made mandatory as BrandSelection is integrated
  selectedBrandId: number | null;
  errors?: Record<string, any>;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  onCategorySelect,
  selectedCategoryId,
  onBrandSelect, // Now used directly
  selectedBrandId,
  errors,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Brand request form state (can be kept or removed if BrandSelection handles it)
  const [showBrandRequestForm, setShowBrandRequestForm] = useState(false);
  const [brandRequest, setBrandRequest] = useState({ brand_name: '', description: '', website: '' });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Update breadcrumbs when selectedCategoryId changes (e.g., on initial load in edit mode)
  useEffect(() => {
    if (selectedCategoryId && categories.length > 0) {
        const path = findPath(categories, selectedCategoryId);
        if (path) setBreadcrumbs(path);
    } else {
        setBreadcrumbs([]);
    }
  }, [selectedCategoryId, categories]);


  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      const tree = buildCategoryTree(data);
      setCategories(tree);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrandRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRequest(true);
    setRequestError(null);
    setRequestSuccess(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/brand-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...brandRequest, category_id: selectedCategoryId }),
      });
      if (!response.ok) throw new Error('Failed to submit brand request');
      setRequestSuccess(true);
      setBrandRequest({ brand_name: '', description: '', website: '' });
      setShowBrandRequestForm(false);
    } catch (err) {
      console.error('Error submitting brand request:', err);
      setRequestError('Failed to submit brand request. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const buildCategoryTree = (flatCategories: Category[]): Category[] => {
    const categoryMap = new Map<number, Category>();
    flatCategories.forEach(category => categoryMap.set(category.category_id, { ...category, children: [] }));
    const tree: Category[] = [];
    flatCategories.forEach(category => {
      const catNode = categoryMap.get(category.category_id)!;
      if (category.parent_id === null) tree.push(catNode);
      else categoryMap.get(category.parent_id)?.children?.push(catNode);
    });
    return tree;
  };

  const findPath = (searchCategories: Category[], targetId: number, path: Category[] = []): Category[] | null => {
    for (const cat of searchCategories) {
      if (cat.category_id === targetId) return [...path, cat];
      if (cat.children) {
        const found = findPath(cat.children, targetId, [...path, cat]);
        if (found) return found;
      }
    }
    return null;
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category.category_id); // This updates selectedCategoryId
    // Breadcrumb update is handled by useEffect watching selectedCategoryId
  };

  const renderCategoryTree = (treeCategories: Category[], level = 0): JSX.Element[] => {
    return treeCategories.map(category => (
      <div key={category.category_id}>
        <div
          className={`flex items-center py-2.5 px-4 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out
            ${selectedCategoryId === category.category_id ? 'bg-primary-100 border-l-4 border-primary-500 text-primary-700 font-medium' : 'text-gray-800'}
          `}
          style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
          onClick={() => handleCategoryClick(category)}
        >
          {category.children && category.children.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleCategory(category.category_id); }}
              className="p-1 mr-2 hover:bg-gray-200 rounded-full focus:outline-none"
              aria-label={expandedCategories.has(category.category_id) ? 'Collapse category' : 'Expand category'}
            >
              {expandedCategories.has(category.category_id) ? (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          <span className={`flex-1 ${!category.children?.length && level > 0 ? 'ml-6' : !category.children?.length ? 'ml-1.5' : ''}`}>
            {category.name}
          </span>
          {selectedCategoryId === category.category_id && (
             <svg className="w-5 h-5 text-primary-600 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
             </svg>
          )}
        </div>
        {expandedCategories.has(category.category_id) && category.children && (
          <div>{renderCategoryTree(category.children, level + 1)}</div>
        )}
      </div>
    ));
  };
  
  const inputBaseClass = "block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm placeholder-gray-400";
  const inputBorderClass = "border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500";
  const inputErrorBorderClass = "border-red-500 focus:ring-red-500";


  const renderBrandRequestForm = () => (
    <div className="p-4 border-t border-gray-200">
      <form onSubmit={handleBrandRequest} className="space-y-4">
        <h4 className="text-md font-medium text-gray-800">Request New Brand</h4>
        <div>
          <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
          <input type="text" id="brand_name" value={brandRequest.brand_name} onChange={(e) => setBrandRequest(prev => ({ ...prev, brand_name: e.target.value }))} required className={`${inputBaseClass} ${inputBorderClass}`} />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea id="description" value={brandRequest.description} onChange={(e) => setBrandRequest(prev => ({ ...prev, description: e.target.value }))} required rows={3} className={`${inputBaseClass} ${inputBorderClass}`} />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
          <input type="url" id="website" value={brandRequest.website} onChange={(e) => setBrandRequest(prev => ({ ...prev, website: e.target.value }))} className={`${inputBaseClass} ${inputBorderClass}`} />
        </div>
        {requestError && <div className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{requestError}</div>}
        {requestSuccess && <div className="text-green-600 text-sm p-2 bg-green-50 rounded-md">Brand request submitted successfully!</div>}
        <div className="flex justify-end space-x-3 pt-2">
          <button type="button" onClick={() => { setShowBrandRequestForm(false); setRequestError(null); setRequestSuccess(false);}} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500">Cancel</button>
          <button type="submit" disabled={isSubmittingRequest} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500">
            {isSubmittingRequest ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button onClick={fetchCategories} className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">Try again</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="p-2 bg-gray-50 rounded-md border border-gray-200">
          <ol role="list" className="flex items-center space-x-1.5">
            {breadcrumbs.map((category, index) => (
              <li key={category.category_id}>
                <div className="flex items-center">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`text-sm font-medium ${index === breadcrumbs.length - 1 ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {category.name}
                  </button>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 ml-1.5 flex-shrink-0" aria-hidden="true" />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {errors?.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}


      {/* Category Tree */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {categories.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No categories available.</div>
        ) : (
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
            {renderCategoryTree(categories)}
          </div>
        )}
      </div>

      {/* Brands Section - Now uses BrandSelection component */}
      {selectedCategoryId && (
        <div className="pt-4"> {/* Removed border and rounded-lg as BrandSelection has its own */}
          <BrandSelection
            categoryId={selectedCategoryId}
            selectedBrandId={selectedBrandId}
            onBrandSelect={onBrandSelect}
            errors={errors} // Pass down errors if brandId error needs to be shown by BrandSelection
          />
          {/* Optional: Button to request brand if BrandSelection doesn't have it */}
           {!showBrandRequestForm && (
            <div className="mt-4 text-right">
                <button
                onClick={() => setShowBrandRequestForm(true)}
                className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                Can't find the brand? Request it.
                </button>
            </div>
            )}
           {showBrandRequestForm && renderBrandRequestForm()}
        </div>
      )}
    </div>
  );
};

export default CategorySelection;