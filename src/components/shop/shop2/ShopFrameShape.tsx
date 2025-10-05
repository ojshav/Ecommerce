export default function ShopFrameShape() {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-600 text-center mb-8 sm:mb-12">
          Shop with frame shape
        </h2>

        {/* Image */}
        <div className="w-full rounded-3xl overflow-hidden">
          <img
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759695329/a32f9d3c-a59d-4a05-9dc1-252a9d922e0e.png"
            alt="Shop with frame shape"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}