// CommonNavbar.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  BarChart3,
  ShieldAlert,
  ChevronRight,
  Home,
  Menu,
  X,
  FolderOpen
} from "lucide-react";

// Import your header component
// import SuperadminHeader from "./SuperadminHeader";

// Dashboard sections organized into categories - you can also import this from a separate file
const dashboardSections = [
  {
    category: "Analytics & Reports",
    color: "blue",
    icon: BarChart3,
    items: [
      { title: "User Activity Overview", icon: ActivitySquare },
      { title: "Site Traffic Analytics", icon: BarChart3 },
      { title: "Sales Reports", icon: FileBarChart2 },
      { title: "Merchant Analytics", icon: BarChart3 },
      { title: "Platform Performance", icon: ActivitySquare }
    ]
  },
  {
    category: "Management",
    color: "emerald",
    icon: UserCog,
    items: [
      { title: "Merchant Management", icon: UserCog },
      { title: "Product Monitoring", icon: ShoppingBag },
      { title: "Order Management", icon: ShoppingBag },
      { title: "Customer Support Management", icon: MessageSquare },
      { title: "User Management", icon: Users }
    ]
  },
  {
    category: "Operations & Security",
    color: "amber",
    icon: ShieldCheck,
    items: [
      { title: "Payment and Transaction Monitoring", icon: ShieldCheck },
      { title: "Promotions and Discounts Management", icon: Percent },
      { title: "Content Moderation", icon: AlertTriangle },
      { title: "System Settings Configuration", icon: Settings },
      { title: "Notifications and Alerts Management", icon: Bell }
    ]
  },
  {
    category: "Advanced Controls",
    color: "purple",
    icon: ShieldAlert,
    items: [
      { title: "Role-Based Access Control (RBAC)", icon: ShieldAlert },
      { title: "Product Listing Approval", icon: ShoppingBag },
      { title: "Refund and Return Management", icon: ShoppingBag },
      { title: "Fraud Detection", icon: ShieldCheck },
      { title: "Marketplace Health", icon: ShieldCheck }
    ]
  }
];

// Additional navigation links
const additionalLinks = [
  { title: "Categories", path: "/superadmin/categories", icon: FolderOpen },
  { title: "Attribute", path: "/superadmin/attribute", icon: FolderOpen }
];

interface CommonNavbarProps {
  children: React.ReactNode;
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CommonNavbar = ({ 
  children, 
  initialCategory = dashboardSections[0].category,
  onCategoryChange
}: CommonNavbarProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    // Call the callback if provided
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    
    // Close sidebar on mobile when selecting a category
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle navigation for additional links
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Update selected category based on URL path when component mounts
  useEffect(() => {
    // Extract the current path
    const currentPath = location.pathname;
    
    // Check if the path matches any section item
    for (const section of dashboardSections) {
      for (const item of section.items) {
        const itemPath = `/superadmin/${item.title.toLowerCase().replace(/\s+/g, "-")}`;
        if (currentPath === itemPath) {
          setSelectedCategory(section.category);
          return;
        }
      }
    }
    
    // Check additional links
    for (const link of additionalLinks) {
      if (currentPath === link.path) {
        // Keep the current category but highlight this specific path
        return;
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Include the SuperadminHeader component */}
      {/* <SuperadminHeader /> */}
      {/* Remove the comment above when you have the SuperadminHeader component available */}

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
                );
              })}
              
              {/* Additional links */}
              {additionalLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                
                return (
                  <li key={`additional-${index}`}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className={`
                        w-full flex items-center px-4 py-3 rounded-lg text-left
                        ${isActive ? 'bg-gray-100 text-gray-800' : 'text-gray-700 hover:bg-gray-100'} 
                        transition-all duration-200
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-gray-700' : 'text-gray-500'} mr-3`} />
                      <span className="font-medium">{link.title}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto ${isActive ? '' : 'text-gray-400'}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonNavbar;