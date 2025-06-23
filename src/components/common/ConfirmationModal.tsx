import React from "react";
import Modal from "./Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const confirmButtonBaseClasses =
    "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm disabled:opacity-50";
  const confirmButtonColorClasses = isDestructive
    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
    : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500";

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <div className="p-4">
        {" "}
        {/* Added padding to modal content area */}
        <div className="text-sm text-gray-600 mb-4">{message}</div>
        {/* Buttons stack on small, then go side-by-side */}
        <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-2 space-y-reverse sm:space-y-0">
          <button
            type="button"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm disabled:opacity-50"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            className={`${confirmButtonBaseClasses} ${confirmButtonColorClasses}`}
            onClick={onConfirm}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
