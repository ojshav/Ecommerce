const collections = [
  {
    id: 1,
    name: "SHANKH",
    subtitle: "COLLECTIONS",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463010/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%282%29.png"
  },
  {
    id: 2,
    name: "DOOP",
    subtitle: "COLLECTIONS",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463012/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%283%29.png"
  },
  {
    id: 3,
    name: "ALL",
    subtitle: "COLLECTIONS",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png"
  },
  {
    id: 4,
    name: "PUJA DIYA",
    subtitle: "COLLECTIONS",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463016/public_assets_shop4/public_assets_shop4_Property%201%3DDefault.png"
  },
  {
    id: 5,
    name: "HAVAN",
    subtitle: "COLLECTIONS",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463015/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%284%29.png"
  }
];

function UniqueCollections() {
  return (
    <div className="h-[720px] bg-black text-white">
      {/* Main Content */}
      <div className="container max-w-[1634px] mx-auto px-4 py-16  md:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-[14px] font-light font-['Futura_PT'] tracking-[0.2em] text-white mb-8">
            UNIQUE COLLECTIONS
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-[50px] font-poppins font-light tracking-wide mb-8">
            Luxury Brands New Arrival
          </h1>
        </div>

        {/* Collections Section */}
        <div className="relative max-w-full mx-auto">
          {/* Horizontal connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-200 transform -translate-y-1/2 z-0"></div>
          
          {/* Left endpoint circle */}
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-amber-200 rounded-full transform -translate-x-1 -translate-y-1/2 z-0"></div>
          
          {/* Right endpoint circle */}
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-amber-200 rounded-full transform translate-x-1 -translate-y-1/2 z-0"></div>
          
          {/* Collections Container */}
          <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-2 relative z-10 items-center pt-10">
            {collections.map((collection, index) => (
              <div key={collection.id} className="flex flex-col items-center group">
                {/* Image Container */}
                <div className="relative mb-1">
                  {/* Main image circle */}
                  <div className={`relative rounded-full overflow-hidden border border-gray-600 transition-all duration-300 ease-in-out group-hover:border-transparent ${
                    index === 2 ? 'w-[200px] h-[200px]' : 'w-[156px] h-[156px]'
                  }`}>
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 "
                    />
                    {/* White ring overlay on hover */}
                    <div className="absolute inset-0 rounded-full border-8 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-900 ease-in-out pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="text-center mt-1">
                  <h3 className={`uppercase mt-2 tracking-[0.2em] transition-colors duration-300 ease-in-out ${
                    index === 2 
                      ? 'font-futura text-white text-[20px] font-[450] leading-normal' 
                      : 'font-poppins text-gray-500 text-[20px] font-normal leading-normal'
                  } `}>
                    {collection.name}
                  </h3>
                  <p className={`uppercase tracking-[0.2em] ${
                    index === 2 
                      ? 'font-futura text-white text-[20px] font-[450] leading-normal' 
                      : 'font-poppins text-gray-500 text-[20px] font-normal leading-normal'
                  }`}>
                    {collection.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional spacing */}
        <div className="mt-16 md:mt-24"></div>
      </div>
    </div>
  );
}

export default UniqueCollections;