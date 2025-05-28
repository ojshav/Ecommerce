import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  status: string;
  deliveryDate: string;
  orderDate: string;
  productName: string;
  imageUrl: string;
}

const Exchange: React.FC = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  const [selectedReason, setSelectedReason] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('home');

  const handleRefundClick = () => {
    navigate(`/refund/${orderId}`, { state: { order } });
  };

  const savedAddresses = {
    home: '123 Home Street, City, State',
    work: '456 Work Avenue, City, State'
  };

  if (!order) {
    return <div className="container mx-auto px-4 py-8">Order not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-2 text-gray-600 mb-6">
        <span>Orders</span>
        <span>/</span>
        <span>Exchange</span>
      </div>

      {/* Product Details */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="w-64 h-64 mb-2 mx-auto overflow-hidden rounded-lg bg-orange-500">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
              alt="Stylish Backpack"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-medium">Product Name: Stylish Backpack</h2>
          <p className="text-sm text-gray-600">Order Number: {order.id}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Exchange Status */}
        <div>
          <h3 className="font-medium mb-2">Exchange Status</h3>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full w-1/3 bg-orange-500"></div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Exchange
            </button>
            <button 
              onClick={handleRefundClick}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Refund
            </button>
          </div>
        </div>

        {/* Exchange Reason */}
        <div>
          <h3 className="font-medium mb-4">Exchange Reason</h3>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select</option>
            <option value="size">Wrong Size</option>
            <option value="color">Wrong Color</option>
            <option value="damaged">Damaged Product</option>
          </select>
          <p className="text-orange-500 text-sm mt-2 cursor-pointer">View Return Policy</p>
        </div>

        {/* Pickup Address */}
        <div>
          <h3 className="font-medium mb-4">Pickup Address</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Ex: ABC Building, 4th LF"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Type your name"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="********"
              />
            </div>
          </div>
        </div>

        {/* Saved Addresses */}
        <div>
          <h3 className="font-medium mb-4">Saved Addresses</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-3 border rounded-lg">
              <input
                type="radio"
                name="address"
                value="home"
                checked={selectedAddress === 'home'}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              <span>Home</span>
            </label>
            <label className="flex items-center gap-2 p-3 border rounded-lg">
              <input
                type="radio"
                name="address"
                value="work"
                checked={selectedAddress === 'work'}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              <span>Work</span>
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
              Set Address
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
              Add New Address
            </button>
          </div>
        </div>

        {/* Exchange Summary */}
        <div>
          <h3 className="font-medium mb-4">Exchange Summary</h3>
          <div className="border rounded-lg p-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <p>Item:</p>
                <p>Stylish Backpack</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>Exchange Reason:</p>
                <p>{selectedReason || 'Wrong Size'}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>Pickup Address:</p>
                <p>{address || '789 Maple Drive, Anytown, USA'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg">
            Submit Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exchange; 