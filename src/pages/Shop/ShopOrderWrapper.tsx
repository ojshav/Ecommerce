import React from 'react';
import ShopOrder from './ShopOrder';

// Wrapper components for individual shop orders
export const Shop1Order: React.FC = () => <ShopOrder shopId={1} shopName="Shop 1" />;
export const Shop2Order: React.FC = () => <ShopOrder shopId={2} shopName="Shop 2" />;
export const Shop3Order: React.FC = () => <ShopOrder shopId={3} shopName="Shop 3" />;
export const Shop4Order: React.FC = () => <ShopOrder shopId={4} shopName="Shop 4" />;
