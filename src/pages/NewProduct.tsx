import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const NewProduct: React.FC = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Sample new products data with real images
  const newProducts = [
    {
      id: 1,
      name: 'Smart Watch Pro X',
      price: 299.99,
      category: 'Smart Watch',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-15',
      description: 'Advanced smartwatch with health monitoring and GPS tracking'
    },
    {
      id: 2,
      name: 'Wireless Noise Cancelling Headphones',
      price: 199.99,
      category: 'Accessories',
      accessory: 'Headphones',
      brand: 'Sony',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-14',
      description: 'Premium over-ear headphones with active noise cancellation'
    },
    {
      id: 3,
      name: 'Ultra Slim Laptop',
      price: 1299.99,
      category: 'Laptop',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-12',
      description: 'Powerful and lightweight laptop for professionals'
    },
    {
      id: 4,
      name: 'Home Smart Speaker',
      price: 79.99,
      originalPrice: 99.99,
      category: 'Accessories',
      accessory: 'Speaker',
      brand: 'Samsung',
      image: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-10',
      description: 'Voice-controlled smart speaker for your connected home'
    },
    {
      id: 5,
      name: '4K Action Camera',
      price: 249.99,
      category: 'Accessories',
      accessory: 'Camera',
      brand: 'Huawei',
      image: 'https://images.unsplash.com/photo-1613080828499-5dbc124c5b88?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-08',
      description: 'Waterproof 4K action camera for outdoor adventures'
    },
    {
      id: 6,
      name: 'Ergonomic Gaming Mouse',
      price: 59.99,
      category: 'Accessories',
      accessory: 'Mouse',
      brand: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-05',
      description: 'High-precision gaming mouse with customizable buttons'
    },
    {
      id: 7,
      name: 'Bluetooth Portable Speaker',
      price: 89.99,
      originalPrice: 119.99,
      category: 'Accessories',
      accessory: 'Speaker',
      brand: 'Huawei',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-03',
      description: 'Waterproof portable speaker with 360° sound'
    },
    {
      id: 8,
      name: 'iPad Pro 12.9"',
      price: 999.99,
      category: 'Tablet',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-10-01',
      description: 'Ultra-fast tablet with stunning display'
    },
    {
      id: 9,
      name: 'Samsung Galaxy Tab S7',
      price: 649.99,
      category: 'Tablet',
      brand: 'Samsung',
      image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-09-28',
      description: 'Premium Android tablet with S Pen included'
    },
    {
      id: 10,
      name: 'Mechanical Keyboard',
      price: 129.99,
      category: 'Accessories',
      accessory: 'Keyboard',
      brand: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-09-25',
      promotion: 'october-sale',
      description: 'Tactile mechanical keyboard for typing enthusiasts'
    },
    {
      id: 11,
      name: 'USB-C Hub',
      price: 49.99,
      originalPrice: 69.99,
      category: 'Accessories',
      accessory: 'USB',
      brand: 'Dell',
      image: 'https://images.unsplash.com/photo-1636410025892-fb6fbb7417a1?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-09-22',
      promotion: 'october-sale',
      description: 'Multi-port USB-C hub for expanded connectivity'
    },
    {
      id: 12,
      name: 'Huawei MatePad Pro',
      price: 499.99,
      category: 'Tablet',
      brand: 'Huawei',
      image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=600&auto=format&fit=crop',
      dateAdded: '2023-09-20',
      description: 'Premium tablet with stylus support'
    }
  ];

  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const brand = queryParams.get('brand');
    const accessory = queryParams.get('accessory');
    const promotion = queryParams.get('promotion');
    
    let filtered = [...newProducts];
    
    // Apply filters based on query parameters
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase());
      setActiveFilter(category);
      setFilterType('category');
    } else if (brand) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === brand.toLowerCase());
      setActiveFilter(brand);
      setFilterType('brand');
    } else if (accessory) {
      filtered = filtered.filter(product => 
        product.accessory?.toLowerCase() === accessory.toLowerCase());
      setActiveFilter(accessory);
      setFilterType('accessory');
    } else if (promotion) {
      filtered = filtered.filter(product => 
        product.promotion?.toLowerCase() === promotion.toLowerCase());
      setActiveFilter('October Sale');
      setFilterType('promotion');
    } else {
      setActiveFilter(null);
      setFilterType(null);
    }
    
    setFilteredProducts(filtered);
  }, [location.search]);

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : newProducts;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold">New Products</h1>
            {activeFilter && (
              <div className="text-sm text-gray-600 mt-1">
                {filterType === 'category' && `Category: ${activeFilter}`}
                {filterType === 'brand' && `Brand: ${activeFilter}`}
                {filterType === 'accessory' && `Accessory: ${activeFilter}`}
                {filterType === 'promotion' && `Promotion: ${activeFilter}`}
              </div>
            )}
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <label htmlFor="sort" className="mr-2 text-gray-600 text-sm md:text-base whitespace-nowrap">Sort by:</label>
            <select 
              id="sort" 
              className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm w-full sm:w-auto"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
            {displayProducts.map(product => (
              <div key={product.id} className="border border-gray-200 relative group cursor-pointer hover:shadow-sm transition-shadow duration-200">
                <div className="relative">
                  <div className="h-36 sm:h-40 md:h-44 lg:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-sm z-10">NEW</span>
                  {product.originalPrice && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-sm">Sale</span>
                  )}
                  {product.promotion === 'october-sale' && !product.originalPrice && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-sm">OFFER</span>
                  )}
                </div>
                <div className="p-2 md:p-3">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-xs md:text-sm font-medium mt-0.5 md:mt-1 line-clamp-1">{product.name}</p>
                  <div className="flex items-center mt-1 md:mt-2">
                    <span className="text-xs md:text-sm font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2 md:mt-3">
                    <Link 
                      to={`/product/${product.id}`} 
                      className="text-blue-500 text-xs hover:underline"
                    >
                      View
                    </Link>
                    <button className="bg-black text-white text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-sm hover:bg-gray-800">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination - only show if we have products */}
        {displayProducts.length > 0 && (
          <div className="flex justify-center mt-4 md:mt-8 mb-8">
            <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-2 sm:px-3 py-1 rounded bg-gray-800 text-white mx-1">1</button>
            <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">2</button>
            <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">3</button>
            <button className="hidden sm:block px-3 py-1 rounded border border-gray-200 text-gray-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* You May Also Like - only show if we have products */}
        {displayProducts.length > 0 && (
          <div className="mt-8 md:mt-12 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-medium">You May Also Like</h2>
              <div className="flex space-x-2">
                <button className="border border-gray-200 p-1 rounded-sm hover:bg-gray-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="border border-gray-200 p-1 rounded-sm hover:bg-gray-50">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {newProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <div className="relative">
                    <div className="h-24 sm:h-28 md:h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute top-1 left-1 bg-black text-white text-[8px] md:text-[9px] px-1 py-0.5 rounded-sm">NEW</span>
                    {product.originalPrice && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] md:text-[9px] px-1 py-0.5 rounded-sm">Sale</span>
                    )}
                  </div>
                  <div className="p-2 md:p-2.5">
                    <p className="text-[9px] md:text-[10px] text-gray-500">{product.category}</p>
                    <p className="text-[10px] md:text-xs font-medium mt-0.5 md:mt-1 line-clamp-1">{product.name}</p>
                    <div className="flex items-center mt-1 md:mt-1.5">
                      <span className="text-[10px] md:text-xs font-bold">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-[8px] md:text-[10px] text-gray-400 line-through ml-1 md:ml-1.5">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-1 md:mt-2">
                      <Link to={`/product/${product.id}`} className="text-blue-500 text-[9px] md:text-[10px] hover:underline">View</Link>
                      <button className="bg-black text-white text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-sm hover:bg-gray-800">Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProduct; 