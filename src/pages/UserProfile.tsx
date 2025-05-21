import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* User Info */}
      <div className="flex items-center mb-8">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mr-6"
        />
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="Atul Rawat" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="atul.rawat@gmail.com" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Email</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="atul12345@gmail.com" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="+1-202-555-0118" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country/Region</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="Bangladesh" disabled>
              <option>Bangladesh</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="Dhaka" disabled>
                <option>Dhaka</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" value="1207" readOnly />
            </div>
          </div>
        </div>
      </div>
      <button className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium mb-8">Save Changes</button>

      {/* Saved Addresses */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Saved Addresses</h2>
        <div className="space-y-2 mb-2">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border">
            <span>1234 Elm St, Springfi, 2345</span>
            <div className="space-x-2">
              <button className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium">Edit</button>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">Delete</button>
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border">
            <span>67647 malva ncell, vijaynagar,9876</span>
            <div className="space-x-2">
              <button className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium">Edit</button>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-4 py-1 rounded-md font-medium flex items-center"><span className="mr-1">+</span> Add New</button>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
        <div className="space-y-2 mb-2">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border">
            <span>Visa ending in 2045</span>
            <span>14/24</span>
            <div className="space-x-2">
              <button className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium">Edit</button>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">Delete</button>
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border">
            <span>Mastercard ending in 5678</span>
            <span>11/23</span>
            <span>CVV</span>
            <div className="space-x-2">
              <button className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium">Edit</button>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <select className="border border-gray-300 rounded-md px-3 py-1">
            <option>mm</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-1">
            <option>yy</option>
          </select>
        </div>
        <button className="bg-orange-500 text-white px-4 py-1 rounded-md font-medium flex items-center"><span className="mr-1">+</span> Add New</button>
      </div>

      {/* Notification Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
        <div className="grid grid-cols-2 gap-4 items-center mb-2 max-w-md">
          <div className="space-y-8">
            <div className="flex items-center">
              <span className="text-base">Email Notification</span>
            </div>
            <div className="flex items-center">
              <span className="text-base">SMS Notification</span>
            </div>
            <div className="flex items-center">
              <span className="text-base">PUSH Notification</span>
            </div>
          </div>
          <div className="space-y-8 flex flex-col items-end">
            <button
              type="button"
              aria-pressed={emailNotif}
              onClick={() => setEmailNotif(v =>   !v)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${emailNotif ? 'bg-black' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${emailNotif ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </button>
            <button
              type="button"
              aria-pressed={smsNotif}
              onClick={() => setSmsNotif(v => !v)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${smsNotif ? 'bg-black' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${smsNotif ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </button>
            <button
              type="button"
              aria-pressed={pushNotif}
              onClick={() => setPushNotif(v => !v)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${pushNotif ? 'bg-black' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${pushNotif ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-4 py-1 rounded-md font-medium flex items-center mt-2"><span className="mr-1">+</span> Add New</button>
      </div>

      {/* Change Password */}
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                placeholder="Current Password"
              />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowCurrentPassword(v => !v)}>
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                placeholder="8+ characters"
              />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowNewPassword(v => !v)}>
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                placeholder="Confirm Password"
              />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowConfirmPassword(v => !v)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium w-full">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 