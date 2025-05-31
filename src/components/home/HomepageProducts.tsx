import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';
import { Product as CartProduct } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PRODUCTS_PER_PAGE = 4;

interface Category {
  category_id: number;
  name: string;
  slug: string;
  icon_url: string | null;
}

interface ProductMedia {
  media_id: number;
  product_id: number;
  type: string;
  url: string;
  sort_order: number;
  public_id: string | null;
}

interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  selling_price: number;
  cost_price: number;
  originalPrice?: number;
  image: string;
  stock: number;
  isNew?: boolean;
  featured?: boolean;
  favourite?: boolean;
  attributes: any[];
  brand_id: number;
  category_id: number;
  active_flag: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  discount_pct: number;
  merchant_id: number;
  sku: string;
  special_price: number | null;
  special_start: string | null;
  special_end: string | null;
  media: ProductMedia[];
}

interface CategoryWithProducts {
  category: Category;
  products: Product[];
  subcategories: {
    category: Category;
    products: Product[];
  }[];
}

interface CategoryState {
  activeCategory: string;
  currentPage: number;
}

const HomepageProducts: React.FC = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<CategoryWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryStates, setCategoryStates] = useState<Record<number, CategoryState>>({});
  const [itemsPerView, setItemsPerView] = useState(4);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const hasFetched = useRef(false);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm breakpoint
        setItemsPerView(1);
      } else if (width < 768) { // md breakpoint
        setItemsPerView(2);
      } else if (width < 1024) { // lg breakpoint
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Convert API product to cart product format
  const convertToCartProduct = (product: Product): CartProduct => ({
    id: product.product_id.toString(),
    name: product.product_name,
    description: product.product_description,
    price: product.selling_price,
    originalPrice: product.special_price || undefined,
    image: product.media?.[0]?.url || product.image, // Use first media image or fallback to image
    stock: product.stock,
    isNew: product.isNew,
    featured: product.featured,
    favourite: product.favourite,
    sku: product.sku,
    currency: 'INR',
    category: 'General',
    rating: 0,
    reviews: 0
  });

  useEffect(() => {
    const fetchHomepageProducts = async () => {
      // Prevent duplicate fetches
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await fetch(`${API_BASE_URL}/api/homepage/products`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch homepage products');
        }

        const data = await response.json();

        if (data.status === 'success') {
          setCategoriesWithProducts(data.data);
          // Initialize states for each category with 'All' as default
          const initialStates: Record<number, CategoryState> = {};
          data.data.forEach((category: CategoryWithProducts) => {
            initialStates[category.category.category_id] = {
              activeCategory: 'All',
              currentPage: 1
            };
          });
          setCategoryStates(initialStates);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageProducts();
  }, []);

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.product_name} added to wishlist`);
  };

  const renderProductCard = (product: Product) => {
    // Calculate price with discount if applicable
    const price = product.special_price || product.selling_price;
    const originalPrice = product.special_price ? product.selling_price : undefined;
    const productImage = product.media?.[0]?.url || product.image;

    return (
      <div
        key={product.product_id}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col max-w-[280px] w-full mx-auto"
        onClick={() => navigate(`/product/${product.product_id}`)}
      >
        <div className="relative aspect-[3/2] w-full">
          {/* Product badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="bg-[#F2631F] text-white text-[10px] px-1.5 py-0.5 rounded">
                New
              </span>
            )}
            {product.featured && (
              <span className="bg-[#F2631F] text-white text-[10px] px-1.5 py-0.5 rounded">
                Featured
              </span>
            )}
            {product.favourite && (
              <span className="bg-yellow-400 text-black text-[10px] px-1.5 py-0.5 rounded">
                Favourite
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-400 text-black text-[10px] px-1.5 py-0.5 rounded">
                Sold Out
              </span>
            )}
          </div>
          
          {/* Favorite button */}
          <button
            className="absolute top-4 right-4 p-1.5 z-10 text-gray-400 hover:text-[#F2631F] hover:bg-white hover:shadow-md rounded-full transition-all duration-300"
            onClick={(e) => handleWishlist(e, product)}
          >
            <Heart className="w-4 h-4" />
          </button>
          
          {/* Product image */}
          <img
            src={productImage}
            alt={product.product_name}
            className="w-full h-full object-contain p-2 rounded-lg"
          />
        </div>

        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm font-medium mb-1 line-clamp-1">{product.product_name}</h3>
          <div className="mt-auto">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-base font-bold">₹{price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-gray-400 text-sm line-through">₹{originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              className="w-1/2 bg-[#F2631F] text-white py-1.5 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(convertToCartProduct(product));
              }}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Get all products for the active category
  const getActiveCategoryProducts = (categoryData: CategoryWithProducts) => {
    const categoryState = categoryStates[categoryData.category.category_id];
    const activeCategory = categoryState?.activeCategory || categoryData.category.name;

    if (activeCategory === 'All') {
      // Return all products from all subcategories
      return categoryData.subcategories.flatMap(sub => sub.products || []);
    }

    // Find the selected subcategory
    const selectedSubcategory = categoryData.subcategories.find(
      sub => sub.category.name === activeCategory
    );

    if (selectedSubcategory) {
      // Return products from the selected subcategory
      // Note: These products now include both direct products and products from sub-subcategories
      return selectedSubcategory.products || [];
    }

    // If no subcategory is found, return empty array
    return [];
  };

  // Get visible products for a specific category
  const getVisibleProducts = (categoryData: CategoryWithProducts) => {
    const categoryState = categoryStates[categoryData.category.category_id];
    const currentPage = categoryState?.currentPage || 1;
    const allProducts = getActiveCategoryProducts(categoryData);
    const startIndex = (currentPage - 1) * itemsPerView;
    const endIndex = startIndex + itemsPerView;
    return allProducts.slice(startIndex, endIndex);
  };

  // Calculate total pages for a specific category
  const getTotalPages = (categoryData: CategoryWithProducts) => {
    const totalProducts = getActiveCategoryProducts(categoryData).length;
    return Math.ceil(totalProducts / itemsPerView);
  };

  // Handle category change for a specific section
  const handleCategoryChange = (categoryId: number, categoryName: string) => {
    setCategoryStates(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        activeCategory: categoryName,
        currentPage: 1 // Reset to first page when changing category
      }
    }));
  };

  // Handle page navigation for a specific section
  const handlePrevPage = (categoryId: number) => {
    setCategoryStates(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        currentPage: Math.max(prev[categoryId].currentPage - 1, 1)
      }
    }));
  };

  const handleNextPage = (categoryId: number) => {
    setCategoryStates(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        currentPage: Math.min(prev[categoryId].currentPage + 1, getTotalPages(categoriesWithProducts.find(c => c.category.category_id === categoryId)!))
      }
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-12">
      {categoriesWithProducts.map((categoryData) => (
        <section key={categoryData.category.category_id} className="pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-6">
              {/* Header with navigation */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <h2 className="text-2xl font-semibold">{categoryData.category.name}</h2>
                
                {/* Categories and Navigation */}
                <div className="flex items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0 space-x-6">
                  <button
                    className={`whitespace-nowrap ${
                      categoryStates[categoryData.category.category_id]?.activeCategory === 'All'
                        ? 'text-[#F2631F] border-b-2 border-[#F2631F]'
                        : 'text-gray-600 hover:text-[#F2631F]'
                    } pb-1`}
                    onClick={() => handleCategoryChange(categoryData.category.category_id, 'All')}
                  >
                    All
                  </button>
                  {categoryData.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.category.category_id}
                      className={`whitespace-nowrap ${
                        categoryStates[categoryData.category.category_id]?.activeCategory === subcategory.category.name
                          ? 'text-[#F2631F] border-b-2 border-[#F2631F]'
                          : 'text-gray-600 hover:text-[#F2631F]'
                      } pb-1`}
                      onClick={() => handleCategoryChange(categoryData.category.category_id, subcategory.category.name)}
                    >
                      {subcategory.category.name}
                    </button>
                  ))}
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`p-1 rounded-full border ${
                        categoryStates[categoryData.category.category_id]?.currentPage === 1 
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'border-gray-300 hover:bg-gray-100 transition-colors'
                      }`}
                      onClick={() => handlePrevPage(categoryData.category.category_id)}
                      disabled={categoryStates[categoryData.category.category_id]?.currentPage === 1}
                      aria-label="Previous products"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {categoryStates[categoryData.category.category_id]?.currentPage || 1} of {getTotalPages(categoryData)}
                    </span>
                    <button 
                      className={`p-1 rounded-full border ${
                        categoryStates[categoryData.category.category_id]?.currentPage === getTotalPages(categoryData)
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 hover:bg-gray-100 transition-colors'
                      }`}
                      onClick={() => handleNextPage(categoryData.category.category_id)}
                      disabled={categoryStates[categoryData.category.category_id]?.currentPage === getTotalPages(categoryData)}
                      aria-label="Next products"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products carousel */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-transform duration-300">
                  {getVisibleProducts(categoryData).map(renderProductCard)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomepageProducts; 