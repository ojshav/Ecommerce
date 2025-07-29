import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-square mb-4 transition-transform duration-300 group-hover:scale-105">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>
      <h3 className="text-white text-lg font-medium text-center mb-2 group-hover:text-gray-300 transition-colors">
        {product.name}
      </h3>
      <p className="text-white text-xl font-semibold text-center">
        ${product.price}
      </p>
    </div>
  );
};

export default ProductCard;