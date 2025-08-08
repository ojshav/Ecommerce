export enum ProductPriceConditionType {
  LESS_THAN = "less_than",
  LESS_THAN_OR_EQUAL_TO = "less_than_or_equal_to", 
  GREATER_THAN = "greater_than",
  GREATER_THAN_OR_EQUAL_TO = "greater_than_or_equal_to",
  EQUAL_TO = "equal_to",
  ANY = "any",
}

export interface ShopGSTRule {
  id: number;
  name: string;
  shop_id: number;
  shop_name?: string;
  category_id: number;
  category_name?: string;
  price_condition_type: ProductPriceConditionType;
  price_condition_value?: string | number | null;
  gst_rate_percentage: string | number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// Shop interface for dropdown
export interface BasicShop {
  shop_id: number;
  name: string;
}

// Category interface for dropdown
export interface BasicShopCategory {
  category_id: number;
  name: string;
  parent_id?: number | null;
}

// API response interfaces
export interface ShopGSTRuleResponse {
  success: boolean;
  message: string;
  data: ShopGSTRule | ShopGSTRule[];
}

export interface ShopGSTRulesListResponse {
  success: boolean;
  message: string;
  data: ShopGSTRule[];
}

export interface ShopsListResponse {
  success: boolean;
  message: string;
  data: BasicShop[];
}

export interface ShopCategoriesResponse {
  success: boolean;
  message: string;
  data: BasicShopCategory[];
}

// Form data interface
export interface ShopGSTRuleFormData {
  name: string;
  shop_id: number | string;
  category_id: number | string;
  price_condition_type: ProductPriceConditionType;
  price_condition_value?: string | number | null;
  gst_rate_percentage: string | number;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
}
