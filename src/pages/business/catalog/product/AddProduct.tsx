import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import BasicInfo from './steps/BasicInfo';
import Description from './steps/Description';
import Media from './steps/Media';
import Attributes from './steps/Attributes';
import Pricing from './steps/Pricing';
import Stock from './steps/Stock';
import ShippingDimensions from './steps/ShippingDimensions';
import Variants from './steps/Variants';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

// Define the product data type
export type ProductData = {
  sku: string;
  productNumber: string;
  name: Record<string, string>;
  urlKey: string;
  taxCategory: string;
  category: string;
  subCategory: string;
  status: boolean;
  
  // Description
  shortDescription: string;
  description: string;
  metaTitle: Record<string, string>;
  metaKeywords: string;
  metaDescription: Record<string, string>;
  
  // Pricing
  price: string;
  cost: string;
  specialPrice: string;
  specialPriceFrom: string;
  specialPriceTo: string;
  
  // Shipping
  length: string;
  width: string;
  height: string;
  weight: string;
  dimensionUnit: 'cm' | 'inches';
  weightUnit: 'kg' | 'lbs';
  
  // Stock
  manageStock: boolean;
  stockQuantity: string;
  lowStockThreshold: string;
  pendingOrderedQty: number;
  
  // Media
  images: Array<{
    id: string;
    name: string;
    url: string;
    file: File;
    type: 'image';
  }>;
  videos: Array<{
    id: string;
    name: string;
    url: string;
    file: File;
    type: 'video';
    thumbnail?: string;
  }>;
  primaryImage: number | null;
  
  // Categories
  categories: string[];

  // Attributes
  brand: string;
  colors: string[];
  sizes: string[];
  customAttributes: Record<string, string | string[]>;

  // Variants
  variants: Array<{
    id: string;
    sku: string;
    attributes: {
      color?: string;
      size?: string;
      [key: string]: string | undefined;
    };
    customAttributes: Record<string, string | string[]>;
    price: string;
    stockQuantity: string;
    images: Array<{
      id: string;
      name: string;
      url: string;
      file: File;
      type: 'image';
    }>;
    primaryImage: number | null;
  }>;
};

// Initial empty product data
const initialProductData: ProductData = {
  sku: '',
  productNumber: '',
  name: {
    en: '',
    es: '',
    fr: ''
  },
  urlKey: '',
  taxCategory: '',
  category: '',
  subCategory: '',
  status: true,
  shortDescription: '',
  description: '',
  metaTitle: {
    en: '',
    es: '',
    fr: ''
  },
  metaKeywords: '',
  metaDescription: {
    en: '',
    es: '',
    fr: ''
  },
  price: '',
  cost: '',
  specialPrice: '',
  specialPriceFrom: '',
  specialPriceTo: '',
  length: '',
  width: '',
  height: '',
  weight: '',
  dimensionUnit: 'cm',
  weightUnit: 'kg',
  manageStock: false,
  stockQuantity: '0',
  lowStockThreshold: '5',
  pendingOrderedQty: 0,
  images: [],
  videos: [],
  primaryImage: null,
  categories: [],
  brand: '',
  colors: [],
  sizes: [],
  customAttributes: {},
  variants: []
};

// Mock categories for dropdowns
const TAX_CATEGORIES = [
  { value: '', label: 'Select' },
  { value: 'standard', label: 'Standard Rate' },
  { value: 'reduced', label: 'Reduced Rate' },
  { value: 'zero', label: 'Zero Rate' }
];

// Main categories
const MAIN_CATEGORIES = [
  { id: 'clothing', name: 'Clothing & Fashion' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home & Decor' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Outdoors' },
  { id: 'books', name: 'Books & Stationery' }
];

// Sub-categories mapping
const SUB_CATEGORIES: Record<string, Array<{ id: string; name: string }>> = {
  clothing: [
    { id: 'mens', name: "Men's Clothing" },
    { id: 'womens', name: "Women's Clothing" },
    { id: 'kids', name: "Kid's Clothing" },
    { id: 'accessories', name: 'Fashion Accessories' }
  ],
  electronics: [
    { id: 'laptops', name: 'Laptops & Computers' },
    { id: 'phones', name: 'Mobile Phones' },
    { id: 'tablets', name: 'Tablets' },
    { id: 'accessories', name: 'Electronics Accessories' }
  ],
  home: [
    { id: 'furniture', name: 'Furniture' },
    { id: 'decor', name: 'Home Decor' },
    { id: 'kitchen', name: 'Kitchen & Dining' },
    { id: 'bath', name: 'Bath & Bedding' }
  ],
  beauty: [
    { id: 'skincare', name: 'Skincare' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'fragrances', name: 'Fragrances' },
    { id: 'haircare', name: 'Hair Care' }
  ],
  sports: [
    { id: 'fitness', name: 'Fitness Equipment' },
    { id: 'outdoor', name: 'Outdoor Sports' },
    { id: 'team', name: 'Team Sports' },
    { id: 'accessories', name: 'Sports Accessories' }
  ],
  books: [
    { id: 'fiction', name: 'Fiction Books' },
    { id: 'nonfiction', name: 'Non-Fiction Books' },
    { id: 'stationery', name: 'Stationery' },
    { id: 'magazines', name: 'Magazines' }
  ]
};

// Available languages
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' }
];

type AddProductProps = {
  mode?: 'create' | 'edit' | 'view';
};

// Common input styles for highlighting borders
const inputBaseStyle = `border-2 border-gray-200 bg-white rounded-md px-4 py-3.5 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300 shadow-sm text-base transition-all duration-200`;
const inputErrorStyle = `border-2 border-red-300 bg-white rounded-md px-4 py-3.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-300 text-red-900 placeholder-red-300 shadow-sm text-base transition-all duration-200`;
const inputReadOnlyStyle = `border-2 border-gray-200 bg-gray-50 rounded-md px-4 py-3.5 w-full shadow-sm text-base transition-all duration-200`;

const AddProduct: React.FC<AddProductProps> = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductData>(initialProductData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(mode === 'view');
  
  // File input refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Lock body scrolling to prevent multiple scrollbars
  useEffect(() => {
    // Save the original style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Lock scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore original style
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Fetch product data when in edit or view mode
  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && id) {
      // Here you would typically fetch the product data from API
      // For now, let's simulate by finding the product in our mock data
      const mockProducts = [
        {
          id: 1,
          name: {
            en: 'Louis Philippe Men\'s Solid Regular Fit T-Shirt',
            es: 'Camiseta Regular Sólida Louis Philippe para Hombre',
            fr: 'T-shirt Regular Uni Louis Philippe pour Homme'
          },
          sku: '1',
          category: 'Men\'s',
          price: '500.00',
          stock: '50',
          status: true,
          images: [
            {
              id: '1',
              name: 'main-image.jpg',
              url: 'https://placehold.co/560x609',
              file: new File([], 'main-image.jpg'),
              type: 'image' as const
            }
          ],
          videos: [],
          primaryImage: 0,
          attributeFamily: 'Default',
          urlKey: 'louis-philippe-mens-solid-regular-fit-t-shirt',
          shortDescription: 'A comfortable t-shirt for everyday wear',
          description: 'This Louis Philippe t-shirt is perfect for casual occasions. Made from 100% cotton.',
          weight: '0.5',
          categories: ['mens'],
          metaTitle: {
            en: 'Louis Philippe Men\'s T-Shirt | Premium Cotton',
            es: 'Camiseta Louis Philippe para Hombre | Algodón Premium',
            fr: 'T-shirt Louis Philippe pour Homme | Coton Premium'
          },
          metaDescription: {
            en: 'Premium quality cotton t-shirt by Louis Philippe. Perfect for casual wear.',
            es: 'Camiseta de algodón de alta calidad de Louis Philippe. Perfecta para uso casual.',
            fr: 'T-shirt en coton de haute qualité de Louis Philippe. Parfait pour un usage décontracté.'
          }
        }
      ];
      
      const product = mockProducts.find(p => p.id === Number(id));
      
      if (product) {
        // Map the fetched product to our ProductData format
        const fetchedProduct: Partial<ProductData> = {
          name: product.name,
          sku: product.sku,
          price: product.price,
          urlKey: product.urlKey,
          shortDescription: product.shortDescription,
          description: product.description,
          weight: product.weight,
          status: product.status,
          categories: product.categories,
          stockQuantity: product.stock,
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
          images: product.images,
          videos: product.videos,
          primaryImage: product.primaryImage
        };
        
        setProductData(prev => ({ ...prev, ...fetchedProduct }));
      } else {
        // Handle case where product is not found
        toast.error('Product not found');
        navigate('/business/catalog/products');
      }
    }
  }, [mode, id, navigate]);

  // Page title based on mode
  const getPageTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Edit Product';
      case 'view':
        return 'View Product';
      default:
        return 'Add Product';
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox/toggle change
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProductData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle URL key change
  const handleURLKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert input to valid URL key (slug) format
    let value = e.target.value;
    value = value.toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
    setProductData(prev => ({ ...prev, urlKey: value }));
  };

  // Handle name change to auto-generate URL key
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prev => {
      const newData = { ...prev, [name]: value };
      // Auto-generate URL key from name if URL key is empty
      if (name === 'name' && !prev.urlKey) {
        const urlKey = value.toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/(^-|-$)/g, '');
        newData.urlKey = urlKey;
      }
      return newData;
    });
  };

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setProductData(prev => {
      const categories = [...prev.categories];
      const index = categories.indexOf(categoryId);
      
      if (index === -1) {
        categories.push(categoryId);
      } else {
        categories.splice(index, 1);
      }
      
      return { ...prev, categories };
    });
  };

  // Trigger file input click
  const triggerImageUpload = () => {
    if (isReadOnly) return;
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  
  const triggerVideoUpload = () => {
    if (isReadOnly) return;
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implementation for image upload would go here
    toast.success('Image upload functionality would be implemented here');
  };
  
  // Handle video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implementation for video upload would go here
    toast.success('Video upload functionality would be implemented here');
  };
  
  // Handle back button
  const handleBack = () => {
    navigate('/business/catalog/products');
  };

  // Validate form
  const validateForm = (): boolean => {
    let formErrors: Record<string, string> = {};
    let isValid = true;

    if (!productData.name.en.trim()) {
      formErrors.name = 'Product name is required';
      isValid = false;
    }
    
    if (!productData.sku.trim()) {
      formErrors.sku = 'SKU is required';
      isValid = false;
    }
    
    if (!productData.price) {
      formErrors.price = 'Price is required';
      isValid = false;
    }
    
    if (!productData.weight) {
      formErrors.weight = 'Weight is required';
      isValid = false;
    }

    // Add validation for required description fields
    if (!productData.shortDescription.trim()) {
      formErrors.shortDescription = 'Short description is required';
      isValid = false;
    }

    if (!productData.description.trim()) {
      formErrors.description = 'Full description is required';
      isValid = false;
    }

    if (!productData.urlKey.trim()) {
      formErrors.urlKey = 'URL Key is required';
      isValid = false;
    }

    if (!productData.metaTitle.en.trim()) {
      formErrors.metaTitle = 'Meta title is required';
      isValid = false;
    }

    if (!productData.metaDescription.en.trim()) {
      formErrors.metaDescription = 'Meta description is required';
      isValid = false;
    }

    // Validate meta title length
    if (productData.metaTitle.en.length > 60) {
      formErrors.metaTitle = 'Meta title must be 60 characters or less';
      isValid = false;
    }

    // Validate meta description length
    if (productData.metaDescription.en.length > 155) {
      formErrors.metaDescription = 'Meta description must be 155 characters or less';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (mode === 'view') {
      // Switch to edit mode
      navigate(`/business/catalog/product/${id}/edit`);
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Here you would call your API to save the product
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const successMessage = mode === 'edit' 
          ? 'Product updated successfully' 
          : 'Product created successfully';
        
        toast.success(successMessage);
        navigate('/business/catalog/products');
      } catch (error) {
        const errorMessage = mode === 'edit'
          ? 'Failed to update product'
          : 'Failed to create product';
        
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorElement = document.querySelector('[aria-invalid="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-gray-50">
      {/* Header - fixed height with consistent spacing */}
      <div className="flex items-center justify-between py-6 px-8 bg-white border-b border-gray-200 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? (mode === 'edit' ? 'Saving...' : 'Creating...') 
              : mode === 'view' 
                ? 'Edit Product' 
                : mode === 'edit' 
                  ? 'Update Product' 
                  : 'Save Product'}
          </button>
        </div>
      </div>
      
      {/* Content area - single scrollable container with no nested scrolling */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Grid layout for main sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column content - spans 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <BasicInfo
                  data={productData}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                />
              </div>
              
              {/* Attributes Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Attributes
                  data={{
                    brand: productData.brand,
                    colors: productData.colors,
                    sizes: productData.sizes,
                    customAttributes: productData.customAttributes
                  }}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  category={productData.category}
                  subCategory={productData.subCategory}
                  errors={errors}
                />
              </div>
              
              {/* Description Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Description
                  data={productData}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                />
              </div>
              
              {/* Media Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Media
                  data={productData}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                />
              </div>
              
              {/* Variants Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Variants
                  data={productData}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                  isReadOnly={isReadOnly}
                />
              </div>
            </div>
            
            {/* Right column content - pricing and stock */}
            <div className="space-y-6">
              {/* Price Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Pricing
                  data={{
                    price: productData.price,
                    cost: productData.cost,
                    specialPrice: productData.specialPrice,
                    specialPriceFrom: productData.specialPriceFrom,
                    specialPriceTo: productData.specialPriceTo
                  }}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                  isReadOnly={isReadOnly}
                />
              </div>

              {/* Stock Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <Stock
                  data={{
                    manageStock: productData.manageStock,
                    stockQuantity: productData.stockQuantity,
                    lowStockThreshold: productData.lowStockThreshold,
                    pendingOrderedQty: productData.pendingOrderedQty
                  }}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                  isReadOnly={isReadOnly}
                />
              </div>

              {/* Shipping Dimensions Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <ShippingDimensions
                  data={productData}
                  updateData={(newData) => setProductData(prev => ({ ...prev, ...newData }))}
                  errors={errors}
                  isReadOnly={isReadOnly}
                />
              </div>
              
              {/* Save/Back buttons for mobile - shown only on small screens */}
              <div className="flex justify-end space-x-4 lg:hidden bg-gray-50 pt-4 pb-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? 'Saving...'
                    : 'Save Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;