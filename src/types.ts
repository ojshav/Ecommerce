export interface CartItem {
  cart_item_id: number;
  product_id: number;
  merchant_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    stock: number;
    is_deleted: boolean;
    sku?: string;
  };
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  stock: number;
  is_deleted: boolean;
  sku?: string;
} 