import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/product/ProductCard';
import RecentlyViewedCard from '../components/product/RecentlyViewedCard';

const Products: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Demo products data with structure matching Product type
  const demoProducts: Product[] = [
    { 
      id: '1', 
      name: "Apple Macbook Pro 2019", 
      description: "High-quality laptop for professionals", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.8, 
      reviews: 124,
      stock: 10,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '2', 
      name: "Apple Macbook Air", 
      description: "Thin and light laptop", 
      price: 1193.71, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.7, 
      reviews: 89,
      stock: 25,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '3', 
      name: "Apple Macbook Pro", 
      description: "Powerful laptop for professionals", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.5, 
      reviews: 67,
      stock: 8,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '4', 
      name: "Apple Macbook Air", 
      description: "Lightweight laptop", 
      price: 1193.71, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.6, 
      reviews: 112,
      stock: 15,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '5', 
      name: "Apple Macbook Pro 2019", 
      description: "Professional laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.3, 
      reviews: 47,
      stock: 12,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '6', 
      name: "Apple Macbook Air", 
      description: "Thin laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.7, 
      reviews: 78,
      stock: 18,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '7', 
      name: "Apple Macbook Pro 2019", 
      description: "Powerful laptop", 
      price: 2142.98, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.9, 
      reviews: 56,
      stock: 7,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '8', 
      name: "Apple Macbook Pro 2020", 
      description: "Latest model laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.5, 
      reviews: 93,
      stock: 22,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '9', 
      name: "Apple Macbook Pro 2019", 
      description: "Professional laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.2, 
      reviews: 104,
      stock: 30,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '10', 
      name: "Apple Macbook Pro 2019", 
      description: "Professional laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.8, 
      reviews: 71,
      stock: 9,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '11', 
      name: "Apple Macbook Pro 2019", 
      description: "Professional laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.4, 
      reviews: 129,
      stock: 24,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '12', 
      name: "Apple Macbook Air", 
      description: "Lightweight laptop", 
      price: 2285.05, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.6, 
      reviews: 58,
      stock: 14,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '13', 
      name: "Apple Macbook 2023", 
      description: "Latest model", 
      price: 2385.06, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.9, 
      reviews: 42,
      stock: 5,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '14', 
      name: "Apple Macbook Pro 2019", 
      description: "Professional laptop", 
      price: 2013.54, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", 
      category: "Laptop", 
      rating: 4.3, 
      reviews: 87,
      stock: 11,
      tags: ["laptop", "apple", "macbook"]
    },
    { 
      id: '15', 
      name: "Apple Watch Series 5", 
      description: "Smart watch", 
      price: 594.51, 
      originalPrice: 713.41,
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop", 
      category: "Watch", 
      rating: 4.8, 
      reviews: 96,
      stock: 16,
      tags: ["watch", "apple", "smart watch"]
    },
    { 
      id: '16', 
      name: "Rossini wristwatch", 
      description: "Classic wristwatch", 
      price: 146.71, 
      originalPrice: 176.05,
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop", 
      category: "Watch", 
      rating: 4.7, 
      reviews: 64,
      stock: 19,
      tags: ["watch", "rossini", "wristwatch"]
    },
  ];

  // Recently viewed products data
  const recentlyViewedProducts = [
    {
      id: '15',
      name: "Apple Watch Series 5",
      price: 594.51,
      originalPrice: 713.41,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
      label: { text: "-28%", colorClass: "bg-red-500" },
      modelNumber: "MWHF2VN/A"
    },
    {
      id: '16',
      name: "Rossini wristwatch",
      price: 146.71,
      originalPrice: 176.05,
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop",
      label: { text: "-10%", colorClass: "bg-orange-500" },
      modelNumber: "T128W/V/I/O"
    },
    {
      id: '17',
      name: "Angel Whitening Treatment Lotion",
      price: 193.31,
      originalPrice: 205.22,
      image: "https://images.unsplash.com/photo-1619549396130-6511cddb59e8?q=80&w=600&auto=format&fit=crop",
      label: { text: "-6%", colorClass: "bg-green-500" }
    },
    {
      id: '1',
      name: "Apple MacBook Pro 2019",
      price: 2013.54,
      originalPrice: 2416.25,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop",
      label: { text: "New", colorClass: "bg-orange-500" },
      modelNumber: "MVH12SA/A"
    },
    {
      id: '18',
      name: "Shop the Best at Gala Toy Park",
      price: 32,
      image: "https://images.unsplash.com/photo-1599751449918-8a10a588222c?q=80&w=600&auto=format&fit=crop",
      label: { text: "New", colorClass: "bg-orange-500" }
    },
    {
      id: '19',
      name: "Citizen BN0100-51L Men's Watch",
      price: 56.79,
      image: "https://images.unsplash.com/photo-1617714651073-157ebdad18ac?q=80&w=600&auto=format&fit=crop"
    }
  ];

  // Get unique categories (brands) - just for demo
  const brands = ["Apple", "DELL", "Casio", "Samsung", "PKJ", "Honda"];
  
  // Mock color options
  const colorOptions = [
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Black', value: 'bg-black' },
    { name: 'Orange', value: 'bg-orange-500' },
    { name: 'Yellow', value: 'bg-yellow-400' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Pink', value: 'bg-pink-300' },
  ];

  useEffect(() => {
    // Set recently viewed products
    const recentlyViewedData = recentlyViewedProducts.map(item => {
      const product = demoProducts.find(p => p.id === item.id) || {
        id: item.id,
        name: item.name,
        description: '',
        price: item.price,
        originalPrice: item.originalPrice,
        currency: 'USD',
        image: item.image,
        category: '',
        rating: 4.5,
        reviews: 50,
        stock: 10
      };
      return product;
    });
    
    setRecentlyViewed(recentlyViewedData);
  }, []);
  
  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 1000000]);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4">
          <span>Home</span> / <span>Technology</span> / <span>Laptop</span> / <span className="text-black">Apple</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Sidebar */}
          <div className="w-full md:w-56 pr-4">
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Category</h3>
              <div className="space-y-1">
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Toys and Puzzle</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 text-gray-800 font-medium hover:text-gray-700 transition-colors">
                  <span className="text-sm">Technology</span>
                  <ChevronRight className="h-4 w-4 transform rotate-90" />
                </button>
                <div className="pl-4 space-y-1 mt-1">
                  <button className="w-full flex items-center py-1.5 text-sm hover:text-gray-700 transition-colors">
                    Smart Watch
                  </button>
                  <button className="w-full flex items-center justify-between py-1.5 text-sm font-medium hover:text-gray-700 transition-colors">
                    <span>Laptop</span>
                    <ChevronRight className="h-4 w-4 transform rotate-90 ml-auto" />
                  </button>
                  <div className="pl-2 space-y-1 mt-1">
                    <button className="w-full text-left py-1.5 px-2 bg-orange-500 text-white rounded text-sm">
                      Apple
                    </button>
                    <button className="w-full text-left py-1.5 px-2 text-sm hover:bg-gray-100 transition-colors rounded">
                      DELL
                    </button>
                  </div>
                </div>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Tablet</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Desktop</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Accessories</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Watch</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Home & Life</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Cosmetic</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Fashion Accessories</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Products On Demand</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Fashion</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Nail Care</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Party accessories</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors">
                  <span className="text-sm">Vehicle</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Brand</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">Apple</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">DELL</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">Casio</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">Samsung</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">PKJ</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">Honda</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">Oppo</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">LG</button>
                <button className="px-2 py-1.5 border border-gray-200 rounded-sm text-xs hover:bg-gray-100 transition-colors">Lock & Lock</button>
              </div>
            </div>
            
            {/* Color Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                <button className="w-5 h-5 rounded-full bg-red-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"></button>
                <button className="w-5 h-5 rounded-full bg-black transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                <button className="w-5 h-5 rounded-full bg-orange-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"></button>
                <button className="w-5 h-5 rounded-full bg-yellow-400 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"></button>
                <button className="w-5 h-5 rounded-full bg-green-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"></button>
                <button className="w-5 h-5 rounded-full bg-emerald-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"></button>
                <button className="w-5 h-5 rounded-full bg-blue-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                <button className="w-5 h-5 rounded-full bg-purple-500 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"></button>
                <button className="w-5 h-5 rounded-full bg-pink-300 transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"></button>
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Price</h3>
              <div className="px-2">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>$0</span>
                  <span>$1,000,000</span>
                </div>
                <div className="relative pt-1">
                  <div className="w-full h-1 bg-gray-200 rounded-lg appearance-none">
                    <div 
                      className="absolute h-1 bg-orange-500 rounded-lg"
                      style={{ width: `${(priceRange[1] / 1000000) * 100}%` }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                  <div className="relative mt-1">
                    <div 
                      className="absolute w-4 h-4 bg-orange-500 rounded-full -translate-y-1/2 -translate-x-1/2 border-2 border-white" 
                      style={{ left: '0%', top: '0' }}
                    ></div>
                    <div 
                      className="absolute w-4 h-4 bg-orange-500 rounded-full -translate-y-1/2 -translate-x-1/2 border-2 border-white" 
                      style={{ left: `${(priceRange[1] / 1000000) * 100}%`, top: '0' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {demoProducts.slice(0, 16).map((product, index) => (
                <ProductCard 
                  key={index} 
                  product={product}
                  isNew={index % 4 === 0}
                  isBuiltIn={index % 7 === 0}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center gap-1 my-6">
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">1</button>
              <button className="w-6 h-6 flex items-center justify-center bg-orange-500 text-white rounded">2</button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">3</button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">4</button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">5</button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-medium">Recently Viewed</h2>
            <div className="flex space-x-2">
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewedProducts.map((item, index) => {
              const product = recentlyViewed[index];
              if (!product) return null;
              
              return (
                <RecentlyViewedCard
                  key={index}
                  product={product}
                  label={item.label}
                  modelNumber={item.modelNumber}
                  displayPrice={item.price.toFixed(2)}
                  originalPrice={item.originalPrice?.toFixed(2)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;