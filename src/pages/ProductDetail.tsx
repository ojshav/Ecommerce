import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, ShoppingCart, Heart, ArrowLeft, ChevronRight, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Tab type
type TabType = 'product-details' | 'information' | 'reviews';

interface ProductMedia {
  media_id: number;
  type: string;
  url: string;
  sort_order: number;
}

interface ProductMeta {
  short_desc: string;
  full_desc: string;
  meta_title: string;
  meta_desc: string;
  meta_keywords: string;
}

interface ProductAttribute {
  attribute_id: number;
  attribute_name: string;
  value_code: string;
  value_text: string;
  value_label: string | null;
  is_text_based: boolean;
}

interface ProductDetails {
  product_id: number;
  product_name: string;
  cost_price: number;
  selling_price: number;
  discount_pct: number;
  description: string;
  media: ProductMedia[];
  meta: ProductMeta;
  attributes: ProductAttribute[];
  category: {
    category_id: number;
    name: string;
  };
  brand: {
    brand_id: number;
    name: string;
  };
}

// Extend the Product type to match what the cart expects
interface CartProduct extends Omit<ProductDetails, 'category' | 'brand'> {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  stock: number;
  isNew: boolean;
  isBuiltIn: boolean;
  rating: number;
  reviews: number;
  sku: string;
  category: string;
  brand: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('product-details');
  const [selectedColor, setSelectedColor] = useState('black');
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}/details`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product details: ${response.status}`);
        }

        const data = await response.json();
        console.log('Product Data:', {
          selling_price: data.selling_price,
          cost_price: data.cost_price,
          discount_pct: data.discount_pct
        });
        setProduct(data);
        if (data.media && data.media.length > 0) {
          setSelectedImage(data.media[0].url);
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The product you're looking for does not exist or has been removed."}</p>
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Convert ProductDetails to CartProduct format
    const cartProduct: CartProduct = {
      ...product,
      id: String(product.product_id),
      name: product.product_name,
      price: product.selling_price,
      currency: 'INR',
      image: product.media[0]?.url || '',
      stock: 100,
      isNew: true,
      isBuiltIn: false,
      rating: 0,
      reviews: 0,
      sku: `SKU-${product.product_id}`,
      category: product.category?.name || '',
      brand: product.brand?.name || ''
    };
    
    addToCart(cartProduct, quantity);
    toast.success(`${product.product_name} added to cart`);
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const renderAttributeOptions = () => {
    if (!product?.attributes || product.attributes.length === 0) return null;

    return (
      <div className="mb-4">
        {product.attributes.map((attr) => (
          <div key={attr.attribute_id} className="mb-3">
            <div className="text-sm font-medium mb-1">{attr.attribute_name}:</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
                {attr.is_text_based ? attr.value_text : attr.value_label || attr.value_text}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'product-details':
        return (
          <div className="py-6">
            <h3 className="text-xl font-medium mb-4 text-gray-900">{product.meta?.meta_title || product.product_name}</h3>
            {/* Short Description */}
            {product.meta?.short_desc && (
              <div className="mb-4">
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.meta.short_desc }}
                />
              </div>
            )}
            {/* Full Description */}
            {product.meta?.full_desc && (
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3 text-gray-900">Full Description</h4>
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.meta.full_desc }}
                />
              </div>
            )}
            {/* Fallback to basic description if no meta description */}
            {!product.meta?.full_desc && product.description && (
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3 text-gray-900">Description</h4>
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        );
      case 'information':
        return (
          <div className="py-6">
            <h3 className="text-xl font-medium mb-6 text-gray-900">Technical Specifications</h3>
            <div className="border-t border-gray-200">
              <table className="min-w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700 w-1/3">Product</td>
                    <td className="py-3 text-gray-800">{product.product_name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Category</td>
                    <td className="py-3 text-gray-800">{product.category?.name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Brand</td>
                    <td className="py-3 text-gray-800">{product.brand?.name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Price</td>
                    <td className="py-3 text-gray-800">₹{product.selling_price}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Discount</td>
                    <td className="py-3 text-gray-800">{product.discount_pct}%</td>
                  </tr>
                  {/* Product Attributes */}
                  {product.attributes && product.attributes.map((attr) => (
                    <tr key={`${attr.attribute_id}-${attr.value_code}`} className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-medium text-gray-700">{attr.attribute_name}</td>
                      <td className="py-3 text-gray-800">
                        {attr.is_text_based ? attr.value_text : attr.value_label || attr.value_text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="py-6">
            <div className="text-center text-gray-500">
              No reviews available yet.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs mb-3">
          <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors">Home</Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-primary-600 transition-colors">Products</Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <Link to={`/category/${product.category?.category_id}`} className="text-gray-500 hover:text-primary-600 transition-colors">
            {product.category?.name}
          </Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.product_name}</span>
        </nav>
        
        {/* Product Overview Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Product Images */}
            <div className="space-y-2">
              <div className="rounded-lg overflow-hidden bg-gray-100 h-64 md:h-80 flex items-center justify-center border border-gray-200">
                <img 
                  src={selectedImage} 
                  alt={product.product_name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              <div className="flex space-x-2 justify-start">
                {product.media && product.media.length > 0 && (
                  <div className="flex space-x-2">
                    {product.media.map((media) => (
                      <button
                        key={media.media_id}
                        className={`rounded-md overflow-hidden flex-shrink-0 w-16 h-16 border-2 ${
                          selectedImage === media.url ? 'border-primary-500' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedImage(media.url)}
                      >
                        <img 
                          src={media.url} 
                          alt={`${product.product_name} - view ${media.sort_order}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {product.product_name}
              </h1>
              
              <div className="mb-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    ₹{product.selling_price}
                  </span>
                  {product.cost_price > product.selling_price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.cost_price}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-sm font-medium mb-1">Category: {product.category?.name}</div>
                <div className="text-sm font-medium mb-1">Brand: {product.brand?.name}</div>
              </div>

              {/* Short Description */}
              {product.meta?.short_desc && (
                <div className="mb-4">
                  <div 
                    className="text-sm text-gray-600 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.meta.short_desc }}
                  />
                </div>
              )}
              
              {/* Attribute Options */}
              {renderAttributeOptions()}
              
              {/* Quantity Selector and Add to Cart Row */}
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Quantity:</div>
                <div className="flex items-center gap-3">
                  {/* Quantity Changer */}
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-[90px] h-9">
                    <button 
                      className="w-8 h-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-lg"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm select-none">{quantity}</span>
                    <button 
                      className="w-8 h-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-lg"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium text-sm min-w-[120px]"
                  >
                    Add To Cart
                  </button>
                  {/* Favourites Button */}
                  <button 
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors min-w-[40px]"
                    aria-label="Add to Wishlist"
                  >
                    <Heart size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('product-details')}
                className={`py-2 px-4 font-medium border-b-2 ${
                  activeTab === 'product-details'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('information')}
                className={`py-2 px-4 font-medium border-b-2 ${
                  activeTab === 'information'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-4 font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="p-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;