import React, { useState, useEffect } from 'react';
import ProductMediaUpload from './ProductMediaUpload';
import ShippingDetails from './ShippingDetails';
import ProductMeta from './ProductMeta';
import ProductVariants from './ProductVariants';
import AttributeSelection from './AttributeSelection';

interface VariantAttribute {
  name: string;
}

interface Variant {
  variant_id?: number;
  id: string;
  sku: string;
  price: string;
  stock: string;
  attributes: VariantAttribute[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CoreProductInfoProps {
  name: string;
  description: string;
  sku: string;
  costPrice: string;
  sellingPrice: string;
  specialPrice: string;
  specialPriceStart: string;
  specialPriceEnd: string;
  categoryId: number | null;
  brandId: number | null;
  onInfoChange: (field: string, value: string) => void;
  onProductCreated?: (productId: number) => void;
  errors?: {
    name?: string;
    description?: string;
    sku?: string;
    costPrice?: string;
    sellingPrice?: string;
    specialPrice?: string;
    specialPriceStart?: string;
    specialPriceEnd?: string;
    categoryId?: string;
    brandId?: string;
  };
}

const CoreProductInfo: React.FC<CoreProductInfoProps> = ({
  name,
  description,
  sku,
  costPrice,
  sellingPrice,
  specialPrice,
  specialPriceStart,
  specialPriceEnd,
  categoryId,
  brandId,
  onInfoChange,
  onProductCreated,
  errors = {},
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  
  // Shipping state
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  });
  const [dimensionUnit, setDimensionUnit] = useState('cm');
  const [shippingClass, setShippingClass] = useState('');

  // Stock state
  const [stockQty, setStockQty] = useState('0');
  const [lowStockThreshold, setLowStockThreshold] = useState('0');
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);
  const [stockSuccess, setStockSuccess] = useState<string | null>(null);

  // Meta state
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  // Add variants state
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantErrors, setVariantErrors] = useState<{
    variants?: {
      [key: string]: {
        sku?: string;
        price?: string;
        stock?: string;
        attributes?: {
          [key: string]: string;
        };
      };
    };
  }>({});

  // Add new state for attributes
  const [selectedAttributes, setSelectedAttributes] = useState<Record<number, string | string[]>>({});
  const [attributeErrors, setAttributeErrors] = useState<Record<string, any>>({});

  // Calculate discount whenever cost price or selling price changes
  useEffect(() => {
    const cost = parseFloat(costPrice) || 0;
    const selling = parseFloat(sellingPrice) || 0;
    
    if (cost > 0 && selling > 0) {
      const calculatedDiscount = ((cost - selling) / cost) * 100;
      setDiscount(Math.round(calculatedDiscount * 100) / 100); // Round to 2 decimal places
    } else {
      setDiscount(0);
    }
  }, [costPrice, sellingPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryId || !brandId) {
      setSubmitError('Please select both category and brand');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: name,
          product_description: description,
          sku: sku,
          cost_price: parseFloat(costPrice),
          selling_price: parseFloat(sellingPrice),
          special_price: specialPrice ? parseFloat(specialPrice) : null,
          special_start: specialPriceStart || null,
          special_end: specialPriceEnd || null,
          category_id: categoryId,
          brand_id: brandId,
          discount_percentage: discount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const data = await response.json();
      console.log('Product created successfully:', data);
      
      // Set the product ID in state
      const newProductId = data.product_id;
      setProductId(newProductId);
      
      // Call onProductCreated with the new product ID
      if (typeof onProductCreated === 'function') {
        console.log('Calling onProductCreated with ID:', newProductId);
        onProductCreated(newProductId);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShippingChange = (field: string, value: string) => {
    switch (field) {
      case 'weight':
        setWeight(value);
        break;
      case 'weightUnit':
        setWeightUnit(value);
        break;
      case 'dimensionUnit':
        setDimensionUnit(value);
        break;
      case 'shippingClass':
        setShippingClass(value);
        break;
    }
  };

  const handleDimensionsChange = (field: string, value: string) => {
    setDimensions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMetaChange = (field: string, value: string) => {
    switch (field) {
      case 'metaTitle':
        setMetaTitle(value);
        break;
      case 'metaDescription':
        setMetaDescription(value);
        break;
      case 'metaKeywords':
        setMetaKeywords(value);
        break;
      case 'shortDescription':
        setShortDescription(value);
        break;
      case 'fullDescription':
        setFullDescription(value);
        break;
    }
  };

  const handleUpdateStock = async () => {
    if (!productId) {
      setStockError('Product ID is required to update stock');
      return;
    }

    try {
      setIsUpdatingStock(true);
      setStockError(null);
      setStockSuccess(null);

      const stockData = {
        stock_qty: parseInt(stockQty),
        low_stock_threshold: parseInt(lowStockThreshold)
      };

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/stock`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update stock');
      }

      setStockSuccess('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
      setStockError(error instanceof Error ? error.message : 'Failed to update stock');
    } finally {
      setIsUpdatingStock(false);
    }
  };

  const handleVariantsChange = (newVariants: Variant[]) => {
    setVariants(newVariants);
    // Clear any existing variant errors when variants are updated
    setVariantErrors({});
  };

  const handleAttributeSelect = (attributeId: number, value: string | string[]) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: value
    }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category and Brand Selection Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="mt-1">
              <div className={`block w-full rounded-md shadow-sm sm:text-sm p-2 ${
                !categoryId ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                {categoryId ? 'Category Selected' : 'Please select a category'}
              </div>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <div className="mt-1">
              <div className={`block w-full rounded-md shadow-sm sm:text-sm p-2 ${
                !brandId ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                {brandId ? 'Brand Selected' : 'Please select a brand'}
              </div>
              {errors.brandId && (
                <p className="mt-1 text-sm text-red-600">{errors.brandId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => onInfoChange('name', e.target.value)}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => onInfoChange('description', e.target.value)}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${
                errors.description
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        {/* SKU */}
        <div>
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700"
          >
            SKU
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="sku"
              value={sku}
              onChange={(e) => onInfoChange('sku', e.target.value)}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${
                errors.sku
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }`}
              placeholder="Enter SKU"
            />
            {errors.sku && (
              <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="costPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Cost Price
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="costPrice"
                value={costPrice}
                onChange={(e) => onInfoChange('costPrice', e.target.value)}
                step="0.01"
                min="0"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.costPrice
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                }`}
                placeholder="Enter cost price"
              />
              {errors.costPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.costPrice}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="sellingPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Selling Price
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="sellingPrice"
                value={sellingPrice}
                onChange={(e) => onInfoChange('sellingPrice', e.target.value)}
                step="0.01"
                min="0"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.sellingPrice
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                }`}
                placeholder="Enter selling price"
              />
              {errors.sellingPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.sellingPrice}</p>
              )}
            </div>
          </div>
        </div>

        {/* Discount Display */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Calculated Discount</span>
            <span className={`text-lg font-semibold ${discount > 0 ? 'text-green-600' : 'text-gray-600'}`}>
              {discount > 0 ? `${discount}%` : 'No discount'}
            </span>
          </div>
          {discount > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              Based on cost price of ${parseFloat(costPrice).toFixed(2)} and selling price of ${parseFloat(sellingPrice).toFixed(2)}
            </p>
          )}
        </div>

        {/* Special Price */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Special Price</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="specialPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Special Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="specialPrice"
                  value={specialPrice}
                  onChange={(e) => onInfoChange('specialPrice', e.target.value)}
                  step="0.01"
                  min="0"
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.specialPrice
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                  placeholder="Enter special price"
                />
                {errors.specialPrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.specialPrice}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="specialPriceStart"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <div className="mt-1">
                <input
                  type="datetime-local"
                  id="specialPriceStart"
                  value={specialPriceStart}
                  onChange={(e) =>
                    onInfoChange('specialPriceStart', e.target.value)
                  }
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.specialPriceStart
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                />
                {errors.specialPriceStart && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.specialPriceStart}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="specialPriceEnd"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <div className="mt-1">
                <input
                  type="datetime-local"
                  id="specialPriceEnd"
                  value={specialPriceEnd}
                  onChange={(e) => onInfoChange('specialPriceEnd', e.target.value)}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.specialPriceEnd
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  }`}
                />
                {errors.specialPriceEnd && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.specialPriceEnd}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{submitError}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !categoryId || !brandId}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>

      {/* Attribute Selection Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Product Attributes</h3>
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <AttributeSelection
            categoryId={categoryId}
            productId={productId}
            selectedAttributes={selectedAttributes}
            onAttributeSelect={handleAttributeSelect}
            errors={attributeErrors}
          />
        </div>
      </div>

      {productId && (
        <>
          {/* Product Media Upload Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Media</h3>
            <ProductMediaUpload
              productId={productId}
              onMediaChange={(media) => {
                console.log('Media updated:', media);
              }}
            />
          </div>

          {/* Shipping Details Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Details</h3>
            <ShippingDetails
              productId={productId}
              weight={weight}
              weightUnit={weightUnit}
              dimensions={dimensions}
              dimensionUnit={dimensionUnit}
              shippingClass={shippingClass}
              onShippingChange={handleShippingChange}
              onDimensionsChange={handleDimensionsChange}
            />
          </div>

          {/* Stock Management Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Stock Management</h3>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              {stockError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-700">{stockError}</p>
                </div>
              )}

              {stockSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <p className="text-green-700">{stockSuccess}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="stock_qty" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock_qty"
                    value={stockQty}
                    onChange={(e) => setStockQty(e.target.value)}
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="low_stock_threshold" className="block text-sm font-medium text-gray-700">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    id="low_stock_threshold"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpdateStock}
                  disabled={isUpdatingStock}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdatingStock ? 'Updating...' : 'Update Stock'}
                </button>
              </div>
            </div>
          </div>

          {/* Product Meta Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Meta Information</h3>
            <ProductMeta
              productId={productId}
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              metaKeywords={metaKeywords}
              shortDescription={shortDescription}
              fullDescription={fullDescription}
              onMetaChange={handleMetaChange}
            />
          </div>

          {/* Product Variants Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Variants</h3>
            <ProductVariants
              productId={productId}
              variants={variants}
              onVariantsChange={handleVariantsChange}
              errors={variantErrors}
              categoryId={categoryId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CoreProductInfo; 