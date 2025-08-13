import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/globals.css';
import Header from '../components/shop/shop1/Header';
import Hero from '../components/shop/shop1/Productpage/Hero';
// import FashionCardsSection from '../components/shop/shop1/Productpage/FashionCardsSection';
// import RatingsReviews from '../components/shop/shop1/Productpage/Rating';
import SimilarProducts from '../components/shop/shop1/Productpage/SimilarProducts';
import InstagramPromo from '../components/shop/shop1/Productpage/InstagramPromo';
import shop1ApiService, { Product } from '../services/shop1ApiService';
import { Star } from 'lucide-react';

function Shop1ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Shop Reviews (real data) ---
  interface ShopReviewImage { image_id: number; image_url: string }
  interface ShopReview {
    review_id: number;
    shop_product_id: number;
    user_id: number;
    shop_order_id: string;
    rating: number;
    title: string;
    body: string;
    created_at: string;
    images?: ShopReviewImage[];
    user?: { first_name?: string; last_name?: string } | null;
  }
  const [shopReviews, setShopReviews] = useState<ShopReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsPages, setReviewsPages] = useState(1);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '', orderId: '' });
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [eligibilityError, setEligibilityError] = useState<string | null>(null);

  const fetchShopReviews = async (p: number = 1) => {
    if (!id) return;
    try {
      setReviewsLoading(true);
      const res = await shop1ApiService.getShopProductReviews(Number(id), p, 5);
      if (res.status === 'success') {
        setShopReviews(res.data.reviews as ShopReview[]);
        setReviewsPage(res.data.current_page);
        setReviewsPages(res.data.pages);
      }
    } catch (e) {
      console.error('Failed to load reviews', e);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Use the proper API call for individual product
        const response = await shop1ApiService.getProductById(parseInt(id));
        
        if (response && response.success) {
          setProduct(response.product);
          setRelatedProducts(response.related_products || []);
        } else {
          setProduct(null);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchShopReviews(1);
  }, [id]);

  // Eligibility will be checked when clicking Write Review

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  const jwt = localStorage.getItem('access_token') || '';
      const payload = {
        shop_order_id: newReview.orderId.trim(),
        shop_product_id: Number(id),
        rating: newReview.rating,
        title: newReview.title.trim() || 'Review',
        body: newReview.comment.trim(),
        images: [],
      };
      await shop1ApiService.createShopReview(payload, jwt);
      setShowWriteReview(false);
      setNewReview({ rating: 5, title: '', comment: '', orderId: '' });
      fetchShopReviews(1);
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    }
  };

  // On clicking Write Review: find delivered order containing this product
  const handleOpenReview = async () => {
    setEligibilityChecked(false);
    setEligibilityError(null);
    try {
  const jwt = localStorage.getItem('access_token') || '';
      if (!jwt) {
        setEligibilityError('Please sign in to review.');
        setEligibilityChecked(true);
        return;
      }
      if (!id) return;
      // Build candidate product IDs (parent + variants) to match against order items
      const candidateIds = new Set<number>([Number(id)]);
      if (product && Array.isArray((product as any).variants)) {
        (product as any).variants.forEach((v: any) => {
          if (typeof v?.product_id === 'number') candidateIds.add(Number(v.product_id));
          if (typeof v?.variant_product_id === 'number') candidateIds.add(Number(v.variant_product_id));
        });
      }
      let page = 1;
      let hasNext = true;
      let latestMatch: any = null;
      while (hasNext && page <= 5) {
        const res = await shop1ApiService.getMyShopOrders(page, 50, jwt);
        if (res.success) {
          (res.data.orders || []).forEach((o: any) => {
            const isDelivered = String(o.order_status).toLowerCase() === 'delivered';
            const hasProduct = Array.isArray(o.items) && o.items.some((it: any) => candidateIds.has(Number(it.product_id)));
            if (isDelivered && hasProduct) {
              if (!latestMatch || new Date(o.order_date) > new Date(latestMatch.order_date)) {
                latestMatch = o;
              }
            }
          });
          hasNext = Boolean(res.data?.pagination?.has_next);
          page += 1;
        } else {
          hasNext = false;
        }
      }
      if (latestMatch) {
        setNewReview(prev => ({ ...prev, orderId: latestMatch.order_id }));
        setShowWriteReview(true);
      } else {
        setEligibilityError("Not allowed: either this product wasn't ordered, or the order isn't delivered yet.");
      }
    } catch (e: any) {
      setEligibilityError(e?.message || 'Failed to check eligibility');
    } finally {
      setEligibilityChecked(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      
      <Hero productData={product} />
      {/* <FashionCardsSection /> */}
      {/* Reviews Section (real data with delivered-order gating) */}
      <div className="max-w-5xl w-full mx-auto mt-10 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold">Reviews</h2>
            <p className="underline text-sm text-gray-600">Showing {shopReviews.length} review{shopReviews.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
            <button onClick={handleOpenReview} className="px-5 py-2.5 bg-black text-white rounded-full font-semibold text-sm w-full sm:w-auto">Write Review</button>
            {eligibilityChecked && eligibilityError && (
              <p className="text-red-500 text-xs">{eligibilityError}</p>
            )}
          </div>
        </div>

    {showWriteReview && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3">Write your review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-3">
      {/* orderId is set after eligibility check */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">Rating</label>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button type="button" key={star} onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}>
                      <Star className={`w-4 h-4 ${star <= newReview.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Title</label>
                <input value={newReview.title} onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded" placeholder="Great product!" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Your review</label>
                <textarea value={newReview.comment} onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))} className="w-full p-2 border rounded min-h-[100px]" placeholder="Share your thoughts…" required />
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={!eligibilityChecked || !newReview.orderId} className={`px-4 py-2 rounded text-white ${(!eligibilityChecked || !newReview.orderId) ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}>Submit</button>
                <button type="button" onClick={() => setShowWriteReview(false)} className="px-4 py-2 rounded border">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {reviewsLoading ? (
          <div className="text-gray-500">Loading reviews…</div>
        ) : shopReviews.length > 0 ? (
          <div>
            {shopReviews.map((review) => (
              <div key={review.review_id} className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-base">{review.user?.first_name || 'User'}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-gray-800">{review.title ? `${review.title} — ` : ''}{review.body}</p>
                <hr className="mt-3" />
              </div>
            ))}
            {reviewsPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button disabled={reviewsPage===1} onClick={() => fetchShopReviews(reviewsPage-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <span className="text-gray-500">Page {reviewsPage} of {reviewsPages}</span>
                <button disabled={reviewsPage===reviewsPages} onClick={() => fetchShopReviews(reviewsPage+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">No reviews yet.</div>
        )}
      </div>

      <SimilarProducts relatedProducts={relatedProducts} />
      <InstagramPromo />
    </div>  
  );
}

export default Shop1ProductPage;