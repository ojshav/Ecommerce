import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

interface LuckyDrawProps {
  onWin: (promoCode: PromoCode) => void;
  onBack: () => void;
}

interface Card {
  id: number;
  isRevealed: boolean;
  isWinning: boolean;
  prize?: PromoCode;
}

const LuckyDraw: React.FC<LuckyDrawProps> = ({ onWin, onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [canSelect, setCanSelect] = useState(true);

  const prizes = [
    { discount: 5, code: 'LUCKY5', description: '5% off on your next purchase' },
    { discount: 10, code: 'LUCKY10', description: '10% off on your next purchase' },
    { discount: 15, code: 'LUCKY15', description: '15% off on your next purchase' },
    { discount: 20, code: 'LUCKY20', description: '20% off on your next purchase' },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    const winningCardIndex = Math.floor(Math.random() * 9);
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

    for (let i = 0; i < 9; i++) {
      gameCards.push({
        id: i,
        isRevealed: false,
        isWinning: i === winningCardIndex,
        prize: i === winningCardIndex ? randomPrize : undefined
      });
    }

    setCards(gameCards);
    setSelectedCard(null);
    setGameWon(false);
    setCanSelect(true);
  };

  const handleCardClick = (cardId: number) => {
    if (!canSelect || cards[cardId].isRevealed) return;

    setSelectedCard(cardId);
    setCanSelect(false);

    const newCards = [...cards];
    newCards[cardId].isRevealed = true;
    setCards(newCards);

    setTimeout(() => {
      if (newCards[cardId].isWinning) {
        setGameWon(true);
        onWin(newCards[cardId].prize!);
      }
    }, 1000);
  };

  const revealAllCards = () => {
    const newCards = cards.map(card => ({
      ...card,
      isRevealed: true
    }));
    setCards(newCards);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Lucky Draw</h1>
        </div>

        {/* Game Description */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
            <div className="text-2xl font-bold text-green-800 mb-2">🎯 Pick Your Lucky Card</div>
            <div className="text-green-700">
              Choose one of the nine cards below. One contains an amazing discount!
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl cursor-pointer transition-all duration-500 transform ${
                card.isRevealed
                  ? card.isWinning
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 scale-110'
                    : 'bg-gradient-to-br from-red-400 to-pink-500'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105'
              } ${!canSelect && !card.isRevealed ? 'pointer-events-none' : ''}`}
            >
              <div className="w-full h-full flex items-center justify-center text-4xl">
                {card.isRevealed ? (
                  card.isWinning ? (
                    <div className="text-center text-white">
                      <div className="text-2xl mb-1">🎉</div>
                      <div className="text-sm font-bold">{card.prize?.discount}% OFF</div>
                    </div>
                  ) : (
                    <div className="text-white text-2xl">❌</div>
                  )
                ) : (
                  <div className="text-white text-3xl">?</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          {gameWon ? (
            <div className="space-y-4">
              <div className="bg-green-100 border-2 border-green-200 rounded-lg p-4">
                <div className="text-green-800 font-bold text-lg mb-2">
                  🎉 Congratulations!
                </div>
                <div className="text-green-700">
                  You found the winning card! Check your rewards above.
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={revealAllCards}
                  className="flex-1 py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
                >
                  Show All Cards
                </button>
                <button
                  onClick={initializeGame}
                  className="flex-1 py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 inline mr-2" />
                  Play Again
                </button>
              </div>
            </div>
          ) : selectedCard !== null && !cards[selectedCard]?.isWinning ? (
            <div className="space-y-4">
              <div className="bg-red-100 border-2 border-red-200 rounded-lg p-4">
                <div className="text-red-800 font-bold text-lg mb-2">
                  😔 Not this time!
                </div>
                <div className="text-red-700">
                  Try again to find the winning card!
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={revealAllCards}
                  className="flex-1 py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
                >
                  Show All Cards
                </button>
                <button
                  onClick={initializeGame}
                  className="flex-1 py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 inline mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-100 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-blue-800 font-semibold mb-2">
                  🎯 How to Play:
                </div>
                <div className="text-blue-700 text-sm">
                  Click on any card to reveal it. Find the winning card to earn a promotional code!
                </div>
              </div>
              <button
                onClick={initializeGame}
                className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                New Game
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-2">Game Rules:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click any card to reveal it</li>
            <li>• Only one card contains a prize</li>
            <li>• Find the winning card to get a discount</li>
            <li>• Prizes range from 5% to 20% off</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LuckyDraw; 