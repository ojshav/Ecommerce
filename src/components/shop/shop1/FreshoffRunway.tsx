import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreshOffRunway = () => {
  const products = [
    {
      id: 1,
      name: 'WIDE LEG TROUSER',
      price: '$120',
      image: 'assets/images/runway1.png'
    },
    {
      id: 2,
      name: 'CRINKLED FLORER SHIRT',
      price: '$95',
      image: 'assets/images/runway2.png'
    },
    {
      id: 3,
      name: 'ETHNIC CO-ORD SET',
      price: '$60',
      image: 'assets/images/runway3.png'
    }
  ];


  return (
    
    <section className=" w-full max-w-[1280px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-9xl mx-auto">
       
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-6xl lg:text-7xl font-semibold font-playfair text-#222222 leading-tight tracking-tight">
              FRESH OFF THE
              <br />
              <span className="italic  text-#222222 font-normal font-playfair">Runway</span>
            </h2>
          </div>
          
          <div className="flex space-x-3 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-black transition-all shadow"
            >
              <img 
                src="/assets/images/arrow-left.png" 
                alt="Arrow Left" 
                className="w-10 h-10 transition-all group-hover:invert group-hover:brightness-200"
              />
            </button>
            <button 
              className="group w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black transition-all shadow"
            >
              <img 
                src="/assets/images/arrow-right.png" 
                alt="Arrow Right" 
                className="w-10 h-10 transition-all group-hover:invert group-hover:brightness-200"
              />
            </button>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
             
              <div className="relative overflow-hidden mb-6">
                <Link to="/shop1-productpage">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[413px] h-[370px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                
                
                <div className="absolute bottom-6 right-6">
                  <button className="w-12 h-12 bg-gray-900 text-white rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-xl text-gray-600">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default FreshOffRunway;