import React, { useState } from 'react';

const PaymentPage: React.FC = () => {
  const [deliveryToAnother, setDeliveryToAnother] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('visa');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Payment Information */}
      <div className="flex-1 bg-white rounded-lg p-8">
        <h2 className="text-lg font-semibold mb-6">Payment Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Type full name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Type Email Address" />
            </div>
            <div className="col-span-1 md:col-span-2 flex gap-2 items-end">
              <div className="w-24">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <div className="flex items-center">
                  <select className="border border-gray-300 rounded-l px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                    <option>+1</option>
                    <option>+44</option>
                    <option>+91</option>
                  </select>
                </div>
              </div>
              <input type="text" className="flex-1 border border-gray-300 rounded-r px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Type your phone" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                <option>Select City</option>
                <option>New York</option>
                <option>Los Angeles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                <option>Select District</option>
                <option>Manhattan</option>
                <option>Brooklyn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Town / Ward</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                <option>Select Town / Ward</option>
                <option>Ward 1</option>
                <option>Ward 2</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Ex: ABC Building, 1890 NY" />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input id="deliveryToAnother" type="checkbox" checked={deliveryToAnother} onChange={() => setDeliveryToAnother(!deliveryToAnother)} className="mr-2 accent-orange-500" />
            <label htmlFor="deliveryToAnother" className="text-sm font-medium">Delivery to another address?</label>
          </div>

          {deliveryToAnother && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Type full name" />
              </div>
              <div className="col-span-1 md:col-span-2 flex gap-2 items-end">
                <div className="w-24">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="flex items-center">
                    <select className="border border-gray-300 rounded-l px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                      <option>+1</option>
                      <option>+44</option>
                      <option>+91</option>
                    </select>
                  </div>
                </div>
                <input type="text" className="flex-1 border border-gray-300 rounded-r px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Type Phone Number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                  <option>Select City</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">District</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                  <option>Select District</option>
                  <option>Manhattan</option>
                  <option>Brooklyn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Town / Ward</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                  <option>Select Town / Ward</option>
                  <option>Ward 1</option>
                  <option>Ward 2</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Ex: ABC Building, 1890 NY" />
              </div>
            </div>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" placeholder="Note about your orders" rows={3}></textarea>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-4">Your personal data will be used to process your order, to support your experience throughout this website, and for other purposes described in the <a href="/privacy-policy" className="text-orange-500 underline">privacy policy</a>.</p>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[400px] bg-white rounded-lg p-8 h-fit">
        <h2 className="text-lg font-semibold mb-6">Your Order</h2>
        <div className="space-y-4 mb-6">
          {/* Example order items, replace with real data as needed */}
          <div className="flex items-center gap-4">
            <img src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Fashion Glasses" className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <div className="font-medium text-sm">Fashion Glasses Sunny Premium</div>
              <div className="text-xs text-gray-500">Qty: 2</div>
            </div>
            <div className="font-medium text-sm">$43.15</div>
          </div>
          <div className="flex items-center gap-4">
            <img src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Apple Watch" className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <div className="font-medium text-sm">Apple Watch Series 5 MWV62VN/A</div>
              <div className="text-xs text-gray-500">Qty: 1</div>
            </div>
            <div className="font-medium text-sm">$517.77</div>
          </div>
          <div className="flex items-center gap-4">
            <img src="https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Macbook Air" className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <div className="font-medium text-sm">Apple Macbook Air MWLT2SA/A Space Grey</div>
              <div className="text-xs text-gray-500">Qty: 1</div>
            </div>
            <div className="font-medium text-sm">$1,013.97</div>
          </div>
        </div>
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Sub Total</span>
            <span className="font-medium">$1,574.88</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Apply Promo Code</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">$10.99</span>
          </div>
        </div>
        <div className="flex justify-between text-base font-semibold mb-6">
          <span>Total</span>
          <span>$1,574.88</span>
        </div>
        <div className="mb-6">
          <div className="font-medium mb-2">Payment Method</div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="paymentMethod" value="visa" checked={paymentMethod === 'visa'} onChange={() => setPaymentMethod('visa')} className="accent-orange-500" />
              Visa/Master Card
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="paymentMethod" value="atm" checked={paymentMethod === 'atm'} onChange={() => setPaymentMethod('atm')} className="accent-orange-500" />
              ATM Card
            </label>
          </div>
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 transition-colors">Order</button>
      </div>
    </div>
  );
};

export default PaymentPage; 