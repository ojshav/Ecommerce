import React from 'react';

const FashionDesk = () => {
  const articles = [
    {
      category: "RETRO VIBES",
      title: "The Revival of Haldi ceremony",
      date: "August 1, 2024",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgColor: "bg-yellow-400"
    },
    {
      category: "GREEN CHOICES",
      title: "Mehendi moments We Love in 2024",
      date: "July 25, 2024",
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgColor: "bg-yellow-300"
    },
    {
      category: "PARTY ESSENTIALS",
      title: "Decoding The Cocktail Dress Code",
      date: "July 15, 2024",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgColor: "bg-gray-400"
    },
    {
      category: "STYLE TIPS",
      title: "Layering Like A Pro This Wedding",
      date: "July 8, 2024",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgColor: "bg-red-200"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-2">
            From <em className="italic">Our Fashion</em> Desk
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="group cursor-pointer">
              {/* Article Image */}
              <div className={`relative overflow-hidden mb-6 h-80 ${article.bgColor} p-4`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Article Content */}
              <div className="space-y-3">
                {/* Category */}
                <p className="text-xs font-medium text-gray-500 tracking-widest uppercase">
                  {article.category}
                </p>

                {/* Title */}
                <h3 className="text-xl font-serif text-gray-900 leading-tight group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h3>

                {/* Date */}
                <p className="text-sm text-gray-500">
                  {article.date}
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-gray-200 mt-4"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionDesk;