import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ShippingUnit {
  value: string;
  label: string;
  conversion: number; // conversion factor to base unit (kg for weight, cm for dimensions)
}

interface ShippingDetailsProps {
  productId: number; // Assuming this will always be a valid number when component is rendered interactively
  weight: string;
  weightUnit: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  dimensionUnit: string;
  shippingClass: string;
  onShippingChange: (field: string, value: string) => void; // Handles weight, weightUnit, dimensionUnit, shippingClass
  onDimensionsChange: (field: 'length' | 'width' | 'height', value: string) => void;
  errors?: {
    weight?: string;
    dimensions?: {
      length?: string;
      width?: string;
      height?: string;
    };
    dimensionUnit?: string;
    shippingClass?: string;
  };
}

const weightUnits: ShippingUnit[] = [
  { value: 'kg', label: 'Kilograms (kg)', conversion: 1 },
  { value: 'g', label: 'Grams (g)', conversion: 0.001 },
  { value: 'lb', label: 'Pounds (lb)', conversion: 0.453592 },
  { value: 'oz', label: 'Ounces (oz)', conversion: 0.0283495 }
];

const dimensionUnits: ShippingUnit[] = [
  { value: 'cm', label: 'Centimeters (cm)', conversion: 1 },
  { value: 'mm', label: 'Millimeters (mm)', conversion: 0.1 },
  { value: 'in', label: 'Inches (in)', conversion: 2.54 },
  { value: 'ft', label: 'Feet (ft)', conversion: 30.48 }
];

const shippingClasses = [
  { value: 'standard', label: 'Standard Shipping' },
  { value: 'express', label: 'Express Shipping' },
  { value: 'overnight', label: 'Overnight Shipping' },
  { value: 'free', label: 'Free Shipping (if applicable)' }
];

const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  productId,
  weight,
  weightUnit,
  dimensions,
  dimensionUnit,
  shippingClass,
  onShippingChange,
  onDimensionsChange,
  errors = {},
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [opError, setOpError] = useState<string | null>(null);
  const [opSuccess, setOpSuccess] = useState<string | null>(null);

  // Styling helpers
  const inputBaseClass = "block w-full rounded-md shadow-sm sm:text-sm placeholder-gray-400";
  const inputBorderClass = "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
  const inputErrorBorderClass = "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-red-900 placeholder-red-400";
  
  const getInputClass = (hasError?: boolean) => 
    `${inputBaseClass} px-3 py-2 ${hasError ? inputErrorBorderClass : inputBorderClass}`;
  
  const selectBaseClass = "block w-full rounded-md shadow-sm sm:text-sm bg-white";
  const selectClass = (hasError?: boolean) => 
    `${selectBaseClass} pl-3 pr-10 py-2 ${hasError ? inputErrorBorderClass : inputBorderClass}`;
  
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";


  const convertToBaseUnit = (valueStr: string, unit: string, units: ShippingUnit[]): number | null => {
    const numericValue = parseFloat(valueStr);
    if (isNaN(numericValue)) return null;
    const unitConfig = units.find(u => u.value === unit);
    if (!unitConfig) return numericValue; // Or handle error if unit not found
    return numericValue * unitConfig.conversion;
  };
  
  const formatNumberForDisplay = (num: number | null | undefined) => 
    num !== null && num !== undefined && !isNaN(num) ? num.toFixed(2) : 'N/A';


  const handleUpdateShippingAPI = async () => {
    if (!productId) { 
      setOpError('Product ID is missing. Cannot save shipping details.'); 
      return; 
    }
    setIsProcessing(true);
    setOpError(null); 
    setOpSuccess(null);
    try {
      const payload = {
        weight: convertToBaseUnit(weight, weightUnit, weightUnits),
        dimensions: {
          length: convertToBaseUnit(dimensions.length, dimensionUnit, dimensionUnits),
          width: convertToBaseUnit(dimensions.width, dimensionUnit, dimensionUnits),
          height: convertToBaseUnit(dimensions.height, dimensionUnit, dimensionUnits),
        },
        shipping_class: shippingClass,
        // Send units if your backend expects/stores them explicitly for shipping records
        weight_unit: weightUnit, 
        dimension_unit: dimensionUnit,
      };

      // Filter out null values from payload before sending, if backend prefers omitting them
      const cleanPayload = {
        ...payload,
        weight: payload.weight === null ? undefined : payload.weight,
        dimensions: {
            length: payload.dimensions.length === null ? undefined : payload.dimensions.length,
            width: payload.dimensions.width === null ? undefined : payload.dimensions.width,
            height: payload.dimensions.height === null ? undefined : payload.dimensions.height,
        }
      };

      console.log('Sending shipping data for product:', productId, cleanPayload);

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/shipping`, {
        method: 'POST', // Or PUT if your API updates this way
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(cleanPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update shipping details. Server returned an error.' }));
        throw new Error(errorData.message || `Failed to update shipping details (Status: ${response.status})`);
      }
      // const updatedData = await response.json(); // Process if API returns updated data
      setOpSuccess('Shipping details updated successfully!');
    } catch (err) {
      console.error('Error updating shipping details:', err);
      setOpError(err instanceof Error ? err.message : 'An unknown error occurred while updating shipping details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
      {opError && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
          {opError}
        </div>
      )}
      {opSuccess && (
        <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm">
          {opSuccess}
        </div>
      )}

      <div>
        <label htmlFor="ship-weight" className={labelClass}>Weight</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input 
            type="number" 
            id="ship-weight" 
            value={weight} 
            onChange={(e) => onShippingChange('weight', e.target.value)} 
            step="0.001" 
            min="0" 
            placeholder="0.000"
            className={`flex-1 rounded-l-md ${getInputClass(!!errors?.weight)}`} 
          />
          <select 
            id="ship-weightUnit" 
            value={weightUnit} 
            onChange={(e) => onShippingChange('weightUnit', e.target.value)} 
            className={`${selectClass(!!errors?.weight)} rounded-l-none rounded-r-md border-l-0`}
          >
            {weightUnits.map(unit => <option key={unit.value} value={unit.value}>{unit.label}</option>)}
          </select>
        </div>
        {errors?.weight && <p className="mt-1 text-xs text-red-600">{errors.weight}</p>}
      </div>

      <div>
        <label className={labelClass}>Dimensions</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="ship-length" className="block text-xs text-gray-500 mb-0.5">Length</label>
            <input type="number" id="ship-length" value={dimensions.length} onChange={(e) => onDimensionsChange('length', e.target.value)} step="0.01" min="0" placeholder="L" className={getInputClass(!!errors?.dimensions?.length)} />
            {errors?.dimensions?.length && <p className="mt-1 text-xs text-red-600">{errors.dimensions.length}</p>}
          </div>
          <div>
            <label htmlFor="ship-width" className="block text-xs text-gray-500 mb-0.5">Width</label>
            <input type="number" id="ship-width" value={dimensions.width} onChange={(e) => onDimensionsChange('width', e.target.value)} step="0.01" min="0" placeholder="W" className={getInputClass(!!errors?.dimensions?.width)} />
            {errors?.dimensions?.width && <p className="mt-1 text-xs text-red-600">{errors.dimensions.width}</p>}
          </div>
          <div>
            <label htmlFor="ship-height" className="block text-xs text-gray-500 mb-0.5">Height</label>
            <input type="number" id="ship-height" value={dimensions.height} onChange={(e) => onDimensionsChange('height', e.target.value)} step="0.01" min="0" placeholder="H" className={getInputClass(!!errors?.dimensions?.height)} />
            {errors?.dimensions?.height && <p className="mt-1 text-xs text-red-600">{errors.dimensions.height}</p>}
          </div>
        </div>
        <div className="mt-2">
           <label htmlFor="ship-dimensionUnit" className="sr-only">Dimension Unit</label>
          <select 
            id="ship-dimensionUnit" 
            value={dimensionUnit} 
            onChange={(e) => onShippingChange('dimensionUnit', e.target.value)} 
            className={selectClass(!!errors?.dimensionUnit)}
          >
            {dimensionUnits.map(unit => <option key={unit.value} value={unit.value}>{unit.label}</option>)}
          </select>
           {errors?.dimensionUnit && <p className="mt-1 text-xs text-red-600">{errors.dimensionUnit}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="ship-shippingClass" className={labelClass}>Shipping Class</label>
        <select 
          id="ship-shippingClass" 
          value={shippingClass} 
          onChange={(e) => onShippingChange('shippingClass', e.target.value)} 
          className={selectClass(!!errors?.shippingClass)}
        >
          <option value="">Select shipping class...</option>
          {shippingClasses.map(sc => <option key={sc.value} value={sc.value}>{sc.label}</option>)}
        </select>
        {errors?.shippingClass && <p className="mt-1 text-xs text-red-600">{errors.shippingClass}</p>}
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200 text-sm text-indigo-700 space-y-1">
        <h4 className="font-medium mb-1 text-indigo-800">Shipping Summary (Base Units):</h4>
        <p>Weight: <span className="font-semibold">{formatNumberForDisplay(convertToBaseUnit(weight, weightUnit, weightUnits))} kg</span></p>
        <p>Dimensions (L×W×H): <span className="font-semibold">{formatNumberForDisplay(convertToBaseUnit(dimensions.length, dimensionUnit, dimensionUnits))} × {formatNumberForDisplay(convertToBaseUnit(dimensions.width, dimensionUnit, dimensionUnits))} × {formatNumberForDisplay(convertToBaseUnit(dimensions.height, dimensionUnit, dimensionUnits))} cm</span></p>
        <p>Selected Class: <span className="font-semibold">{shippingClasses.find(c=>c.value === shippingClass)?.label || 'Not selected'}</span></p>
      </div>

      <div className="flex justify-end pt-2">
        <button 
          type="button" 
          onClick={handleUpdateShippingAPI} 
          disabled={isProcessing || !productId} 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Updating...' : 'Update Shipping Details'}
        </button>
      </div>
    </div>
  );
};

export default ShippingDetails;