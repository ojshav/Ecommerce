import React from 'react';

const products = [
  {
    id: 1,
    title: 'STRIPED T-SHIRT',
    category: 'MAN FASHION',
    price: 89,
    image: '/assets/images/similar1.jpg', // replace with your own images if needed
    liked: true,
  },
  {
    id: 2,
    title: 'BLACK LONGSLEVE',
    category: 'MAN FASHION',
    price: 59,
    image: '/assets/images/similar2.jpg',
    liked: false,
  },
  {
    id: 3,
    title: 'BLUE STRIPED JACKET',
    category: 'MAN FASHION',
    price: 99,
    image: '/assets/images/similar3.jpg',
    liked: false,
  },
  {
    id: 4,
    title: 'GREY JACKET',
    category: 'MAN FASHION',
    price: 99,
    image: '/assets/images/similar4.jpg',
    liked: false,
  },
];

const SimilarProducts = () => {
  return (
    <section className="relative w-full max-w-[1428px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 lg:ml-20 2xl:pl-10 text-black">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[47px] font-normal font-bebas mb-4 sm:mb-6 lg:mb-12">SIMILAR PRODUCT</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-7">
        {products.map((product, idx) => (
          <div key={product.id} className="relative rounded-xl overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[401px] object-cover rounded-xl"
              />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-lg sm:text-xl">
                {product.liked ? (
                  <span className="text-red-600">❤️</span>
                ) : (
                  <span className="text-white">🤍</span>
                )}
              </div>
              {idx === 0 && (
                <>
                  <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white rounded-full shadow w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                    <span className="text-xs sm:text-sm md:text-base">←</span>
                  </div>
                  <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white rounded-full shadow w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                    <span className="text-xs sm:text-sm md:text-base">→</span>
                  </div>
                </>
              )}
              <div className="absolute bottom-0 font-bebas left-0 w-full flex flex-col sm:flex-row justify-between items-center px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-opacity-60">
                <button className="bg-black text-white px-5 sm:px-4 lg:px-10 xl:px-10 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto">
                  ADD TO CART
                </button>
                <button className="border text-white px-5 sm:px-4 lg:px-10 xl:px-10 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold w-full sm:w-auto">
                  BUY NOW
                </button>
              </div>
            </div>

            <div className="pb-3 sm:pb-4 font-bebas mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs sm:text-sm lg:text-base xl:text-[17px] text-[#8E8F94] font-normal">{product.category}</p>
              <div className="flex justify-between items-center">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal">{product.title}</h3>
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
