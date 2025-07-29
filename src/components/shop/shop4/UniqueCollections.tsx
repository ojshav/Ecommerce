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
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-light tracking-[0.2em] text-gray-400 mb-4">
            UNIQUE COLLECTIONS
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            Luxury Brands New Arrival
          </h1>
        </div>

        {/* Collections Grid */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent transform -translate-y-1/2 z-0"></div>
          
          {/* Collections Container */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-8 xl:gap-12 relative z-10"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-8 xl:gap-12 relative z-10">

            {collections.map((collection, index) => (
              <div key={collection.id} className="flex flex-col items-center group">
                {/* Connecting dots for mobile/tablet */}
                {index < collections.length - 1 && (
                  <div className="lg:hidden absolute top-32 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gray-600 to-transparent"></div>
                )}
                
                {/* Image Container */}
                <div className="relative mb-6">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
                  
                  {/* Main image circle */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-amber-500/50 transition-all duration-300 group-hover:scale-105">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Connection point dot */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                </div>
                
                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-sm md:text-base font-medium tracking-wider mb-1 group-hover:text-amber-500 transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <p className="text-xs md:text-sm font-light tracking-wide text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {collection.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional spacing for mobile */}
        <div className="mt-16 md:mt-24"></div>
      </div>
    </div>
  );
}

export default UniqueCollections;