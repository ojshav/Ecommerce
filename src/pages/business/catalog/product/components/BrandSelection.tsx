import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Brand {
  brand_id: number;
  name: string;
  slug: string;
  icon_url: string | null;
}

interface BrandSelectionProps {
  categoryId: number; // Changed from categoryId: number | null, assuming it's always present when this component is rendered
  selectedBrandId: number | null;
  onBrandSelect: (brandId: number) => void;
  errors?: Record<string, any>; // To display errors like errors.brandId
}

const BrandSelection: React.FC<BrandSelectionProps> = ({
  categoryId,
  onBrandSelect,
  selectedBrandId,
  errors,
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // categoryId is now guaranteed to be a number by prop type, so no need to check for null
    fetchBrands(categoryId);
  }, [categoryId]);

  const fetchBrands = async (catId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/brands/categories/${catId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to fetch brands');
      }
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError(err instanceof Error ? err.message : 'Failed to load brands.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inputBaseClass = "block w-full pl-10 pr-3 py-2.5 border rounded-md leading-5 bg-white placeholder-gray-400 sm:text-sm";
  const inputBorderClass = "border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  // const inputErrorBorderClass = "border-red-500 focus:ring-red-500"; // If search itself can have error

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-800">Select Brand</h3>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search brands..."
          className={`${inputBaseClass} ${inputBorderClass}`}
        />
      </div>
      {errors?.brandId && <p className="mt-1 text-sm text-red-600">{errors.brandId}</p>}


      {/* Brand List */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="ml-2 text-sm text-gray-500">Loading brands...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => fetchBrands(categoryId)}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Try again
            </button>
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p className="font-medium">
              {searchTerm ? 'No brands found matching your search.' : 'No brands available for this category.'}
            </p>
            {/* Optionally, add a "Request Brand" button here if CategorySelection doesn't handle it */}
          </div>
        ) : (
          <ul role="list" className="max-h-72 overflow-y-auto divide-y divide-gray-200">
            {filteredBrands.map((brand) => (
              <li
                key={brand.brand_id}
                className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out
                  ${selectedBrandId === brand.brand_id ? 'bg-primary-100 border-l-4 border-primary-500' : ''}
                `}
                onClick={() => onBrandSelect(brand.brand_id)}
              >
                {brand.icon_url && (
                  <img
                    src={brand.icon_url}
                    alt={`${brand.name} logo`}
                    className="h-10 w-10 rounded-full object-contain mr-4 flex-shrink-0 bg-white border border-gray-200"
                  />
                )}
                <div className="flex-grow">
                  <p className={`text-sm font-medium ${selectedBrandId === brand.brand_id ? 'text-primary-700' : 'text-gray-900'}`}>
                    {brand.name}
                  </p>
                  {brand.slug && (
                    <p className={`text-xs ${selectedBrandId === brand.brand_id ? 'text-primary-600' : 'text-gray-500'}`}>
                      {brand.slug}
                    </p>
                  )}
                </div>
                {selectedBrandId === brand.brand_id && (
                  <svg className="w-5 h-5 text-primary-600 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BrandSelection;