export default function TrendingShapes() {
  const shapes = [
    {
      id: 1,
      url: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694125/wayfarer_d_t1lvwa.jpg",
      alt: "Wayfarer"
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694132/aviator_d_vtdh5i.jpg",
      alt: "Aviator"
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694143/Rectangle_d_w7uoo3.jpg",
      alt: "Rectangle"
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694146/cateye_djpg_aifoie.jpg",
      alt: "Cat Eye"
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694158/shape_round_desktop_ti2eda.jpg",
      alt: "Round"
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694160/square_d_ixd8tl.jpg",
      alt: "Square"
    }
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-600 text-center mb-8 sm:mb-12">
          Trending frame shapes
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {shapes.map((shape) => (
            <div key={shape.id} className="w-full">
              <img
                src={shape.url}
                alt={shape.alt}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}