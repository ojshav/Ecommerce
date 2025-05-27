import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  AlertTriangle,
  Activity,
  RefreshCw,
} from "lucide-react";
import { dashboardSections, getCategoryColorClasses } from "./SuperAdminLayout";

const CHART_COLORS = {
  primary: '#FF5733',    // Main orange
  secondary: '#2DD4BF',  // Teal
  tertiary: '#A855F7',   // Purple
  quaternary: '#3B82F6', // Blue
  background: '#FFF5E6'  // Very light orange
};

// FeatureGrid component simplified with description removed
const FeatureGrid = ({
  filteredItems,
  searchQuery,
  handleNavigation,
  currentColorClasses
}: {
  filteredItems: any[];
  searchQuery: string;
  handleNavigation: (title: string) => void;
  currentColorClasses: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            onClick={() => handleNavigation(item.title)}
            className={`
              bg-white rounded-xl p-6 shadow-sm hover:shadow-md 
              border ${currentColorClasses?.border || "border-[#FF5733]/20"} cursor-pointer 
              transition-all duration-300 hover:bg-[#FF5733]/5
            `}
          >
            <div className="flex items-center">
              <div className="bg-[#FF5733]/10 text-[#FF5733] p-3 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-800">{item.title}</h3>
            </div>
          </div>
        );
      })}

      {searchQuery && filteredItems.length === 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center col-span-full">
          <p className="text-gray-600">No features match your search in this category.</p>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(dashboardSections[0].category);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (section: string) => {
    // Keep your existing routing pattern
    const route = `/superadmin/${section.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route);
  };

  // Get the currently selected category data
  const currentCategory = dashboardSections.find(cat => cat.category === selectedCategory);

  // Filter items based on search query
  const filteredItems = currentCategory?.items?.filter(item =>
    searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
      : true
  );

  const currentColorClasses = currentCategory
    ? getCategoryColorClasses(currentCategory.category)
    : null;

  return (
  
  <>
    {/* Header Section */}
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {currentCategory && (
            <h1 className="text-3xl font-semibold text-gray-900">
              {currentCategory.category}
            </h1>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#FF5733]/60 transition-all" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#FF5733] focus:border-[#FF5733] transition-all"
            placeholder={`Search ${currentCategory?.category?.toLowerCase() || ""}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Refresh Button */}
        <button className="flex items-center gap-2 bg-[#FF5733]/20 text-[#FF5733] px-4 py-2 rounded-lg font-medium hover:bg-[#FF5733]/30 transition-all duration-300 group">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          Refresh Data
        </button>
      </div>
    </div>

    {/* Quick Stats for Analytics */}
    {currentCategory?.category === "Analytics & Reports" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Users",
            value: "24,738",
            change: "+12.5%",
            desc: "from last month"
          },
          {
            label: "Active Merchants",
            value: "1,423",
            change: "+8.2%",
            desc: "from last month"
          },
          {
            label: "Total Revenue",
            value: "$842,953",
            change: "+16.8%",
            desc: "from last month"
          },
          {
            label: "Avg. Order Value",
            value: "$87.42",
            change: "+4.3%",
            desc: "from last month"
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border border-[#FF5733]/20 hover:shadow-md transition-all"
          >
            <h3 className="text-sm text-gray-500 font-medium">{stat.label}</h3>
            <p className="text-3xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-sm text-[#FF5733] mt-1 flex items-center">
              {stat.change}
              <span className="ml-1 text-gray-500">{stat.desc}</span>
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Alert Banner */}
    {currentCategory?.category === "Operations & Security" && (
      <div className="mb-8 bg-[#FF5733]/10 border border-[#FF5733]/20 rounded-xl p-4 flex items-start shadow-sm">
        <AlertTriangle className="w-5 h-5 text-[#FF5733] mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-[#FF5733]">Security Alert</h3>
          <p className="text-[#FF5733]/80 text-sm">
            5 suspicious login attempts detected in the last 24 hours.{" "}
            <span className="underline cursor-pointer hover:text-[#FF4500] transition">
              Review security logs
            </span>{" "}
            for more details.
          </p>
        </div>
      </div>
    )}

    {/* Feature Grid */}
    {filteredItems && (
      <FeatureGrid
        filteredItems={filteredItems}
        searchQuery={searchQuery}
        handleNavigation={handleNavigation}
        currentColorClasses={currentColorClasses}
      />
    )}
  </>
);

};

export default Dashboard;


