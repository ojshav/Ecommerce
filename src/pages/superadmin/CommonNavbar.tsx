
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

// Dashboard sections organized into categories
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
    const colorMap: Record<string, any> = {
      "Management": {
        text: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        hover: "hover:bg-emerald-100/80 hover:text-emerald-700",
        active: "bg-emerald-100 text-emerald-700 font-medium"
      },
      "Operations & Security": {
        text: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        hover: "hover:bg-amber-100/80 hover:text-amber-700",
        active: "bg-amber-100 text-amber-700 font-medium"
      },
      "Advanced Controls": {
        text: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        hover: "hover:bg-purple-100/80 hover:text-purple-700",
        active: "bg-purple-100 text-purple-700 font-medium"
      }
    };
    
    return colorMap[categoryName] || {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      hover: "hover:bg-blue-100/80 hover:text-blue-700",
      active: "bg-blue-100 text-blue-700 font-medium"
    };
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
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

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Update selected category based on URL path
  useEffect(() => {
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
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/60 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`
            fixed md:sticky top-0 h-screen w-64
            transition-transform duration-200 ease-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 z-40 bg-white shadow-sm border-r border-gray-200
          `}
        >
          {/* Header */}
          <div className="h-14 flex items-center px-4 border-b">
            <Home className="w-5 h-5 text-gray-700" />
            <h2 className="ml-3 font-medium">Super Admin</h2>
          </div>

          {/* Nav content */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="px-2 text-xs text-gray-500 uppercase font-medium">Navigation</h3>
              <ul className="mt-1 space-y-1">
                {dashboardSections.map((section, index) => {
                  const Icon = section.icon;
                  const colors = getCategoryColorClasses(section.category);
                  const isActive = selectedCategory === section.category;

                  return (
                    <li key={index}>
                      <button
                        onClick={() => handleCategorySelect(section.category)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-md
                          ${isActive ? colors.active : `text-gray-700 ${colors.hover}`}
                        `}
                      >
                        <div className="flex items-center">
                          <Icon className={`w-4 h-4 mr-3 ${isActive ? colors.text : 'text-gray-500'}`} />
                          <span>{section.category}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? colors.text : 'text-gray-400'}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Tools */}
            <div>
              <h3 className="px-2 text-xs text-gray-500 uppercase font-medium">Tools</h3>
              <ul className="mt-1 space-y-1">
                {additionalLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  
                  return (
                    <li key={`tool-${index}`}>
                      <button
                        onClick={() => handleNavigation(link.path)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-md
                          ${isActive ? 'bg-gray-100 text-gray-800 font-medium' : 'text-gray-700 hover:bg-gray-100'} 
                        `}
                      >
                        <div className="flex items-center">
                          <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-gray-700' : 'text-gray-500'}`} />
                          <span>{link.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-gray-700' : 'text-gray-400'}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t text-xs text-gray-500">
            <div className="flex items-center">
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              <span>v1.0</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="md:hidden h-14 flex items-center px-4 border-b bg-white shadow-sm">
            <button 
              onClick={toggleSidebar}
              className="p-1.5 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <span className="ml-3 font-medium">Super Admin</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 p-2.5 rounded-full bg-gray-800 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default CommonNavbar;