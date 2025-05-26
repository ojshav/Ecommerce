import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AttributeValue {
  value_code: string; // Or number, depending on your API
  value_label: string;
}

interface Attribute {
  attribute_id: number;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  options: string[] | null; // For select/multiselect, these are usually labels
  values?: AttributeValue[]; // Fetched values for select/multiselect (code + label)
  required: boolean;
  help_text: string | null;
}

interface AttributeSelectionProps {
  categoryId: number | null;
  productId: number | null; // Product ID for saving attribute values
  selectedAttributes: Record<number, string | string[]>; // Current values from parent
  onAttributeSelect: (attributeId: number, value: string | string[]) => void; // To update parent state
  errors?: Record<string, any>; // For displaying validation errors
}

const AttributeSelection: React.FC<AttributeSelectionProps> = ({
  categoryId,
  productId,
  onAttributeSelect,
  selectedAttributes,
  errors = {}, // Default to empty object
}) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null); // Error for fetching attributes
  const [saveError, setSaveError] = useState<string | null>(null); // Error for saving individual attributes
  const [expandedAttributes, setExpandedAttributes] = useState<Set<number>>(new Set());

  // Base styling for inputs
  const inputBaseClass = "block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm placeholder-gray-400";
  const inputBorderClass = "border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500";
  const inputErrorBorderClass = "border-red-500 focus:ring-red-500";

  const getInputClass = (hasError: boolean) => 
    `${inputBaseClass} ${hasError ? inputErrorBorderClass : inputBorderClass}`;

  useEffect(() => {
    if (categoryId) {
      fetchAttributes(categoryId);
    } else {
      setAttributes([]);
    }
  }, [categoryId]);

  const fetchAttributes = async (catId: number) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/categories/${catId}/attributes`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch attributes');
      const data = await response.json();

      // Fetch predefined values for select/multiselect attributes
      const attributesWithValues = await Promise.all(
        (data as Attribute[]).map(async (attr) => {
          if ((attr.type === 'select' || attr.type === 'multiselect') && !attr.options && !attr.values) { // Fetch if no options/values yet
            try {
              const valuesResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/attributes/${attr.attribute_id}/values`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
              });
              if (valuesResponse.ok) {
                const fetchedValues = await valuesResponse.json();
                return { ...attr, values: fetchedValues }; // Store fetched values (code-label pairs)
              }
            } catch (e) { console.error(`Failed to fetch values for attribute ${attr.attribute_id}`, e); }
          }
          return attr;
        })
      );
      setAttributes(attributesWithValues);
    } catch (err) {
      console.error('Error fetching attributes:', err);
      setFetchError(err instanceof Error ? err.message : 'Failed to load attributes.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAttribute = useCallback((attributeId: number) => {
    setExpandedAttributes(prev => {
      const next = new Set(prev);
      if (next.has(attributeId)) next.delete(attributeId);
      else next.add(attributeId);
      return next;
    });
  }, []);

  // This handler updates the parent's state AND attempts to save to backend
  const handleValueChange = useCallback(async (attribute: Attribute, value: string | string[]) => {
    // 1. Update parent state immediately for responsiveness
    onAttributeSelect(attribute.attribute_id, value);
    setSaveError(null); // Clear previous save error

    // 2. If productId is available, attempt to save the attribute value to the backend
    if (!productId) {
      // console.warn('Product ID not available. Attribute change will be saved with the main form.');
      return; // Don't attempt to save if no product ID (e.g., new product not yet saved)
    }

    // Determine the payload. For select/multiselect, prefer value_code if available.
    let payloadValue: any;
    if (attribute.type === 'select' || attribute.type === 'multiselect') {
      const findValueCode = (valLabel: string) => attribute.values?.find(v => v.value_label === valLabel)?.value_code || valLabel;
      
      if (Array.isArray(value)) { // multiselect
        payloadValue = value.map(findValueCode);
      } else { // select
        payloadValue = findValueCode(value);
      }
    } else { // text, number, boolean
      payloadValue = value;
    }
    
    const saveData = { [attribute.attribute_id]: payloadValue };

    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/attributes/values`, {
        method: 'POST', // Or PUT, depending on your API design for updates
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save attribute value');
      }
      console.log(`Attribute ${attribute.name} value saved successfully for product ${productId}.`);
    } catch (err) {
      console.error(`Error saving attribute ${attribute.name} value:`, err);
      setSaveError(`Failed to save ${attribute.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      // Optionally, revert parent state here if save fails, but that can be complex.
      // For now, the UI reflects the optimistic update. Parent form submit will be the source of truth.
    }
  }, [onAttributeSelect, productId]);


  const renderAttributeInput = useCallback((attribute: Attribute) => {
    const attributeError = errors[attribute.attribute_id] || errors[attribute.name]; // Check for error by ID or name
    const currentValue = selectedAttributes[attribute.attribute_id];

    switch (attribute.type) {
      case 'text':
      case 'number':
        return (
          <div className="mt-2">
            <input
              type={attribute.type}
              value={(currentValue as string) || ''}
              onChange={(e) => handleValueChange(attribute, e.target.value)}
              placeholder={attribute.help_text || `Enter ${attribute.name.toLowerCase()}`}
              className={getInputClass(!!attributeError)}
              required={attribute.required}
            />
          </div>
        );
      case 'boolean':
        return (
          <div className="mt-3 flex items-center">
            <input
              type="checkbox"
              id={`attr-${attribute.attribute_id}`}
              checked={currentValue === 'true' || currentValue === true}
              onChange={(e) => handleValueChange(attribute, e.target.checked.toString())}
              className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={`attr-${attribute.attribute_id}`} className="ml-2 text-sm text-gray-700">
              {attribute.name} {attribute.required && <span className="text-red-500">*</span>}
            </label>
          </div>
        );
      case 'select':
        // Use 'values' if available (code-label pairs), otherwise 'options' (label array)
        const selectOptions = attribute.values || attribute.options?.map(opt => ({ value_label: opt, value_code: opt }));
        return (
          <div className="mt-2">
            <select
              value={(currentValue as string) || ''} // Assuming value is stored as value_label
              onChange={(e) => handleValueChange(attribute, e.target.value)}
              className={getInputClass(!!attributeError)}
              required={attribute.required}
            >
              <option value="">Select {attribute.name.toLowerCase()}</option>
              {selectOptions?.map((opt, idx) => (
                <option key={opt.value_code || idx} value={opt.value_label}> {/* Use value_label for display and storing */}
                  {opt.value_label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'multiselect':
        const multiSelectOptions = attribute.values || attribute.options?.map(opt => ({ value_label: opt, value_code: opt }));
        const currentMultiValues = (Array.isArray(currentValue) ? currentValue : []) as string[];
        return (
          <div className="mt-2 space-y-2">
            {multiSelectOptions?.map((opt, idx) => {
              const isChecked = currentMultiValues.includes(opt.value_label);
              return (
                <label key={opt.value_code || idx} className="flex items-center px-3 py-2.5 rounded-md cursor-pointer hover:bg-gray-50 border border-gray-200 has-[:checked]:bg-primary-50 has-[:checked]:border-primary-300">
                  <input
                    type="checkbox"
                    value={opt.value_label}
                    checked={isChecked}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...currentMultiValues, opt.value_label]
                        : currentMultiValues.filter(v => v !== opt.value_label);
                      handleValueChange(attribute, newValues);
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
                  />
                  <span className="text-sm text-gray-700">{opt.value_label}</span>
                </label>
              );
            })}
          </div>
        );
      default:
        return <p className="mt-2 text-sm text-gray-500">Unsupported attribute type: {attribute.type}</p>;
    }
  }, [selectedAttributes, handleValueChange, errors]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-600">Loading attributes...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-sm text-red-700">{fetchError}</p>
        <button onClick={() => categoryId && fetchAttributes(categoryId)} className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">Try again</button>
      </div>
    );
  }

  if (!categoryId) {
      return (
        <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md border border-gray-200">
            Select a category to see available attributes.
        </div>
      )
  }
  if (attributes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md border border-gray-200">
        No attributes available for this category.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {saveError && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{saveError}</div>}
      {attributes.map((attribute) => (
        <div key={attribute.attribute_id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleAttribute(attribute.attribute_id)}
            role="button"
            aria-expanded={expandedAttributes.has(attribute.attribute_id)}
            aria-controls={`attribute-content-${attribute.attribute_id}`}
          >
            <div className="flex-grow">
              <h4 className="text-sm font-medium text-gray-900">
                {attribute.name}
                {attribute.required && <span className="text-red-500 ml-1">*</span>}
              </h4>
              {attribute.help_text && (
                <p className="text-xs text-gray-500 mt-0.5">{attribute.help_text}</p>
              )}
            </div>
            <span className="p-1 text-gray-400 hover:text-gray-600">
              {expandedAttributes.has(attribute.attribute_id) ? (
                <ChevronDownIcon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
              )}
            </span>
          </div>
          {expandedAttributes.has(attribute.attribute_id) && (
            <div id={`attribute-content-${attribute.attribute_id}`} className="px-4 pb-4 border-t border-gray-200">
              {renderAttributeInput(attribute)}
              {(errors[attribute.attribute_id] || errors[attribute.name]) && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[attribute.attribute_id] || errors[attribute.name]}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttributeSelection;