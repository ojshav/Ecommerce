import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Brand {
  brand_id: number;
  name: string;
  slug: string;
  icon_url: string;
}

const Brands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/brands/icons`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch brands');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shop By Brands</h2>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 pl-2">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-36 h-40 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading brands: {error}</p>
            <button 
              onClick={fetchBrands}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-0">
      <div className="container mx-auto px-4">
        {/* Brands header with navigation */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop By Brands</h2>
          <div className="flex items-center">
            <Link to="/brands" className="text-orange-500 text-sm font-medium mr-4">
              See All
            </Link>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full border border-gray-300">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full border border-gray-300">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Brands slider */}
        <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 pl-2">
          {brands.map((brand) => (
            <div
              key={brand.brand_id}
              onClick={() => {
                navigate(`/all-products?brand=${brand.slug}`);
              }}
              className="flex-shrink-0 w-36 h-40 bg-[#f5f7f2] rounded-lg flex flex-col items-center justify-center text-center p-4 transition duration-200 hover:scale-105 hover:border-2 hover:border-orange-500 hover:relative cursor-pointer"
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center">
                {brand.icon_url ? (
                  <img
                    src={brand.icon_url}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-3xl">🏷️</span>
                )}
              </div>
              <h3 className="font-medium">{brand.name}</h3>
            </div>
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Banner 1 - Camera */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Camera promotion"
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center">
              <div className="max-w-xs">
                <span className="text-sm font-medium text-gray-800">Hot Deal</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-1">TOURS SAFE</h3>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">TRUE DISCOUNT</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Banner 2 - Living Room */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Living room promotion"
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center">
              <div className="max-w-xs">
                <span className="text-sm font-medium text-gray-800">New Product</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-1">EXPERIENCE TECHNOLOGY</h3>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">RELAX HIGHLY</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;