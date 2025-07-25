import React from 'react';
import { Shop, ShopCategory, ShopProduct } from '../../../../services/shopManagementService';
import MultiStepProductForm from './MultiStepProductForm';

interface EditProductsProps {
  selectedShop: Shop;
  selectedCategory: ShopCategory;
  editingProduct: ShopProduct;
  onComplete: () => void;
  onCancel: () => void;
}

const EditProducts: React.FC<EditProductsProps> = ({
  selectedShop,
  selectedCategory,
  editingProduct,
  onComplete,
  onCancel
}) => {
  return (
    <MultiStepProductForm
      selectedShop={selectedShop}
      selectedCategory={selectedCategory}
      editingProduct={editingProduct}
      onComplete={onComplete}
      onCancel={onCancel}
    />
  );
};

export default EditProducts; 