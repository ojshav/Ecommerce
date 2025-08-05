import React, { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart, ChevronDown, ChevronUp, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Shop4ProductCard from '../Shop4ProductCard';
import shop4ApiService, { Product as ApiProduct } from '../../../../services/shop4ApiService';

// --- StarRating ---
interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', showNumber = false }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center gap-1">
       {showNumber && (
        <span className="text-white text-sm sm:text-lg font-semibold ml-2">{rating}</span>
      )}
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-[#CCE208] fill-yellow-400' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

// --- Product Interface for Shop4ProductCard ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  background?: string;
  discount?: number;
  selected?: boolean;
}

// --- ReviewCard ---
interface Review {
  id: number;
  userName: string;
  userInfo: string;
  rating: number;
  comment: string;
  helpful: number;
  notHelpful: number;
  timeAgo: string;
  initials: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful);
  const [voted, setVoted] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleVote = (type: 'helpful' | 'not-helpful') => {
    if (voted) return; // Prevent multiple votes
    
    if (type === 'helpful') {
      setHelpfulCount(prev => prev + 1);
    } else {
      setNotHelpfulCount(prev => prev + 1);
    }
    setVoted(type);
  };

  return (
    <div className="border-b border-gray-700 pb-6 mb-6 last:border-b-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column - Profile Information */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-[87px] sm:h-[87px] bg-[#323232] rounded-full flex items-center justify-center text-[#FFF] text-base sm:text-[20px] font-normal font-futura flex-shrink-0" >
              MS
            </div>
            
            {/* Reviewer Info */}
            <div className="flex flex-col">
              <h4 className="text-white font-medium text-sm sm:text-base">
                <span className="text-[#FFF] text-base sm:text-[18px] font-[450] leading-normal font-futura ">Sabina F.</span> <span className="text-[#FFF] text-sm sm:text-[16px] font-normal leading-normal font-futura">Verified Buyer</span>
              </h4>
              <p className="text-[#FFF] text-sm sm:text-[16px] font-[450] leading-normal font-futura">Germany</p>
              <div className="flex mt-1">
                <div className="w-[79.806px] h-[11.897px] flex-shrink-0">
                  <StarRating rating={5} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Review Content and Interactivity */}
        <div className="lg:col-span-8 relative">
          {/* Vertical Separator Line - Hidden on mobile */}
          <div className="hidden lg:block absolute left-[-50px] top-0 bottom-0 w-px bg-gray-400"></div>
          
          <div className="lg:pl-4 mt-2">
            {/* Review Headline */}
            <p className="text-[#FFF] text-sm sm:text-[14px] font-normal leading-normal font-poppins mb-4">{review.comment}</p>
            
            {/* Helpfulness Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-[#FFF] text-sm sm:text-[16px] font-[450] leading-normal font-futura">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote('helpful')}
                  disabled={voted !== null}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                    voted === 'helpful' 
                      ? 'text-[#B19D7F] bg-[#B19D7F]/10' 
                      : voted
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-[#B19D7F] hover:bg-[#B19D7F]/10'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="text-white">{helpfulCount}</span>
                </button>
                
                <button
                  onClick={() => handleVote('not-helpful')}
                  disabled={voted !== null}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                    voted === 'not-helpful' 
                      ? 'text-gray-400 bg-gray-400/10' 
                      : voted
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-gray-400 hover:bg-gray-400/10'
                  }`}
                >
                  <ThumbsDown className="w-3 h-3" />
                  <span className="text-white">{notHelpfulCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timestamp */}
        <div className="lg:col-span-1">
          <span className="text-white text-xs sm:text-sm">{review.timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

// --- ReviewsSection ---
const reviewsData: Review[] = [
    {
      id: 1,
      userName: 'Sabina F.',
      userInfo: 'Verified Buyer • Germany',
      rating: 5,
      comment: 'Awesome Product. The Products is Excellent',
      helpful: 1,
      notHelpful: 0,
      timeAgo: '8 months ago',
      initials: 'SF'
    }
  ];

const ReviewsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [newReview, setNewReview] = useState({
      rating: 5,
      comment: ''
    });
    const averageRating = 4.9;
    const totalReviews = reviewsData.length;

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle review submission logic here
        console.log('Submitting review:', newReview);
        setShowWriteReview(false);
        setNewReview({ rating: 5, comment: '' });
    };

    return (
        <div className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[1640px] mx-auto">
                <div className="border-b border-gray-700 mb-8">
                    <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-0">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 sm:py-4 px-4 sm:px-6 border-b-[3px] sm:border-b-[5px] font-medium text-sm sm:text-base transition-colors duration-200 ${activeTab === 'reviews' ? 'border-white text-white ' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                        >
                            <span className="text-white font-futura text-lg sm:text-xl lg:text-[30px] font-normal leading-normal">Reviews</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`py-2 sm:py-4 px-4 sm:px-6 border-b-[3px] sm:border-b-[5px] font-medium text-sm sm:text-base transition-colors duration-200 ${activeTab === 'questions' ? 'border-white text-white ' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                        >
                            <span className="text-white font-futura text-lg sm:text-xl lg:text-[30px] font-normal leading-normal">Questions (1)</span>
                        </button>
                    </nav>
                </div>

                <div className="min-h-[500px]">
                    {activeTab === 'reviews' && (
                        <div>
                            <div className="text-center mb-8 sm:mb-12 py-6 sm:py-10">
                                <div className="flex items-center justify-center mb-2 relative">
                                    <span className="text-white font-normal leading-[52px] text-xl sm:text-[30px] capitalize mr-4 font-futura " >{averageRating}</span>
                                    
                                    <StarRating rating={averageRating} size="lg" />
                                </div>
                                <p className="text-white font-normal leading-[30px] text-sm sm:text-[16px] capitalize mb-4 sm:mb-6 font-futura">
                                    Based On {totalReviews} Review{totalReviews !== 1 ? 's' : ''}, Rating Is Calculated
                                </p>
                                <button 
                                    onClick={() => setShowWriteReview(!showWriteReview)}
                                    className="bg-[#B19D7F] hover:bg-[#A08F75] text-white leading-normal uppercase font-futura flex-shrink-0 w-full sm:w-[205px] h-[40px] sm:h-[50.15px] text-xs sm:text-[14px] font-[450] tracking-[2.1px]">
                                    WRITE A REVIEW
                                </button>
                            </div>
                            
                            {showWriteReview && (
                                <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-8">
                                <h3 className="text-white text-base sm:text-lg font-medium mb-4">Write Your Review</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                    <label className="block text-gray-300 text-sm mb-2">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                                            className="p-1"
                                        >
                                            <StarRating rating={star <= newReview.rating ? 5 : 0} size="lg" />
                                        </button>
                                        ))}
                                    </div>
                                    </div>
                                    <div>
                                    <label className="block text-gray-300 text-sm mb-2">Your Review</label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                        className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-amber-500 focus:outline-none resize-vertical min-h-[120px]"
                                        placeholder="Share your thoughts about this product..."
                                        required
                                    />
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit"
                                        className="bg-amber-700 hover:bg-amber-600 text-white px-4 sm:px-6 py-2 rounded font-medium transition-colors"
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowWriteReview(false)}
                                        className="bg-gray-600 hover:bg-gray-500 text-white px-4 sm:px-6 py-2 rounded font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                </form>
                                </div>
                            )}

                            <div className="space-y-6">
                                {reviewsData.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'questions' && (
                        <div className="text-center py-8 sm:py-16">
                            <h3 className="text-white text-lg sm:text-xl mb-4">Questions & Answers</h3>
                            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                                No questions have been asked about this product yet.
                            </p>
                            <button className="bg-[#C4A57B] hover:bg-[#B8965F] text-white px-6 sm:px-8 py-2 sm:py-3 rounded font-medium tracking-wide transition-colors duration-200 uppercase text-xs sm:text-sm">
                                Ask a Question
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main ProductDetail Component ---
const ProductDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [expandedSections, setExpandedSections] = useState(['about']);

  const productId = searchParams.get('id');

  // Simple markdown parser for basic formatting with Shop4 styling
  const parseMarkdown = (text: string): JSX.Element[] => {
    if (!text) return [];

    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Headers (bold text with **)
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const content = trimmed.slice(2, -2);
        elements.push(
          <h4 key={index} className="text-lg font-bold text-white mb-2">
            {content}
          </h4>
        );
      }
      // Headers (bold text within line like **Material**: content)
      else if (trimmed.includes('**') && trimmed.split('**').length >= 3) {
        const parts = trimmed.split('**');
        const beforeBold = parts[0];
        const boldText = parts[1];
        const afterBold = parts.slice(2).join('**');
        
        elements.push(
          <p key={index} className="text-gray-300 mb-2">
            {beforeBold}
            <span className="font-bold text-white">{boldText}</span>
            {afterBold}
          </p>
        );
      }
      // Italic text
      else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
        const content = trimmed.slice(1, -1);
        elements.push(
          <p key={index} className="text-gray-300 italic mb-2">
            {content}
          </p>
        );
      }
      // Numbered lists (standard format like "1. content")
      else if (/^\d+\./.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s*/, '');
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#BB9D7B] text-white text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <span className="text-gray-300">{content}</span>
          </div>
        );
      }
      // Numbered items (alternative format like just "1" on separate line)
      else if (/^\d+$/.test(trimmed)) {
        // Skip standalone numbers, they'll be handled with the next line
        return;
      }
      // Content that follows a standalone number
      else if (index > 0 && /^\d+$/.test(lines[index - 1]?.trim())) {
        const number = lines[index - 1].trim();
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#BB9D7B] text-white text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {number}
            </span>
            <span className="text-gray-300">{trimmed}</span>
          </div>
        );
      }
      // Bullet points
      else if (trimmed.startsWith('- ')) {
        const content = trimmed.slice(2);
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-2 h-2 rounded-full bg-[#BB9D7B] mr-4 mt-2"></span>
            <span className="text-gray-300">{content}</span>
          </div>
        );
      }
      // Regular text (but skip if it's immediately after a standalone number)
      else if (trimmed && !(index > 0 && /^\d+$/.test(lines[index - 1]?.trim()))) {
        elements.push(
          <p key={index} className="text-gray-300 mb-2">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      try {
        const productIdNum = parseInt(productId);
        const response = await shop4ApiService.getProductById(productIdNum);
        
        if (response && response.success) {
          setProduct(response.product);
          
          // Fetch related products if available
          if (response.related_products) {
            const mappedRelated = response.related_products.map(p => ({
              id: p.product_id,
              name: p.product_name,
              price: p.special_price || p.price,
              image: p.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png",
              discount: p.special_price ? Math.round(((p.price - p.special_price) / p.price) * 100) : 0
            }));
            setRelatedProducts(mappedRelated);
          }
        } else {
          setProduct(null);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        setRelatedProducts([]);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const sizes = ['S', 'M', 'L'];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full mx-auto bg-black text-white flex items-center justify-center">
        <div className="text-white text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full mx-auto bg-black text-white flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mx-auto bg-black text-white">
      <div className="border-b border-gray-800 max-w-[1640px] mx-auto px-4 py-3 md:px-6 md:py-4">
        <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm md:text-base">
         
          <span className="text-white font-poppins text-lg sm:text-xl lg:text-[30px] font-normal leading-normal">Back to: Diya Collection</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col mx-auto max-w-[1640px] gap-8 sm:gap-12 lg:gap-20 lg:flex-row">
        {/* Left Side - Image Gallery */}
        <div className="w-full lg:w-1/2 bg-black">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Main Product Images */}
            <div className="flex flex-col space-y-8 sm:space-y-12 lg:space-y-20 justify-center items-center">
              <img
                src={product.media?.images?.[0]?.url || product.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462984/public_assets_shop4/public_assets_shop4_13.png"}
                alt={product.product_name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[707px] object-cover rounded-lg"
              />
              <img
                src={product.media?.images?.[1]?.url || product.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462986/public_assets_shop4/public_assets_shop4_14.png"}
                alt={product.product_name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[707px] object-cover rounded-lg"
              />
              <img
                src={product.media?.images?.[2]?.url || product.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462987/public_assets_shop4/public_assets_shop4_15.png"}
                alt={product.product_name}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[707px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
          {/* Product Category */}
          <div className="text-white text-sm sm:text-base font-normal leading-normal font-['Poppins']">
            {product.category_name || 'Product Category'}
          </div>

          {/* Product Title */}
          <h1 className="text-white text-lg sm:text-xl md:text-[26px] font-normal leading-3 font-poppins">
            {product.product_name}
          </h1>

          {/* Pricing */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {product.special_price && product.special_price < product.price ? (
              <>
                <span className="text-gray-400 line-through text-xs sm:text-sm md:text-base">Actual Price ${product.price}</span>
                <span className="text-xs sm:text-sm md:text-base text-white">Our price</span>
                <span className="text-base sm:text-lg md:text-xl font-medium text-[#00FF2F]">${product.special_price}</span>
              </>
            ) : (
              <>
                <span className="text-xs sm:text-sm md:text-base text-white">Price</span>
                <span className="text-base sm:text-lg md:text-xl font-medium text-[#00FF2F]">${product.price}</span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-xs sm:text-sm md:text-base">
              ★★★★★
            </div>
            <span className="text-gray-400 text-xs md:text-sm">( 1 Customer review )</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
              <span className="text-xs sm:text-sm md:text-base text-white">Size :</span>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded text-xs md:text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-2 border-[#BB9D7B] bg-[#BB9D7B] text-white'
                        : 'border-2 border-gray-600 bg-[#515151] text-white hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-white text-xs md:text-sm underline hover:text-gray-300 transition-colors">
                File Size Chart
              </button>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center border border-gray-600 rounded bg-[#2B2B2B] overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="p-2 md:p-3 hover:bg-gray-700 transition-colors text-white border-r border-gray-600"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4"/>
              </button>
              <span className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white bg-[#2B2B2B] border-r border-gray-600 min-w-[2.5rem] md:min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 md:p-3 hover:bg-gray-700 transition-colors text-white"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4"/>
              </button>
            </div>
            
            <button className="bg-[#BB9D7B] hover:bg-[#a8896a] text-white p-2 md:p-3 rounded-full transition-colors">
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            <button className="p-2 md:p-3 border border-gray-600 bg-[#515151] hover:bg-gray-700 rounded transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="text-xs md:text-sm text-gray-300 space-y-1">
            <p>Worldwide Shipping in all order $200, Delivery in 2-5 working days</p>
            <button className="text-white hover:text-gray-300 transition-colors underline">
              Shipping & Return
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* About Product Section */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => toggleSection('about')}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-white">About Product</h3>
              {expandedSections.includes('about') ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              )}
            </button>
            
            {expandedSections.includes('about') && (
              <div className="text-gray-300 text-xs md:text-sm">
                {product.full_description || product.product_description || product.short_description ? (
                  <div className="leading-relaxed">
                    {parseMarkdown(product.full_description || product.product_description || product.short_description)}
                  </div>
                ) : (
                  <p className="leading-relaxed text-gray-400">No product information available.</p>
                )}
              </div>
            )}
          </div>

          {/* Final Divider */}
          <div className="border-t border-gray-700"></div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Rated Badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-amber-700/20 text-amber-300 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
            Top • Rated
          </span>
        </div>

        {/* Related Products Section */}
        <div className="mb-16">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-light text-center mb-8 sm:mb-12">
            Related Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {relatedProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="w-full h-auto">
                <Shop4ProductCard 
                  product={{
                    id: product.id,
                    name: product.name,  // Use 'name' not 'title' for Shop4ProductCard
                    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                    discount: product.discount,  // Keep as number for Shop4ProductCard
                    image: product.image
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection/>
    </div>
  );
};

export default ProductDetail;


