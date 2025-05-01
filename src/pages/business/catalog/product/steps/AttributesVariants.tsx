import React, { useState } from 'react';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type Attribute = {
  id: string;
  name: string;
  values: string[];
};

type Variant = {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: string;
  attributes: Record<string, string>;
};

type ProductData = {
  attributes: Attribute[];
  variants: Variant[];
};

type AttributesVariantsProps = {
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  errors: Record<string, string>;
};

// Mock attribute options for dropdown
const AVAILABLE_ATTRIBUTES = [
  { id: 'color', name: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'] },
  { id: 'size', name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  { id: 'material', name: 'Material', values: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen'] },
  { id: 'style', name: 'Style', values: ['Casual', 'Formal', 'Sport', 'Vintage'] }
];

const AttributesVariants: React.FC<AttributesVariantsProps> = ({ data, updateData, errors }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [attributeToAdd, setAttributeToAdd] = useState('');
  const [customValue, setCustomValue] = useState('');
  
  // Add a new attribute to the product
  const addAttribute = () => {
    if (!attributeToAdd) return;
    
    const attributeExists = data.attributes.some(attr => attr.id === attributeToAdd);
    if (attributeExists) return;
    
    const selectedAttr = AVAILABLE_ATTRIBUTES.find(attr => attr.id === attributeToAdd);
    if (!selectedAttr) return;
    
    const newAttributes = [
      ...data.attributes,
      { id: selectedAttr.id, name: selectedAttr.name, values: [] }
    ];
    
    updateData({ attributes: newAttributes });
    setAttributeToAdd('');
  };
  
  // Remove an attribute
  const removeAttribute = (id: string) => {
    const newAttributes = data.attributes.filter(attr => attr.id !== id);
    updateData({ attributes: newAttributes });
  };
  
  // Add a value to an attribute
  const addAttributeValue = (attributeId: string) => {
    if (!customValue.trim()) return;
    
    const newAttributes = data.attributes.map(attr => {
      if (attr.id === attributeId) {
        // Check if value already exists
        if (attr.values.includes(customValue.trim())) return attr;
        
        return {
          ...attr,
          values: [...attr.values, customValue.trim()]
        };
      }
      return attr;
    });
    
    updateData({ attributes: newAttributes });
    setCustomValue('');
  };
  
  // Remove a value from an attribute
  const removeAttributeValue = (attributeId: string, value: string) => {
    const newAttributes = data.attributes.map(attr => {
      if (attr.id === attributeId) {
        return {
          ...attr,
          values: attr.values.filter(v => v !== value)
        };
      }
      return attr;
    });
    
    updateData({ attributes: newAttributes });
  };
  
  // Generate variants based on attributes
  const generateVariants = () => {
    // Only generate if we have attributes with values
    const attributesWithValues = data.attributes.filter(attr => attr.values.length > 0);
    if (attributesWithValues.length === 0) return;
    
    // Get all possible combinations
    const generateCombinations = (attributes: Attribute[], current: Record<string, string> = {}, index: number = 0): Record<string, string>[] => {
      if (index === attributes.length) {
        return [current];
      }
      
      const attribute = attributes[index];
      const combinations: Record<string, string>[] = [];
      
      for (const value of attribute.values) {
        const newCombination = { ...current, [attribute.id]: value };
        combinations.push(...generateCombinations(attributes, newCombination, index + 1));
      }
      
      return combinations;
    };
    
    const combinations = generateCombinations(attributesWithValues);
    
    // Create variant objects from combinations
    const newVariants = combinations.map((combination, idx) => {
      // Generate variant name from combination values
      const variantName = Object.entries(combination)
        .map(([attrId, value]) => {
          const attr = attributesWithValues.find(a => a.id === attrId);
          return `${attr?.name}: ${value}`;
        })
        .join(', ');
      
      return {
        id: `variant_${Date.now()}_${idx}`,
        name: variantName,
        sku: '',
        price: '',
        stock: '',
        attributes: combination
      };
    });
    
    updateData({ variants: newVariants });
    setShowVariants(true);
  };
  
  // Update a variant property
  const updateVariant = (variantId: string, field: string, value: string) => {
    const newVariants = data.variants.map(variant => {
      if (variant.id === variantId) {
        return { ...variant, [field]: value };
      }
      return variant;
    });
    
    updateData({ variants: newVariants });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Attributes & Variants</h2>
      
      {/* Product Attributes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Product Attributes</h3>
          <div className="flex space-x-2">
            <select
              value={attributeToAdd}
              onChange={(e) => setAttributeToAdd(e.target.value)}
              className="block w-48 pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select an attribute</option>
              {AVAILABLE_ATTRIBUTES.filter(attr => 
                !data.attributes.some(a => a.id === attr.id)
              ).map(attr => (
                <option key={attr.id} value={attr.id}>
                  {attr.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addAttribute}
              disabled={!attributeToAdd}
              className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </div>
        
        {data.attributes.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-gray-500">No attributes added yet. Add some attributes to create product variants.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.attributes.map(attribute => (
              <div key={attribute.id} className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">{attribute.name}</h4>
                  <button
                    type="button"
                    onClick={() => removeAttribute(attribute.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a new value"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => addAttributeValue(attribute.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {attribute.values.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {attribute.values.map(value => (
                        <div key={value} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {value}
                          <button
                            type="button"
                            onClick={() => removeAttributeValue(attribute.id, value)}
                            className="ml-1.5 text-primary-600 hover:text-primary-800"
                          >
                            <TrashIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No values added yet.</p>
                  )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={generateVariants}
              disabled={data.attributes.every(attr => attr.values.length === 0)}
              className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
              Generate Variants
            </button>
          </div>
        )}
      </div>
      
      {/* Product Variants */}
      {data.variants.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Product Variants ({data.variants.length})</h3>
            <button
              type="button"
              onClick={() => setShowVariants(!showVariants)}
              className="text-primary-600 hover:text-primary-800 flex items-center text-sm"
            >
              {showVariants ? (
                <>
                  <ChevronUpIcon className="h-4 w-4 mr-1" />
                  Hide Variants
                </>
              ) : (
                <>
                  <ChevronDownIcon className="h-4 w-4 mr-1" />
                  Show Variants
                </>
              )}
            </button>
          </div>
          
          {showVariants && (
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.variants.map(variant => (
                    <tr key={variant.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {variant.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="SKU"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                          </div>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => updateVariant(variant.id, 'price', e.target.value)}
                            className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Price"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={variant.stock}
                          onChange={(e) => updateVariant(variant.id, 'stock', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Stock"
                          min="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttributesVariants; 