import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ActivitySquare,
  ShoppingBag,
  UserCog,
  FileBarChart2,
  Settings,
  Bell,
  Users,
  AlertTriangle,
  Percent,
  MessageSquare,
  Search,
  List,
  BarChart3,
  ShieldAlert,
  ChevronRight,
  Home,
  Menu,
  X,
  FolderOpen
} from "lucide-react";
import SuperadminHeader from "./SuperadminHeader";

// Dashboard sections organized into categories
const dashboardSections = [
  {
    category: "Analytics & Reports",
    color: "blue",
    icon: BarChart3,
    items: [
      {
        title: "User Activity Overview",
        icon: ActivitySquare,
        description: "Monitor user engagement, session data, and activity patterns"
      },
      {
        title: "Site Traffic Analytics",
        icon: BarChart3,
        description: "Analyze visitor traffic, sources, and behavior patterns"
      },
      {
        title: "Sales Reports",
        icon: FileBarChart2,
        description: "Review comprehensive sales data, trends, and projections"
      },
      {
        title: "Merchant Analytics",
        icon: BarChart3,
        description: "Track merchant performance and growth metrics"
      },
      {
        title: "Platform Performance",
        icon: ActivitySquare,
        description: "Monitor system health, response times, and resource usage"
      }
    ]
  },
  {
    category: "Management",
    color: "emerald",
    icon: UserCog,
    items: [
      {
        title: "Merchant Management",
        icon: UserCog,
        description: "Review and manage merchant accounts and applications"
      },
      {
        title: "Product Monitoring",
        icon: ShoppingBag,
        description: "Track product listings, categories, and inventory status"
      },
      {
        title: "Order Management",
        icon: List,
        description: "Process orders, track fulfillment, and manage exceptions"
      },
      {
        title: "Customer Support Management",
        icon: MessageSquare,
        description: "Oversee support tickets, response times, and resolution rates"
      },
      {
        title: "User Management",
        icon: Users,
        description: "Manage user accounts, permissions, and access controls"
      }
    ]
  },
  {
    category: "Operations & Security",
    color: "amber",
    icon: ShieldCheck,
    items: [
      {
        title: "Payment and Transaction Monitoring",
        icon: ShieldCheck,
        description: "Monitor payment processing and transaction security"
      },
      {
        title: "Promotions and Discounts Management",
        icon: Percent,
        description: "Create and manage platform-wide promotions and offers"
      },
      {
        title: "Content Moderation",
        icon: AlertTriangle,
        description: "Review flagged content and enforce community guidelines"
      },
      {
        title: "System Settings Configuration",
        icon: Settings,
        description: "Configure core platform settings and parameters"
      },
      {
        title: "Notifications and Alerts Management",
        icon: Bell,
        description: "Manage system notifications and alert thresholds"
      }
    ]
  },
  {
    category: "Advanced Controls",
    color: "purple",
    icon: ShieldAlert,
    items: [
      {
        title: "Role-Based Access Control (RBAC)",
        icon: ShieldAlert,
        description: "Configure admin roles, permissions, and access levels"
      },
      {
        title: "Product Listing Approval",
        icon: ShoppingBag,
        description: "Review and approve new product submissions"
      },
      {
        title: "Refund and Return Management",
        icon: ShoppingBag,
        description: "Process refund requests and manage return policies"
      },
      {
        title: "Fraud Detection",
        icon: ShieldCheck,
        description: "Monitor and address suspicious activities and platform health"
      },
      {
        title: "Marketplace Health",
        icon: ShieldCheck,
        description: "Monitor and address platform health"
      }
    ]
  }
];

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    // Keep your existing routing pattern
    const route = `/superadmin/${section.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route);
  };

  const handleCategorySelect = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    // Close sidebar on mobile when selecting a category
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  // Get color classes based on category
  const getCategoryColorClasses = (categoryName: string) => {
    switch (categoryName) {
      case "Management":
        return {
          text: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-100",
          hover: "hover:text-emerald-600",
          active: "bg-emerald-100 text-emerald-700"
        };
      case "Operations & Security":
        return {
          text: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
          hover: "hover:text-amber-600",
          active: "bg-amber-100 text-amber-700"
        };
      case "Advanced Controls":
        return {
          text: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-100",
          hover: "hover:text-purple-600",
          active: "bg-purple-100 text-purple-700"
        };
      default: // Analytics & Reports
        return {
          text: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-100",
          hover: "hover:text-blue-600",
          active: "bg-blue-100 text-blue-700"
        };
    }
  };

  const currentColorClasses = currentCategory
    ? getCategoryColorClasses(currentCategory.category)
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Include the SuperadminHeader component */}
      <SuperadminHeader />

      <div className="flex">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-30 p-3 rounded-full bg-gray-800 text-white shadow-lg"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed md:static z-20 transform md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 min-h-screen bg-white shadow-md flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Home className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-800">Super Admin</h2>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {dashboardSections.map((section, index) => {
                const Icon = section.icon;
                const colorClasses = getCategoryColorClasses(section.category);
                const isActive = selectedCategory === section.category;

                return (
                  <li key={index}>
                    <button
                      onClick={() => handleCategorySelect(section.category)}
                      className={`
                        w-full flex items-center px-4 py-3 rounded-lg text-left
                        ${isActive ? colorClasses.active : 'text-gray-700 hover:bg-gray-100'}
                        transition-all duration-200
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-500'} mr-3`} />
                      <span className="font-medium">{section.category}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto ${isActive ? '' : 'text-gray-400'}`} />
                    </button>
                  </li>
                  // Inside your Dashboard.tsx file, add to the sidebar navigation:

                );
              })}
              <li>
                <button
                  onClick={() => navigate('/superadmin/categories')}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <FolderOpen className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium">Categories</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/superadmin/attribute')}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <FolderOpen className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium">Attribute</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


