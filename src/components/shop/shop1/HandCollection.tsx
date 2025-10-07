export default function HandCollection() {
  const collections = [
    {
      label: "QUARTZ",
      image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759517195/84f326f9-b25f-4381-ab9f-849dfa9da5e8.png"
    },
    {
      label: "TITANIUM",
      image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759517288/0284e3ba-92ce-43a6-beab-9335b8fe8388.png"
    },
    {
      label: "LEATHER",
      image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759517399/993c60e5-2e1d-4615-b369-8fa66dddf4da.png"
    },
    {
      label: "MECHANICAL",
      image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759517472/249c947f-a6ac-4302-b811-b57f0449a4d4.png"
    },
    {
      label: "CERAMIC",
      image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759517558/33e022f5-0b21-4b22-b263-6cfb08157346.png"
    },
    {
      label: "GOLD",
      image: "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759517607/adcd52dd-260d-4bd9-963a-799ac495fb86.png"
    }
  ];

  return (
    <div className="bg-white min-h-screen p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-2xl text-gray-600 mb-2">Hand Picked</p>
          <h1 className="text-5xl md:text-6xl font-bold">
            Collections
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="relative h-80 bg-cover bg-center"
              style={{ backgroundImage: `url(${collection.image})` }}
            >
              <div className="absolute top-0 left-0 bg-white px-6 py-3 flex items-center gap-4">
                <span className="text-sm font-medium tracking-wider">
                  {collection.label}
                </span>
                <div className="w-8 h-px bg-gray-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}