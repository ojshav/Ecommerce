export default function PerfectFitGallery() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-4xl font-bold text-gray-600 text-center mb-8">
        FIND THE PERFECT FIT
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <img
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759797132/a8296f95-d9dd-40db-9be6-24ad89251c70.png"
            alt="Eyeglasses"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="w-full flex-1">
            <img
              src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759797170/7ffcaf67-788f-4f14-a2a2-26bd9af02cbd.png"
              alt="Sunglasses"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-full flex-1">
            <img
              src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759797192/f38770e7-4ac2-4694-8e19-a5cd71d22c97.png"
              alt="Digi Hooper"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}