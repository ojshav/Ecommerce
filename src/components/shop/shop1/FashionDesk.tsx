import React from 'react';
import { Link } from 'react-router-dom';

const FashionDesk = () => {
  const articles = [
    {
      category: "RETRO VIBES",
      title: "The Revival of Haldi ceremony",
      date: "August 1, 2024",
      image: "/assets/images/desk1.jpg",
    },
    {
      category: "GREEN CHOICES",
      title: "Mehendi moments We Love in 2024",
      date: "July 25, 2024",
      image: "/assets/images/desk2.jpg",
    },
    {
      category: "PARTY ESSENTIALS",
      title: "Decoding The Cocktail Dress Code",
      date: "July 15, 2024",
      image: "/assets/images/desk3.jpg",
    },
    {
      category: "STYLE TIPS",
      title: "Layering Like A Pro This Wedding",
      date: "July 8, 2024",
      image: "/assets/images/desk4.jpg",
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair font-bold text-3xl sm:text-[50px] md:text-[64px] lg:text-[70px] leading-tight text-[#222222]">
            From <em className="italic font-semibold">Our Fashion</em> Desk
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

                <div className="w-full h-px bg-gray-200 mt-4"></div>
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
