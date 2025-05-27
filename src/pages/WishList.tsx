import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';

interface WishlistProduct extends Product {
  salePercentage?: number;
  isNew?: boolean;
}

const WishList: React.FC = () => {
  const wishlistItems: WishlistProduct[] = [
    {
      id: '1',
      name: 'CIC2 Skin Decode Kit',
      price: 690.38,
      originalPrice: 759.24,
      image: '/products/skin-decode-kit.jpg',
      sku: 'SKN-001',
      stock: 10,
      primary_image: '/products/skin-decode-kit.jpg',
      isNew: true,
      description: 'Advanced skin care kit for all skin types',
      currency: 'USD',
      category: 'Skincare',
      rating: 4.5,
      reviews: 24
    },
    {
      id: '2',
      name: 'Angel Whitening Treatment Lotion',
      price: 132.90,
      originalPrice: 259.24,
      image: '/products/whitening-lotion.jpg',
      sku: 'SKN-002',
      stock: 15,
      primary_image: '/products/whitening-lotion.jpg',
      salePercentage: 48,
      description: 'Whitening treatment lotion for radiant skin',
      currency: 'USD',
      category: 'Skincare',
      rating: 4.8,
      reviews: 36
    },
    {
      id: '3',
      name: 'Sunscreen moisturizing intensify',
      price: 69.04,
      image: '/products/sunscreen.jpg',
      sku: 'SKN-003',
      stock: 0,
      primary_image: '/products/sunscreen.jpg',
      description: 'Intensive moisturizing sunscreen for daily protection',
      currency: 'USD',
      category: 'Suncare',
      rating: 4.2,
      reviews: 18
    },
    {
      id: '4',
      name: 'Anti-allergy serum',
      price: 132.90,
      image: '/products/anti-allergy.jpg',
      sku: 'SKN-004',
      stock: 5,
      primary_image: '/products/anti-allergy.jpg',
      description: 'Gentle serum for sensitive and allergy-prone skin',
      currency: 'USD',
      category: 'Skincare',
      rating: 4.6,
      reviews: 42
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-base font-medium">My Wishlist</h1>
        <span className="text-gray-500 text-sm">({wishlistItems.length} Items)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            isNew={item.isNew}
            salePercentage={item.salePercentage}
          />
        ))}
      </div>
    </div>
  );
};

export default WishList; 