import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TaxCategory {
  id: number;
  name: string;
  rate: number;
  description: string;
}

interface TaxCategorySelectionProps {
  selectedTaxCategoryId: number | null;
  onTaxCategorySelect: (taxCategoryId: number) => void;
  errors?: Record<string, any>;
}

const TaxCategorySelection: React.FC<TaxCategorySelectionProps> = ({
  onTaxCategorySelect,
  selectedTaxCategoryId,
}) => {
  const [taxCategories, setTaxCategories] = useState<TaxCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTaxCategories();
  }, []);

  const fetchTaxCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/tax-categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tax categories');
      }

      const data = await response.json();
      console.log('Tax categories fetched:', data);
      setTaxCategories(data);
    } catch (error) {
      console.error('Error fetching tax categories:', error);
      setError('Failed to load tax categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Debug: Check the structure of tax categories
  useEffect(() => {
    console.log('Current tax categories state:', taxCategories);
    if (taxCategories.length > 0) {
      console.log('Sample category object:', taxCategories[0]);
      console.log('Category ID type:', typeof taxCategories[0].id);
      
      // Check if tax_category_id is undefined for any item
      const missingIds = taxCategories.filter(cat => cat.id === undefined);
      if (missingIds.length > 0) {
        console.warn('Warning: Found categories without tax_category_id:', missingIds);
      }
    }
  }, [taxCategories]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchTaxCategories}
          className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }
  
  console.log('Before rendering - tax categories:', taxCategories);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        {taxCategories.length > 0 ? (
          taxCategories.map((category, index) => {
            console.log(`Rendering category at index ${index}:`, category);
            return (
              <div
                key={category.id || `temp-key-${index}`}
                className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  selectedTaxCategoryId === category.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => onTaxCategorySelect(category.id)}
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  {category.description && (
                    <div className="text-xs text-gray-500">{category.description}</div>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {category.rate}%
                  </span>
                  {selectedTaxCategoryId === category.id && (
                    <svg
                      className="ml-2 h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            No tax categories available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCategorySelection;