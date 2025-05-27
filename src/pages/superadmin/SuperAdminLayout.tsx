import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
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
  BarChart3,
  ShieldAlert,
  ChevronRight,
  Home,
  Menu,
  X,
  FolderOpen,
  ShieldCheck
} from "lucide-react";
import SuperadminHeader from "./SuperadminHeader";

// Dashboard sections organized into categories
export const dashboardSections = [
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
        icon: FileBarChart2,
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

// Add Category Management section
export const catalogSection = {
  category: "Catalog Management",
  color: "green",
  icon: FolderOpen,
  items: [
    {
      title: "Categories",
      icon: FolderOpen,
      description: "Manage product categories and subcategories"
    },
    {
      title: "Brand Creation",
      icon: ShoppingBag,
      description: "Manage product brands"
    },
    {
      title: "Attribute",
      icon: Settings,
      description: "Manage product attributes and specifications"
    }
  ]
};

// Get color classes based on category
export const getCategoryColorClasses = (categoryName: string) => {
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
    case "Catalog Management":
      return {
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-100",
        hover: "hover:text-green-600",
        active: "bg-green-100 text-green-700"
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

const SuperAdminLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(dashboardSections[0].category);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Analytics & Reports']); // Default expanded
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/superadmin/login" replace />;
  }

  // Redirect to unauthorized page if authenticated but not a superadmin
  const userRole = user?.role?.toLowerCase() || '';
  const isAdmin = userRole.includes('admin') || userRole === 'super_admin';
  
  if (isAuthenticated && !isAdmin) {
    console.log('Unauthorized access attempt with role:', user?.role);
    return <Navigate to="/unauthorized" replace />;
  }

  // Determine active section based on current route
  const getCurrentRoute = () => {
    const path = location.pathname;
    if (path.includes("categories") || path.includes("attribute") || path.includes("brands")) {
      setSelectedCategory("Catalog Management");
    } else if (path.includes("dashboard")) {
      setSelectedCategory("Dashboard");
    }
  };

  // Update selected category when location changes
  useEffect(() => {
    getCurrentRoute();
  }, [location.pathname]);

  const handleNavigation = (section: string) => {
    const route = `/superadmin/${section.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route);
  };

  const handleCatalogItemClick = (item: string) => {
    const route = `/superadmin/${item.toLowerCase()}`;
    navigate(route);
    setSelectedCategory("Catalog Management");
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Toggle category expansion
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <SuperadminHeader onMenuClick={toggleSidebar} />
      </div>

      <div className="flex pt-16">
        {/* Fixed Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed md:static z-20 transform md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 h-[calc(100vh-4rem)] top-16 bg-white shadow-md flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Home className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-800">Super Admin</h2>
              </div>
              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {/* Dashboard Menu Item */}
              <li>
                <button
                  onClick={() => handleNavigation("Dashboard")}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg text-left
                    ${selectedCategory === "Dashboard" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                    transition-all duration-200
                  `}
                >
                  <Home className={`w-5 h-5 ${selectedCategory === "Dashboard" ? '' : 'text-gray-500'} mr-3`} />
                  <span className="font-medium">Dashboard</span>
                </button>
              </li>

              {dashboardSections.map((section, index) => {
                const Icon = section.icon;
                const colorClasses = getCategoryColorClasses(section.category);
                const isActive = selectedCategory === section.category;
                const isExpanded = expandedCategories.includes(section.category);

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
                      <ChevronRight className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {/* Show section items when expanded */}
                    {isExpanded && (
                      <div className="mt-2 ml-6 space-y-1">
                        {section.items.map((item, itemIndex) => {
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={itemIndex}
                              onClick={() => handleNavigation(item.title)}
                              className="w-full flex items-center px-3 py-2 rounded-md text-left text-gray-700 hover:bg-gray-100"
                            >
                              <ItemIcon className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm">{item.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
              
              {/* Catalog Management Category */}
              <li>
                <button
                  onClick={() => handleCategorySelect("Catalog Management")}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg text-left
                    ${selectedCategory === "Catalog Management" ? 
                      getCategoryColorClasses("Catalog Management").active : 
                      'text-gray-700 hover:bg-gray-100'}
                    transition-all duration-200
                  `}
                >
                  <FolderOpen className={`w-5 h-5 ${selectedCategory === "Catalog Management" ? '' : 'text-gray-500'} mr-3`} />
                  <span className="font-medium">Catalog Management</span>
                  <ChevronRight className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${expandedCategories.includes("Catalog Management") ? 'rotate-90' : ''}`} />
                </button>
                
                {/* Show catalog items when expanded */}
                {expandedCategories.includes("Catalog Management") && (
                  <div className="mt-2 ml-6 space-y-1">
                    {catalogSection.items.map((item, index) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleCatalogItemClick(item.title.toLowerCase().replace(/\s+/g, "-"))}
                          className="w-full flex items-center px-3 py-2 rounded-md text-left text-gray-700 hover:bg-gray-100"
                        >
                          <ItemIcon className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;