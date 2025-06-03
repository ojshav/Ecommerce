import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TaxCategory {
  id: number;
  name: string;
  tax_rate: number; // Corrected from rate to tax_rate
  description: string;
}

interface TaxCategorySelectionProps {
  selectedTaxCategoryId: number | null;
  onTaxCategorySelect: (taxCategoryId: number) => void;
  errors?: Record<string, any>; // Keep for consistency
}

const TaxCategorySelection: React.FC<TaxCategorySelectionProps> = ({
  onTaxCategorySelect,
  selectedTaxCategoryId,
  // errors, // Keep for consistency
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600"></div>
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
  
  return (
    <div className="space-y-4">
       <div className="bg-gray-50 px-4 py-3 border-b rounded-t-lg">
         <h3 className="text-md font-semibold text-gray-800">Select Tax Category</h3>
      </div>
      <div className="border rounded-b-lg overflow-hidden shadow-sm">
        {taxCategories.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {taxCategories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                  selectedTaxCategoryId === category.id ? 'bg-orange-100 text-orange-800' : 'text-gray-900'
                }`}
                onClick={() => onTaxCategorySelect(category.id)}
              >
                <div>
                  <div className={`text-sm font-medium ${selectedTaxCategoryId === category.id ? 'text-orange-700' : 'text-gray-900'}`}>{category.name}</div>
                  {category.description && (
                    <div className={`text-xs ${selectedTaxCategoryId === category.id ? 'text-orange-600' : 'text-gray-500'}`}>{category.description}</div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${selectedTaxCategoryId === category.id ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-800'}`}>
                    {category.tax_rate.toFixed(1)}%
                  </span>
                  {selectedTaxCategoryId === category.id && (
                    <CheckCircleIcon className="h-6 w-6 text-orange-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No tax categories available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCategorySelection;