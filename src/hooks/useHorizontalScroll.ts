import { useRef, useState, useEffect } from 'react';

interface UseHorizontalScrollProps {
  scrollAmount?: number;
}

export const useHorizontalScroll = ({ scrollAmount = 300 }: UseHorizontalScrollProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;

    // Get the container's current scroll position and dimensions
    const container = containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Calculate the maximum scroll position
    const maxScroll = scrollWidth - clientWidth;

    // Only handle horizontal scrolling if there's content to scroll horizontally
    // and the wheel movement is primarily horizontal or shift+wheel
    const hasHorizontalContent = maxScroll > 0;
    const isHorizontalScroll = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    // Only prevent default and handle horizontally if we should
    if (hasHorizontalContent && isHorizontalScroll) {
      e.preventDefault();
      
      // Determine if we're using a touchpad (deltaMode === 0) or mouse wheel (deltaMode === 1)
      const isTouchpad = e.deltaMode === 0;
      
      // Use deltaX for horizontal scrolling, or deltaY when shift is pressed
      const scrollDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      
      // Apply different scrolling behavior based on input device
      if (isTouchpad) {
        // For touchpad, use a smoother scrolling with momentum
        const scrollAmount = scrollDelta * 0.5; // Reduce the scroll amount for smoother movement
        const newScrollLeft = scrollLeft + scrollAmount;
        
        // Apply smooth scrolling with bounds checking
        container.scrollTo({
          left: Math.max(0, Math.min(newScrollLeft, maxScroll)),
          behavior: 'smooth'
        });
      } else {
        // For mouse wheel, use a more traditional scrolling
        const scrollAmount = scrollDelta * 2; // Increase scroll amount for mouse wheel
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
    // If not horizontal scrolling, let the default vertical scroll behavior happen
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return {
    containerRef,
    isDragging,
    isMobile,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleWheel,
    scroll
  };
}; 