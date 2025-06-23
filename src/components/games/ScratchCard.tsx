import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

interface ScratchCardProps {
  onWin: (promoCode: PromoCode) => void;
  onBack: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ onWin, onBack }) => {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchedPixels, setScratchedPixels] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const prizes = [
    { discount: 5, code: 'SCRATCH5', description: '5% off on your next purchase' },
    { discount: 10, code: 'SCRATCH10', description: '10% off on your next purchase' },
    { discount: 15, code: 'SCRATCH15', description: '15% off on your next purchase' },
    { discount: 20, code: 'SCRATCH20', description: '20% off on your next purchase' },
  ];

  const [currentPrize] = useState(() => prizes[Math.floor(Math.random() * prizes.length)]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    // Fill with scratch overlay
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch texture
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3,
        Math.random() * 3
      );
    }
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Count scratched pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scratched = imageData.data.filter((_, index) => index % 4 === 3 && imageData.data[index] === 0).length;
    const totalPixels = canvas.width * canvas.height;
    const scratchedPercentage = (scratched / totalPixels) * 100;

    setScratchedPixels(scratchedPercentage);

    if (scratchedPercentage > 30 && !hasWon) {
      setIsScratched(true);
      setHasWon(true);
      onWin(currentPrize);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hasWon) return;
    isDrawingRef.current = true;
    const pos = getMousePos(e);
    scratch(pos.x, pos.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || hasWon) return;
    const pos = getMousePos(e);
    scratch(pos.x, pos.y);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const resetCard = () => {
    setIsScratched(false);
    setScratchedPixels(0);
    setHasWon(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch texture
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3,
        Math.random() * 3
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Scratch Card</h1>
        </div>

        {/* Scratch Card */}
        <div className="relative mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-center text-white">
            <div className="text-2xl font-bold mb-2">🎁 Lucky Scratch Card</div>
            <div className="text-sm opacity-90">Scratch to reveal your prize!</div>
          </div>

          {/* Canvas Container */}
          <div className="relative mt-4">
            <canvas
              ref={canvasRef}
              className="w-full h-48 rounded-xl cursor-crosshair border-2 border-gray-300"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            
            {/* Prize Display (hidden behind scratch layer) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {currentPrize.discount}% OFF
                </div>
                <div className="bg-white rounded-lg px-4 py-2 mb-2">
                  <div className="font-mono font-bold text-gray-800 text-lg">
                    {currentPrize.code}
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-white rounded px-3 py-1">
                  {currentPrize.description}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Scratched: {Math.round(scratchedPixels)}%</span>
              <span>Goal: 30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(scratchedPixels, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          {!hasWon ? (
            <div className="space-y-4">
              <div className="bg-blue-100 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-blue-800 font-semibold mb-2">
                  🎯 How to Play:
                </div>
                <div className="text-blue-700 text-sm">
                  Use your mouse to scratch the gray area. Reveal 30% to win!
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 border-2 border-green-200 rounded-lg p-4">
                <div className="text-green-800 font-bold text-lg mb-2">
                  🎉 Congratulations!
                </div>
                <div className="text-green-700">
                  You've revealed your prize! Check your rewards above.
                </div>
              </div>
              <button
                onClick={resetCard}
                className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                Scratch Again
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-2">Tips:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click and drag to scratch</li>
            <li>• Scratch at least 30% to win</li>
            <li>• Prizes range from 5% to 20% off</li>
            <li>• Each card has a unique code</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScratchCard; 