import React from 'react';
import { Link } from 'react-router-dom';

const FashionDesk = () => {
const articles = [
  {
    category: "HERITAGE",
    title: "The Return of Vintage Watches",
    date: "August 1, 2024",
    image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759515856/cf3e6acf-8921-463a-b5ae-fd0fbc7a6dcf.png",
  },
  {
    category: "SUSTAINABLE STYLE",
    title: "Eco-Friendly Timepieces for Modern Living",
    date: "July 25, 2024",
    image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759515910/b8a9b033-3c15-4b63-b1b9-f5ee993d833c.png",
  },
  {
    category: "LUXURY PICKS",
    title: "Decoding the World of Swiss Chronographs",
    date: "July 15, 2024",
    image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759516145/9a9fa64a-c6b2-4781-a310-ba852bfc526e.png",
  },
  {
    category: "STYLE GUIDE",
    title: "How to Match Watches With Every Outfit",
    date: "July 8, 2024",
    image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759516178/76fb7182-6673-4cdf-82cf-8d95558a0631.png",
  }
];


  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
<div className="text-center mb-12 sm:mb-16">
  <h2 className="font-playfair font-bold text-3xl sm:text-[50px] md:text-[64px] lg:text-[70px] leading-tight text-[#222222]">
    From <em className="italic font-semibold">Our Timepiece</em> Desk
  </h2>
</div>

        {/* Articles Grid - Horizontal scroll for mobile, grid for larger screens */}
        <div className="sm:hidden">
          {/* Mobile: Horizontal scrolling container - one card at a time */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {articles.map((article, index) => (
              <article key={index} className="group cursor-pointer flex-shrink-0 w-full">
                {/* Image */}
                <div className="relative aspect-[10/9] overflow-hidden rounded-md mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <p className="text-sm font-poppins tracking-[0.1em] text-[#636363] uppercase">
                    {article.category}
                  </p>

                  <h3 className="font-playfair text-lg text-[#222222] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#636363] font-poppins">
                    {article.date}
                  </p>

                  <div className="w-full h-px bg-[#636363] mt-4"></div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: Original grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[10/9] overflow-hidden rounded-md mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base font-poppins tracking-[0.1em] text-[#636363] uppercase">
                  {article.category}
                </p>

                <h3 className="font-playfair text-lg sm:text-xl md:text-2xl text-[#222222] leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm sm:text-base text-[#636363] font-poppins">
                  {article.date}
                </p>

                <div className="w-full h-px bg-[#636363] mt-4"></div>
              </div>
            </article>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link to="/shop1-allproductpage">
            <button className="bg-black text-white text-sm sm:text-base font-medium py-3 px-8 rounded hover:bg-gray-800 transition">
              OPEN MORE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FashionDesk;
