import React, { useState } from 'react';

const categories = [
  'Jackets & Outerwear',
  'Ethnic & fusion wear',
  'Bottomwear',
];
const brands = [
  'Calvin Klein',
  'Diesel',
  'Polo',
  'Tommy Hilfigher',
];

const products = [
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572756/public_assets_shop1/public_assets_shop1_a.svg',
    category: 'mini dress',
    name: 'One-Shoulder mini dress',
    price: 25,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572758/public_assets_shop1/public_assets_shop1_b.svg',
    category: 'Top',
    name: 'Peplum top',
    price: 45,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572760/public_assets_shop1/public_assets_shop1_c.svg',
    category: 'Shirt',
    name: 'Printed Co-ord Shirt & Skort Set',
    price: 24,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572762/public_assets_shop1/public_assets_shop1_d.svg',
    category: 'Cap',
    name: 'Cocktail Dress Code',
    price: 15,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572764/public_assets_shop1/public_assets_shop1_e.svg',
    category: 'Coat',
    name: 'Cocktail Dress Code',
    price: 45,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572767/public_assets_shop1/public_assets_shop1_f.svg',
    category: 'Scarf',
    name: 'Grey Scarf suit',
    price: 20,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572770/public_assets_shop1/public_assets_shop1_g.svg',
    category: 'Bag',
    name: 'Bridal Embroidered Lehenga',
    price: 51,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572773/public_assets_shop1/public_assets_shop1_h.svg',
    category: 'Jacket',
    name: 'Bridal Embroidered Lehenga',
    price: 64,
  },
  {
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752572775/public_assets_shop1/public_assets_shop1_i.svg',
    category: 'Shoes',
    name: 'Yellow Converse',
    price: 89,
  },
];

const ProductPage = () => {
  const [price, setPrice] = useState([33, 98]);
  const minPrice = 33;
  const maxPrice = 98;

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), price[1] - 1);
    setPrice([value, price[1]]);
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), price[0] + 1);
    setPrice([price[0], value]);
  };
  const [sort, setSort] = useState('Default Sorting');
  const [show, setShow] = useState(9);

  return (
    <div className="flex bg-white mx-auto min-h-screen px-8 py-16 max-w-[1440px]">
      {/* Sidebar */}
      <aside className="w-64 pr-8">
        <div className="mb-8">
          <h2 className="font-playfair font-medium text-[24px] mb-6">Categories</h2>
          {categories.map((cat) => (
            <div key={cat} className="flex  items-center mb-1">
              <input type="radio" name="category" className="mr-2" />
              <span className="text-[18px] font-archivo font-medium">{cat}</span>
            </div>
          ))}
        </div>
        <div className="mb-8 mt-16">
          <h2 className="font-playfair font-medium text-[24px] mb-6">Brand</h2>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input type="radio" className="mr-2" />
              <span className="text-[18px] font-archivo font-medium">{brand}</span>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h2 className="font-playfair font-medium text-[24px] mb-6">Price</h2>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={`$${price[0]}`}
              readOnly
              className="w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal font-poppins bg-white shadow-sm"
            />
            <div className="flex-1 h-px bg-gray-300 mx-4"></div>
            <input
              type="text"
              value={`$${price[1]}`}
              readOnly
              className="w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal bg-white shadow-sm"
            />
          </div>
          <div className="relative flex items-center mb-4" style={{ height: 40 }}>
            {/* Track */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 bg-yellow-400 rounded-full z-0"></div>
            {/* Min slider */}
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price[0]}
              onChange={handleMinSlider}
              className="absolute w-full pointer-events-none accent-yellow-400 z-10"
              style={{ WebkitAppearance: 'none', background: 'transparent' }}
            />
            {/* Max slider */}
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price[1]}
              onChange={handleMaxSlider}
              className="absolute w-full pointer-events-none accent-yellow-400 z-10"
              style={{ WebkitAppearance: 'none', background: 'transparent' }}
            />
            {/* Custom thumbs */}
            <div
              className="absolute"
              style={{
                left: `${((price[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
              }}
            >
              <div className="w-4 h-4 ml-4 bg-white border border-gray-300 rounded-full shadow"></div>
            </div>
            <div
              className="absolute"
              style={{
                left: `${((price[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
              }}
            >
              <div className="w-4 h-4 mr-4 bg-white border border-gray-300 rounded-full shadow"></div>
            </div>
          </div>
          <button className=" px-3 bg-black text-white py-1.5 rounded text-[16px] font-bold tracking-wide">FILTER</button>
        </div>
        <div className="mb-12">
          <h2 className="font-playfair font-medium text-[24px] mb-8">Colors</h2>
          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-black inline-block mr-3"></span>
              <span className="text-[18px] font-archivo font-normal">Black</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-fuchsia-500 inline-block mr-3"></span>
              <span className="text-[18px] font-archivo font-normal">Violet</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-blue-600 inline-block mr-3"></span>
              <span className="text-[18px] font-archivo font-normal">Blue</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block mr-3"></span>
              <span className="text-[18px] font-archivo font-normal">Yellow</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-red-600 inline-block mr-3"></span>
              <span className="text-[18px] font-archivo font-normal">Red</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-lime-400 inline-block mr-3"></span>
              <span className="text-[18px] font-archivo font-normal">Green</span>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="font-playfair font-medium text-[24px] mb-8">Size</h2>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XS'].map((size) => (
              <button
                key={size}
                className="w-[51px] h-[33px] border-2 border-[#C4C4C4] rounded-xl text-[18px] font-bold text-black bg-white hover:bg-black hover:text-white transition"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6 ml-10">
          <div className="flex items-center gap-2">
            <select
              className="border rounded px-2 py-1 text-xs"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Default Sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            <span className="ml-2 text-xs">Show:</span>
            <select
              className="border rounded px-2 py-1 text-xs"
              value={show}
              onChange={(e) => setShow(Number(e.target.value))}
            >
              <option value={9}>09</option>
              <option value={18}>18</option>
              <option value={36}>36</option>
            </select>
          </div>
          <div className="text-[18px] font-poppins mr-10 text-black">
            Show 01 - 09 Of 36 Product
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-0">
          {products.map((product, idx) => (
            <div key={idx} className=" rounded-lg  flex flex-col items-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-[302px] h-[321px] object-cover rounded-md mb-2"
              />
              <div className="text-xs text-gray-400 mb-2 mt-2 uppercase font-poppins tracking-widest">{product.category}</div>
              <div className="font-semibold font-poppins text-center mb-1">{product.name}</div>
              <div className="text-red-500 font-bold text-base">${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex items-center space-x-2">
            <button className="w-8 h-8 rounded border text-gray-400" disabled>1</button>
            <button className="w-8 h-8 rounded border text-gray-400">2</button>
            <button className="w-8 h-8 rounded border text-gray-400">&gt;</button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
