import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';

const Products: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Demo products data with structure matching Product type
  const demoProducts: Product[] = [
    { 
      id: '1', 
      name: "4K Action Camera", 
      description: "High-quality 4K action camera for all your adventures", 
      price: 249.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1613080828499-5dbc124c5b88?q=80&w=600&auto=format&fit=crop", 
      category: "Photography", 
      rating: 4.8, 
      reviews: 124,
      stock: 10,
      tags: ["camera", "photography", "outdoor"]
    },
    { 
      id: '2', 
      name: "Ergonomic Gaming Mouse", 
      description: "Professional gaming mouse with customizable buttons", 
      price: 59.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=600&auto=format&fit=crop", 
      category: "Gaming", 
      rating: 4.7, 
      reviews: 89,
      stock: 25,
      tags: ["gaming", "peripherals", "computer"]
    },
    { 
      id: '3', 
      name: "Ultra HD Smart TV", 
      description: "Crystal clear 4K display with smart capabilities", 
      price: 899.99, 
      originalPrice: 799.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop", 
      category: "Electronics", 
      rating: 4.5, 
      reviews: 67,
      stock: 8,
      tags: ["tv", "entertainment", "electronics"]
    },
    { 
      id: '4', 
      name: "Wireless Headphones", 
      description: "Premium wireless headphones with noise cancellation", 
      price: 179.99, 
      originalPrice: 149.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop", 
      category: "Audio", 
      rating: 4.6, 
      reviews: 112,
      stock: 15,
      tags: ["audio", "headphones", "wireless"]
    },
    { 
      id: '5', 
      name: "Smart Home Hub", 
      description: "Control all your smart devices from one hub", 
      price: 129.99, 
      originalPrice: 99.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=600&auto=format&fit=crop", 
      category: "Smart Home", 
      rating: 4.3, 
      reviews: 47,
      stock: 12,
      tags: ["smart home", "automation", "technology"]
    },
    { 
      id: '6', 
      name: "Fitness Smartwatch", 
      description: "Track your fitness goals with this premium smartwatch", 
      price: 199.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop", 
      category: "Wearables", 
      rating: 4.7, 
      reviews: 78,
      stock: 18,
      tags: ["fitness", "wearable", "health"]
    },
    { 
      id: '7', 
      name: "Digital SLR Camera", 
      description: "Professional-grade DSLR camera for photography enthusiasts", 
      price: 649.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=600&auto=format&fit=crop", 
      category: "Photography", 
      rating: 4.9, 
      reviews: 56,
      stock: 7,
      tags: ["photography", "camera", "professional"]
    },
    { 
      id: '8', 
      name: "Mechanical Keyboard", 
      description: "Responsive mechanical keyboard with RGB lighting", 
      price: 89.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop", 
      category: "Computing", 
      rating: 4.5, 
      reviews: 93,
      stock: 22,
      tags: ["keyboard", "gaming", "computer"]
    },
    { 
      id: '9', 
      name: "Portable Bluetooth Speaker", 
      description: "Compact speaker with powerful sound", 
      price: 49.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop", 
      category: "Audio", 
      rating: 4.2, 
      reviews: 104,
      stock: 30,
      tags: ["audio", "speaker", "portable"]
    },
    { 
      id: '10', 
      name: "Premium Laptop", 
      description: "Powerful laptop for work and gaming", 
      price: 1299.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop", 
      category: "Computing", 
      rating: 4.8, 
      reviews: 71,
      stock: 9,
      tags: ["laptop", "computer", "premium"]
    },
    { 
      id: '11', 
      name: "Wireless Earbuds", 
      description: "True wireless earbuds with premium sound quality", 
      price: 129.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=600&auto=format&fit=crop", 
      category: "Audio", 
      rating: 4.4, 
      reviews: 129,
      stock: 24,
      tags: ["audio", "earbuds", "wireless"]
    },
    { 
      id: '12', 
      name: "Smart Doorbell", 
      description: "Keep your home secure with this smart doorbell", 
      price: 149.99, 
      originalPrice: 129.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1584475784921-d9dbfd9d17ca?q=80&w=600&auto=format&fit=crop", 
      category: "Smart Home", 
      rating: 4.6, 
      reviews: 58,
      stock: 14,
      tags: ["security", "smart home", "doorbell"]
    },
    { 
      id: '13', 
      name: "Limited Edition Console", 
      description: "Special edition gaming console with exclusive design", 
      price: 499.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop", 
      category: "Gaming", 
      rating: 4.9, 
      reviews: 42,
      stock: 0,
      tags: ["gaming", "console", "limited edition"]
    },
    { 
      id: '14', 
      name: "Robot Vacuum Cleaner", 
      description: "Automated cleaning with smart navigation", 
      price: 299.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1567416659975-0298edc91739?q=80&w=600&auto=format&fit=crop", 
      category: "Home", 
      rating: 4.3, 
      reviews: 87,
      stock: 11,
      tags: ["home", "cleaning", "robot"]
    },
    { 
      id: '15', 
      name: "Noise Cancelling Headphones", 
      description: "Premium over-ear headphones with noise cancellation", 
      price: 249.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=600&auto=format&fit=crop", 
      category: "Audio", 
      rating: 4.8, 
      reviews: 96,
      stock: 16,
      tags: ["audio", "headphones", "noise cancelling"]
    },
    { 
      id: '16', 
      name: "External SSD Drive", 
      description: "Fast and reliable external storage solution", 
      price: 129.99, 
      originalPrice: 99.99, 
      currency: "USD", 
      image: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?q=80&w=600&auto=format&fit=crop", 
      category: "Storage", 
      rating: 4.7, 
      reviews: 64,
      stock: 19,
      tags: ["storage", "computer", "SSD"]
    },
  ];

  // Get unique categories (brands) - just for demo
  const brands = ["ABC", "ABC", "ABC", "ABC", "ABC", "ABC"];
  
  // Mock color options
  const colorOptions = [
    { name: 'Gray', value: 'bg-gray-400' },
    { name: 'LightGray', value: 'bg-gray-300' },
    { name: 'DarkGray', value: 'bg-gray-600' },
    { name: 'Gray2', value: 'bg-gray-500' },
    { name: 'Gray3', value: 'bg-gray-700' },
    { name: 'Gray4', value: 'bg-gray-800' },
    { name: 'Gray5', value: 'bg-gray-200' },
    { name: 'Gray6', value: 'bg-gray-400' },
    { name: 'Gray7', value: 'bg-gray-500' },
  ];

  // Filter products when search query or filters change
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply gender filter (simplified for demo)
    if (selectedGender) {
      // In a real app, would filter by actual gender category
      result = result.filter(product => {
        if (selectedGender === 'Men') return product.category === 'electronics' || product.category === 'furniture';
        if (selectedGender === 'Women') return product.category === 'fashion' || product.category === 'clothing';
        if (selectedGender === 'Boy') return product.category === 'sports';
        if (selectedGender === 'Girls') return product.category === 'beauty';
        return true;
      });
    }

    // Apply brand filter (simulated)
    if (selectedBrands.length > 0) {
      // In a real app, would filter by actual brands
      // For demo, we'll just filter randomly based on id
      result = result.filter(product => {
        const productIdNum = parseInt(product.id);
        return selectedBrands.some((_, index) => productIdNum % (index + 3) === 0);
      });
    }

    // Apply color filter (simulated)
    if (selectedColors.length > 0) {
      // In a real app, would filter by actual colors
      // For demo, we'll just filter randomly based on id
      result = result.filter(product => {
        const productIdNum = parseInt(product.id);
        return selectedColors.some((_, index) => productIdNum % (index + 2) === 0);
      });
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply discount filter (simulated)
    if (selectedDiscounts.length > 0) {
      result = result.filter(product => product.originalPrice !== undefined);
    }
    
    setFilteredProducts(result);

    // Set recently viewed (for demo purposes) - now properly typed
    setRecentlyViewed(demoProducts.slice(0, 6));
  }, [searchQuery, selectedGender, selectedBrands, selectedColors, priceRange, selectedDiscounts]);
  
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

  // Toggle discount selection
  const toggleDiscount = (discount: string) => {
    setSelectedDiscounts(prev => 
      prev.includes(discount) 
        ? prev.filter(d => d !== discount)
        : [...prev, discount]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGender('');
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 10000]);
    setSelectedDiscounts([]);
  };

  return (
    <div className="min-h-screen">
      {/* Dark Header */}
      <header className="bg-black text-white py-3 md:py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold ml-2">Logo</span>
            </div>
            <div className="flex items-center space-x-3 md:hidden">
              <button className="p-1">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-1">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-80">
            <input 
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-3 py-2 rounded text-gray-800"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-1">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="p-1">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="bg-white text-black px-3 py-1 rounded text-sm">
              Become a Member
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-200 overflow-x-auto">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center whitespace-nowrap">
            <div className="pr-6 flex items-center">
              <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Categories</span>
            </div>
            <Link to="/" className="px-3">Home</Link>
            <Link to="/products/new" className="px-3">New Product</Link>
            <Link to="/products" className="px-3 font-medium">All Products</Link>
            <div className="px-3 flex items-center">
              <span>Promotion</span>
              <span className="ml-1 bg-gray-600 text-white text-xs px-1 rounded">HOT</span>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-center px-3">
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5V3H15V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Track Your Order
            </div>
            <div className="flex items-center px-3">
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign In/Register
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pb-8">
        {/* Available items */}
        <div className="py-4 flex items-center">
          <div className="mr-2 w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-600">All available items</span>
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button 
            className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded flex justify-between items-center"
            onClick={() => alert('Mobile filter would open here')}
          >
            <span className="font-medium">Filter Products</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M10 12H21M17 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Hidden on Mobile */}
          <div className="hidden md:block w-56">
            <div className="border border-gray-200">
              <div className="flex justify-between items-center p-3">
                <h3 className="font-medium">Filter</h3>
                <button className="text-xs text-gray-500">Clear All</button>
              </div>
              
              {/* Gender Filter */}
              <div className="p-2 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-men"
                        name="gender"
                        checked={selectedGender === 'Men'}
                        onChange={() => setSelectedGender('Men')}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded-full"
                      />
                      <label htmlFor="gender-men" className="ml-2 text-sm">Men</label>
                    </div>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-women"
                        name="gender"
                        checked={selectedGender === 'Women'}
                        onChange={() => setSelectedGender('Women')}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded-full"
                      />
                      <label htmlFor="gender-women" className="ml-2 text-sm">Women</label>
                    </div>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-boy"
                        name="gender"
                        checked={selectedGender === 'Boy'}
                        onChange={() => setSelectedGender('Boy')}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded-full"
                      />
                      <label htmlFor="gender-boy" className="ml-2 text-sm">Boy</label>
                    </div>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-girls"
                        name="gender"
                        checked={selectedGender === 'Girls'}
                        onChange={() => setSelectedGender('Girls')}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded-full"
                      />
                      <label htmlFor="gender-girls" className="ml-2 text-sm">Girls</label>
                    </div>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Brand Filter */}
              <div className="p-3 border-t border-gray-200">
                <h4 className="font-medium text-sm mb-2">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${index}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`brand-${index}`} className="ml-2 text-xs flex justify-between w-full">
                        <span>ABC</span>
                        <span className="text-gray-400 text-xs">(120)</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Discount Range */}
              <div className="p-3 border-t border-gray-200">
                <h4 className="font-medium text-sm mb-2">Discount Range</h4>
                <div className="space-y-2">
                  {["ABC", "ABC", "ABC", "ABC", "ABC", "ABC"].map((discount, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`discount-${index}`}
                        checked={selectedDiscounts.includes(discount)}
                        onChange={() => toggleDiscount(discount)}
                        className="h-4 w-4 text-gray-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`discount-${index}`} className="ml-2 text-xs">
                        {discount}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color Filter */}
              <div className="p-3 border-t border-gray-200">
                <h4 className="font-medium text-sm mb-2">Color</h4>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.slice(0, 9).map((color, index) => (
                    <div key={index} className="flex justify-center">
                      <button
                        className={`w-5 h-5 rounded-full ${color.value}`}
                        onClick={() => toggleColor(color.name)}
                        aria-label={`Select ${color.name} color`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="p-3 border-t border-gray-200">
                <h4 className="font-medium text-sm mb-2">Price</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>$0</span>
                    <span>$10,000.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              {demoProducts.map((product, index) => (
                <div key={index} className="border border-gray-200 relative group cursor-pointer">
                  {product.id === '1' || product.id === '2' || product.id === '8' ? (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-sm z-10">NEW</span>
                  ) : null}
                  <div className="relative">
                    <div className="h-36 sm:h-40 md:h-44 lg:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {product.id === '4' || product.id === '5' ? (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-sm">Sale</span>
                    ) : null}
                    {product.id === '10' ? (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-sm">Popular & Hot</span>
                    ) : null}
                    {product.id === '13' ? (
                      <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-sm">Sold Out</span>
                    ) : null}
                    {product.id === '12' ? (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-sm">-10%</span>
                    ) : null}
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
                      <a href="#" className="text-blue-500 text-xs hover:underline">View</a>
                      <button className="bg-black text-white text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-sm">Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                
            {/* Pagination */}
            <div className="flex justify-center mt-4 mb-8">
              <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">1</button>
              <button className="px-2 sm:px-3 py-1 rounded bg-gray-800 text-white mx-1">2</button>
              <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">3</button>
              <button className="hidden sm:block px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">4</button>
              <button className="hidden sm:block px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">5</button>
              <button className="px-2 sm:px-3 py-1 rounded border border-gray-200 text-gray-700">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-8 md:mt-12 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base md:text-lg font-medium">Recently Viewed</h2>
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
            {demoProducts.slice(0, 6).map((product, index) => (
              <div key={index} className="border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <div className="h-24 sm:h-28 md:h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {product.id === '4' || product.id === '5' ? (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] md:text-[9px] px-1 py-0.5 rounded-sm">Sale</span>
                  ) : null}
                  {product.id === '1' || product.id === '2' ? (
                    <span className="absolute top-1 left-1 bg-black text-white text-[8px] md:text-[9px] px-1 py-0.5 rounded-sm">NEW</span>
                  ) : null}
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
                    <a href="#" className="text-blue-500 text-[9px] md:text-[10px] hover:underline">View</a>
                    <button className="bg-black text-white text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-sm hover:bg-gray-800">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;