import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

export interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  image,
  price,
  quantity,
  onRemove,
  onUpdateQuantity
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <button 
        onClick={() => onRemove(id)}
        className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
      >
        <X size={18} />
      </button>
      
      <div className="flex items-center ml-4 flex-1">
        <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          <img src={image} alt={name} className="object-cover h-full w-full" />
        </div>
        <div className="ml-4 w-48">
          <p className="text-sm text-gray-600 line-clamp-2">{name}</p>
        </div>
      </div>
      
      <div className="text-gray-700 w-24 text-center">${price.toFixed(2)}</div>
      
      <div className="w-32 flex justify-center">
        <div className="flex items-center border border-gray-300 rounded">
          <button 
            onClick={handleDecrement}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 text-center focus:outline-none text-sm"
          />
          <button 
            onClick={handleIncrement}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-gray-700 w-24 text-right font-medium">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;