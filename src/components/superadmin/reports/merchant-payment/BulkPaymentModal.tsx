import React from 'react';
import { FaMoneyBillWave, FaTimes } from 'react-icons/fa';

interface BulkPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
  merchantCount: number;
}

const BulkPaymentModal: React.FC<BulkPaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  merchantCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-orange-100 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600">Confirm Bulk Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-6 text-orange-500">
              <FaMoneyBillWave className="text-4xl sm:text-5xl" />
            </div>
            
            <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
              You are about to initiate bulk payments for all eligible orders that were delivered more than 7 days ago.
            </p>

            <div className="bg-orange-50 p-4 sm:p-6 rounded-xl mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600 font-medium text-sm sm:text-base">Total Merchants:</span>
                <span className="font-bold text-orange-700 text-sm sm:text-base">{merchantCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium text-sm sm:text-base">Total Amount:</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              This action cannot be undone. Please confirm that you want to proceed with the payments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 border border-orange-200 rounded-xl text-orange-600 hover:bg-orange-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkPaymentModal; 