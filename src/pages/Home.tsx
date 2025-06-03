import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import PromoProducts from '../components/home/PromoProducts';
import TrendingDeals from '../components/home/TrendingDeals';
import Brands from '../components/home/brands';
import Shop from '../components/home/Shop';
import Services from '../components/home/Services';
import HomepageProducts from '../components/home/HomepageProducts';
import SearchResults from '../components/common/SearchResults';
import useClickOutside from '../hooks/useClickOutside';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'products' | 'categories'>('all');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside(searchRef, () => {
    setShowSearchResults(false);
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams({
        q: searchQuery.trim(),
        type: searchType
      });
      navigate(`/search?${searchParams.toString()}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="pb-10">
      {/* Mobile Search Bar */}
      <div className="container mx-auto px-4 nav:hidden mt-2 mb-2 py-2">
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex rounded-md overflow-hidden bg-white border border-gray-300">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full border-0 py-2 px-4 text-gray-900 focus:ring-0 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
              />
              <div className="relative flex items-center border-l border-gray-200 bg-white">
                <select 
                  className="h-full appearance-none bg-transparent py-2 pl-3 pr-8 text-gray-900 focus:ring-0 focus:outline-none text-sm"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'all' | 'products' | 'categories')}
                >
                  <option value="all">All</option>
                  <option value="products">Products</option>
                  <option value="categories">Categories</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
              <button 
                type="submit"
                className="relative flex items-center border-l border-gray-200 bg-white px-4 hover:bg-gray-50"
              >
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </form>
          <SearchResults 
            isVisible={showSearchResults} 
            searchQuery={searchQuery}
            searchType={searchType}
            onItemClick={() => {
              setShowSearchResults(false);
              setSearchQuery('');
            }}
          />
        </div>
      </div>

      <div className="space-y-8">
        <Hero />
        <Categories />
        <Brands />
        <Shop />
        <FeaturedProducts />
        <PromoProducts />
        <TrendingDeals />
        <HomepageProducts />
        <Services />
      </div>
    </div>
  );
};

export default Home;