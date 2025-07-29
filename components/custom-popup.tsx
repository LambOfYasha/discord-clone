import React from "react";
import { CheckCircle } from "lucide-react";

interface CustomPopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-80 max-w-sm mx-4 transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-900 text-center mb-4">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
