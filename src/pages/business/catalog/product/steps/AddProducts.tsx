import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelection from '../components/CategorySelection';
// BrandSelection is likely integrated into CategorySelection now
import TaxCategorySelection from '../components/TaxCategorySelection';
import CoreProductInfo from '../components/CoreProductInfo';

interface AddProductsProps {
  mode?: 'new' | 'edit' | 'view';
}

const steps = [
  'Category & Brand', // activeStep 0
  'Tax Category',     // activeStep 1
  'Core Info',        // activeStep 2
];

const AddProducts: React.FC<AddProductsProps> = ({ mode = 'new' }) => {
  const navigate = useNavigate();
  const { id: routeId } = useParams(); // productId from route for edit/view mode
  const [activeStep, setActiveStep] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  // This state will hold the productId generated after saving the core info in 'new' mode
  const [savedProductId, setSavedProductId] = useState<number | null>(mode === 'edit' && routeId ? parseInt(routeId) : null);
  const [isBaseProductSaved, setIsBaseProductSaved] = useState<boolean>(mode !== 'new');


  const [formData, setFormData] = useState({
    // Ids
    id: mode === 'edit' && routeId ? parseInt(routeId) : null as number | null, // Keep track of the product ID
    categoryId: null as number | null,
    brandId: null as number | null,
    taxCategoryId: null as number | null,
    // Core Info
    name: '',
    description: '', 
    shortDescription: '', 
    fullDescription: '',  
    sku: '',
    costPrice: '',
    sellingPrice: '',
    specialPrice: '',
    specialPriceStart: '',
    specialPriceEnd: '',
    // Media & Attributes (Attributes handled within CoreProductInfo based on categoryId)
    media: [] as File[], 
    attributes: {} as Record<number, string | string[]>, // Will be populated by CoreProductInfo's AttributeSelection
    // Shipping
    weight: '',
    weightUnit: 'kg', 
    dimensions: { length: '', width: '', height: '' },
    dimensionUnit: 'cm', 
    shippingClass: '',
    // SEO
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    // Variants
    variants: [] as any[], 
  });

  useEffect(() => {
    if (mode !== 'new' && routeId) {
      console.log('Fetching product data for ID (edit/view):', routeId);
      fetchProductData(routeId);
      setSavedProductId(parseInt(routeId));
      setIsBaseProductSaved(true);
    }
  }, [mode, routeId]);

  const fetchProductData = async (productIdToFetch: string) => {
    setPageLoading(true);
    try {
      // Use VITE_API_BASE_URL for consistency if your previous code used it implicitly via Vite proxy
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/merchant/products/${productIdToFetch}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } // Add auth if needed
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch product data.' }));
        throw new Error(errorData.message || `Failed to load product (Status: ${response.status}).`);
      }
      const data = await response.json();
      console.log('Fetched product data:', data);
      
      setFormData({
        id: data.product_id || data.id || null,
        categoryId: data.category_id ? parseInt(data.category_id, 10) : null,
        brandId: data.brand_id ? parseInt(data.brand_id, 10) : null,
        taxCategoryId: data.tax_category_id ? parseInt(data.tax_category_id, 10) : null,
        name: data.product_name || data.name || '',
        description: data.description || '',
        shortDescription: data.short_description || data.meta?.short_desc || '',
        fullDescription: data.full_description || data.meta?.full_desc || '',
        sku: data.sku || '',
        costPrice: data.cost_price?.toString() || '',
        sellingPrice: data.selling_price?.toString() || '',
        specialPrice: data.special_price?.toString() || '',
        specialPriceStart: data.special_price_start || data.specialPriceStart || '',
        specialPriceEnd: data.special_price_end || data.specialPriceEnd || '',
        media: [], 
        attributes: data.attributes || {}, 
        weight: data.shipping?.weight?.toString() || data.shipping?.weight_kg?.toString() || '',
        weightUnit: data.shipping?.weight_unit || 'kg',
        dimensions: {
          length: data.shipping?.dimensions?.length?.toString() || data.shipping?.length_cm?.toString() || '',
          width: data.shipping?.dimensions?.width?.toString() || data.shipping?.width_cm?.toString() || '',
          height: data.shipping?.dimensions?.height?.toString() || data.shipping?.height_cm?.toString() || '',
        },
        dimensionUnit: data.shipping?.dimension_unit || 'cm',
        shippingClass: data.shipping?.shipping_class || '',
        metaTitle: data.meta_title || data.meta?.meta_title || '',
        metaDescription: data.meta_description || data.meta?.meta_desc || '',
        metaKeywords: data.meta_keywords || data.meta?.meta_keywords || '',
        variants: data.variants || [],
      });
      setSavedProductId(data.product_id || data.id);
      setIsBaseProductSaved(true);
      console.log('Form data updated.');
    } catch (error) {
      console.error('Error fetching product data:', error);
      setErrors({ fetch: error instanceof Error ? error.message : 'An unexpected error occurred.' });
    } finally {
      setPageLoading(false);
    }
  };

  const handleFormDataChange = (field: keyof typeof formData | string, value: any) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
    if (errors[field as string]) {
      setErrors(prevErrors => { const newErrors = { ...prevErrors }; delete newErrors[field as string]; return newErrors; });
    }
  };
  
  const handleBaseProductSaveSuccess = (newProductId: number, updatedSku?: string) => {
    setSavedProductId(newProductId);
    setIsBaseProductSaved(true);
    handleFormDataChange('id', newProductId); 
    if (updatedSku) {
      handleFormDataChange('sku', updatedSku); 
    }
    // Consider if you want to auto-advance step or just enable next
    // setActiveStep((prev) => Math.min(prev + 1, steps.length - 1)); 
    console.log("Base product saved with ID:", newProductId, ". Wizard can now proceed or user can click Next.");
  };

  const handleNext = () => {
    if (activeStep === 2 && mode === 'new' && !isBaseProductSaved) {
      // This error state is important if the "Save Basic Info" button is the primary way to proceed
      setErrors(prev => ({...prev, coreInfoSubmit: "Please save the basic product information first using the button in that section to enable further setup."}));
      return;
    }
    if (validateStep()) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      console.log("Validation failed for step:", activeStep, "Current Errors:", errors);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStep = () => {
    const newErrors: Record<string, any> = {};
    switch (activeStep) {
      case 0: 
        if (!formData.categoryId) newErrors.categoryId = 'Category is required.';
        if (formData.categoryId && !formData.brandId) newErrors.brandId = 'Brand is required once category is selected.';
        break;
      case 1: 
        if (!formData.taxCategoryId) newErrors.taxCategoryId = 'Tax category is required.';
        break;
      case 2: 
        if (mode === 'edit' || (mode === 'new' && isBaseProductSaved)) { 
            if (!formData.name.trim()) newErrors.name = 'Product name is required.';
            if (!formData.sku.trim()) newErrors.sku = 'SKU is required.';
            if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
              newErrors.sellingPrice = 'A valid selling price is required.';
            }
        }
        // If mode is 'new' and base isn't saved, this validation is less critical for 'Next'
        // as CoreProductInfo's internal save button will handle its own validation.
        break;
    }
    setErrors(prev => ({...prev, ...newErrors})); // Merge with existing errors
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalSubmit = async () => {
    const finalValidationErrors: Record<string, any> = {};
    if (!formData.categoryId) finalValidationErrors.categoryId = 'Category is missing.';
    if (!formData.brandId) finalValidationErrors.brandId = 'Brand is missing.';
    if (!formData.taxCategoryId) finalValidationErrors.taxCategoryId = 'Tax category is missing.';
    if (!formData.name.trim()) finalValidationErrors.name = 'Product name is required.';
    if (!formData.sku.trim()) finalValidationErrors.sku = 'SKU is required.';
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) finalValidationErrors.sellingPrice = 'Valid selling price is required.';
    // Add more checks for other critical fields like descriptions, weight if truly mandatory for backend

    if (Object.keys(finalValidationErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...finalValidationErrors, submit: "Please correct all errors before final submission." }));
        if (finalValidationErrors.categoryId || finalValidationErrors.brandId) setActiveStep(0);
        else if (finalValidationErrors.taxCategoryId) setActiveStep(1);
        else setActiveStep(2);
        return;
    }

    setIsSubmittingForm(true);
    setErrors({}); 
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
      const formDataToSend = new FormData();
      
      // Critical: Make sure the keys here match exactly what your backend expects for FormData
      // And that the backend can handle FormData for product updates (PUT) if that's the case.
      // If backend expects JSON for PUT, then this part needs adjustment for 'edit' mode.
      Object.entries(formData).forEach(([key, value]) => {
        let apiMappedKey = key; // Default
        if (key === 'name') apiMappedKey = 'product_name';
        if (key === 'description') apiMappedKey = 'product_description'; // Example mapping
        // Add other mappings if frontend formData keys differ from backend API keys
        
        if (key === 'media' && Array.isArray(value)) {
          value.forEach((file: File) => formDataToSend.append('media_files[]', file)); 
        } else if (key === 'dimensions' || key === 'attributes' || key === 'variants') {
          if (value !== null && typeof value === 'object' && Object.keys(value).length > 0) {
            formDataToSend.append(apiMappedKey, JSON.stringify(value));
          }
        } else if (key === 'id' && value === null && mode === 'new' && !savedProductId) {
            // Don't send null ID if it's a brand new product and base hasn't been saved yet by CoreProductInfo
        } else if (value !== null && value !== undefined && String(value).trim() !== '') {
          formDataToSend.append(apiMappedKey, String(value));
        }
      });
      
      // The `id` for the URL should be `savedProductId` if it exists, otherwise `formData.id` (from route)
      const productIdForUrl = savedProductId || formData.id;

      const url = productIdForUrl
        ? `${API_BASE_URL}/api/merchant/products/${productIdForUrl}` // PUT for existing
        : `${API_BASE_URL}/api/merchant/products`; // POST for new (if CoreInfo didn't save base)

      const method = productIdForUrl ? 'PUT' : 'POST';
      
      console.log(`Making FINAL ${method} request to: ${url}`);
      // for (let pair of formDataToSend.entries()) { console.log(`FINAL FormData sending: ${pair[0]} = ${pair[1]}`); }

      const response = await fetch(url, {
        method,
        body: formDataToSend, // FormData used for both POST and PUT here
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      });

      if (response.ok) {
        console.log('Product final submission successful!');
        navigate('/business/catalog/products');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred during final save.' }));
        setErrors(errorData.errors || { submit: errorData.message || `Final save failed (Status: ${response.status})` });
      }
    } catch (error) {
      console.error('Error during final submit:', error);
      setErrors({ submit: 'An unexpected network or client-side error occurred during final submission.' });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Category & Brand</h2>
              <p className="text-sm text-gray-500 mb-6">Choose the primary category and associated brand for your product.</p>
              <CategorySelection
                selectedCategoryId={formData.categoryId}
                onCategorySelect={(catId) => {handleFormDataChange('categoryId', catId); handleFormDataChange('brandId', null);}}
                selectedBrandId={formData.brandId}
                onBrandSelect={(brandId) => handleFormDataChange('brandId', brandId)}
                errors={errors}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Tax Category</h2>
            <p className="text-sm text-gray-500 mb-6">Assign a tax category to determine applicable taxes.</p>
            <TaxCategorySelection
              selectedTaxCategoryId={formData.taxCategoryId}
              onTaxCategorySelect={(taxId) => handleFormDataChange('taxCategoryId', taxId)}
              errors={errors}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Details</h2>
            <p className="text-sm text-gray-500 mb-6">Enter the core information, media, attributes, and other details for your product.</p>
            {errors.coreInfoSubmit && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{errors.coreInfoSubmit}</div>}
            <CoreProductInfo
              mode={mode} 
              productId={savedProductId || formData.id} // Pass the most relevant product ID
              isBaseProductSaved={isBaseProductSaved}
              onBaseProductSaveSuccess={handleBaseProductSaveSuccess}
              name={formData.name} description={formData.description} shortDescription={formData.shortDescription}
              fullDescription={formData.fullDescription} sku={formData.sku} costPrice={formData.costPrice}
              sellingPrice={formData.sellingPrice} specialPrice={formData.specialPrice}
              specialPriceStart={formData.specialPriceStart} specialPriceEnd={formData.specialPriceEnd}
              categoryId={formData.categoryId} brandId={formData.brandId}
              attributes={formData.attributes} media={formData.media} 
              weight={formData.weight} weightUnit={formData.weightUnit} dimensions={formData.dimensions}
              dimensionUnit={formData.dimensionUnit} shippingClass={formData.shippingClass}
              metaTitle={formData.metaTitle} metaDescription={formData.metaDescription}
              metaKeywords={formData.metaKeywords} variants={formData.variants}
              onInfoChange={handleFormDataChange} 
              errors={errors}
            />
          </div>
        );
      default:
        return <p>Unknown step</p>;
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-700">Loading product data...</p>
      </div>
    );
  }
  
  const pageTitleText = mode === 'edit' ? 'Edit Product' : mode === 'view' ? 'View Product' : 'Add New Product';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pageTitleText}</h1>
        {(mode !== 'new' && routeId) && <p className="text-sm text-gray-500">Product ID: {routeId}</p>}
         {mode === 'new' && savedProductId && <p className="text-sm text-green-600">Product ID: {savedProductId} (Basic info saved)</p>}
      </header>

      {errors.fetch && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">{errors.fetch}</div>}
      
      <div className="mb-8"> {/* Stepper UI */}
        <nav aria-label="Progress">
          <ol role="list" className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0 shadow-sm">
            {steps.map((step, stepIdx) => (
              <li key={step} className="relative md:flex-1 md:flex">
                {activeStep > stepIdx || (stepIdx < 2 && isBaseProductSaved && mode === 'new') ? (
                  <div className="group flex items-center w-full cursor-pointer" onClick={() => setActiveStep(stepIdx)}>
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-600 rounded-full">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">{step}</span>
                    </span>
                  </div>
                ) : activeStep === stepIdx ? ( 
                  <div className="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-primary-600 rounded-full">
                      <span className="text-primary-600">{`0${stepIdx + 1}`}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-primary-600">{step}</span>
                  </div>
                ) : ( 
                  <div className="group flex items-center w-full cursor-default">
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                        <span className="text-gray-500">{`0${stepIdx + 1}`}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500">{step}</span>
                    </span>
                  </div>
                )}
                {stepIdx !== steps.length - 1 ? <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true"><svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none"><path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" /></svg></div> : null}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8">
        {errors.submit && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{errors.submit}</div>}
        
        {renderStepContent()}

        <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
          <button
            type="button" onClick={handleBack} disabled={activeStep === 0 || isSubmittingForm}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >Back</button>

          {activeStep === steps.length - 1 ? ( 
            <button
              type="button" onClick={handleFinalSubmit} 
              disabled={isSubmittingForm || (mode === 'new' && !isBaseProductSaved)}
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-wait"
            >
              {isSubmittingForm ? 'Saving...' : (mode === 'edit' ? 'Update Product' : 'Create Product')}
            </button>
          ) : ( 
            <button
              type="button" onClick={handleNext} 
              disabled={isSubmittingForm || (activeStep === 2 && mode === 'new' && !isBaseProductSaved)}
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >Next</button>
          )}
        </div>
         {activeStep === 2 && mode === 'new' && !isBaseProductSaved && <p className="text-xs text-amber-600 mt-2 text-right">Click "Save Basic Info & Continue Setup" within the Product Details section to proceed.</p>}
      </div>
    </div>
  );
};

export default AddProducts;