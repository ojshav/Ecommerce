import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import SpinWheel from '../components/games/SpinWheel';
import ScratchCard from '../components/games/ScratchCard';
import MemoryGame from '../components/games/MemoryGame';
import LuckyDraw from '../components/games/LuckyDraw';
import ColorMatch from '../components/games/ColorMatch';
import { Gift, Zap, Star, Target, Palette } from 'lucide-react';
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
      icon: <Target className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#F2631F] to-orange-600'
    },
    {
      id: 'scratch-card',
      name: 'Scratch Card',
      description: 'Scratch to reveal your discount!',
      icon: <Gift className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#F2631F] to-orange-500'
    },
    {
      id: 'memory-game',
      name: 'Memory Match',
      description: 'Match pairs to unlock special offers!',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#F2631F] to-orange-600'
    },
    {
      id: 'lucky-draw',
      name: 'Lucky Draw',
      description: 'Pick a card for instant rewards!',
      icon: <Star className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-[#F2631F] to-orange-500'
    },
    {
      id: 'color-match',
      name: 'Color Rush',
      description: 'Match colors quickly for discounts!',
      icon: <Palette className="w-8 h-8" />,
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
      case 'scratch-card':
        return <ScratchCard onWin={handleGameWin} onBack={handleBackToGames} />;
      case 'memory-game':
        return <MemoryGame onWin={handleGameWin} onBack={handleBackToGames} />;
      case 'lucky-draw':
        return <LuckyDraw onWin={handleGameWin} onBack={handleBackToGames} />;
      case 'color-match':
        return <ColorMatch onWin={handleGameWin} onBack={handleBackToGames} />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 font-['Work_Sans']">
        <div className="container mx-auto px-4">
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-['Work_Sans']">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Work_Sans']">
            🎮 Fun Games, Amazing Rewards! 🎁
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-['Work_Sans']">
            Play exciting games and win promotional codes with discounts up to 20% off! 
            Each game offers different chances to win amazing deals.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`${game.color} rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group font-['Work_Sans']`}
            >
              <div className="text-white text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                    {game.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 font-['Work_Sans']">{game.name}</h3>
                <p className="text-white/90 text-sm font-['Work_Sans']">{game.description}</p>
                <div className="mt-4 text-xs text-white/80 font-['Work_Sans']">
                  Win up to 20% off!
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Won Codes Section */}
        {wonCodes.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg font-['Work_Sans']">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Work_Sans']">
              🎉 Your Won Promo Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wonCodes.map((code, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-lg p-4"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2 font-['Work_Sans']">
                      {code.discount}% OFF
                    </div>
                    <div className="bg-white rounded px-3 py-2 mb-2 font-mono text-sm font-bold text-gray-800">
                      {code.code}
                    </div>
                    <div className="text-xs text-gray-600 font-['Work_Sans']">
                      {code.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg font-['Work_Sans']">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Work_Sans']">
            How to Play & Win
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#F2631F]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#F2631F] font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 font-['Work_Sans']">Choose a Game</h3>
              <p className="text-sm text-gray-600 font-['Work_Sans']">
                Pick from our collection of fun mini-games
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F2631F]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#F2631F] font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 font-['Work_Sans']">Play & Win</h3>
              <p className="text-sm text-gray-600 font-['Work_Sans']">
                Complete the game to earn promotional codes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F2631F]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#F2631F] font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 font-['Work_Sans']">Use Your Code</h3>
              <p className="text-sm text-gray-600 font-['Work_Sans']">
                Apply the code during checkout for instant savings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games; 