import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySelection from '../components/CategorySelection';
import BrandSelection from '../components/BrandSelection';
import TaxCategorySelection from '../components/TaxCategorySelection';
import CoreProductInfo from '../components/CoreProductInfo';


interface AddProductsProps {
  mode?: 'new' | 'edit' | 'view';
}

const steps = [
  'Category & Brand',
  'Product Details',
  'Tax Category',
];

const AddProducts: React.FC<AddProductsProps> = ({ mode = 'new' }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit/view mode
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  // This state will hold the ID of the product once its core info is created
  const [createdProductId, setCreatedProductId] = useState<number | null>(null);

  // Form Data - simplified for initial steps, CoreProductInfo manages its own more complex state
  const [formData, setFormData] = useState({
    categoryId: null as number | null,
    brandId: null as number | null,
    taxCategoryId: null as number | null,
    // CoreProductInfo fields are now managed within CoreProductInfo component initially
    // but we can pre-populate them here if needed, or pass them up on save from CoreProductInfo
    name: '',
    description: '', // This is the short description for the product card
    sku: '',
    costPrice: '',
    sellingPrice: '',
    // Fields managed by sub-components of CoreProductInfo (or CoreProductInfo itself)
    // media: [] as File[],
    // weight: '',
    // dimensions: { length: '', width: '', height: '' },
    // shippingClass: '',
    // metaTitle: '',
    // metaDescription: '',
    // metaKeywords: '',
    // variants: [] as any[],
  });

  useEffect(() => {
    if (mode !== 'new' && id) {
      console.log('Fetching product data for ID:', id);
      // For edit mode, you would typically fetch all product data and populate
      // not just formData but also states within CoreProductInfo and its sub-components.
      // This might involve a more complex data loading strategy.
      // For now, this POC focuses on 'new' mode structure.
      // fetchProductData(id); // Implement if edit mode needs full pre-population here
      setCreatedProductId(parseInt(id)); // Assume ID is the created product ID for edit mode
    }
  }, [mode, id]);


  // const fetchProductData = async (productId: string) => {
  //   // ... (implementation for fetching and setting ALL form data for edit mode)
  // };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStep = () => {
    const newErrors: Record<string, any> = {};
    switch (activeStep) {
      case 0: // Category & Brand
        if (!formData.categoryId) newErrors.categoryId = 'Category is required';
        // Brand validation might be conditional if a category doesn't require a brand
        if (formData.categoryId && !formData.brandId) newErrors.brandId = 'Brand is required';
        break;
      case 1: // Product Details
        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.sku) newErrors.sku = 'SKU is required';
        if (!formData.sellingPrice) newErrors.sellingPrice = 'Selling price is required';
        break;
      case 2: // Tax Category
        if (!formData.taxCategoryId) newErrors.taxCategoryId = 'Tax category is required';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // This handleSubmit is for the final "Create Product" or "Update Product" action for the whole flow
  const handleFinalSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      // Here you would typically make an API call to finalize the product
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/business/catalog/products');
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Failed to save product' }));
    } finally {
      setLoading(false);
    }
  };

  // Callback for CoreProductInfo to inform AddProducts that the product's core details are saved
  const handleProductCreated = (productId: number) => {
    setCreatedProductId(productId);
    console.log('Product core created with ID:', productId);
    // Potentially auto-advance to next relevant section or enable further actions
  };
  
  // Callback for CoreProductInfo to update parent's formData if needed
  const handleCoreInfoChange = (field: string, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-6">
            <CategorySelection
              selectedCategoryId={formData.categoryId}
              onCategorySelect={(catId) => setFormData({ ...formData, categoryId: catId, brandId: null })} // Reset brand on category change
              selectedBrandId={formData.brandId} // Pass this for UI update in CategorySelection
              onBrandSelect={(brandId) => setFormData({ ...formData, brandId })} // Pass this for UI update in CategorySelection
              errors={errors}
            />
            {/* BrandSelection is now part of CategorySelection component display logic */}
          </div>
        );
      case 1:
        return (
          <CoreProductInfo
            // Pass existing core fields from formData
            name={formData.name}
            description={formData.description}
            sku={formData.sku}
            costPrice={formData.costPrice}
            sellingPrice={formData.sellingPrice}
            // Pass IDs needed by CoreProductInfo
            categoryId={formData.categoryId}
            brandId={formData.brandId}
            // Callback to update formData in AddProducts
            onInfoChange={handleCoreInfoChange}
            // Callback to set createdProductId
            onProductCreated={handleProductCreated}
            errors={errors} // Pass down general errors for core fields
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Select Tax Category</h2>
              <p className="text-sm text-gray-500 mb-6">
                Choose the appropriate tax category for your product. This will determine the tax rate applied to sales.
              </p>
              <TaxCategorySelection
                selectedTaxCategoryId={formData.taxCategoryId}
                onTaxCategorySelect={(taxId) => setFormData({ ...formData, taxCategoryId: taxId })}
                errors={errors}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading && mode === 'new') { // Keep loading for initial fetch if edit/view
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const currentStepTitle = steps[activeStep];

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-white shadow rounded-lg border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
                {mode === 'edit' ? 'Edit Product' : mode === 'view' ? 'View Product' : 'Add New Product'}
            </h1>
            <p className="text-sm text-gray-500">Step {activeStep + 1} of {steps.length}: {currentStepTitle}</p>
            {/* Progress Bar (Optional) */}
            <div className="mt-3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}></div>
            </div>
        </div>

      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 border border-gray-200">
        {renderStepContent()}
        {errors.submit && ( // General submit error for the whole form
            <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                {errors.submit}
            </div>
        )}
        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}

            disabled={activeStep === 0 || loading}
            className={`px-6 py-2.5 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-opacity ${
              activeStep === 0 || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'

            }`}
          >
            Back
          </button>
          {activeStep === steps.length - 1 ? (
            <button
              type="button"

              onClick={handleFinalSubmit} // Changed from handleSubmit to handleFinalSubmit
              disabled={loading || (mode === 'new' && !createdProductId && activeStep === steps.length-1) } // Disable if core product not saved in 'new' mode on last step
              className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"

            >
              {loading ? 'Saving...' : (mode === 'edit' ? 'Update Product' : 'Finish & Create Product')}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}

              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"

            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProducts;