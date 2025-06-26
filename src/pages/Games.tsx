import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import SpinWheel from '../components/games/SpinWheel';
// import ScratchCard from '../components/games/ScratchCard';
import MemoryGame from '../components/games/MemoryGame';
// import LuckyDraw from '../components/games/LuckyDraw';
// import ColorMatch from '../components/games/ColorMatch';
import { Target, Zap } from 'lucide-react';
import '@fontsource/work-sans';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [wonCodes, setWonCodes] = useState<PromoCode[]>([]);

  const games = [
    {
      id: 'spin-wheel',
      name: 'Spin & Win',
      description: 'Spin the wheel to win amazing discounts!',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'bg-gradient-to-r from-[#F2631F] to-orange-600'
    },
    // {
    //   id: 'scratch-card',
    //   name: 'Scratch Card',
    //   description: 'Scratch to reveal your discount!',
    //   icon: <Gift className="w-8 h-8" />,
    //   color: 'bg-gradient-to-r from-[#F2631F] to-orange-500'
    // },
    {
      id: 'memory-game',
      name: 'Memory Match',
      description: 'Match pairs to unlock special offers!',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'bg-gradient-to-r from-[#F2631F] to-orange-600'
    }
  ];

  const handleGameWin = (promoCode: PromoCode) => {
    setWonCodes(prev => [...prev, promoCode]);
    toast.success(`🎉 Congratulations! You won ${promoCode.discount}% off! Code: ${promoCode.code}`);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'spin-wheel':
        return <SpinWheel onWin={handleGameWin} onBack={handleBackToGames} />;
      // case 'scratch-card':
      //   return <ScratchCard onWin={handleGameWin} onBack={handleBackToGames} />;
      case 'memory-game':
        return <MemoryGame onWin={handleGameWin} onBack={handleBackToGames} />;
      default:
        return null;
    }
  };

  // Animation keyframes (inject into page)
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatCard {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-12px) scale(1.03); box-shadow: 0 8px 32px 0 rgba(242,99,31,0.10); }
        100% { transform: translateY(0px); }
      }
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes confettiMove {
        0% { transform: translateY(0); }
        100% { transform: translateY(40px); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 font-['Work_Sans']">
        <div className="container mx-auto px-4">
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-20 sm:py-16 lg:py-12 font-['Work_Sans'] relative overflow-hidden">
      {/* Animated Confetti Background */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0" style={{ animation: 'confettiMove 3s infinite alternate' }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="20%" r="30" fill="#F2631F" />
        <circle cx="80%" cy="10%" r="20" fill="#FF8A4C" />
        <circle cx="50%" cy="80%" r="25" fill="#FF6B35" />
        <circle cx="90%" cy="60%" r="15" fill="#E55A2B" />
        <rect x="20%" y="70%" width="18" height="18" fill="#F2631F" rx="4" />
        <rect x="70%" y="30%" width="12" height="12" fill="#FF8A4C" rx="3" />
      </svg>
      <div className="container mx-auto mt-6 sm:mt-8 lg:mt-12 px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" style={{ animation: 'fadeInUp 0.8s cubic-bezier(.4,0,.2,1) both' }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight px-2">
            🎮 Play & Win Rewards
          </h1>
          <p className="text-base sm:text-lg text-gray-700 px-4 sm:px-0">
            Play exciting games and win promo codes worth up to <span className="text-[#F2631F] font-semibold">20% off</span> instantly.
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {games.map((game, idx) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`${game.color} rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer shadow-xl transition hover:scale-105 hover:shadow-2xl border-2 border-orange-200 hover:border-orange-400`}
              style={{
                animation: `floatCard 3s ease-in-out ${idx * 0.3}s infinite, fadeInUp 0.8s cubic-bezier(.4,0,.2,1) both`,
                animationDelay: `${0.2 + idx * 0.15}s, ${0.2 + idx * 0.15}s`
              }}
            >
              <div className="text-white text-center">
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="bg-white/30 rounded-full p-3 sm:p-4 hover:bg-white/40 transition">
                    {game.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{game.name}</h3>
                <p className="text-white/90 text-sm sm:text-base">{game.description}</p>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/80 italic">Win up to 20% off!</div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code Section */}
        {wonCodes.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-8 sm:mb-12 border border-orange-100" style={{ animation: 'fadeInUp 0.8s 0.2s cubic-bezier(.4,0,.2,1) both' }}>
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
              🎉 Your Won Promo Codes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {wonCodes.map((code, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm"
                  style={{ animation: `fadeInUp 0.7s ${0.2 + index * 0.1}s both` }}
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-green-700 mb-1">{code.discount}% OFF</div>
                    <div className="bg-white px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm font-semibold rounded mb-1 text-gray-800 break-all">
                      {code.code}
                    </div>
                    <div className="text-xs text-gray-600">{code.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100" style={{ animation: 'fadeInUp 0.8s 0.3s cubic-bezier(.4,0,.2,1) both' }}>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center">
            How to Play & Win
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ animation: `fadeInUp 0.7s ${0.4 + step * 0.1}s both` }}>
                <div className="bg-[#F2631F]/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#F2631F] font-bold text-base sm:text-lg">{step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                  {step === 1 && 'Choose a Game'}
                  {step === 2 && 'Play & Win'}
                  {step === 3 && 'Use Your Code'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 px-2 sm:px-0">
                  {step === 1 && 'Pick from our exclusive mini-games.'}
                  {step === 2 && 'Complete the game to earn promo codes.'}
                  {step === 3 && 'Apply them at checkout and save instantly!'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;