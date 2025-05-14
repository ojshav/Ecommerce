import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md mx-auto">
          <div className="bg-primary-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={32} className="text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            <ShoppingBag size={20} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </motion.div>
    );
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cart Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-6">
                  <span className="font-medium text-gray-700">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium text-gray-700">Price</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium text-gray-700">Quantity</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-medium text-gray-700">Total</span>
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <motion.div 
                    key={item.productId}
                    className="sm:grid grid-cols-12 gap-4 p-4 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Product */}
                    <div className="col-span-6 flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/products/${item.productId}`} 
                          className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-gray-500 capitalize">{item.product.category}</div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-center text-gray-900 mb-4 sm:mb-0">
                      <div className="sm:hidden inline-block text-gray-500 mr-2">Price:</div>
                      ${item.product.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center mb-4 sm:mb-0">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button 
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total & Remove */}
                    <div className="col-span-2 flex justify-between sm:justify-end items-center">
                      <div className="font-medium text-gray-900">
                        <div className="sm:hidden inline-block text-gray-500 mr-2">Total:</div>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Back to Shopping */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Link 
                  to="/products" 
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold text-lg text-gray-900 mb-6">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <button 
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Secure checkout powered by Stripe</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;