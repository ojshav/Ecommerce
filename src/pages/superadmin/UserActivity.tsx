import React, { useEffect, useState } from "react";
import {
  Activity,
  UserCircle2,
  Download,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";

// Mock fallback data
const fallbackActivities = [
  { id: 1, user: "John Doe", activity: "Logged in", timestamp: "2025-05-02 09:15 AM" },
  { id: 2, user: "Jane Smith", activity: "Viewed Order #1023", timestamp: "2025-05-02 09:20 AM" },
  { id: 3, user: "Alice Johnson", activity: "Updated Profile", timestamp: "2025-05-02 09:45 AM" },
];

const fallbackChartData = [
  { date: "Apr 26", actions: 12 },
  { date: "Apr 27", actions: 18 },
  { date: "Apr 28", actions: 9 },
  { date: "Apr 29", actions: 20 },
  { date: "Apr 30", actions: 25 },
  { date: "May 1", actions: 15 },
  { date: "May 2", actions: 22 },
];

const fallbackTopUsers = [
  { user: "John Doe", count: 25 },
  { user: "Jane Smith", count: 20 },
  { user: "Alice Johnson", count: 15 },
  { user: "Bob Martin", count: 10 },
  { user: "Sara Lee", count: 8 },
];

const fallbackActivityTypes = [
  { type: "Login", count: 40 },
  { type: "Profile Update", count: 25 },
  { type: "Order Viewed", count: 30 },
  { type: "Logged Out", count: 10 },
];

const UserActivity = () => {
  const [activities, setActivities] = useState(fallbackActivities);
  const [chartData, setChartData] = useState(fallbackChartData);
  const [topUsers, setTopUsers] = useState(fallbackTopUsers);
  const [activityTypes, setActivityTypes] = useState(fallbackActivityTypes);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Future: Replace with your actual API endpoints
    const fetchData = async () => {
      setLoading(true);
      try {
        const [activityRes, chartRes, usersRes, typesRes] = await Promise.all([
          fetch("/api/activities"),
          fetch("/api/activity-trend"),
          fetch("/api/top-users"),
          fetch("/api/activity-types"),
        ]);

        const [activitiesData, chartData, topUsers, activityTypes] = await Promise.all([
          activityRes.json(),
          chartRes.json(),
          usersRes.json(),
          typesRes.json(),
        ]);

        setActivities(activitiesData || fallbackActivities);
        setChartData(chartData || fallbackChartData);
        setTopUsers(topUsers || fallbackTopUsers);
        setActivityTypes(activityTypes || fallbackActivityTypes);
      } catch (err) {
        console.error("Failed to fetch from backend. Using fallback data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = activities.filter(
    (a) =>
      a.user.toLowerCase().includes(search.toLowerCase()) ||
      a.activity.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const headers = "User,Activity,Timestamp\n";
    const rows = activities
      .map((a) => `"${a.user}","${a.activity}","${a.timestamp}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_activity.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-blue-600 w-8 h-8" />
          <h1 className="text-3xl font-bold text-gray-800">User Activity Overview</h1>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading activity data...</div>
        ) : (
          <>
            {/* Chart */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">Activity Trend (Last 7 Days)</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="actions" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Top 5 Active Users</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topUsers} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="user" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#34d399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Activity Type Breakdown</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={activityTypes}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#6366f1"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Search & Export */}
            <div className="flex items-center justify-between my-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user or activity..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full text-left">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Activity</th>
                    <th className="p-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((activity) => (
                    <tr key={activity.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 flex items-center gap-2 text-gray-800">
                        <UserCircle2 className="w-5 h-5 text-gray-500" />
                        {activity.user}
                      </td>
                      <td className="p-4 text-gray-600">{activity.activity}</td>
                      <td className="p-4 text-gray-500 text-sm">{activity.timestamp}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-gray-500">
                        No activity found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserActivity;


