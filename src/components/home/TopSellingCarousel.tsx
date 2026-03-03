import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ICarouselItem {
  id: number;
  type: 'brand' | 'product' | 'promo' | 'new' | 'featured';
  image_url: string;
  shareable_link: string;
  display_order: number;
  is_active: boolean;
}

const LABEL: Record<ICarouselItem['type'], string> = {
  brand:    'View Brand',
  product:  'View Products',
  promo:    'View Promo Products',
  new:      'View New Products',
  featured: 'View Featured Products',
};

const TopSellingCarousel: React.FC = () => {
  const [items, setItems] = useState<ICarouselItem[]>([]);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const resetTimer = useCallback((len: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % len);
    }, 3000);
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    resetTimer(items.length);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, resetTimer]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/homepage/carousels?type=promo,new,featured`);
      if (!res.ok) throw new Error('Failed to fetch carousel items');
      const data: ICarouselItem[] = await res.json();
      const active = data
        .filter(item => item.is_active)
        .sort((a, b) => a.display_order - b.display_order);
      setItems(active);
    } catch (e) {
      console.error('Error fetching carousel items:', e);
    }
  };

  const go = (idx: number) => {
    setCurrent(idx);
    if (items.length > 1) resetTimer(items.length);
  };
  const prev = (e?: React.MouseEvent) => { e?.stopPropagation(); go((current - 1 + items.length) % items.length); };
  const next = (e?: React.MouseEvent) => { e?.stopPropagation(); go((current + 1) % items.length); };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (items.length === 0) {
    return (
      <div className="w-full h-full min-h-[280px] mid:min-h-0 flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
        <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-[#F2631F] animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full min-h-[280px] mid:min-h-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide strip — translates horizontally by one container width per step */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${(current * 100) / items.length}%)`,
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / items.length}%` }}
          >
            <img
              src={item.image_url}
              alt={LABEL[item.type]}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Bottom gradient so CTA is always readable over any image */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

            {/* CTA button — sits above the dots row */}
            <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-3">
              <a
                href={item.shareable_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F2631F] hover:bg-[#E25818] active:scale-95 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg transition-all duration-200 whitespace-nowrap"
              >
                {LABEL[item.type]}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator — pill style, active dot expands */}
      <div className="absolute bottom-2.5 inset-x-0 z-20 flex justify-center items-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              current === i
                ? 'w-4 h-1.5 bg-[#F2631F]'
                : 'w-1.5 h-1.5 bg-white/55 hover:bg-white/90'
            }`}
          />
        ))}
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-sm text-white transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-sm text-white transition-all duration-200"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default TopSellingCarousel;
