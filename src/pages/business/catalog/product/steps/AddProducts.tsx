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
  'Tax Category',
  'Core Info',
  
];

const AddProducts: React.FC<AddProductsProps> = ({ mode = 'new' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  // Form Data
  const [formData, setFormData] = useState({
    categoryId: null as number | null,
    brandId: null as number | null,
    attributes: {} as Record<number, string | string[]>,
    taxCategoryId: null as number | null,
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
    media: [] as File[],
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
    },
    shippingClass: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    variants: [] as any[],
  });

  useEffect(() => {
    if (mode !== 'new' && id) {
      console.log('Fetching product data for ID:', id);
      fetchProductData(id);
    }
  }, [mode, id]);

  const fetchProductData = async (productId: string) => {
    try {
      setLoading(true);
      console.log('Fetching product data from API');
      const response = await fetch(`/api/merchant/products/${productId}`);
      const data = await response.json();
      
      console.log('Product data received:', data);
      
      if (response.ok) {
        setFormData({
          ...formData,
          ...data,
          media: [], // Handle existing media separately
        });
        console.log('Form data updated with product data');
      } else {
        console.error('Failed to fetch product data:', data);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    console.log('Moving to next step from:', activeStep);
    if (validateStep()) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    console.log('Moving to previous step from:', activeStep);
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStep = () => {
    console.log('Validating step:', activeStep);
    const newErrors: Record<string, any> = {};

    switch (activeStep) {
      case 0: // Category & Brand
        console.log('Validating Category & Brand step');
        if (!formData.categoryId) {
          newErrors.categoryId = 'Category is required';
        }
        if (!formData.brandId) {
          newErrors.brandId = 'Brand is required';
        }
        break;
      case 1: // Attributes
        // Add attribute validation if needed
        break;
      case 2: // Tax Category
        console.log('Validating Tax Category step');
        if (!formData.taxCategoryId) {
          newErrors.taxCategoryId = 'Tax category is required';
        }
        break;
      case 3: // Core Info
        console.log('Validating Core Info step');
        if (!formData.name) {
          newErrors.name = 'Product name is required';
        }
        if (!formData.sku) {
          newErrors.sku = 'SKU is required';
        }
        if (!formData.sellingPrice) {
          newErrors.sellingPrice = 'Selling price is required';
        }
        break;
      case 4: // Media
        if (formData.media.length === 0) {
          newErrors.media = 'At least one image is required';
        }
        break;
      case 5: // Shipping
        if (!formData.weight) {
          newErrors.weight = 'Weight is required';
        }
        if (!formData.shippingClass) {
          newErrors.shippingClass = 'Shipping class is required';
        }
        break;
      case 6: // Meta
        if (!formData.metaTitle) {
          newErrors.metaTitle = 'Meta title is required';
        }
        break;
      case 7: // Variants
        if (formData.variants.length === 0) {
          newErrors.variants = 'At least one variant is required';
        }
        break;
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);
      console.log('Starting form submission with data:', formData);
      
      const formDataToSend = new FormData();

      // Debug: Log each field being added to FormData
      Object.entries(formData).forEach(([key, value]) => {
        console.log(`Processing field: ${key}`, value);
        
        if (key === 'media') {
          formData.media.forEach((file, index) => {
            console.log(`Adding media file ${index}:`, file.name);
            formDataToSend.append('media', file);
          });
        } else if (key === 'dimensions') {
          console.log('Adding dimensions:', value);
          formDataToSend.append('dimensions', JSON.stringify(value));
        } else if (key === 'variants') {
          console.log('Adding variants:', value);
          formDataToSend.append('variants', JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      const url = mode === 'edit' && id
        ? `/api/merchant/products/${id}`
        : '/api/merchant/products';

      const method = mode === 'edit' ? 'PUT' : 'POST';
      console.log(`Making ${method} request to:`, url);

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is ok, regardless of JSON content
      if (response.ok) {
        console.log('Request successful, redirecting to products page');
        navigate('/business/catalog/products');
      } else {
        // Try to get error message from response
        try {
          const data = await response.json();
          console.error('Error response data:', data);
          setErrors(data.errors || {});
        } catch (e) {
          console.error('Error parsing response:', e);
          // If JSON parsing fails, set a generic error
          setErrors({ submit: 'Failed to save product. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to save product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-6">
            <CategorySelection
              selectedCategoryId={formData.categoryId}
              onCategorySelect={(categoryId) =>
                setFormData({ ...formData, categoryId })
              }
              errors={errors}
            />
            {formData.categoryId && (
              <BrandSelection
                categoryId={formData.categoryId}
                selectedBrandId={formData.brandId}
                onBrandSelect={(brandId) =>
                  setFormData({ ...formData, brandId })
                }
                errors={errors}
              />
            )}
          </div>
        );
      case 1:
        return (
          <TaxCategorySelection
            selectedTaxCategoryId={formData.taxCategoryId}
            onTaxCategorySelect={(taxCategoryId) =>
              setFormData({ ...formData, taxCategoryId })
            }
            errors={errors}
          />
        );
      case 2:
        return (
          <CoreProductInfo
            {...formData}
            onInfoChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Step Content as Card */}
      <div className="bg-white shadow rounded-lg p-6">
        {renderStepContent()}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              activeStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Back
          </button>
          {activeStep === steps.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {loading ? 'Saving...' : mode === 'edit' ? 'Update Product' : 'Create Product'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
