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

import VerificationPending from './pages/auth/VerificationPending';

import PasswordReset from './pages/auth/PasswordReset';
import VerifyEmail from './pages/auth/VerifyEmail';

import Register from './pages/auth/Register';
import WishList from './pages/WishList';
import Promotion from './pages/Promotion';
import BecomeMerchant from './pages/BecomeMerchant';
import TrackOrder from './pages/TrackOrder';
import NewProduct from './pages/NewProduct';
import BusinessLogin from './pages/auth/BusinessLogin';
import RegisterBusiness from './pages/auth/RegisterBusiness';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from './components/business/AdminLayout';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';
import ShippingPolicy from './pages/ShippingPolicy';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Terms from './pages/Terms';

// Lazy-loaded business dashboard pages
const BusinessDashboard = lazy(() => import('./pages/business/Dashboard'));
const BusinessProducts = lazy(() => import('./pages/business/Products'));
const BusinessOrders = lazy(() => import('./pages/business/Orders'));
const BusinessCustomers = lazy(() => import('./pages/business/Customers'));
const BusinessVerification = lazy(() => import('./pages/business/Verification'));

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
                    path="verification"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <BusinessVerification />
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
                    <Route
                      path="product/:id/view"
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <AddProduct mode="view" />
                        </Suspense>
                      }
                    />
                    <Route
                      path="product/:id/edit"
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <AddProduct mode="edit" />
                        </Suspense>
                      }
                    />
                  </Route>
                  
                  {/* Add more business routes here */}
                </Route>
                
                {/* Business Auth Routes */}
                <Route path="/business/login" element={<BusinessLogin />} />
                <Route path="/register-business" element={<RegisterBusiness />} />
                
                {/* Auth Routes without header/footer */}
                <Route path="/signup" element={<SignUp />} />
                
                {/* Public Routes with header/footer */}
                <Route 
                  path="/*" 
                  element={
                    <>
                      <Navbar />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/all-products" element={<Products />} />
                          <Route path="/products/:categoryId" element={<Products />} />
                          <Route path="/product/:productId" element={<ProductDetail />} />
                          <Route path="/new-product" element={<NewProduct />} />
                          <Route path="/cart" element={<Cart />} />

                          <Route path="/signin" element={<SignIn />} />
                          <Route path="/signup" element={<SignUp />} />
                          <Route path="/verification-pending" element={<VerificationPending />} />
                          <Route path="/verify-email/:token" element={<VerifyEmail />} />
                          <Route path="/business-login" element={<BusinessLogin />} />
                          <Route path="/register-business" element={<RegisterBusiness />} />
                          <Route path="/password/reset" element={<PasswordReset />} />

                          <Route path="/wishlist" element={<WishList />} />
                          <Route path="/promotion" element={<Promotion />} />
                          <Route path="/sign-in" element={<SignIn />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/become-merchant" element={<BecomeMerchant />} />
                          <Route path="/track-order" element={<TrackOrder />} />
                          <Route path="/categories/:categoryId" element={<Products />} />
                          <Route path="/categories/:categoryId/:brandId" element={<Products />} />
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/shipping" element={<ShippingPolicy />} />
                          <Route path="/returns" element={<Returns />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/cookies" element={<Cookies />} />
                          <Route path="/terms" element={<Terms />} />

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