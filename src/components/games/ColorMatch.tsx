import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Timer } from 'lucide-react';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

interface ColorMatchProps {
  onWin: (promoCode: PromoCode) => void;
  onBack: () => void;
}

interface ColorTile {
  id: number;
  color: string;
  isMatched: boolean;
  isFlipped: boolean;
}

const ColorMatch: React.FC<ColorMatchProps> = ({ onWin, onBack }) => {
  const [tiles, setTiles] = useState<ColorTile[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
  const prizes = [
    { discount: 5, code: 'COLOR5', description: '5% off on your next purchase' },
    { discount: 10, code: 'COLOR10', description: '10% off on your next purchase' },
    { discount: 15, code: 'COLOR15', description: '15% off on your next purchase' },
    { discount: 20, code: 'COLOR20', description: '20% off on your next purchase' },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  const initializeGame = () => {
    const gameTiles: ColorTile[] = [];
    const shuffledColors = [...colors, ...colors].sort(() => Math.random() - 0.5);
    
    shuffledColors.forEach((color, index) => {
      gameTiles.push({
        id: index,
        color,
        isMatched: false,
        isFlipped: false
      });
    });

    setTiles(gameTiles);
    setFlippedTiles([]);
    setScore(0);
    setTimeLeft(60);
    setGameActive(false);
    setGameWon(false);
    setCanFlip(true);
  };

  const startGame = () => {
    setGameActive(true);
  };

  const endGame = () => {
    setGameActive(false);
    if (score >= 6) {
      setGameWon(true);
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      onWin(randomPrize);
    }
  };

  const handleTileClick = (tileId: number) => {
    if (!canFlip || !gameActive || tiles[tileId].isFlipped || tiles[tileId].isMatched) return;

    const newTiles = [...tiles];
    newTiles[tileId].isFlipped = true;
    setTiles(newTiles);

    const newFlippedTiles = [...flippedTiles, tileId];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      setCanFlip(false);
      setScore(prev => prev + 1);

      const [firstId, secondId] = newFlippedTiles;
      const firstTile = newTiles[firstId];
      const secondTile = newTiles[secondId];

      if (firstTile.color === secondTile.color) {
        // Match found
        newTiles[firstId].isMatched = true;
        newTiles[secondId].isMatched = true;
        setTiles(newTiles);
        setFlippedTiles([]);
        setCanFlip(true);

        // Check if all pairs are matched
        const matchedCount = newTiles.filter(tile => tile.isMatched).length;
        if (matchedCount === colors.length * 2) {
          setTimeout(() => {
            endGame();
          }, 500);
        }
      } else {
        // No match
        setTimeout(() => {
          newTiles[firstId].isFlipped = false;
          newTiles[secondId].isFlipped = false;
          setTiles(newTiles);
          setFlippedTiles([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <h1 className="text-2xl font-bold text-gray-800">Color Rush</h1>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-blue-100 rounded-lg px-4 py-2">
            <div className="text-blue-800 font-semibold">Score: {score}</div>
          </div>
          <div className="bg-red-100 rounded-lg px-4 py-2">
            <div className="text-red-800 font-semibold flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => handleTileClick(tile.id)}
              className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 transform ${
                tile.isFlipped || tile.isMatched
                  ? 'scale-100'
                  : 'hover:scale-105'
              } ${!canFlip && !tile.isFlipped && !tile.isMatched ? 'pointer-events-none' : ''}`}
              style={{
                backgroundColor: tile.isFlipped || tile.isMatched ? tile.color : '#e5e7eb'
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                {tile.isFlipped || tile.isMatched ? (
                  <div className="text-white text-2xl">✓</div>
                ) : (
                  <div className="text-gray-400 text-2xl">?</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="text-center space-y-4">
          {!gameActive && !gameWon ? (
            <div className="space-y-4">
              <div className="bg-blue-100 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-blue-800 font-semibold mb-2">
                  🎯 How to Play:
                </div>
                <div className="text-blue-700 text-sm">
                  Match color pairs quickly! You have 60 seconds to find all matches.
                </div>
              </div>
              <button
                onClick={startGame}
                className="w-full py-3 px-6 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
              >
                Start Game
              </button>
            </div>
          ) : gameWon ? (
            <div className="space-y-4">
              <div className="bg-green-100 border-2 border-green-200 rounded-lg p-4">
                <div className="text-green-800 font-bold text-lg mb-2">
                  🎉 Congratulations!
                </div>
                <div className="text-green-700">
                  You've completed the color matching game! Check your rewards above.
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
          ) : timeLeft === 0 ? (
            <div className="space-y-4">
              <div className="bg-red-100 border-2 border-red-200 rounded-lg p-4">
                <div className="text-red-800 font-bold text-lg mb-2">
                  ⏰ Time's Up!
                </div>
                <div className="text-red-700">
                  You scored {score} points. Try again to win a promotional code!
                </div>
              </div>
              <button
                onClick={initializeGame}
                className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                Try Again
              </button>
            </div>
          ) : (
            <div className="bg-yellow-100 border-2 border-yellow-200 rounded-lg p-4">
              <div className="text-yellow-800 font-semibold">
                🎮 Game in Progress - Match the colors quickly!
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-2">Game Rules:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click tiles to reveal colors</li>
            <li>• Match pairs of the same color</li>
            <li>• Complete all matches within 60 seconds</li>
            <li>• Win promotional codes from 5% to 20% off</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ColorMatch; 