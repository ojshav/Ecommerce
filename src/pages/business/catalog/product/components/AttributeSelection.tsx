import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AttributeValue {
  value_code: string;
  value_label: string;
}

interface Attribute {
  attribute_id: number;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  options: string[] | null; 
  required: boolean;
  help_text: string | null;
  values?: AttributeValue[]; 
}

interface AttributeSelectionProps {
  categoryId: number | null;
  productId: number | null; // productId is crucial for saving attribute values
  selectedAttributes: Record<number, string | string[]>;
  onAttributeSelect: (attributeId: number, value: string | string[]) => void;
  errors?: Record<string, any>;
}

const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  categoryId,
  productId,
  onAttributeSelect,
  selectedAttributes,
  // errors, // Keep for potential future use
}) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedAttributes, setExpandedAttributes] = useState<Set<number>>(new Set());

  const inputClassName = (hasError?: boolean) => // Define consistent input styling
    `block w-full rounded-md shadow-sm sm:text-sm p-2.5 ${
      hasError
        ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
    }`;

  useEffect(() => {
    if (categoryId) {
      fetchAttributes(categoryId);
    } else {
      setAttributes([]);
    }
  }, [categoryId]);

  const fetchAttributes = async (categoryId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/categories/${categoryId}/attributes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attributes');
      }

      let data: Attribute[] = await response.json();
      
      const attributesWithValuesPromises = data.map(async (attr) => {
        if ((attr.type === 'select' || attr.type === 'multiselect') && !attr.options?.length) { 
          try {
            const valuesResponse = await fetch(
              `${API_BASE_URL}/api/merchant-dashboard/attributes/${attr.attribute_id}/values`,
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            if (valuesResponse.ok) {
              const fetchedValues: AttributeValue[] = await valuesResponse.json();
              return { ...attr, values: fetchedValues, options: fetchedValues.map(v => v.value_label) };
            }
          } catch (valueError) {
            console.error(`Failed to fetch values for attribute ${attr.attribute_id}:`, valueError);
          }
        }
        return attr;
      });
      
      const attributesWithValues = await Promise.all(attributesWithValuesPromises);
      setAttributes(attributesWithValues);

    } catch (err) {
      console.error('Error fetching attributes:', err);
      setError('Failed to load attributes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAttribute = useCallback((attributeId: number) => {
    setExpandedAttributes(prev => {
      const next = new Set(prev);
      if (next.has(attributeId)) {
        next.delete(attributeId);
      } else {
        next.add(attributeId);
      }
      return next;
    });
  }, []);

  const handleValueChange = useCallback((attributeId: number, value: string | string[]) => {
    onAttributeSelect(attributeId, value);
  }, [onAttributeSelect]);


  const handleValueSelectAndSave = useCallback(async (attribute: Attribute, value: string | string[]) => {
    if (!onAttributeSelect) {
      console.error('onAttributeSelect is not provided');
      setError('Configuration error: onAttributeSelect is missing.');
      return;
    }
    if (!productId) {
      console.error('Product ID is required to save attribute values');
      setError('Product must be saved first to set attributes. Please go back to "Product Details" and save.');
      return;
    }

    onAttributeSelect(attribute.attribute_id, value); 

    try {
      let valueToSend: any;
      if (attribute.type === 'multiselect') {
        valueToSend = (value as string[]).map(label => {
          const attrValueObj = attribute.values?.find(v => v.value_label === label);
          return attrValueObj ? attrValueObj.value_code : label; 
        });
      } else if (attribute.type === 'select') {
        const attrValueObj = attribute.values?.find(v => v.value_label === (value as string));
        valueToSend = attrValueObj ? attrValueObj.value_code : value; 
      } else {
        valueToSend = value;
      }
      
      // Corrected payload structure:
      // The backend expects a flat dictionary where keys are attribute_ids.
      const payload = {
        [attribute.attribute_id]: valueToSend
      };

      console.log("Sending attribute payload:", JSON.stringify(payload));

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/attributes/values`, {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json(); 
      if (!response.ok) {
        console.error('Error response data:', responseData);
        throw new Error(responseData.message || responseData.error || `Failed to save attribute value (Status: ${response.status})`);
      }
      console.log('Attribute value saved successfully:', responseData);
      setError(null); 

    } catch (err) {
      console.error('Error saving attribute value:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while saving attribute.');
      // Optionally revert the local state change if the API call fails
      // This can be complex if the original value isn't easily available or if multiple changes happened fast
      // For now, we'll rely on the user to correct if an error occurs.
      // Example: onAttributeSelect(attribute.attribute_id, selectedAttributes[attribute.attribute_id]);
    }
  }, [onAttributeSelect, productId, API_BASE_URL]); // selectedAttributes removed to avoid stale closures if not needed for revert


  const renderAttributeValue = useCallback((attribute: Attribute) => {
    const currentValue = selectedAttributes[attribute.attribute_id];

    switch (attribute.type) {
      case 'multiselect':
        return (
          <div className="mt-2 space-y-2">
            {(attribute.options || []).map((option, index) => {
              const selectedValues = (currentValue as string[]) || [];
              const isSelected = selectedValues.includes(option);
              return (
                <label
                  key={index}
                  className={`block px-3 py-2.5 rounded-md cursor-pointer border flex items-center transition-colors duration-150 ${
                    isSelected ? 'bg-primary-100 border-primary-300 text-primary-700' : 'hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      const newValues = isSelected
                        ? selectedValues.filter(v => v !== option)
                        : [...selectedValues, option];
                      handleValueSelectAndSave(attribute, newValues);
                    }}
                    className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        );

      case 'select':
        return (
          <div className="mt-2 space-y-2">
            {(attribute.options || []).map((option, index) => (
              <div
                key={index}
                className={`px-3 py-2.5 rounded-md cursor-pointer border transition-colors duration-150 ${
                  currentValue === option
                    ? 'bg-primary-100 border-primary-300 text-primary-700 font-medium'
                    : 'hover:bg-gray-50 border-gray-300'
                }`}
                onClick={() => handleValueSelectAndSave(attribute, option)}
              >
                {option}
              </div>
            ))}
          </div>
        );

      case 'number':
        return (
          <div className="mt-2">
            <input
              type="number"
              value={(currentValue as string) || ''}
              onChange={(e) => handleValueChange(attribute.attribute_id, e.target.value)} 
              onBlur={(e) => handleValueSelectAndSave(attribute, e.target.value)} 
              placeholder={`Enter ${attribute.name.toLowerCase()}`}
              className={inputClassName()} 
            />
          </div>
        );

      case 'boolean':
        return (
          <div className="mt-3 flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentValue === 'true'}
                onChange={(e) => handleValueSelectAndSave(attribute, e.target.checked.toString())}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-700">
                {currentValue === 'true' ? 'Yes' : 'No'}
              </span>
            </label>
          </div>
        );

      default: // text
        return (
          <div className="mt-2">
            <input
              type="text"
              value={(currentValue as string) || ''}
              onChange={(e) => handleValueChange(attribute.attribute_id, e.target.value)} 
              onBlur={(e) => handleValueSelectAndSave(attribute, e.target.value)} 
              placeholder={`Enter ${attribute.name.toLowerCase()}`}
              className={inputClassName()} 
            />
          </div>
        );
    }
  }, [handleValueChange, handleValueSelectAndSave, selectedAttributes, inputClassName]);

  if (!categoryId) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md">
        Please select a category to see available attributes.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Persistent error related to loading attributes
  const loadingError = error && !attributes.length; 
  // Non-critical error (e.g. save error)
  const saveError = error && attributes.length > 0;

  if (loadingError) { 
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => categoryId && fetchAttributes(categoryId)}
          className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }
  
  if (attributes.length === 0 && !isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md">
        No attributes available for this category.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {saveError && ( 
        <div className="p-3 mb-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="ml-2 text-xs font-semibold text-red-800 hover:text-red-900"
          >
            DISMISS
          </button>
        </div>
      )}
      {attributes.map((attribute) => (
        <div key={attribute.attribute_id} className="border rounded-lg overflow-hidden shadow-sm">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleAttribute(attribute.attribute_id)}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-900">{attribute.name}</h3>
              {attribute.required && (
                <span className="text-xs text-red-500 font-semibold">Required</span>
              )}
              {attribute.help_text && (
                <p className="text-xs text-gray-500 mt-1">{attribute.help_text}</p>
              )}
            </div>
            <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
              {expandedAttributes.has(attribute.attribute_id) ? (
                <ChevronDownIcon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {expandedAttributes.has(attribute.attribute_id) && (
            <div className="px-4 pb-4 border-t pt-4 bg-white">
              {renderAttributeValue(attribute)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttributeSelection;