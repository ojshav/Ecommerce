import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TaxCategory {
  id: number;
  name: string;
  tax_rate: number; // Corrected from 'rate' to 'tax_rate'
  description: string | null;
}

interface TaxCategorySelectionProps {
  selectedTaxCategoryId: number | null;
  onTaxCategorySelect: (taxCategoryId: number) => void;
  errors?: Record<string, any>;
}

const TaxCategorySelection: React.FC<TaxCategorySelectionProps> = ({
  onTaxCategorySelect,
  selectedTaxCategoryId,
  errors,
}) => {
  const [taxCategories, setTaxCategories] = useState<TaxCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null); // Renamed from 'error' to 'fetchError'

  useEffect(() => {
    fetchTaxCategories();
  }, []);

  const fetchTaxCategories = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/tax-categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to fetch tax categories');
      }
      const data = await response.json();
      if (Array.isArray(data) && data.every(item => typeof item.id === 'number' && typeof item.tax_rate === 'number')) {
        setTaxCategories(data);
      } else {
        console.error("Fetched tax categories data is not in expected format:", data);
        throw new Error("Received invalid data format for tax categories.");
      }
    } catch (err) {
      console.error('Error fetching tax categories:', err);
      setFetchError(err instanceof Error ? err.message : 'Failed to load tax categories.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-600">Loading tax categories...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-sm text-red-700">{fetchError}</p>
        <button
          onClick={fetchTaxCategories}
          className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        >
          Try again
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {errors?.taxCategoryId && <p className="text-sm text-red-600 mb-2">{errors.taxCategoryId}</p>}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {taxCategories.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-200">
            {taxCategories.map((category) => {
              const isSelected = selectedTaxCategoryId === category.id;
              return (
                <li
                  key={category.id}
                  className={`flex items-center justify-between px-4 py-3.5 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out
                    ${isSelected ? 'bg-primary-100 border-l-4 border-primary-500' : ''}
                  `}
                  onClick={() => onTaxCategorySelect(category.id)}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0} // Make it focusable
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onTaxCategorySelect(category.id);}}
                >
                  <div className="flex-grow">
                    <p className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-gray-900'}`}>
                      {category.name}
                    </p>
                    {category.description && (
                      <p className={`text-xs ${isSelected ? 'text-primary-600' : 'text-gray-500'}`}>
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center ml-4 flex-shrink-0">
                    <span className={`text-sm font-semibold ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                      {category.tax_rate}% {/* Corrected to tax_rate */}
                    </span>
                    {isSelected && (
                      <CheckCircleIcon className="ml-3 h-5 w-5 text-primary-600" aria-hidden="true" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p className="font-medium">No tax categories available.</p>
            <p className="text-sm mt-1">You might need to configure tax categories in your store settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCategorySelection;