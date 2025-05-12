import { ReactNode, useEffect, lazy, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import BusinessLogin from './pages/auth/BusinessLogin';
import RegisterBusiness from './pages/auth/RegisterBusiness';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from './components/business/AdminLayout';
import AddProduct from './pages/business/AddProduct';
import Dashboard from "./pages/superadmin/Dashboard";
import UserActivity from './pages/superadmin/UserActivity';
import UserManagement from './pages/superadmin/Usermanagement';
import ContentModeration from './pages/superadmin/ContentModeration';

import TrafficAnalytics from './pages/superadmin/TrafficAnalytics';
import SalesReport from './pages/superadmin/SalesReport';
import FraudDetection from './pages/superadmin/FraudDetection';
import MarketplaceHealth from './pages/superadmin/MarketplaceHealth';
import MerchantAnalytics from './pages/superadmin/MerchantAnalytics';
import PlatformPerformance from './pages/superadmin/PlatformPerformance';
import MerchantManagement from './pages/superadmin/MerchantManagement';
import Notification from './pages/superadmin/Notifications';
import Categories from './pages/superadmin/Categories';
import Attribute from './pages/superadmin/Attribute';

// Lazy-loaded business dashboard pages
const BusinessDashboard = lazy(() => import('./pages/business/Dashboard'));
const BusinessProducts = lazy(() => import('./pages/business/Products'));
const BusinessOrders = lazy(() => import('./pages/business/Orders'));
const BusinessCustomers = lazy(() => import('./pages/business/Customers'));
const LoadingFallback = () => (
  <div className="w-full h-full min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);




interface ProtectedRouteProps {
  children: ReactNode;
}




const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Main App component
function App() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Routes>
                {/* Business Dashboard Routes */}
                <Route path="/business" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/business/dashboard" replace />} />
                  <Route
                    path="dashboard"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <BusinessDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="products"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <BusinessProducts />
                      </Suspense>
                    }
                  />
                  <Route
                    path="orders"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <BusinessOrders />
                      </Suspense>
                    }
                  />
                  <Route
                    path="customers"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <BusinessCustomers />
                      </Suspense>
                    }
                  />
                  <Route path="products/new" element={<AddProduct />} />
                </Route>

                {/* Superadmin Routes - Protected by ProtectedSuperadminRoute */}
                <Route
                  path="/superadmin"
                  element={
                  
                      <Dashboard />
                    
                  }
                />
                <Route
                  path="/superadmin/user-activity-overview"
                  element={
                    
                      <UserActivity />
                  
                  }
                />
                <Route
                  path="/superadmin/user-management"
                  element={
                  
                      <UserManagement />
                    
                  }
                />
                <Route
                  path="/superadmin/content-moderation"
                  element={
              
                      <ContentModeration />
           
                  }
                />
                <Route
                  path="/superadmin/site-traffic-analytics"
                  element={
                    
                      <TrafficAnalytics />
                 
                  }
                />
                <Route
                  path="/superadmin/sales-reports"
                  element={
                 
                      <SalesReport />
                  
                  }
                />
                <Route
                  path="/superadmin/fraud-detection"
                  element={
                 
                      <FraudDetection />
                 
                  }
                />

                <Route
                  path="/superadmin/marketplace-health"
                  element={
               
                      <MarketplaceHealth />
                   
                  }
                />
                 <Route
                  path="/superadmin/merchant-analytics"
                  element={
                
                      <MerchantAnalytics />
                    
                  }
                />
                <Route
                  path="/superadmin/platform-performance"
                  element={
          
                      <PlatformPerformance />
                  
                  }
                />
                 <Route
                  path="/superadmin/merchant-management"
                  element={
                    
                      <MerchantManagement />
                 
                  }
                />
                  
                  <Route
                  path="/superadmin/categories"
                  element={
                   
                      <Categories/>
               
                  }
                />

<Route
                  path="/superadmin/attribute"
                  element={
                   
                      <Attribute/>
               
                  }
                />
                {/* Public Routes */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/signin" element={<SignIn />} />
                          <Route path="/signup" element={<SignUp />} />
                          <Route path="/business-login" element={<BusinessLogin />} />
                          <Route path="/register-business" element={<RegisterBusiness />} />
                         
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 4000,
              },
            }}
          />
        </GoogleOAuthProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;