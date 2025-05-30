import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const brands = [
  {
    id: 1,
    name: 'Skechers',
    icon: <SkechersSVG />,
    slug: 'Skechers',
  },
  {
    id: 2,
    name: 'Mufti',
    icon: <MuftiSVG />,
    slug: 'Mufti',
  },
  {
    id: 3,
    name: 'Puma',
    icon: <PumaSVG />,
    slug: 'Puma',
  },
  {
    id: 4,
    name: 'Nike',
    icon: <NikeSVG />,
    slug: 'Nike',
  },
  {
    id: 5,
    name: 'Adidas',
    icon: <AdidasSVG />,
    slug: 'Adidas',
  },
  {
    id: 6,
    name: 'US Polo',
    icon: <USPoloSVG />,
    slug: 'US Polo',
  }
];

const Brands = () => {
  const navigate = useNavigate();

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
        <div className="flex space-x-8 overflow-x-auto pb-4 mb-8 pt-2 pl-2 justify-between">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => {
                navigate('/all-products');
              }}
              className="flex flex-col items-center justify-center cursor-pointer transition hover:scale-105"
            >
              <div className="flex items-center justify-center">
                {brand.icon}
              </div>
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