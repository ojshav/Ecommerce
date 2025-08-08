import React from 'react';
import Shopcart from './shopcart';

interface ShopCartWrapperProps {
  shopId: number;
}

const ShopCartWrapper: React.FC<ShopCartWrapperProps> = ({ shopId }) => {
  return <Shopcart key={shopId} />;
};

// Individual shop cart components
export const Shop1Cart: React.FC = () => <ShopCartWrapper shopId={1} />;
export const Shop2Cart: React.FC = () => <ShopCartWrapper shopId={2} />;
export const Shop3Cart: React.FC = () => <ShopCartWrapper shopId={3} />;
export const Shop4Cart: React.FC = () => <ShopCartWrapper shopId={4} />;
