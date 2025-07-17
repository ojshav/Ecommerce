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

  // Sidebar section toggles for mobile
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

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
    <div className="flex flex-col md:flex-row bg-white mx-auto min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 py-6 md:py-20 max-w-full md:max-w-[1440px]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 pr-0 md:pr-8 mb-8 md:mb-0">
        {/* Categories */}
        <div className="mb-8">
          <div
            className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
            onClick={() => setCategoryOpen((open) => !open)}
          >
            <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Categories</h2>
            <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Categories">
              {categoryOpen ? '−' : '+'}
            </button>
          </div>
          <div className={`${categoryOpen ? 'block' : 'hidden'} md:block`}>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center mb-4">
                <input type="radio" name="category" className="mr-2" />
                <span className="text-[16px] md:text-[18px] font-archivo font-medium">{cat}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Brand */}
        <div className="mb-8 mt-10 md:mt-16">
          <div
            className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
            onClick={() => setBrandOpen((open) => !open)}
          >
            <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Brand</h2>
            <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Brand">
              {brandOpen ? '−' : '+'}
            </button>
          </div>
          <div className={`${brandOpen ? 'block' : 'hidden'} md:block`}>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mb-4">
                <input type="radio" className="mr-2" />
                <span className="text-[16px] md:text-[18px] font-archivo font-medium">{brand}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Price */}
        <div className="mb-8">
          <div
            className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
            onClick={() => setPriceOpen((open) => !open)}
          >
            <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Price</h2>
            <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Price">
              {priceOpen ? '−' : '+'}
            </button>
          </div>
          <div className={`${priceOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={`$${price[0]}`}
                readOnly
                className="w-[50px] md:w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal font-poppins bg-white shadow-sm"
              />
              <div className="flex-1 h-px bg-gray-300 mx-2 md:mx-4"></div>
              <input
                type="text"
                value={`$${price[1]}`}
                readOnly
                className="w-[50px] md:w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal bg-white shadow-sm"
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
            <button className="px-3 bg-black text-white py-1.5 rounded text-[14px] md:text-[16px] font-bold tracking-wide w-full md:w-auto">FILTER</button>
          </div>
        </div>
        {/* Colors */}
        <div className="mb-12">
          <div
            className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
            onClick={() => setColorsOpen((open) => !open)}
          >
            <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-8">Colors</h2>
            <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Colors">
              {colorsOpen ? '−' : '+'}
            </button>
          </div>
          <div className={`${colorsOpen ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-black inline-block mr-3"></span>
                <span className="text-[16px] md:text-[18px] font-archivo font-normal">Black</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-fuchsia-500 inline-block mr-3"></span>
                <span className="text-[16px] md:text-[18px] font-archivo font-normal">Violet</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-blue-600 inline-block mr-3"></span>
                <span className="text-[16px] md:text-[18px] font-archivo font-normal">Blue</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block mr-3"></span>
                <span className="text-[16px] md:text-[18px] font-archivo font-normal">Yellow</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-600 inline-block mr-3"></span>
                <span className="text-[16px] md:text-[18px] font-archivo font-normal">Red</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-lime-400 inline-block mr-3"></span>
                <span className="text-[16px] md:text-[18px] font-archivo font-normal">Green</span>
              </div>
            </div>
          </div>
        </div>
        {/* Size */}
        <div className="mb-12">
          <div
            className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
            onClick={() => setSizeOpen((open) => !open)}
          >
            <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-8">Size</h2>
            <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Size">
              {sizeOpen ? '−' : '+'}
            </button>
          </div>
          <div className={`${sizeOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex gap-2 md:gap-3">
              {['S', 'M', 'L', 'XS'].map((size) => (
                <button
                  key={size}
                  className="w-[40px] md:w-[51px] h-[33px] border-2 border-[#C4C4C4] rounded-xl text-[16px] md:text-[18px] font-bold text-black bg-white hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 ml-0 md:ml-7 gap-4 md:gap-0">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              className="border rounded px-2 py-1 text-[16px] md:text-[18px] font-poppins w-full md:w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Default Sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            <select
              className="border rounded px-2 py-1 text-[16px] md:text-[18px] font-poppins w-full md:w-auto"
              value={show}
              onChange={(e) => setShow(Number(e.target.value))}
            >
              <option value={9}> Shop: 09</option>
              <option value={18}>Shop: 18</option>
              <option value={36}>Shop: 36</option>
            </select>
          </div>
          <div className="text-[16px] md:text-[18px] font-poppins md:mr-10 text-black w-full md:w-auto">
            Show 01 - 09 Of 36 Product
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 xm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0">
          {products.map((product, idx) => (
            <div key={idx} className="rounded-lg flex flex-col items-center p-2 md:p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[302px] h-[220px] sm:h-[260px] md:h-[321px] object-cover rounded-md mb-2"
              />
              <div className="text-[12px] md:text-[14px] text-gray-400 mb-1.5 mt-2 uppercase font-poppins tracking-widest">{product.category}</div>
              <div className="font-semibold font-poppins text-center text-[16px] md:text-[18px]">{product.name}</div>
              <div className="text-red-500 font-poppins font-semibold text-[18px] md:text-[20px]">${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 pb-14 md:pb-0">
          <nav className="inline-flex items-center space-x-4">
            <button
              className="w-12 h-12 rounded-xl bg-[#E7AB3C] text-white text-xl font-bold flex items-center justify-center shadow"
              disabled
            >
              1
            </button>
            <button
              className="w-12 h-12 rounded-xl bg-white border border-gray-300 text-gray-400 text-xl font-bold flex items-center justify-center"
            >
              2
            </button>
            <button
              className="w-12 h-12 rounded-xl bg-white border border-gray-300 text-gray-400 text-xl font-bold flex items-center justify-center"
            >
              <span className="text-2xl">&gt;</span>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
