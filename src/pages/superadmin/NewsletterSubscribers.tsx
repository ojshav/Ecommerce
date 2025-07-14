import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import ExportModal from '../../components/business/reports/ExportModal';

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

const dummySubscribers: Subscriber[] = [
  { id: 1, email: 'alice@example.com', subscribed_at: '2024-06-01T10:00:00Z' },
  { id: 2, email: 'bob@example.com', subscribed_at: '2024-06-02T12:30:00Z' },
  { id: 3, email: 'charlie@example.com', subscribed_at: '2024-06-03T15:45:00Z' },
];

const NewsletterSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSubscribers(dummySubscribers);
      setLoading(false);
    }, 500);
  }, []);

  const handleExport = async (format: string) => {
    setIsExporting(true);
    try {
      if (format === 'csv') {
        // CSV export
        const headers = 'ID,Email,Subscribed At\n';
        const rows = subscribers
          .map((s) => `${s.id},"${s.email}","${new Date(s.subscribed_at).toLocaleString()}"`)
          .join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'newsletter_subscribers.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else if (format === 'excel') {
        // Placeholder: Excel export (requires xlsx library)
        alert('Excel export coming soon! Please install xlsx library.');
      } else if (format === 'pdf') {
        // Placeholder: PDF export (requires jsPDF & autotable)
        alert('PDF export coming soon! Please install jsPDF and jspdf-autotable libraries.');
      }
      setIsExportModalOpen(false);
    } catch (err) {
      alert('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-orange-50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-orange-700 drop-shadow-sm">Newsletter Subscribers</h1>
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600 transition"
        >
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-orange-600 font-medium">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-orange-100">
                  <th className="px-6 py-3 text-left text-sm font-bold text-orange-700 rounded-tl-xl">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-orange-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-orange-700 rounded-tr-xl">Subscribed At</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">No subscribers found.</td>
                  </tr>
                ) : (
                  subscribers.map((sub, idx) => (
                    <tr
                      key={sub.id}
                      className={
                        `transition-colors duration-150 ${idx % 2 === 0 ? 'bg-orange-50' : 'bg-white'} hover:bg-orange-200/60`}
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium rounded-l-lg">{sub.id}</td>
                      <td className="px-6 py-4 text-gray-700">{sub.email}</td>
                      <td className="px-6 py-4 text-gray-600 rounded-r-lg">{new Date(sub.subscribed_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        isExporting={isExporting}
      />
    </div>
  );
};

export default NewsletterSubscribers; 