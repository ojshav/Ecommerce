import React, { useEffect, lazy, Suspense } from 'react';
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
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from './components/business/AdminLayout';

// Lazy-loaded business dashboard pages
const BusinessDashboard = lazy(() => import('./pages/business/Dashboard'));
const BusinessProducts = lazy(() => import('./pages/business/Products'));
const BusinessOrders = lazy(() => import('./pages/business/Orders'));
const BusinessCustomers = lazy(() => import('./pages/business/Customers'));

// Lazy-loaded catalog pages
const CatalogProducts = lazy(() => import('./pages/business/catalog/Products'));
const CatalogCategories = lazy(() => import('./pages/business/catalog/Categories'));
const CatalogAttributes = lazy(() => import('./pages/business/catalog/Attributes'));
const AddProduct = lazy(() => import('./pages/business/catalog/product/AddProduct'));

const LoadingFallback = () => (
  <div className="w-full h-full min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
              {/* Regular customer-facing routes */}
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
                  
                  {/* Catalog Routes */}
                  <Route path="catalog">
                    <Route
                      path="products"
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <CatalogProducts />
                        </Suspense>
                      }
                    />
                    <Route
                      path="categories"
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <CatalogCategories />
                        </Suspense>
                      }
                    />
                    <Route
                      path="attributes"
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <CatalogAttributes />
                        </Suspense>
                      }
                    />
                    <Route
                      path="product/new"
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <AddProduct />
                        </Suspense>
                      }
                    />
                  </Route>
                  
                  {/* Add more business routes here */}
                </Route>
                
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