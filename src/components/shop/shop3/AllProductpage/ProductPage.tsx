import React from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Neon Mech Gears Sneaker",
    image: "/assets/images/Productcard/card-section1.jpg",
    price: 26.4,
    originalPrice: null,
    badge: "Free shipping",
    badgeColor: "bg-lime-400 text-black",
    isNew: false,
    discount: null,
  },
  {
    id: 2,
    name: "SprayLab Street Co-ord",
    image: "/assets/images/Productcard/card-section2.jpg",
    price: 120,
    originalPrice: 200,
    badge: "-30%",
    badgeColor: "bg-pink-600 text-white",
    isNew: false,
    discount: 30,
  },
  {
    id: 3,
    name: "Midnight Luxe Shades",
    image: "/assets/images/Productcard/hero1.jpg",
    price: 200,
    originalPrice: null,
    badge: "Limited Edition",
    badgeColor: "bg-lime-400 text-black",
    isNew: true,
    discount: null,
  },
  {
    id: 4,
    name: "Radiant Rebel Sunglasses",
    image: "/assets/images/Productcard/hero2.jpg",
    price: 321,
    originalPrice: null,
    badge: "Free shipping",
    badgeColor: "bg-lime-400 text-black",
    isNew: false,
    discount: null,
  },
  {
    id: 5,
    name: "Neon Drift Puffer",
    image: "/assets/images/Productcard/hero3.jpg",
    price: 200,
    originalPrice: null,
    badge: "Free shipping",
    badgeColor: "bg-lime-400 text-black",
    isNew: false,
    discount: null,
    showAdd: true,
  },
  {
    id: 6,
    name: "Neon Gear Techwear Boots",
    image: "/assets/images/Productcard/hero4.jpg",
    price: 26.4,
    originalPrice: null,
    badge: null,
    badgeColor: "",
    isNew: false,
    discount: null,
  },
  {
    id: 7,
    name: "Neon Rush Co-Ord Set",
    image: "/assets/images/Productcard/pd-1.jpg",
    price: 120,
    originalPrice: 200,
    badge: "-30%",
    badgeColor: "bg-pink-600 text-white",
    isNew: false,
    discount: 30,
  },
  // Additional products for more rows below
  {
    id: 8,
    name: "Cyberpunk Street Hoodie",
    image: "/assets/images/Productcard/pd-2.jpg",
    price: 150,
    originalPrice: null,
    badge: "Free shipping",
    badgeColor: "bg-lime-400 text-black",
    isNew: false,
    discount: null,
  },
  {
    id: 9,
    name: "Luminous City Jacket",
    image: "/assets/images/Productcard/pd-3.jpg",
    price: 180,
    originalPrice: 220,
    badge: "-20%",
    badgeColor: "bg-pink-600 text-white",
    isNew: false,
    discount: 20,
  },
  {
    id: 10,
    name: "Neon Skyline Tracksuit",
    image: "/assets/images/Productcard/pd-4.jpg",
    price: 210,
    originalPrice: null,
    badge: null,
    badgeColor: "",
    isNew: false,
    discount: null,
  },
  {
    id: 11,
    name: "Electric Avenue Sneakers",
    image: "/assets/shop3/AllProduct/a.svg",
    price: 99,
    originalPrice: 120,
    badge: "-15%",
    badgeColor: "bg-pink-600 text-white",
    isNew: false,
    discount: 15,
  },
  {
    id: 12,
    name: "Prism Glow Windbreaker",
    image: "/assets/images/Productcard/liked2.jpg",
    price: 175,
    originalPrice: null,
    badge: "Free shipping",
    badgeColor: "bg-lime-400 text-black",
    isNew: false,
    discount: null,
  },
  {
    id: 13,
    name: "Holo Street Joggers",
    image: "/assets/images/Productcard/liked3.jpg",
    price: 130,
    originalPrice: 160,
    badge: "-18%",
    badgeColor: "bg-pink-600 text-white",
    isNew: false,
    discount: 18,
  },
  {
    id: 14,
    name: "Urban Neon Backpack",
    image: "/assets/images/Productcard/liked4.jpg",
    price: 80,
    originalPrice: null,
    badge: null,
    badgeColor: "",
    isNew: false,
    discount: null,
  },
  {
    id: 14,
    name: "Urban Neon Backpack",
    image: "/assets/images/Productcard/liked4.jpg",
    price: 80,
    originalPrice: null,
    badge: null,
    badgeColor: "",
    isNew: false,
    discount: null,
  },
];

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 pb-12">
      {/* Header & Breadcrumbs */}
      <div className="pt-6 pb-2 flex flex-col gap-2">
        <div className="flex items-center text-sm gap-2 text-gray-300">
          <span>Home</span>
          <span className="mx-1">&gt;</span>
          <span className="text-lime-400">Men</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-4 items-center">
            <span className="text-2xl font-bold tracking-widest text-lime-400">AOIN</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 text-xs">View: <span className="text-lime-400">2/4</span></span>
            <select className="bg-zinc-900 border border-zinc-700 text-gray-200 text-xs rounded px-2 py-1 ml-2">
              <option>Sort by</option>
            </select>
            <button className="bg-zinc-900 border border-zinc-700 text-gray-200 text-xs rounded px-3 py-1 ml-2">View filters</button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="relative group bg-zinc-900 rounded-lg overflow-hidden shadow-lg flex flex-col h-[420px] border border-zinc-800"
          >
            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${product.badgeColor} z-10`}
              >
                {product.badge}
              </span>
            )}
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-2/3 object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            {/* Info */}
            <div className="flex flex-col flex-1 justify-between p-4">
              <div>
                <div className="text-sm font-semibold mb-1 truncate">
                  {product.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 text-base font-bold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-pink-400 text-sm line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              {/* Add button for specific card */}
              {product.showAdd && (
                <button className="w-full mt-4 bg-lime-400 text-black font-semibold py-2 rounded transition hover:bg-lime-300">
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

