import React, { useState } from 'react';
import { 
  ArrowDownTrayIcon, 
  DocumentIcon, 
  DocumentArrowDownIcon,
  TableCellsIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string) => void;
  isExporting: boolean;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  isExporting
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Professional formatted report with charts and tables',
      icon: DocumentIcon,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      size: '~500KB'
    },
    {
      id: 'excel',
      name: 'Excel Spreadsheet',
      description: 'Multiple worksheets with detailed data for analysis',
      icon: TableCellsIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      size: '~200KB'
    },
    {
      id: 'csv',
      name: 'CSV File',
      description: 'Raw data in comma-separated format',
      icon: DocumentArrowDownIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      size: '~50KB'
    }
  ];

  const handleExport = () => {
    onExport(selectedFormat);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">Export Sales Report</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isExporting}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <p className="text-sm text-gray-600 mb-4">
            Choose your preferred format for the sales report export:
          </p>

          <div className="space-y-3">
            {exportFormats.map((format) => {
              const IconComponent = format.icon;
              return (
                <label
                  key={format.id}
                  className={`flex items-start p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedFormat === format.id
                      ? 'border-[#FF4D00] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format.id}
                    checked={selectedFormat === format.id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="sr-only"
                    disabled={isExporting}
                  />
                  
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${format.bgColor} flex items-center justify-center mr-3`}>
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${format.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{format.name}</p>
                      <span className="text-xs text-gray-500 ml-2">{format.size}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{format.description}</p>
                  </div>

                  {selectedFormat === format.id && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#FF4D00] rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-3 py-2 sm:px-4 sm:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#FF3800] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Exporting...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
