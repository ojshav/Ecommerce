import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSubscribers(dummySubscribers);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-orange-50">
      <h1 className="text-3xl font-bold mb-8 text-orange-700 drop-shadow-sm">Newsletter Subscribers</h1>
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
    </div>
  );
};

export default NewsletterSubscribers; 