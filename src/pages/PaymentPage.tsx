import React, { useState, useEffect } from 'react';
import OrderSummary from '../components/OrderSummary';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { MapPin, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Country phone codes
const COUNTRY_CODES = [
  { code: 'US', name: 'United States', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
  { code: 'CA', name: 'Canada', phoneCode: '+1' },
  { code: 'AU', name: 'Australia', phoneCode: '+61' },
  { code: 'DE', name: 'Germany', phoneCode: '+49' },
  { code: 'FR', name: 'France', phoneCode: '+33' },
  { code: 'IT', name: 'Italy', phoneCode: '+39' },
  { code: 'ES', name: 'Spain', phoneCode: '+34' },
  { code: 'JP', name: 'Japan', phoneCode: '+81' },
  { code: 'CN', name: 'China', phoneCode: '+86' },
  { code: 'RU', name: 'Russia', phoneCode: '+7' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55' },
  { code: 'ZA', name: 'South Africa', phoneCode: '+27' },
  { code: 'MX', name: 'Mexico', phoneCode: '+52' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65' },
  { code: 'AE', name: 'UAE', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
  { code: 'NZ', name: 'New Zealand', phoneCode: '+64' },
  { code: 'SE', name: 'Sweden', phoneCode: '+46' },
  { code: 'IN', name: 'India', phoneCode: '+91' },
];

interface Address {
  address_id: number;
  contact_name: string;
  contact_phone: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_type: 'shipping' | 'billing';
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

const PaymentPage: React.FC = () => {
  const { user } = useAuth();
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deliveryToAnother, setDeliveryToAnother] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [postalCodeError, setPostalCodeError] = useState<string>('');
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_phone: '',
    address_line1: '',
    address_line2: '',
    landmark: '',
    city: '',
    state_province: '',
    postal_code: '',
    country_code: 'US',
    address_type: 'shipping' as 'shipping' | 'billing',
    is_default_shipping: true,
    is_default_billing: false
  });
  const navigate = useNavigate();

  const validatePostalCode = (postalCode: string, countryCode: string): boolean => {
    // Basic validation patterns for common countries
    const patterns: { [key: string]: RegExp } = {
      'IN': /^\d{6}$/, // India: 6 digits
      'US': /^\d{5}(-\d{4})?$/, // US: 5 digits or 5+4 digits
      'GB': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, // UK: Various formats
      'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // Canada: A1A 1A1
      'AU': /^\d{4}$/, // Australia: 4 digits
    };

    const pattern = patterns[countryCode];
    if (!pattern) return true; // If no pattern exists for country, accept any format

    return pattern.test(postalCode);
  };

  const handleCountrySelect = (country: typeof COUNTRY_CODES[0]) => {
    setSelectedCountry(country);
    setShowCountryCodes(false);
    setFormData(prev => ({
      ...prev,
      country_code: country.code
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear postal code error when user starts typing again
    if (name === 'postal_code') {
      setPostalCodeError('');
    }
  };

  const handlePostalCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !validatePostalCode(value, formData.country_code)) {
      setPostalCodeError(`Invalid postal code format for ${selectedCountry.name}`);
    } else {
      setPostalCodeError('');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log('No token found, skipping address fetch');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/user-address?user_id=${user?.id}`;
      console.log('Fetching addresses from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch addresses: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Addresses data:', data);
      setAddresses(data.addresses);
      
      // If there are addresses, select the default shipping address
      const defaultAddress = data.addresses.find((addr: Address) => addr.is_default_shipping);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.address_id);
        setFormData({
          contact_name: defaultAddress.contact_name,
          contact_phone: defaultAddress.contact_phone,
          address_line1: defaultAddress.address_line1,
          address_line2: defaultAddress.address_line2 || '',
          landmark: defaultAddress.landmark || '',
          city: defaultAddress.city,
          state_province: defaultAddress.state_province,
          postal_code: defaultAddress.postal_code,
          country_code: defaultAddress.country_code,
          address_type: defaultAddress.address_type,
          is_default_shipping: defaultAddress.is_default_shipping,
          is_default_billing: defaultAddress.is_default_billing
        });
      }
    } catch (error) {
      console.error('Error in fetchAddresses:', error);
      toast.error('Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address.address_id);
    setFormData({
      contact_name: address.contact_name,
      contact_phone: address.contact_phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || '',
      landmark: address.landmark || '',
      city: address.city,
      state_province: address.state_province,
      postal_code: address.postal_code,
      country_code: address.country_code,
      address_type: address.address_type,
      is_default_shipping: address.is_default_shipping,
      is_default_billing: address.is_default_billing
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log('No token found, cannot save address');
        toast.error('Please login to continue');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const requestBody = {
        ...formData,
        user_id: user?.id
      };

      let url: string;
      let method: string;

      if (selectedAddressId) {
        // Update existing address
        url = `${baseUrl}/api/user-address/${selectedAddressId}`;
        method = 'PUT';
      } else {
        // Create new address
        url = `${baseUrl}/api/user-address`;
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to ${selectedAddressId ? 'update' : 'save'} address: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Save address response:', data);
      toast.success(`Address ${selectedAddressId ? 'updated' : 'saved'} successfully`);
      
      // Update addresses list with the new/updated address
      setAddresses(prev => {
        const existingIndex = prev.findIndex(addr => addr.address_id === data.address.address_id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = data.address;
          return updated;
        }
        return [...prev, data.address];
      });
      
      // Set the newly saved/updated address as selected
      setSelectedAddressId(data.address.address_id);

      // Only clear form if it's a new address
      if (!selectedAddressId) {
        setFormData({
          contact_name: '',
          contact_phone: '',
          address_line1: '',
          address_line2: '',
          landmark: '',
          city: '',
          state_province: '',
          postal_code: '',
          country_code: 'US',
          address_type: 'shipping',
          is_default_shipping: true,
          is_default_billing: false
        });
        setSelectedCountry(COUNTRY_CODES[0]);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error(`Failed to ${selectedAddressId ? 'update' : 'save'} address`);
    }
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      if (!selectedAddressId) {
        toast.error('Please select a shipping address');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/orders`;

      // Calculate subtotal from cart items
      const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      const orderData = {
        shipping_address_id: selectedAddressId,
        payment_method: paymentMethod,
        items: cart.map(item => {
          console.log('Cart Item Debug:', {
            product_id: item.product_id,
            merchant_id: item.merchant_id,
            product_name: item.product.name,
            product_details: item.product
          });
          
          return {
            product_id: item.product_id,
            merchant_id: item.merchant_id,
            product_name_at_purchase: item.product.name,
            sku_at_purchase: item.product.sku || '',
            quantity: item.quantity,
            unit_price_at_purchase: item.product.price,
            item_subtotal_amount: item.product.price * item.quantity,
            final_price_for_item: item.product.price * item.quantity
          };
        }),
        subtotal_amount: subtotal,
        discount_amount: 0,
        tax_amount: 0,
        shipping_amount: 0,
        total_amount: totalPrice,
        currency: selectedCountry.code,
        customer_notes: '',
        shipping_method_name: 'Standard Shipping'
      };

      console.log('Final Order Data:', orderData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Order creation error response:', errorText);
        throw new Error(`Failed to create order: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      if (data.status === 'success') {
        // Clear the cart after successful order
        await clearCart();
        toast.success('Order placed successfully');
        // Redirect to order confirmation page
        navigate('/order-confirmation', { state: { orderId: data.order_id } });
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
      
    } catch (error) {
      console.error('Error in handleOrder:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to place order');
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/user-address/${addressId}?user_id=${user?.id}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete address: ${response.status} ${errorText}`);
      }

      // Remove the deleted address from the list
      setAddresses(prev => prev.filter(addr => addr.address_id !== addressId));
      toast.success('Address deleted successfully');

      // If the deleted address was selected, clear the form
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        setFormData({
          contact_name: '',
          contact_phone: '',
          address_line1: '',
          address_line2: '',
          landmark: '',
          city: '',
          state_province: '',
          postal_code: '',
          country_code: 'US',
          address_type: 'shipping',
          is_default_shipping: true,
          is_default_billing: false
        });
      }
    } catch (error) {
      console.error('Error in handleDeleteAddress:', error);
      toast.error('Failed to delete address');
    }
  };

  const handleEditAddress = async (addressId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/user-address/${addressId}?user_id=${user?.id}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch address: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const address = data.address;
      
      // Update form with address data
      setFormData({
        contact_name: address.contact_name,
        contact_phone: address.contact_phone,
        address_line1: address.address_line1,
        address_line2: address.address_line2 || '',
        landmark: address.landmark || '',
        city: address.city,
        state_province: address.state_province,
        postal_code: address.postal_code,
        country_code: address.country_code,
        address_type: address.address_type,
        is_default_shipping: address.is_default_shipping,
        is_default_billing: address.is_default_billing
      });

      // Set the country code
      const country = COUNTRY_CODES.find(c => c.code === address.country_code);
      if (country) {
        setSelectedCountry(country);
      }

      setSelectedAddressId(addressId);
      toast.success('Address loaded for editing');
    } catch (error) {
      console.error('Error in handleEditAddress:', error);
      toast.error('Failed to load address for editing');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Payment Information */}
      <div className="flex-1 bg-white rounded-lg p-8">
        <h2 className="text-lg font-semibold mb-6">Payment Information</h2>
        
        {/* Saved Addresses */}
        {addresses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Saved Addresses</h3>
            <div className="grid grid-cols-1 gap-3">
              {addresses.map((address) => (
                <div
                  key={address.address_id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAddressId === address.address_id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{address.contact_name}</p>
                        <p className="text-sm text-gray-600">{address.contact_phone}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.address_line1}
                          {address.address_line2 && `, ${address.address_line2}`}
                          {address.landmark && `, ${address.landmark}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state_province} {address.postal_code}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {address.is_default_shipping && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Default Shipping
                            </span>
                          )}
                          {address.is_default_billing && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Default Billing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAddress(address.address_id);
                        }}
                        className="p-1 text-gray-500 hover:text-orange-500"
                        title="Edit address"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this address?')) {
                            handleDeleteAddress(address.address_id);
                          }
                        }}
                        className="p-1 text-gray-500 hover:text-red-500"
                        title="Delete address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Type full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryCodes(!showCountryCodes)}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {selectedCountry.phoneCode}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showCountryCodes && (
                    <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100"
                        >
                          {country.name} ({country.phoneCode})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State/Province</label>
              <input
                type="text"
                name="state_province"
                value={formData.state_province}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                onBlur={handlePostalCodeBlur}
                className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  postalCodeError 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                }`}
                placeholder={`Enter postal code for ${selectedCountry.name}`}
                required
              />
              {postalCodeError && (
                <p className="mt-1 text-sm text-red-500">{postalCodeError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country_code"
                value={formData.country_code}
                onChange={(e) => {
                  const country = COUNTRY_CODES.find(c => c.code === e.target.value);
                  if (country) {
                    setSelectedCountry(country);
                    setFormData(prev => ({
                      ...prev,
                      country_code: country.code
                    }));
                  }
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ex: ABC Building, 1890 NY"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ex: Near City Park"
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input
              id="deliveryToAnother"
              type="checkbox"
              checked={deliveryToAnother}
              onChange={() => setDeliveryToAnother(!deliveryToAnother)}
              className="mr-2 accent-orange-500"
            />
            <label htmlFor="deliveryToAnother" className="text-sm font-medium">
              Delivery to another address?
            </label>
          </div>

          {deliveryToAnother && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium mb-4">Alternative Delivery Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Repeat the same address fields for alternative address */}
                {/* You can create a separate form state for this */}
              </div>
            </div>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Note about your orders"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 transition-colors"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[400px] bg-white rounded-lg p-8 h-fit">
        <h2 className="text-lg font-semibold mb-6">Your Order</h2>
        <OrderSummary 
          className="sticky top-8" 
          selectedCountry={selectedCountry}
        />
        <div className="mb-6">
          <div className="font-medium mb-2">Payment Method</div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="accent-orange-500"
              />
              Credit Card
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="debit_card"
                checked={paymentMethod === 'debit_card'}
                onChange={() => setPaymentMethod('debit_card')}
                className="accent-orange-500"
              />
              Debit Card
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={paymentMethod === 'cash_on_delivery'}
                onChange={() => setPaymentMethod('cash_on_delivery')}
                className="accent-orange-500"
              />
              Cash on Delivery
            </label>
          </div>
        </div>
        <button
          onClick={handleOrder}
          disabled={!selectedAddressId}
          className={`w-full py-3 rounded font-medium transition-colors ${
            selectedAddressId 
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage; 