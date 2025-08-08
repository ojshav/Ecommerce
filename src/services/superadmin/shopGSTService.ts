const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { 
  ShopGSTRule, 
  BasicShop, 
  BasicShopCategory, 
  ShopGSTRuleFormData,
  ProductPriceConditionType 
} from "../../types/shopGST";

const SHOP_GST_ENDPOINT = `${API_BASE_URL}/api/superadmin/shop-gst-rules`;
const SHOPS_ENDPOINT = `${API_BASE_URL}/api/superadmin/shop-gst/shops`;
const SHOP_CATEGORIES_ENDPOINT = `${API_BASE_URL}/api/superadmin/shop-gst/shops`;

// Helper function to get auth headers
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

// Shop GST Rules
export const fetchShopGSTRules = async (shopId?: number): Promise<ShopGSTRule[]> => {
  const url = shopId ? `${SHOP_GST_ENDPOINT}?shop_id=${shopId}` : SHOP_GST_ENDPOINT;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch shop GST rules");
  }
  
  return response.json();
};

export const fetchShopGSTRuleById = async (ruleId: number): Promise<ShopGSTRule> => {
  const response = await fetch(`${SHOP_GST_ENDPOINT}/${ruleId}`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch shop GST rule ${ruleId}`);
  }
  
  return response.json();
};

export const createShopGSTRule = async (data: ShopGSTRuleFormData): Promise<ShopGSTRule> => {
  // Ensure numeric fields are numbers
  const payload = {
    ...data,
    shop_id: Number(data.shop_id),
    category_id: Number(data.category_id),
    gst_rate_percentage: Number(data.gst_rate_percentage),
    price_condition_value: data.price_condition_value
      ? Number(data.price_condition_value)
      : null,
    // Handle date fields - send null if empty string or null
    start_date: data.start_date && data.start_date.trim() !== '' ? data.start_date : null,
    end_date: data.end_date && data.end_date.trim() !== '' ? data.end_date : null,
  };
  
  const response = await fetch(SHOP_GST_ENDPOINT, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create shop GST rule");
  }
  
  return response.json();
};

export const updateShopGSTRule = async (
  ruleId: number,
  data: Partial<ShopGSTRuleFormData>
): Promise<ShopGSTRule> => {
  // Ensure numeric fields are numbers if they exist
  const payload: any = { ...data };
  if (payload.shop_id !== undefined) payload.shop_id = Number(payload.shop_id);
  if (payload.category_id !== undefined) payload.category_id = Number(payload.category_id);
  if (payload.gst_rate_percentage !== undefined) {
    payload.gst_rate_percentage = Number(payload.gst_rate_percentage);
  }
  if (payload.price_condition_value !== undefined) {
    payload.price_condition_value = payload.price_condition_value
      ? Number(payload.price_condition_value)
      : null;
  }
  // Handle date fields - send null if empty string or null
  if (payload.start_date !== undefined) {
    payload.start_date = payload.start_date && payload.start_date.trim() !== '' ? payload.start_date : null;
  }
  if (payload.end_date !== undefined) {
    payload.end_date = payload.end_date && payload.end_date.trim() !== '' ? payload.end_date : null;
  }
  
  const response = await fetch(`${SHOP_GST_ENDPOINT}/${ruleId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to update shop GST rule ${ruleId}`);
  }
  
  return response.json();
};

export const deleteShopGSTRule = async (ruleId: number): Promise<void> => {
  const response = await fetch(`${SHOP_GST_ENDPOINT}/${ruleId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to delete shop GST rule ${ruleId}`);
  }
};

// Shops
export const fetchShopsForGST = async (): Promise<BasicShop[]> => {
  const response = await fetch(SHOPS_ENDPOINT, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch shops");
  }
  
  return response.json();
};

// Shop Categories
export const fetchShopCategoriesForGST = async (shopId: number): Promise<BasicShopCategory[]> => {
  const response = await fetch(`${SHOP_CATEGORIES_ENDPOINT}/${shopId}/categories`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch categories for shop ${shopId}`);
  }
  
  return response.json();
};

// Helper functions for form validation
export const validateShopGSTRuleData = (data: ShopGSTRuleFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) {
    errors.push("Rule name is required");
  }
  
  if (!data.shop_id) {
    errors.push("Shop selection is required");
  }
  
  if (!data.category_id) {
    errors.push("Category selection is required");
  }
  
  if (!data.gst_rate_percentage || Number(data.gst_rate_percentage) < 0 || Number(data.gst_rate_percentage) > 100) {
    errors.push("GST rate percentage must be between 0 and 100");
  }
  
  if (data.price_condition_type !== ProductPriceConditionType.ANY && !data.price_condition_value) {
    errors.push("Price condition value is required when condition type is not 'ANY'");
  }
  
  if (data.price_condition_value && Number(data.price_condition_value) < 0) {
    errors.push("Price condition value must be non-negative");
  }
  
  if (data.start_date && data.end_date && new Date(data.start_date) > new Date(data.end_date)) {
    errors.push("Start date must be before end date");
  }
  
  return errors;
};

// Price condition options for forms
export const PRICE_CONDITION_OPTIONS = [
  { value: ProductPriceConditionType.ANY, label: "Any Price" },
  { value: ProductPriceConditionType.LESS_THAN, label: "Less Than" },
  { value: ProductPriceConditionType.LESS_THAN_OR_EQUAL_TO, label: "Less Than or Equal To" },
  { value: ProductPriceConditionType.GREATER_THAN, label: "Greater Than" },
  { value: ProductPriceConditionType.GREATER_THAN_OR_EQUAL_TO, label: "Greater Than or Equal To" },
  { value: ProductPriceConditionType.EQUAL_TO, label: "Equal To" },
];

export default {
  fetchShopGSTRules,
  fetchShopGSTRuleById,
  createShopGSTRule,
  updateShopGSTRule,
  deleteShopGSTRule,
  fetchShopsForGST,
  fetchShopCategoriesForGST,
  validateShopGSTRuleData,
  PRICE_CONDITION_OPTIONS,
};
