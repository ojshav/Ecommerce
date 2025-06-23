import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import '@fontsource/work-sans';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

interface SpinWheelProps {
  onWin: (promoCode: PromoCode) => void;
  onBack: () => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onWin, onBack }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const prizes = [
    { discount: 5, code: 'SPIN5', description: '5% off on your next purchase' },
    { discount: 10, code: 'SPIN10', description: '10% off on your next purchase' },
    { discount: 15, code: 'SPIN15', description: '15% off on your next purchase' },
    { discount: 20, code: 'SPIN20', description: '20% off on your next purchase' },
    { discount: 5, code: 'SPIN5B', description: '5% off on your next purchase' },
    { discount: 10, code: 'SPIN10B', description: '10% off on your next purchase' },
    { discount: 15, code: 'SPIN15B', description: '15% off on your next purchase' },
    { discount: 20, code: 'SPIN20B', description: '20% off on your next purchase' },
  ];

  const colors = [
    '#F2631F', '#FF8A4C', '#FF6B35', '#E55A2B',
    '#FF9F7A', '#FF7A4C', '#FF6B35', '#F2631F'
  ];

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (spins * 360);
    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const prizeAngle = (360 / prizes.length) * randomPrizeIndex;
    const finalAngle = finalRotation + prizeAngle;

    setRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      onWin(prizes[randomPrizeIndex]);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setHasSpun(false);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-['Work_Sans']">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-['Work_Sans']"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </button>
          <h1 className="text-2xl font-bold text-gray-800 font-['Work_Sans']">Spin & Win</h1>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-8">
          <div className="relative w-80 h-80 mx-auto">
            {/* Wheel */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-3000 ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
              }}
            >
              {prizes.map((prize, index) => {
                const angle = (360 / prizes.length) * index;
                const color = colors[index % colors.length];
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((360 / prizes.length) * Math.PI / 180)}% 0%, ${50 + 50 * Math.cos((360 / prizes.length) * Math.PI / 180)}% 50%)`
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: color }}
                    >
                      <div className="transform -rotate-90 text-center">
                        <div className="text-lg font-bold font-['Work_Sans']">{prize.discount}%</div>
                        <div className="text-xs font-['Work_Sans']">OFF</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Pointer */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-[#F2631F]"></div>
            </div>

            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center">
              <div className="w-8 h-8 bg-[#F2631F] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          {!hasSpun ? (
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`w-full py-4 px-8 rounded-2xl text-white font-bold text-lg transition-all duration-300 font-['Work_Sans'] ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#F2631F] to-orange-600 hover:from-[#F2631F] hover:to-orange-700 transform hover:scale-105'
              }`}
            >
              {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL!'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 border-2 border-green-200 rounded-lg p-4">
                <div className="text-green-800 font-bold text-lg mb-2 font-['Work_Sans']">
                  🎉 Congratulations!
                </div>
                <div className="text-green-700 font-['Work_Sans']">
                  You've won a promotional code! Check your rewards above.
                </div>
              </div>
              <button
                onClick={resetWheel}
                className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors font-['Work_Sans']"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Spin Again
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl font-['Work_Sans']">
          <h3 className="font-semibold text-gray-800 mb-2 font-['Work_Sans']">How to Play:</h3>
          <ul className="text-sm text-gray-600 space-y-1 font-['Work_Sans']">
            <li>• Click "SPIN THE WHEEL" to start</li>
            <li>• Wait for the wheel to stop spinning</li>
            <li>• The pointer will show your prize</li>
            <li>• Win discounts from 5% to 20% off!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel; 