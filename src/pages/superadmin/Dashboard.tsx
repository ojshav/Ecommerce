import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  AlertTriangle,
} from "lucide-react";
import { dashboardSections, getCategoryColorClasses } from "./SuperAdminLayout";

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
              border ${currentColorClasses?.border || "border-gray-200"} cursor-pointer 
              transition-all duration-300 hover:bg-gray-50
            `}
          >
            <div className="flex items-center">
              <div className={`${currentColorClasses?.bg || "bg-gray-100"} ${currentColorClasses?.text || "text-gray-800"} p-3 rounded-lg`}>
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
            <Search className="h-5 w-5 text-gray-400 transition-all" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={`Search ${currentCategory?.category?.toLowerCase() || ""}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <h3 className="text-sm text-gray-500 font-medium">{stat.label}</h3>
            <p className="text-3xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              {stat.change}
              <span className="ml-1 text-gray-500">{stat.desc}</span>
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Alert Banner */}
    {currentCategory?.category === "Operations & Security" && (
      <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start shadow-sm">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-yellow-800">Security Alert</h3>
          <p className="text-yellow-700 text-sm">
            5 suspicious login attempts detected in the last 24 hours.{" "}
            <span className="underline cursor-pointer hover:text-yellow-900 transition">
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


