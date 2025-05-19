import React, { useState, useEffect } from 'react';
import CartItem, { CartItemProps } from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useNavigate } from 'react-router-dom';

// Placeholder data - in a real app this would come from an API or state management
const initialCartItems: Omit<CartItemProps, 'onRemove' | 'onUpdateQuantity'>[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 129.99,
    quantity: 2,
  },
  {
    id: '2',
    name: 'Smartphone Charging Dock',
    image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 39.99,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Speaker',
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 89.99,
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(5.00);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Calculate totals whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + shipping);
  }, [cartItems, shipping]);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const handleApplyPromo = (code: string) => {
    alert(`Promo code "${code}" applied!`);
    // In a real app, this would validate and apply the promo code
  };

  const handleContinueShopping = () => {
    alert('Continuing shopping!');
    // In a real app, this would navigate back to products page
  };

  const handleUpdateCart = () => {
    alert('Cart updated!');
    // In a real app, this might sync with backend or perform other updates
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button 
            onClick={handleContinueShopping}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg p-6">
              {/* Cart header */}
              <div className="hidden lg:flex text-sm text-gray-500 mb-2">
                <div className="w-8"></div>
                <div className="flex-1 ml-4">
                  <span className="ml-20">Product</span>
                </div>
                <div className="w-24 text-center">Price</div>
                <div className="w-32 text-center">Qty</div>
                <div className="w-24 text-right">Sub Total</div>
              </div>
              
              {/* Cart items */}
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  {...item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
              
              {/* Cart actions */}
              <div className="flex flex-col sm:flex-row mt-6 gap-4">
                <button 
                  onClick={handleContinueShopping}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors sm:w-auto w-full"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={handleUpdateCart}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors sm:w-auto w-full"
                >
                  Update Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Cart summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
              onApplyPromo={handleApplyPromo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;