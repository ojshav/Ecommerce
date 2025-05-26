import React, { useState, useEffect } from 'react';
import ProductMediaUpload from './ProductMediaUpload';
import ShippingDetails from './ShippingDetails';
import ProductMeta from './ProductMeta';
import ProductVariants from './ProductVariants';
import AttributeSelection from './AttributeSelection'; 
import { ArrowPathIcon } from '@heroicons/react/24/outline';



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // e.g., http://127.0.0.1:5000

interface Variant { 
    id: string; 
    sku: string; 
    price: string; 
    stock: string; 
    attributes: Array<{ name: string; value?: string }>; 
    media?: any[]; 
    variant_id?: number; 
}

interface CoreProductInfoProps {
  mode: 'new' | 'edit' | 'view';
  productId: number | null; // Actual product ID from parent (AddProducts)
  isBaseProductSaved: boolean;
  onBaseProductSaveSuccess: (productId: number, updatedSku?: string) => void;

  // Form data fields directly managed by AddProducts, passed as props
  name: string; 
  description: string; // This is the main product_description
  shortDescription: string; 
  fullDescription: string; 
  sku: string;
  costPrice: string; 
  sellingPrice: string; 
  specialPrice: string; 
  specialPriceStart: string; 
  specialPriceEnd: string;
  categoryId: number | null; 
  brandId: number | null;
  
  attributes: Record<number, string | string[]>; 
  media: File[]; // For new file uploads via AddProducts main submit
  
  weight: string; 
  weightUnit: string; 
  dimensions: { length: string; width: string; height: string; };
  dimensionUnit: string; 
  shippingClass: string;
  
  metaTitle: string; 
  metaDescription: string; 
  metaKeywords: string;
  
  variants: Variant[];
  
  onInfoChange: (field: string, value: any) => void; // To update AddProducts.formData
  errors?: Record<string, any>;
}

const CoreProductInfo: React.FC<CoreProductInfoProps> = ({
  mode, productId: parentProductId, isBaseProductSaved, onBaseProductSaveSuccess,
  name, description, shortDescription, fullDescription, sku,
  costPrice, sellingPrice, specialPrice, specialPriceStart, specialPriceEnd,
  categoryId, brandId,
  attributes, media,
  weight, weightUnit, dimensions, dimensionUnit, shippingClass,
  metaTitle, metaDescription, metaKeywords,
  variants,
  onInfoChange,
  errors = {},
}) => {
  const [isSavingCore, setIsSavingCore] = useState(false);
  const [coreSaveError, setCoreSaveError] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [internalProductId, setInternalProductId] = useState<number | null>(parentProductId);

  useEffect(() => {
    setInternalProductId(parentProductId);
  }, [parentProductId]);

  // SKU Generation based on your old working code's logic
  const generateSKU = (productName: string): string => {
    if (!productName) return '';
    const cleanName = productName.replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase().trim();
    const words = cleanName.split(/\s+/);
    const skuParts = words.map(word => word.slice(0, 3));
    const timestamp = Date.now().toString().slice(-4); // Unique enough for client-side suggestion
    return `${skuParts.join('-')}-${timestamp}`.slice(0,25); // Ensure not too long
  };

  // Update SKU in AddProducts.formData when product name changes (if SKU is empty and it's a new product)
  useEffect(() => {
    if (name && !sku && mode === 'new' && !isBaseProductSaved) {
      onInfoChange('sku', generateSKU(name));
    }
  }, [name, sku, mode, isBaseProductSaved, onInfoChange]);

  // Calculate discount (margin)
  useEffect(() => {
    const cost = parseFloat(costPrice);
    const selling = parseFloat(sellingPrice);
    if (!isNaN(cost) && !isNaN(selling) && cost > 0) {
      setDiscount(Math.round(((selling - cost) / cost) * 100 * 100) / 100);
    } else {
      setDiscount(0);
    }
  }, [costPrice, sellingPrice]);

  const validateCoreFields = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Product name is required.';
    if (!description.trim()) newErrors.description = 'Main product description is required.'; // Make description mandatory
    if (!sku.trim()) newErrors.sku = 'SKU is required.';
    if (!categoryId) newErrors.categoryIdValidate = 'Category must be selected (previous step).'; // Use different key to not conflict with AddProducts errors
    if (!brandId) newErrors.brandIdValidate = 'Brand must be selected (previous step).';
    if (!sellingPrice || parseFloat(sellingPrice) <= 0) newErrors.sellingPrice = 'A valid selling price is required.';
    if (costPrice && parseFloat(costPrice) < 0) newErrors.costPrice = 'Cost price cannot be negative.';
    
    // If there are errors, update the local error state for CoreProductInfo
    // and also inform the parent (AddProducts) if its error structure can accommodate this.
    // For simplicity, we'll use coreSaveError for now.
    if (Object.keys(newErrors).length > 0) {
        // Construct a user-friendly message from newErrors
        const errorMessages = Object.values(newErrors).join(' ');
        setCoreSaveError(`Please correct the following: ${errorMessages}`);
        // You might also want to pass these specific field errors up to AddProducts
        // onInfoChange('errors', { ...errors, ...newErrors }); // If AddProducts expects this
        return false;
    }
    setCoreSaveError(null);
    return true;
  };

  const handleCoreProductSave = async () => {
    if (!validateCoreFields()) return;
    
    setIsSavingCore(true);
    setCoreSaveError(null);
    try {
      // Payload based on your old working code
      const payload = {
        product_name: name,
        product_description: description, // Ensure this is passed
        sku: sku,
        cost_price: costPrice ? parseFloat(costPrice) : null, // Handle empty string for costPrice
        selling_price: parseFloat(sellingPrice),
        special_price: specialPrice ? parseFloat(specialPrice) : null,
        special_start: specialPriceStart || null,
        special_end: specialPriceEnd || null,
        category_id: categoryId,
        brand_id: brandId,
        discount_percentage: discount, // This was in your old code; ensure backend handles it
        // Add other fields that are part of the "core" product creation if needed
        // e.g., short_description, full_description if they are part of the main product table
      };
      console.log("Saving core product with payload:", payload);

      // CORRECTED API ENDPOINT
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to save product. Server returned an unreadable error.' }));
        console.error("Core save API error response:", errorData);
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
      const savedProductData = await response.json();
      console.log('Core product saved successfully:', savedProductData);
      
      setInternalProductId(savedProductData.product_id);
      onBaseProductSaveSuccess(savedProductData.product_id, savedProductData.sku); // Notify parent
      
    } catch (error) {
      console.error('Error saving core product:', error);
      setCoreSaveError(error instanceof Error ? error.message : 'An unknown error occurred during save.');
    } finally {
      setIsSavingCore(false);
    }
  };

  // Styling helpers
  const inputBaseClass = "block w-full rounded-md shadow-sm sm:text-sm placeholder-gray-400 read-only:bg-gray-100 read-only:text-gray-500 read-only:cursor-not-allowed";
  const inputBorderClass = "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"; // Added ring-1 for better focus
  const inputErrorBorderClass = "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-red-900 placeholder-red-400";
  const getInputClass = (fieldName: keyof typeof errors | 'categoryIdValidate' | 'brandIdValidate' ) => 
    `${inputBaseClass} px-3 py-2 ${errors[fieldName] || (fieldName === 'categoryIdValidate' && !categoryId) || (fieldName === 'brandIdValidate' && !brandId) ? inputErrorBorderClass : inputBorderClass}`;
  
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const canInteractWithSubSections = mode === 'edit' || (mode === 'new' && isBaseProductSaved && internalProductId);

  return (
    <div className="space-y-10 divide-y divide-gray-200">
      <section className="pt-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Basic Information</h3>
        <p className="text-sm text-gray-500 mb-6">Enter the fundamental details of your product. This information is required to proceed.</p>
        
        {coreSaveError && <div className="my-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm shadow">{coreSaveError}</div>}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <p className={labelClass}>Selected Category</p>
                <div className={`mt-1 p-3 rounded-md text-sm border ${!categoryId ? 'bg-yellow-50 text-yellow-800 border-yellow-400' : 'bg-green-50 text-green-800 border-green-300'}`}>
                {categoryId ? `ID: ${categoryId}` : 'Category not selected (Required)'}
                </div>
                 {errors?.categoryId && <p className="mt-1 text-xs text-red-600">{errors.categoryId}</p>}
                 {!categoryId && errors?.categoryIdValidate && <p className="mt-1 text-xs text-red-600">{errors.categoryIdValidate}</p>}
            </div>
            <div>
                <p className={labelClass}>Selected Brand</p>
                <div className={`mt-1 p-3 rounded-md text-sm border ${!brandId ? 'bg-yellow-50 text-yellow-800 border-yellow-400' : 'bg-green-50 text-green-800 border-green-300'}`}>
                {brandId ? `ID: ${brandId}` : 'Brand not selected (Required)'}
                </div>
                {errors?.brandId && <p className="mt-1 text-xs text-red-600">{errors.brandId}</p>}
                {!brandId && errors?.brandIdValidate && <p className="mt-1 text-xs text-red-600">{errors.brandIdValidate}</p>}
            </div>
          </div>

          <div><label htmlFor="core-name" className={labelClass}>Product Name <span className="text-red-500">*</span></label><input type="text" id="core-name" value={name} onChange={(e) => onInfoChange('name', e.target.value)} className={getInputClass('name')} placeholder="e.g., Premium Cotton T-Shirt" />{errors?.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}</div>
          
          <div>
            <label htmlFor="core-description" className={labelClass}>Main Product Description <span className="text-red-500">*</span></label>
            <textarea id="core-description" rows={4} value={description} onChange={(e) => onInfoChange('description', e.target.value)} className={getInputClass('description')} placeholder="Detailed description of the product..." />
            {errors?.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div><label htmlFor="core-sku" className={labelClass}>SKU <span className="text-red-500">*</span></label><input type="text" id="core-sku" value={sku} onChange={(e) => onInfoChange('sku', e.target.value)} readOnly={mode === 'new' && !isBaseProductSaved && !sku} className={getInputClass('sku')} placeholder={mode === 'new' && !isBaseProductSaved && !sku ? "Auto-generates from name..." : "Enter SKU"} /><p className="mt-1 text-xs text-gray-500">Unique product identifier. Auto-suggested for new products if name is provided.</p>{errors?.sku && <p className="mt-1 text-xs text-red-600">{errors.sku}</p>}</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label htmlFor="core-costPrice" className={labelClass}>Cost Price</label><input type="number" id="core-costPrice" value={costPrice} onChange={(e) => onInfoChange('costPrice', e.target.value)} step="0.01" min="0" className={getInputClass('costPrice')} placeholder="0.00" />{errors?.costPrice && <p className="mt-1 text-xs text-red-600">{errors.costPrice}</p>}</div>
            <div><label htmlFor="core-sellingPrice" className={labelClass}>Selling Price <span className="text-red-500">*</span></label><input type="number" id="core-sellingPrice" value={sellingPrice} onChange={(e) => onInfoChange('sellingPrice', e.target.value)} step="0.01" min="0" className={getInputClass('sellingPrice')} placeholder="0.00" />{errors?.sellingPrice && <p className="mt-1 text-xs text-red-600">{errors.sellingPrice}</p>}</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200"><div className="flex items-center justify-between"><span className="text-sm font-medium text-indigo-700">Calculated Margin</span><span className={`text-lg font-semibold ${discount >= 0 ? 'text-green-600' : 'text-red-600'}`}>{discount.toFixed(2)}%</span></div><p className="text-xs text-indigo-600 mt-1">Based on current cost and selling price.</p></div>
          
          <h4 className="text-md font-medium text-gray-800 pt-4 border-t border-gray-200">Special Offer (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label htmlFor="core-specialPrice" className={labelClass}>Special Price</label><input type="number" id="core-specialPrice" value={specialPrice} onChange={(e) => onInfoChange('specialPrice', e.target.value)} step="0.01" min="0" className={getInputClass('specialPrice')} placeholder="0.00" />{errors?.specialPrice && <p className="mt-1 text-xs text-red-600">{errors.specialPrice}</p>}</div>
            <div><label htmlFor="core-specialPriceStart" className={labelClass}>Offer Start Date</label><input type="datetime-local" id="core-specialPriceStart" value={specialPriceStart} onChange={(e) => onInfoChange('specialPriceStart', e.target.value)} className={getInputClass('specialPriceStart')} />{errors?.specialPriceStart && <p className="mt-1 text-xs text-red-600">{errors.specialPriceStart}</p>}</div>
            <div><label htmlFor="core-specialPriceEnd" className={labelClass}>Offer End Date</label><input type="datetime-local" id="core-specialPriceEnd" value={specialPriceEnd} onChange={(e) => onInfoChange('specialPriceEnd', e.target.value)} className={getInputClass('specialPriceEnd')} />{errors?.specialPriceEnd && <p className="mt-1 text-xs text-red-600">{errors.specialPriceEnd}</p>}</div>
          </div>
        </div>

        {mode === 'new' && !isBaseProductSaved && (
          <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
            <button
              type="button" onClick={handleCoreProductSave} disabled={isSavingCore || !categoryId || !brandId}
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSavingCore ? <><ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />Saving Basic Info...</> : 'Save Basic Info & Continue Setup'}
            </button>
          </div>
        )}
        {mode === 'new' && isBaseProductSaved && 
            <div className="mt-6 p-4 bg-green-50 text-green-700 border border-green-300 rounded-md text-sm text-center shadow">
                Basic product information saved (ID: {internalProductId}). You can now configure other details below or proceed to the next step.
            </div>
        }
         {mode === 'edit' && 
            <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
                 <button
                    type="button" 
                    // onClick={handleCoreProductUpdate} // You'd need a separate PUT handler for updates
                    onClick={() => alert("Update functionality for core info via this button needs a PUT handler.")}
                    disabled={isSavingCore}
                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-60"
                 >
                    {isSavingCore ? 'Updating...' : 'Update Basic Info'}
                 </button>
            </div>
        }
      </section>

      <div className={!canInteractWithSubSections ? "opacity-50 pointer-events-none pt-10" : "pt-10"}>
          {!canInteractWithSubSections && mode === 'new' &&
            <div className="my-6 p-4 bg-amber-50 text-amber-700 border border-amber-300 rounded-md text-sm text-center shadow">
                Please save the basic product information above to enable these sections.
            </div>
          }

        <section className="pt-0"> {/* Changed pt-10 to pt-0 as the div above has pt-10 now */}
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Product Attributes</h3>
          <p className="text-sm text-gray-500 mb-6">Define characteristics based on the selected category. These will be saved when you update attributes.</p>
          {categoryId ? (
            <AttributeSelection
              categoryId={categoryId}
              productId={internalProductId} 
              selectedAttributes={attributes} // This comes from AddProducts.formData.attributes
              onAttributeSelect={(attrId, val) => onInfoChange('attributes', { ...attributes, [attrId]: val })}
              errors={errors?.attributes || {}}
            />
          ) : <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-md border border-gray-200">Select a category to load attributes.</p>}
        </section>

        <section className="pt-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Product Media</h3>
          <p className="text-sm text-gray-500 mb-6">Upload images and videos. Media is saved immediately upon upload/deletion.</p>
          {internalProductId ? (
             <ProductMediaUpload 
                productId={internalProductId} 
                // onMediaChange={(apiMediaItems) => { /* Store if needed */ }}
             />
          ) : <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-md border border-gray-200">Save basic product info to enable media uploads.</p>}
        </section>

        <section className="pt-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Shipping Details</h3>
          <p className="text-sm text-gray-500 mb-6">Weight, dimensions, and shipping class. Click "Update Shipping" to save changes for this section.</p>
          {internalProductId ? (
            <ShippingDetails
              productId={internalProductId}
              weight={weight} weightUnit={weightUnit} dimensions={dimensions} dimensionUnit={dimensionUnit} shippingClass={shippingClass}
              onShippingChange={(field, value) => onInfoChange(field, value)} 
              onDimensionsChange={(field, value) => onInfoChange('dimensions', { ...dimensions, [field]: value })}
              errors={errors?.shipping || {}} // Assuming errors for shipping are nested under 'shipping'
            />
           ) : <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-md border border-gray-200">Save basic product info to set shipping details.</p>}
        </section>

        <section className="pt-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Descriptions & SEO</h3>
          <p className="text-sm text-gray-500 mb-6">Optimize for search engines and provide various product descriptions. Click "Update Meta" to save.</p>
           {internalProductId ? (
            <ProductMeta
              productId={internalProductId}
              shortDescription={shortDescription} 
              fullDescription={fullDescription} // Pass the main one if separate full_desc not needed by ProductMeta
              metaTitle={metaTitle} 
              metaDescription={metaDescription} 
              metaKeywords={metaKeywords}
              onMetaChange={(field, value) => onInfoChange(field, value)}
              errors={errors?.meta || {}}  // Assuming errors for meta are nested under 'meta'
            />
           ) : <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-md border border-gray-200">Save basic product info to set SEO and detailed descriptions.</p>}
        </section>

        <section className="pt-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Product Variants</h3>
          <p className="text-sm text-gray-500 mb-6">Manage different versions (e.g., size, color). Variants are managed and saved within this section.</p>
          {internalProductId && categoryId ? (
            <ProductVariants
              productId={internalProductId}
              variants={variants} 
              onVariantsChange={(updatedVariants) => onInfoChange('variants', updatedVariants)}
              errors={errors?.variants || {}}
              categoryId={categoryId}
              parentProductSku={sku} // Pass parent SKU for variant SKU generation
            />
          ): <p className="text-sm text-gray-400 p-3 bg-gray-50 rounded-md border border-gray-200">Save basic product info and select a category to manage variants.</p>}
        </section>
      </div>
    </div>
  );
};

export default CoreProductInfo;