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
  const [wonPrize, setWonPrize] = useState<PromoCode | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
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
      setWonPrize(prizes[randomPrizeIndex]);
      onWin(prizes[randomPrizeIndex]);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setHasSpun(false);
    setIsSpinning(false);
    setWonPrize(null);
    setCopySuccess(false);
  };

  const handleCopy = () => {
    if (wonPrize) {
      navigator.clipboard.writeText(wonPrize.code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-['Work_Sans'] bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Floating confetti background (optional, simple SVGs for now) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 z-0" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="20%" r="30" fill="#F2631F" />
        <circle cx="80%" cy="10%" r="20" fill="#FF8A4C" />
        <circle cx="50%" cy="80%" r="25" fill="#FF6B35" />
        <circle cx="90%" cy="60%" r="15" fill="#E55A2B" />
      </svg>
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border border-orange-100 z-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-['Work_Sans']"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Games</span>
          </button>
          <h1 className="text-3xl font-extrabold text-orange-700 font-['Work_Sans'] tracking-tight drop-shadow-sm">Spin & Win</h1>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
            {/* Glowing Wheel Border */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-orange-200 via-orange-100 to-white blur-lg opacity-70 animate-pulse z-0"></div>
            {/* Wheel */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-3000 ease-out shadow-xl border-8 border-white z-10"
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

            {/* Stylish Center Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-20">
              <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[36px] border-l-transparent border-r-transparent border-b-[#F2631F] drop-shadow-lg animate-bounce"></div>
              <div className="w-4 h-4 bg-white rounded-full border-2 border-orange-400 absolute left-1/2 -translate-x-1/2 -top-2"></div>
            </div>

            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-orange-200 flex items-center justify-center z-20 shadow-md">
              <div className="w-8 h-8 bg-[#F2631F] rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          {!hasSpun ? (
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`w-full py-4 px-8 rounded-2xl text-white font-bold text-lg transition-all duration-300 font-['Work_Sans'] shadow-lg ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#F2631F] to-orange-600 hover:from-[#F2631F] hover:to-orange-700 transform hover:scale-105'
              }`}
            >
              {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL!'}
            </button>
          ) : (
            <>
              {/* Overlay for professional win message */}
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="relative bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4 border-orange-200 animate-fadeIn">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-2 animate-bounce">🎊</span>
                    <h2 className="text-2xl font-bold text-orange-700 mb-2 font-['Work_Sans']">Congratulations!</h2>
                    <p className="text-gray-700 mb-4 font-['Work_Sans']">You've won:</p>
                    {wonPrize && (
                      <div className="bg-white rounded-xl shadow p-4 mb-4 w-full text-center border border-orange-200">
                        <div className="text-3xl font-extrabold text-orange-600 mb-1 font-['Work_Sans']">{wonPrize.discount}% OFF</div>
                        <div className="text-lg font-semibold text-gray-800 mb-1 font-['Work_Sans']">Code: <span className="bg-orange-100 px-2 py-1 rounded font-mono text-orange-700">{wonPrize.code}</span></div>
                        <div className="text-sm text-gray-600 mb-2 font-['Work_Sans']">{wonPrize.description}</div>
                        <button
                          onClick={handleCopy}
                          className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold shadow hover:from-orange-500 hover:to-orange-700 transition-all font-['Work_Sans']"
                        >
                          {copySuccess ? 'Copied!' : 'Copy Code'}
                        </button>
                      </div>
                    )}
                    <button
                      onClick={resetWheel}
                      className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors font-['Work_Sans'] mb-2 mt-2"
                    >
                      <RotateCcw className="w-5 h-5 inline mr-2" />
                      Spin Again
                    </button>
                    <button
                      onClick={onBack}
                      className="w-full py-2 px-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors font-['Work_Sans']"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" />
                      Back to Games
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-white/60 rounded-xl font-['Work_Sans'] shadow border border-orange-100">
          <h3 className="font-semibold text-orange-700 mb-2 font-['Work_Sans'] flex items-center gap-2">
            <span className="inline-block text-xl">📝</span> How to Play:
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 font-['Work_Sans']">
            <li className="flex items-center gap-2"><span className="text-orange-500">🎯</span> Click <span className="font-bold">SPIN THE WHEEL</span> to start</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">⏳</span> Wait for the wheel to stop spinning</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">📍</span> The pointer will show your prize</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">🏆</span> Win discounts up to <span className="font-bold">20% off!</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel; 