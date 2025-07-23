import React, { useState } from 'react';

// Mock data
const mockShops = [
  { id: 1, name: 'Shop 1' },
  { id: 2, name: 'Shop 2' },
  { id: 3, name: 'Shop 3' },
];

type InventoryItem = {
  id: number;
  image: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  stock: number;
  available: number;
  status: string;
  lowStockThreshold: number;
};
type InventoryMap = { [shopId: number]: InventoryItem[] };

const mockInventory: InventoryMap = {
  1: [
    {
      id: 1,
      image: 'https://via.placeholder.com/40',
      name: 'Apple iPad Pro 11” (M4)',
      sku: 'APP-IPA-PRO-11-M4-95',
      category: 'Tablets',
      brand: 'APPLE',
      stock: 497,
      available: 497,
      status: 'in stock',
      lowStockThreshold: 20,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/40',
      name: 'Lenovo Smartchoice Yoga Slim 7 Intel Core Ultra 5 125H Built-in AI 14"(35.5cm) WUXGA-OLED 400Nits Laptop',
      sku: 'LEN-SMA-YOG-SLI-7-IN',
      category: 'Laptops & Computers',
      brand: 'Lenovo',
      stock: 298,
      available: 298,
      status: 'in stock',
      lowStockThreshold: 20,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/40',
      name: 'Sony WH-CH720N',
      sku: 'SON-WHC-0498',
      category: 'Audio',
      brand: 'SONY',
      stock: 496,
      available: 496,
      status: 'in stock',
      lowStockThreshold: 20,
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/40',
      name: 'Sony WH-CH720N',
      sku: 'SON-WHC-9647',
      category: 'Technology',
      brand: 'SONY',
      stock: 2,
      available: 2,
      status: 'in stock',
      lowStockThreshold: 20,
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/40',
      name: 'iPhone 16 Pro 256 GB',
      sku: 'IPH-16-PRO-256-GB-52',
      category: 'Smartphone',
      brand: 'APPLE',
      stock: 296,
      available: 296,
      status: 'in stock',
      lowStockThreshold: 20,
    },
  ],
  2: [],
  3: [],
};

const categories = ['All Categories', 'Tablets', 'Laptops & Computers', 'Audio', 'Technology', 'Smartphone'];
const brands = ['All Brands', 'APPLE', 'Lenovo', 'SONY'];
const stockStatuses = ['All Stock Status', 'in stock', 'low stock', 'out of stock'];

const ShopInventoryManagement: React.FC = () => {
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [inventory, setInventory] = useState<InventoryMap>(mockInventory);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('All Categories');
  const [brand, setBrand] = useState<string>('All Brands');
  const [stockStatus, setStockStatus] = useState<string>('All Stock Status');
  const [editModal, setEditModal] = useState<{ open: boolean; product: InventoryItem } | null>(null);

  // Filtering logic
  const filtered: InventoryItem[] = selectedShopId
    ? inventory[selectedShopId].filter((item: InventoryItem) => {
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All Categories' || item.category === category;
        const matchesBrand = brand === 'All Brands' || item.brand === brand;
        const matchesStatus =
          stockStatus === 'All Stock Status' ||
          (stockStatus === 'in stock' && item.stock > item.lowStockThreshold) ||
          (stockStatus === 'low stock' && item.stock <= item.lowStockThreshold && item.stock > 0) ||
          (stockStatus === 'out of stock' && item.stock === 0);
        return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
      })
    : [];

  // Summary cards
  const totalProducts: number = selectedShopId ? inventory[selectedShopId].length : 0;
  const lowStock: number = selectedShopId ? inventory[selectedShopId].filter((item: InventoryItem) => item.stock <= item.lowStockThreshold && item.stock > 0).length : 0;
  const outOfStock: number = selectedShopId ? inventory[selectedShopId].filter((item: InventoryItem) => item.stock === 0).length : 0;
  const totalStock: number = selectedShopId ? inventory[selectedShopId].reduce((sum: number, item: InventoryItem) => sum + item.stock, 0) : 0;

  // Edit modal handlers
  const openEditModal = (product: InventoryItem) => setEditModal({ open: true, product });
  const closeEditModal = () => setEditModal(null);
  const handleEditSave = () => {
    if (!editModal) return;
    setInventory((prev) => {
      const updated = { ...prev };
      updated[selectedShopId!] = updated[selectedShopId!].map((item: InventoryItem) =>
        item.id === editModal.product.id
          ? { ...item, stock: editModal.product.stock, lowStockThreshold: editModal.product.lowStockThreshold }
          : item
      );
      return updated;
    });
    closeEditModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      {/* Shop selector */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Shop:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedShopId ?? ''}
          onChange={(e) => setSelectedShopId(Number(e.target.value))}
        >
          <option value="" disabled>
            Choose a shop
          </option>
          {mockShops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>
      {/* Show UI only if shop is selected */}
      {selectedShopId && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
              <span className="text-orange-500 text-2xl font-bold">{totalProducts}</span>
              <span className="text-gray-600 mt-2">Total Products</span>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
              <span className="text-orange-500 text-2xl font-bold">{lowStock}</span>
              <span className="text-gray-600 mt-2">Low Stock Alerts</span>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
              <span className="text-orange-500 text-2xl font-bold">{outOfStock}</span>
              <span className="text-gray-600 mt-2">Out of Stock Items</span>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-start">
              <span className="text-orange-500 text-2xl font-bold">{totalStock}</span>
              <span className="text-gray-600 mt-2">Total Stock</span>
            </div>
          </div>
          {/* Controls */}
          <div className="flex gap-4 mb-4 items-center">
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              className="border rounded px-3 py-2 w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="border rounded px-2 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select className="border rounded px-2 py-2" value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select className="border rounded px-2 py-2" value={stockStatus} onChange={(e) => setStockStatus(e.target.value)}>
              {stockStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button className="ml-auto border px-4 py-2 rounded bg-white hover:bg-gray-100">Export</button>
            <button className="ml-2 px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600">+ Add Product</button>
          </div>
          {/* Inventory table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">IMAGE</th>
                  <th className="px-4 py-2 text-left">PRODUCT NAME</th>
                  <th className="px-4 py-2 text-left">SKU</th>
                  <th className="px-4 py-2 text-left">CATEGORY</th>
                  <th className="px-4 py-2 text-left">BRAND</th>
                  <th className="px-4 py-2 text-left">STOCK QTY</th>
                  <th className="px-4 py-2 text-left">AVAILABLE</th>
                  <th className="px-4 py-2 text-left">STATUS</th>
                  <th className="px-4 py-2 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2"><img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" /></td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.sku}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.brand}</td>
                    <td className="px-4 py-2">{item.stock}</td>
                    <td className="px-4 py-2">{item.available}</td>
                    <td className="px-4 py-2">
                      {item.stock === 0 ? (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">out of stock</span>
                      ) : item.stock <= item.lowStockThreshold ? (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">low stock</span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">in stock</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button onClick={() => openEditModal(item)} className="text-orange-500 hover:text-orange-700">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Edit Stock Modal */}
          {editModal?.open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Update Stock</h2>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Stock Quantity</label>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={editModal.product.stock}
                    onChange={(e) => setEditModal((prev) => prev && ({ ...prev, product: { ...prev.product, stock: Number(e.target.value) } }))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Low Stock Threshold</label>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={editModal.product.lowStockThreshold}
                    onChange={(e) => setEditModal((prev) => prev && ({ ...prev, product: { ...prev.product, lowStockThreshold: Number(e.target.value) } }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 rounded bg-gray-100" onClick={closeEditModal}>Cancel</button>
                  <button className="px-4 py-2 rounded bg-orange-500 text-white font-semibold" onClick={handleEditSave}>Update</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopInventoryManagement; 