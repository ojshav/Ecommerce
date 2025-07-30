import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Image as ImageIcon, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import shop2ApiService, { Product } from '../../../../services/shop2ApiService';

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { productId } = useParams<{ productId: string }>();

  // For accordion
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Placeholder reviews and sections (can be replaced with API data if available)
  const sections = [
    { title: "Overview", content: product?.full_description || product?.product_description || "No description available." },
    { title: "Materials", content: "Made from eco-friendly materials." },
    { title: "Return Policy", content: "Returns accepted within 30 days." },
  ];

  const reviews = [
    {
      name: "Marvin McKinney",
      rating: 4,
      content: "I love this store's shirt! It's so comfortable and easy to wear with anything. I ended up buying one in every color during their sale. The quality is great too. Thank you!",
      daysAgo: "2 days ago"
    },
    {
      name: "Savannah Nguyen",
      rating: 5,
      content: "I'm so impressed with the customer service at this store! The staff was friendly and helpful, and I found the perfect shirt. It looks and feels amazing. I'll definitely be shopping here again!",
      daysAgo: "19 days ago"
    },
    {
      name: "Wade Warren",
      rating: 2,
      content: "Unfortunately, I didn't have a great experience with this store's product. The quality wasn't what I expected and it didn't fit well. I wouldn't recommend it.",
      daysAgo: "22 days ago"
    },
  ];

  // Helper to get attribute values as array
  function getAttributeValues(product: Product | null, attrName: string): string[] {
    const variantAttr = product?.variant_attributes?.find(attr => attr.name.toLowerCase() === attrName.toLowerCase());
    if (variantAttr && Array.isArray(variantAttr.values) && variantAttr.values.length > 0) {
      return variantAttr.values;
    }
    const attr = product?.attributes?.find(
      a => a.attribute?.name?.toLowerCase() === attrName.toLowerCase()
    );
    if (attr && typeof attr.value === 'string') {
      return attr.value.split(',').map(v => v.trim()).filter(Boolean);
    }
    if (attrName.toLowerCase() === 'size') return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    if (attrName.toLowerCase() === 'color') return ['Black', 'Red', 'Blue'];
    return [];
  }

  // For size/color selection, fallback to static if not present in product
  const sizes = getAttributeValues(product, 'size');
  const colors = getAttributeValues(product, 'color');
  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(colors[0] || 'Black');

  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!productId) {
          setError('No product ID provided');
          setLoading(false);
          return;
        }
        const response = await shop2ApiService.getProductById(Number(productId));
        if (response && response.success) {
          setProduct(response.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Update sizes/colors if product changes
  useEffect(() => {
    if (product) {
      const newSizes = getAttributeValues(product, 'size');
      const newColors = getAttributeValues(product, 'color');
      setSelectedSize(newSizes[0] || newSizes[0]);
      setSelectedColor(newColors[0] || newColors[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (loading) return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-96 text-red-500 text-lg">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-96 text-lg">No product data.</div>;

  // Use product.media?.images for gallery if available, else fallback to primary_image
  const images = product.media?.images?.length ? product.media.images : [
    { url: product.primary_image, type: 'image', is_primary: true }
  ];

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-6 sm:pb-8 lg:pb-10 flex flex-col gap-0">
      {/* Photos Modal */}
      {showPhotosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowPhotosModal(false)}>
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-4 relative flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
              onClick={() => setShowPhotosModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Main Image */}
            <div className="w-full flex items-center justify-center relative" style={{ minHeight: 320 }}>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                onClick={() => setCurrentPhotoIdx((currentPhotoIdx - 1 + images.length) % images.length)}
                disabled={images.length <= 1}
                style={{ zIndex: 2 }}
              >
                &#8592;
              </button>
              <img
                src={images[currentPhotoIdx]?.url}
                alt={`Product photo ${currentPhotoIdx + 1}`}
                className="max-h-[400px] object-contain rounded-lg"
                style={{ maxWidth: '90%' }}
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                onClick={() => setCurrentPhotoIdx((currentPhotoIdx + 1) % images.length)}
                disabled={images.length <= 1}
                style={{ zIndex: 2 }}
              >
                &#8594;
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`h-16 w-16 object-cover rounded border cursor-pointer ${currentPhotoIdx === idx ? 'border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setCurrentPhotoIdx(idx)}
                  style={{ minWidth: 64 }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <hr className="border-black border-t-1 mb-4 sm:mb-6" />
      {/* Top Container: Responsive grid for images and details */}
      <div className="grid grid-cols-1 max-w-[1580px]  md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 2xl:gap-2 items-start lg:items-center">
        {/* First image */}
        <div className="flex justify-center order-1 md:order-1 lg:order-1">
          <img 
            src={images[0]?.url || '/assets/shop2/ProductPage/pd1.svg'} 
            alt="Front View" 
            className="rounded-2xl w-full max-w-[320px] sm:max-w-[390px] lg:w-[390px] h-[300px] sm:h-[380px] lg:h-[456px] object-cover" 
          />
        </div>
        {/* Second image with Heart Icon */}
        <div className="relative flex justify-center order-2 md:order-2 lg:order-2">
          <img 
            src={images[1]?.url || images[0]?.url || '/assets/shop2/ProductPage/pd1.svg'} 
            alt="Back View" 
            className="rounded-2xl w-full max-w-[320px] sm:max-w-[360px] lg:w-[390px] h-[300px] sm:h-[380px] lg:h-[456px] object-cover" 
          />
          <button className="absolute top-4 right-4 sm:right-8 p-2 rounded-full transition-all">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </button>
        </div>
        {/* Product Details */}
        <div className="relative flex flex-col justify-center min-w-0 lg:min-w-[340px] h-auto lg:h-[456px] px-2 mb-4 lg:mb-8 self-center order-3 md:order-3 lg:order-3">
          <div className="text-xs sm:text-sm uppercase text-gray-400 mb-2 sm:mb-4 font-bebas font-semibold tracking-wide">{product.category_name || 'CATEGORY'}</div>
          <p className="text-2xl sm:text-3xl lg:text-[42px] font-normal font-bebas leading-tight mb-2 sm:mb-3">{product.product_name}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">${product.price}</p>
          {/* Size Selection */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-[14px] font-bebas font-bold tracking-wide">SIZE</span>
              <span className="text-xs sm:text-[13px] text-black underline cursor-pointer font-medium">Size Guide</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-[10px] sm:text-[12px] font-semibold shadow-sm transition-all focus:outline-none ${selectedSize === size ? 'bg-orange-100 border-orange-400 shadow-md' : 'bg-white border-gray-300'} ${selectedSize === size ? 'text-black' : 'text-gray-700'}`}
                  style={{ boxShadow: selectedSize === size ? '0 2px 8px rgba(255, 165, 0, 0.15)' : undefined }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Color Selection */}
          <div className="mb-2">
            <div className="text-sm sm:text-base font-bebas font-bold mb-2 tracking-wide">COLOR</div>
            <div className="flex flex-wrap font-gilroy gap-2 sm:gap-3">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2 py-1.5 sm:py-2 rounded-lg border font-gilroy text-[10px] sm:text-[12px] font-semibold flex items-center gap-1 sm:gap-2 shadow-sm transition-all focus:outline-none ${selectedColor === color ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-white'}`}
                  style={{ boxShadow: selectedColor === color ? '0 2px 8px rgba(0,0,0,0.08)' : undefined }}
                >
                  {/* Color dot */}
                  <span className={`inline-block font-gilroy w-3 h-3 sm:w-4 sm:h-4 rounded-full ml-1 sm:ml-2 ${color === 'Black' ? 'bg-gray-200' : color === 'Red' ? 'bg-red-200' : 'bg-blue-300'}`}></span>
                  {color}
                </button>
              ))}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <button className="w-full sm:flex-1 bg-black text-[16px] font-gilroy text-white px-3 py-1 rounded-full font-bold flex items-center justify-center gap-2 text-base  shadow hover:bg-gray-900 transition-all">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
            </button>
            <button className="w-full sm:flex-1 border-2 border-black text-black px-3 py-3 sm:py-4 rounded-full font-bold text-base  hover:bg-gray-100 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Container: Next two images */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1230px] mx-auto items-center mt-4 sm:mt-6 lg:mt-1 gap-4">
        <img 
          src={images[2]?.url || images[0]?.url || '/assets/shop2/ProductPage/pd3.svg'} 
          alt="Side View" 
          className="rounded-xl w-full lg:w-[486px] h-[250px] sm:h-[300px] lg:h-[412px] object-cover" 
        />
        <div className="relative rounded-xl overflow-hidden flex-1 h-[250px] sm:h-[300px] lg:h-[412px] w-full lg:ml-0">
          <img 
            src={images[3]?.url || images[1]?.url || images[0]?.url || '/assets/shop2/ProductPage/pd4.svg'} 
            alt="Closeup" 
            className="rounded-xl w-full h-full object-cover" 
          />
          <button
            className="absolute bottom-8 sm:bottom-14 left-6 sm:left-12 bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 shadow-lg border border-gray-200"
            onClick={() => { setShowPhotosModal(true); setCurrentPhotoIdx(0); }}
          >
            <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" /> See All Photos
          </button>
        </div>
      </div>
      {/* Description & Reviews Section */}
      <div className="max-w-[1310px]  pt-8 sm:pt-10 lg:pt-12 flex flex-col items-start">
        {/* Accordion Section */}
        <div className="max-w-3xl w-full  pt-8 sm:pt-10 lg:pt-12 pl-0 text-left self-start">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold mb-3 sm:mb-4 text-left font-bebas">DESCRIPTION</h2>
          <div className="divide-y border-t border-b">
            {sections.map((section, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex font-gilroy items-center justify-between py-3 sm:py-4 text-left"
                >
                  <span className="text-sm sm:text-base font-medium">{section.title}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 text-left">
                    {section.title === "Overview" ? (
                      <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    ) : (
                      section.content
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Reviews Section */}
        <div className="max-w-3xl w-full mt-8 sm:mt-12 lg:mt-16 pl-0 pt-6 sm:pt-8 lg:pt-9 text-left self-start">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-normal text-left font-bebas">REVIEWS</h2>
              <p className="underline text-xs sm:text-sm">Showing {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
            </div>
            <button className="px-4 sm:px-6 py-2 bg-black text-white rounded-full font-gilroy text-sm sm:text-lg font-semibold w-full sm:w-auto">Write Review</button>
          </div>
          {reviews.map((review, index) => (
            <div key={index} className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold font-bebas text-lg sm:text-xl uppercase truncate text-left">{review.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-base text-gray-400 font-gilroy whitespace-nowrap self-start sm:self-auto text-left">{review.daysAgo}</p>
              </div>
              <p className="text-xs sm:text-sm text-black font-gilroy leading-relaxed text-left">{review.content}</p>
              <hr className="mt-3 sm:mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
