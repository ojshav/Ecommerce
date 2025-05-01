/// <reference path="./steps/BasicInfo.tsx" />
/// <reference path="./steps/Media.tsx" />
/// <reference path="./steps/Pricing.tsx" />
/// <reference path="./steps/ShippingDimensions.tsx" />
/// <reference path="./steps/Description.tsx" />
/// <reference path="./steps/Settings.tsx" />
/// <reference path="./steps/RelatedProducts.tsx" />

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ExclamationCircleIcon,
  ChevronDownIcon,
  PlusIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Define the product data type
type ProductData = {
  sku: string;
  productNumber: string;
  name: string;
  urlKey: string;
  taxCategory: string;
  color: string;
  size: string;
  brand: string;
  
  // Description
  shortDescription: string;
  description: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  
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
  
  // Settings
  isNew: boolean;
  isFeatured: boolean;
  visibleIndividually: boolean;
  status: boolean;
  allowGuestCheckout: boolean;
  manageStock: boolean;
  stockQuantity: string;
  
  // Media
  images: string[];
  videos: string[];
  
  // Categories
  categories: string[];
};

// Initial empty product data
const initialProductData: ProductData = {
  sku: '',
  productNumber: '',
  name: '',
  urlKey: '',
  taxCategory: '',
  color: '',
  size: '',
  brand: '',
  shortDescription: '',
  description: '',
  metaTitle: '',
  metaKeywords: '',
  metaDescription: '',
  price: '',
  cost: '',
  specialPrice: '',
  specialPriceFrom: '',
  specialPriceTo: '',
  length: '',
  width: '',
  height: '',
  weight: '',
  isNew: false,
  isFeatured: false,
  visibleIndividually: false,
  status: false,
  allowGuestCheckout: false,
  manageStock: false,
  stockQuantity: '0',
  images: [],
  videos: [],
  categories: []
};

// Mock categories for dropdowns
const TAX_CATEGORIES = [
  { value: '', label: 'Select' },
  { value: 'standard', label: 'Standard Rate' },
  { value: 'reduced', label: 'Reduced Rate' },
  { value: 'zero', label: 'Zero Rate' }
];

const COLORS = [
  { value: '', label: 'Select' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' }
];

const SIZES = [
  { value: '', label: 'Select' },
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' }
];

const BRANDS = [
  { value: '', label: 'Select' },
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'puma', label: 'Puma' },
  { value: 'reebok', label: 'Reebok' }
];

const PRODUCT_CATEGORIES = [
  { id: 'mens', name: "Men's" },
  { id: 'womens', name: "Women's" },
  { id: 'kids', name: "Kid's" }
];

type AddProductProps = {
  mode?: 'create' | 'edit' | 'view';
};

// Common input styles for highlighting borders
const inputBaseStyle = `border-2 border-gray-200 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-300 shadow-sm`;
const inputErrorStyle = `border-2 border-red-300 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-300 text-red-900 placeholder-red-300 shadow-sm`;
const inputReadOnlyStyle = `border-2 border-gray-200 bg-gray-50 rounded-md px-4 py-3 shadow-sm`;

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

  // Fetch product data when in edit or view mode
  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && id) {
      // Here you would typically fetch the product data from API
      // For now, let's simulate by finding the product in our mock data
      const mockProducts = [
        {
          id: 1,
          name: 'Louis Philippe Men\'s Solid Regular Fit T-Shirt',
          sku: '1',
          category: 'Men\'s',
          price: '500.00',
          stock: '50',
          status: true,
          image: 'https://placehold.co/80x80',
          attributeFamily: 'Default',
          urlKey: 'louis-philippe-mens-solid-regular-fit-t-shirt',
          shortDescription: 'A comfortable t-shirt for everyday wear',
          description: 'This Louis Philippe t-shirt is perfect for casual occasions. Made from 100% cotton.',
          weight: '0.5',
          categories: ['mens']
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
          stockQuantity: product.stock
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
    value = value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    setProductData(prev => ({ ...prev, urlKey: value }));
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

    if (!productData.name.trim()) {
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
    <div className="w-full max-w-7xl mx-auto pb-12 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between py-8 mb-6 px-6">
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
      
      {/* Main form grid layout with increased gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Left column content */}
        <div className="md:col-span-2 space-y-6">
          {/* General Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">General</h2>
            </div>
            <div className="px-6 py-6 space-y-6 border-t border-gray-200">
              {/* SKU */}
              <div>
                <label htmlFor="sku" className="block text-sm text-gray-600 mb-1">
                  SKU <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={productData.sku}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full ${
                      errors.sku 
                        ? inputErrorStyle
                        : isReadOnly ? inputReadOnlyStyle : inputBaseStyle
                    }`}
                    aria-invalid={!!errors.sku}
                  />
                  {errors.sku && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
              </div>
              
              {/* Product Number */}
              <div>
                <label htmlFor="productNumber" className="block text-sm text-gray-600 mb-1">
                  Product Number
                </label>
                <input
                  type="text"
                  id="productNumber"
                  name="productNumber"
                  value={productData.productNumber}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                />
              </div>
              
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                  Name <span className="text-red-500">*</span>
                  <span className="ml-1 text-xs text-gray-500">English</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full ${
                      errors.name 
                        ? inputErrorStyle
                        : isReadOnly ? inputReadOnlyStyle : inputBaseStyle
                    }`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              {/* URL Key */}
              <div>
                <label htmlFor="urlKey" className="block text-sm text-gray-600 mb-1">
                  URL Key <span className="text-red-500">*</span>
                  <span className="ml-1 text-xs text-gray-500">English</span>
                </label>
                <input
                  type="text"
                  id="urlKey"
                  name="urlKey"
                  value={productData.urlKey}
                  onChange={handleURLKeyChange}
                  readOnly={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                />
              </div>
              
              {/* Tax Category */}
              <div>
                <label htmlFor="taxCategory" className="block text-sm text-gray-600 mb-1">
                  Tax Category
                </label>
                <select
                  id="taxCategory"
                  name="taxCategory"
                  value={productData.taxCategory}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                >
                  {TAX_CATEGORIES.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Color */}
              <div>
                <label htmlFor="color" className="block text-sm text-gray-600 mb-1">
                  Color
                </label>
                <select
                  id="color"
                  name="color"
                  value={productData.color}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                >
                  {COLORS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Size */}
              <div>
                <label htmlFor="size" className="block text-sm text-gray-600 mb-1">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={productData.size}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                >
                  {SIZES.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Brand */}
              <div>
                <label htmlFor="brand" className="block text-sm text-gray-600 mb-1">
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                >
                  {BRANDS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
            </div>
            <div className="px-6 py-6 space-y-6 border-t border-gray-200">
              {/* Short Description */}
              <div>
                <label htmlFor="shortDescription" className="block text-sm text-gray-600 mb-1">
                  Short Description <span className="text-red-500">*</span>
                  <span className="ml-1 text-xs text-gray-500">English</span>
                </label>
                <div className="mt-1 border border-gray-300 rounded-md overflow-hidden">
                  {/* Mock rich text editor toolbar */}
                  <div className="flex items-center space-x-1 px-3 py-2 border-b border-gray-300 bg-gray-50">
                    <button className="p-1 rounded hover:bg-gray-200" title="Bold">
                      <span className="font-bold">B</span>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200" title="Italic">
                      <span className="italic">I</span>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200" title="Underline">
                      <span className="underline">S</span>
                    </button>
                    <div className="h-4 border-l border-gray-300 mx-1"></div>
                    <button className="p-1 rounded hover:bg-gray-200" title="Align">
                      <span>A</span>
                    </button>
                    <div className="h-4 border-l border-gray-300 mx-1"></div>
                    <button className="p-1 rounded hover:bg-gray-200" title="Link">
                      <span>🔗</span>
                    </button>
                    <div className="h-4 border-l border-gray-300 mx-1"></div>
                    <button className="p-1 rounded hover:bg-gray-200" title="Image">
                      <span>🖼️</span>
                    </button>
                    <div className="ml-auto px-2 text-sm text-gray-500">Magic AI</div>
                  </div>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    rows={4}
                    value={productData.shortDescription}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full px-4 py-3 border-2 border-gray-200 ${isReadOnly ? 'bg-gray-50' : 'bg-white'}`}
                  ></textarea>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm text-gray-600 mb-1">
                  Description
                  <span className="ml-1 text-xs text-gray-500">English</span>
                </label>
                <div className="mt-1 border border-gray-300 rounded-md overflow-hidden">
                  {/* Mock rich text editor toolbar */}
                  <div className="flex items-center space-x-1 px-3 py-2 border-b border-gray-300 bg-gray-50">
                    <button className="p-1 rounded hover:bg-gray-200" title="Bold">
                      <span className="font-bold">B</span>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200" title="Italic">
                      <span className="italic">I</span>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200" title="Underline">
                      <span className="underline">S</span>
                    </button>
                    <div className="h-4 border-l border-gray-300 mx-1"></div>
                    <button className="p-1 rounded hover:bg-gray-200" title="Align">
                      <span>A</span>
                    </button>
                    <div className="h-4 border-l border-gray-300 mx-1"></div>
                    <button className="p-1 rounded hover:bg-gray-200" title="Link">
                      <span>🔗</span>
                    </button>
                    <div className="h-4 border-l border-gray-300 mx-1"></div>
                    <button className="p-1 rounded hover:bg-gray-200" title="Image">
                      <span>🖼️</span>
                    </button>
                    <div className="ml-auto px-2 text-sm text-gray-500">Magic AI</div>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={productData.description}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full px-4 py-3 border-2 border-gray-200 ${isReadOnly ? 'bg-gray-50' : 'bg-white'}`}
                  ></textarea>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>p</span>
                  <span>0 words</span>
                </div>
              </div>
              
              {/* Meta Information */}
              <div className="pt-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Meta Description</h3>
                <div className="text-sm text-gray-500 mb-4">
                  <a href="http://kea.mywire.org:5500/" className="text-blue-600 hover:underline">http://kea.mywire.org:5500/</a>
                </div>
                
                {/* Meta Title */}
                <div className="mb-6">
                  <label htmlFor="metaTitle" className="block text-sm text-gray-600 mb-1">
                    Meta Title
                    <span className="ml-1 text-xs text-gray-500">English</span>
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={productData.metaTitle}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                  />
                </div>
                
                {/* Meta Keywords */}
                <div className="mb-6">
                  <label htmlFor="metaKeywords" className="block text-sm text-gray-600 mb-1">
                    Meta Keywords
                    <span className="ml-1 text-xs text-gray-500">English</span>
                  </label>
                  <textarea
                    id="metaKeywords"
                    name="metaKeywords"
                    rows={2}
                    value={productData.metaKeywords}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                  ></textarea>
                </div>
                
                {/* Meta Description */}
                <div>
                  <label htmlFor="metaDescription" className="block text-sm text-gray-600 mb-1">
                    Meta Description
                    <span className="ml-1 text-xs text-gray-500">English</span>
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    rows={2}
                    value={productData.metaDescription}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          {/* Images Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Images</h2>
            </div>
            <div className="px-6 py-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-6">
                Image resolution should be like 560px X 609px
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {/* Add Image Button */}
                <div 
                  onClick={triggerImageUpload}
                  className={`flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-md ${!isReadOnly ? 'cursor-pointer hover:bg-gray-50' : 'opacity-70 cursor-default'}`}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                    <PlusIcon className="h-7 w-7 text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-500 text-center">Add Image<br />png, jpeg, jpg</span>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    onChange={handleImageUpload}
                    multiple
                  />
                </div>
                
                {/* Image placeholders */}
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md">
                  <div className="bg-gray-100 rounded-md w-full h-20 flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Front</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md">
                  <div className="bg-gray-100 rounded-md w-full h-20 flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Next</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md">
                  <div className="bg-gray-100 rounded-md w-full h-20 flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Next</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md">
                  <div className="bg-gray-100 rounded-md w-full h-20 flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Zoom</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md">
                  <div className="bg-gray-100 rounded-md w-full h-20 flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">Use Cases</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Videos Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Videos</h2>
            </div>
            <div className="px-6 py-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-6">
                Maximum video size should be like 2M
              </div>
              
              <div 
                onClick={triggerVideoUpload}
                className={`flex flex-col items-center justify-center p-10 border border-dashed border-gray-300 rounded-md ${!isReadOnly ? 'cursor-pointer hover:bg-gray-50' : 'opacity-70 cursor-default'} max-w-md`}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                  <PlusIcon className="h-8 w-8 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500 text-center">Add Video<br />mp4, webm, mkv</span>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4, video/webm, video/mkv"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column content */}
        <div className="space-y-6">
          {/* Price Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Price</h2>
            </div>
            <div className="px-6 py-6 space-y-6 border-t border-gray-200">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm text-gray-600 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`pl-7 block w-full ${
                      errors.price 
                        ? inputErrorStyle
                        : isReadOnly ? inputReadOnlyStyle : inputBaseStyle
                    }`}
                    placeholder="0.00"
                    aria-invalid={!!errors.price}
                  />
                  {errors.price && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>
              
              {/* Cost */}
              <div>
                <label htmlFor="cost" className="block text-sm text-gray-600 mb-1">
                  Cost
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="cost"
                    name="cost"
                    value={productData.cost}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`pl-7 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              {/* Special Price */}
              <div>
                <label htmlFor="specialPrice" className="block text-sm text-gray-600 mb-1">
                  Special Price
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="specialPrice"
                    name="specialPrice"
                    value={productData.specialPrice}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`pl-7 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              {/* Special Price From */}
              <div>
                <label htmlFor="specialPriceFrom" className="block text-sm text-gray-600 mb-1">
                  Special Price From
                </label>
                <div className="mt-1 relative">
                  <input
                    type="date"
                    id="specialPriceFrom"
                    name="specialPriceFrom"
                    value={productData.specialPriceFrom}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Special Price To */}
              <div>
                <label htmlFor="specialPriceTo" className="block text-sm text-gray-600 mb-1">
                  Special Price To
                </label>
                <div className="mt-1 relative">
                  <input
                    type="date"
                    id="specialPriceTo"
                    name="specialPriceTo"
                    value={productData.specialPriceTo}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Customer Group Price */}
              <div className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-medium text-gray-900">Customer Group Price</h3>
                  <button
                    type="button" 
                    disabled={isReadOnly}
                    className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                      isReadOnly 
                        ? 'text-blue-400 bg-blue-50 cursor-not-allowed' 
                        : 'text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    Add New
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-gray-200 rounded-full p-2">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Add Group Price</h4>
                    <p className="text-sm text-gray-500">Special pricing for customers belonging to a specific group.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
            </div>
            <div className="px-6 py-6 space-y-6 border-t border-gray-200">
              {/* Length */}
              <div>
                <label htmlFor="length" className="block text-sm text-gray-600 mb-1">
                  Length
                </label>
                <input
                  type="text"
                  id="length"
                  name="length"
                  value={productData.length}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                />
              </div>
              
              {/* Width */}
              <div>
                <label htmlFor="width" className="block text-sm text-gray-600 mb-1">
                  Width
                </label>
                <input
                  type="text"
                  id="width"
                  name="width"
                  value={productData.width}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                />
              </div>
              
              {/* Height */}
              <div>
                <label htmlFor="height" className="block text-sm text-gray-600 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={productData.height}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                />
              </div>
              
              {/* Weight */}
              <div>
                <label htmlFor="weight" className="block text-sm text-gray-600 mb-1">
                  Weight <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={productData.weight}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`block w-full ${
                      errors.weight
                        ? inputErrorStyle
                        : isReadOnly ? inputReadOnlyStyle : inputBaseStyle
                    }`}
                    aria-invalid={!!errors.weight}
                  />
                  {errors.weight && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
              </div>
            </div>
          </div>
          
          {/* Settings Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Settings</h2>
            </div>
            <div className="px-6 py-6 space-y-6 border-t border-gray-200">
              {/* New */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isNew"
                    name="isNew"
                    type="checkbox"
                    checked={productData.isNew}
                    onChange={handleToggle}
                    disabled={isReadOnly}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isNew" className="font-medium text-gray-700">New</label>
                </div>
              </div>
              
              {/* Featured */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isFeatured"
                    name="isFeatured"
                    type="checkbox"
                    checked={productData.isFeatured}
                    onChange={handleToggle}
                    disabled={isReadOnly}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isFeatured" className="font-medium text-gray-700">Featured</label>
                </div>
              </div>
              
              {/* Visible Individually */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="visibleIndividually"
                    name="visibleIndividually"
                    type="checkbox"
                    checked={productData.visibleIndividually}
                    onChange={handleToggle}
                    disabled={isReadOnly}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="visibleIndividually" className="font-medium text-gray-700">Visible Individually <span className="text-red-500">*</span></label>
                </div>
              </div>
              
              {/* Status */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    checked={productData.status}
                    onChange={handleToggle}
                    disabled={isReadOnly}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="status" className="font-medium text-gray-700">Status <span className="text-red-500">*</span></label>
                </div>
              </div>
              
              {/* Guest Checkout */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="allowGuestCheckout"
                    name="allowGuestCheckout"
                    type="checkbox"
                    checked={productData.allowGuestCheckout}
                    onChange={handleToggle}
                    disabled={isReadOnly}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="allowGuestCheckout" className="font-medium text-gray-700">Guest Checkout <span className="text-red-500">*</span></label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inventories Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Inventories</h2>
            </div>
            <div className="px-6 py-6 space-y-6 border-t border-gray-200">
              {/* Manage Stock */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="manageStock"
                    name="manageStock"
                    type="checkbox"
                    checked={productData.manageStock}
                    onChange={handleToggle}
                    disabled={isReadOnly}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="manageStock" className="font-medium text-gray-700">Manage Stock</label>
                </div>
              </div>
              
              {/* Pending Ordered Qty */}
              <div className="flex items-center mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
                  Pending Ordered Qty: 0
                </span>
                <button className="ml-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Info</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Default */}
              <div className="mt-6">
                <label htmlFor="stockQuantity" className="block text-sm text-gray-600 mb-1">
                  Default
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={productData.stockQuantity}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  min="0"
                  className={`mt-1 block w-full ${isReadOnly ? inputReadOnlyStyle : inputBaseStyle}`}
                />
              </div>
            </div>
          </div>
          
          {/* Categories Section */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            </div>
            <div className="px-6 py-6 space-y-4 border-t border-gray-200">
              {PRODUCT_CATEGORIES.map(category => (
                <div key={category.id} className="flex items-start py-2">
                  <div className="flex items-center h-5">
                    <input
                      id={`category-${category.id}`}
                      type="checkbox"
                      checked={productData.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      disabled={isReadOnly}
                      className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={`category-${category.id}`} className="text-sm font-medium text-gray-700">
                      {category.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct; 