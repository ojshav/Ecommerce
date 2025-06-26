import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

interface MemoryGameProps {
  onWin: (promoCode: PromoCode) => void;
  onBack: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onWin, onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const emojis = ['🎁', '🎯', '⭐', '🎪', '🎨', '🎭', '🎪', '🎨'];
  const prizes = [
    { discount: 5, code: 'MEMORY5', description: '5% off on your next purchase' },
    { discount: 10, code: 'MEMORY10', description: '10% off on your next purchase' },
    { discount: 15, code: 'MEMORY15', description: '15% off on your next purchase' },
    { discount: 20, code: 'MEMORY20', description: '20% off on your next purchase' },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    shuffledEmojis.forEach((emoji, index) => {
      gameCards.push({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameWon(false);
    setCanFlip(true);
  };

  const handleCardClick = (cardId: number) => {
    if (!canFlip || cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      setMoves(prev => prev + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        setCanFlip(true);

        // Check if game is won
        if (matchedPairs + 1 === emojis.length) {
          setTimeout(() => {
            setGameWon(true);
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            onWin(randomPrize);
          }, 500);
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
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
          <h1 className="text-2xl font-bold text-gray-800">Memory Match</h1>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-blue-100 rounded-lg px-4 py-2">
            <div className="text-blue-800 font-semibold">Moves: {moves}</div>
          </div>
          <div className="bg-green-100 rounded-lg px-4 py-2">
            <div className="text-green-800 font-semibold">Pairs: {matchedPairs}/{emojis.length}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'rotate-y-180 bg-white border-2 border-gray-300'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105'
              } ${!canFlip && !card.isFlipped && !card.isMatched ? 'pointer-events-none' : ''}`}
            >
              <div className="w-full h-full flex items-center justify-center text-3xl">
                {(card.isFlipped || card.isMatched) ? card.emoji : '❓'}
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
                  You've completed the memory game! Check your rewards above.
                </div>
              </div>
              <button
                onClick={initializeGame}
                className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                Play Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-100 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-blue-800 font-semibold mb-2">
                  🎯 How to Play:
                </div>
                <div className="text-blue-700 text-sm">
                  Find all matching pairs to win! Complete the game to earn a promotional code.
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
            <li>• Click cards to flip them</li>
            <li>• Find matching pairs of emojis</li>
            <li>• Complete all pairs to win</li>
            <li>• Win promotional codes from 5% to 20% off</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame; 