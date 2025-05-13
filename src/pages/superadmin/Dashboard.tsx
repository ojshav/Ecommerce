import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  AlertTriangle,
} from "lucide-react";
import { dashboardSections, getCategoryColorClasses } from "./SuperAdminLayout";

// FeatureGrid component properly defined outside of the Dashboard component
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
            <div className="flex items-center mb-4">
              <div className={`${currentColorClasses?.bg || "bg-gray-100"} ${currentColorClasses?.text || "text-gray-800"} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
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
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const currentColorClasses = currentCategory
    ? getCategoryColorClasses(currentCategory.category)
    : null;

  return (
    <>
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {currentCategory && (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {currentCategory.category}
                </h1>
                <p className="text-gray-600">
                  {currentCategory.category === "Analytics & Reports" && "Track and analyze platform data and performance metrics"}
                  {currentCategory.category === "Management" && "Manage users, products, and operations across the platform"}
                  {currentCategory.category === "Operations & Security" && "Oversee platform operations and security protocols"}
                  {currentCategory.category === "Advanced Controls" && "Access specialized tools and administrative functions"}
                </p>
              </>
            )}
          </div>
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Search ${currentCategory?.category?.toLowerCase() || ""}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats - Show for Analytics & Reports */}
      {currentCategory?.category === "Analytics & Reports" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-gray-800">24,738</p>
            <span className="mt-2 text-sm text-green-600 flex items-center">
              +12.5% <span className="ml-1 text-gray-500">from last month</span>
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Merchants</h3>
            <p className="text-3xl font-bold text-gray-800">1,423</p>
            <span className="mt-2 text-sm text-green-600 flex items-center">
              +8.2% <span className="ml-1 text-gray-500">from last month</span>
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">$842,953</p>
            <span className="mt-2 text-sm text-green-600 flex items-center">
              +16.8% <span className="ml-1 text-gray-500">from last month</span>
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Avg. Order Value</h3>
            <p className="text-3xl font-bold text-gray-800">$87.42</p>
            <span className="mt-2 text-sm text-green-600 flex items-center">
              +4.3% <span className="ml-1 text-gray-500">from last month</span>
            </span>
          </div>
        </div>
      )}

      {/* Alert Banner - Show for Operations & Security */}
      {currentCategory?.category === "Operations & Security" && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Security Alert</h3>
            <p className="text-amber-700 text-sm">
              5 suspicious login attempts detected in the last 24 hours. Review security logs for more details.
            </p>
          </div>
        </div>
      )}

      {/* Feature Items Grid */}
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


