
// Derives user_id and access token from localStorage/Auth state

export interface Address {
  address_id: number;
  contact_name: string;
  contact_phone: string;
  address_line1: string;
  address_line2?: string | null;
  landmark?: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_type: 'shipping' | 'billing';
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

type AddressType = 'shipping' | 'billing';

const getBaseUrl = () => (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

const getAuth = () => {
  const token = localStorage.getItem('access_token');
  const userStr = localStorage.getItem('user');
  if (!token || !userStr) throw new Error('Not authenticated');
  const user = JSON.parse(userStr) as { id: string | number };
  const userId = (user?.id as any) as number | string;
  if (!userId && userId !== 0) throw new Error('User not found');
  return { token, userId };
};

const jsonHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const parseAddressFromResponse = async (res: Response) => {
  const data = await res.json();
  // Normalize different shapes: {address: {...}} or {data: {...}} or {data: {address: {...}}}
  const addr = data?.address || data?.data?.address || data?.data;
  return { raw: data, address: addr as Address | undefined };
};

export const addressService = {
  async list(): Promise<Address[]> {
    const { token, userId } = getAuth();
    const url = `${getBaseUrl()}/api/user-address?user_id=${userId}`;
    const res = await fetch(url, { headers: jsonHeaders(token) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch addresses: ${res.status} ${text}`);
    }
    const data = await res.json();
    return (data?.addresses || []) as Address[];
  },

  async get(addressId: number): Promise<Address> {
    const { token, userId } = getAuth();
    const url = `${getBaseUrl()}/api/user-address/${addressId}?user_id=${userId}`;
    const res = await fetch(url, { headers: jsonHeaders(token) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch address: ${res.status} ${text}`);
    }
    const { address } = await parseAddressFromResponse(res);
    if (!address) throw new Error('Address not found in response');
    return address;
  },

  async create(payload: Partial<Address>): Promise<Address> {
    const { token, userId } = getAuth();
    const url = `${getBaseUrl()}/api/user-address`;
    const body = { ...payload, user_id: userId } as any;
    const res = await fetch(url, { method: 'POST', headers: jsonHeaders(token), body: JSON.stringify(body) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to save address: ${res.status} ${text}`);
    }
    const { address } = await parseAddressFromResponse(res);
    if (!address) throw new Error('Address not found in response');
    return address;
  },

  async update(addressId: number, payload: Partial<Address>): Promise<Address> {
    const { token, userId } = getAuth();
    const url = `${getBaseUrl()}/api/user-address/${addressId}`;
    const body = { ...payload, user_id: userId } as any;
    const res = await fetch(url, { method: 'PUT', headers: jsonHeaders(token), body: JSON.stringify(body) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update address: ${res.status} ${text}`);
    }
    const { address } = await parseAddressFromResponse(res);
    if (!address) throw new Error('Address not found in response');
    return address;
  },

  async remove(addressId: number): Promise<void> {
    const { token, userId } = getAuth();
    const url = `${getBaseUrl()}/api/user-address/${addressId}?user_id=${userId}`;
    const res = await fetch(url, { method: 'DELETE', headers: jsonHeaders(token) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to delete address: ${res.status} ${text}`);
    }
  },

  async setDefault(addressId: number, type: AddressType): Promise<void> {
    const { token, userId } = getAuth();
    const url = `${getBaseUrl()}/api/user-address/${addressId}/default/${type}`;
    const res = await fetch(url, { method: 'PUT', headers: jsonHeaders(token), body: JSON.stringify({ user_id: userId }) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to set default ${type} address: ${res.status} ${text}`);
    }
  },
};

export type { AddressType };
