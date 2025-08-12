import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/shop/shop1/Header';
import Footer from '../../components/shop/shop1/AllProductpage/Footer';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#222222] mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl font-poppins text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the comprehensive range of services we offer to enhance your fashion experience and make shopping with AOIN truly exceptional.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link 
              to="/shop1" 
              className="bg-[#e18a4b] text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </Link>
            <Link 
              to="/shop1-allproductpage" 
              className="bg-white text-[#e18a4b] border-2 border-[#e18a4b] px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-[#e18a4b] hover:text-white transition-colors"
            >
              Shop Products
            </Link>
            <Link 
              to="/contact" 
              className="bg-white text-[#e18a4b] border-2 border-[#e18a4b] px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-[#e18a4b] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Personal Styling */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#222222] mb-4">
                Personal Styling
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                Get personalized fashion advice from our expert stylists. We'll help you create the perfect look for any occasion, considering your body type, preferences, and lifestyle.
              </p>
              <ul className="space-y-2 text-sm font-poppins text-gray-600">
                <li>• Virtual styling consultations</li>
                <li>• Outfit recommendations</li>
                <li>• Seasonal wardrobe planning</li>
                <li>• Style personality assessment</li>
              </ul>
            </div>

            {/* Custom Tailoring */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#222222] mb-4">
                Custom Tailoring
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                Perfect fit guaranteed with our custom tailoring service. Our skilled artisans will modify any garment to ensure it fits you perfectly and enhances your natural silhouette.
              </p>
              <ul className="space-y-2 text-sm font-poppins text-gray-600">
                <li>• Free alterations on all purchases</li>
                <li>• Custom measurements</li>
                <li>• Express tailoring service</li>
                <li>• Quality assurance guarantee</li>
              </ul>
            </div>

            {/* Express Delivery */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#222222] mb-4">
                Express Delivery
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                Need your order in a hurry? Our express delivery service ensures your fashion essentials reach you within 24-48 hours across major cities in India.
              </p>
              <ul className="space-y-2 text-sm font-poppins text-gray-600">
                <li>• Same-day delivery (select cities)</li>
                <li>• Next-day delivery nationwide</li>
                <li>• Real-time tracking</li>
                <li>• SMS notifications</li>
              </ul>
            </div>

            {/* Virtual Try-On */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#222222] mb-4">
                Virtual Try-On
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                Experience the future of shopping with our AI-powered virtual try-on technology. See how our clothes look on you before making a purchase decision.
              </p>
              <ul className="space-y-2 text-sm font-poppins text-gray-600">
                <li>• AI-powered body scanning</li>
                <li>• Realistic garment visualization</li>
                <li>• Multiple angle views</li>
                <li>• Size recommendations</li>
              </ul>
            </div>

            {/* Loyalty Program */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#222222] mb-4">
                AOIN Rewards
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                Join our exclusive loyalty program and earn points with every purchase. Enjoy exclusive benefits, early access to sales, and special member-only events.
              </p>
              <ul className="space-y-2 text-sm font-poppins text-gray-600">
                <li>• Earn points on every purchase</li>
                <li>• Exclusive member discounts</li>
                <li>• Birthday rewards</li>
                <li>• VIP event invitations</li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#222222] mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                Our dedicated customer support team is available round the clock to assist you with any questions, concerns, or fashion advice you may need.
              </p>
              <ul className="space-y-2 text-sm font-poppins text-gray-600">
                <li>• Live chat support</li>
                <li>• WhatsApp assistance</li>
                <li>• Email support</li>
                <li>• Phone helpline</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#222222] mb-6">
              Why Choose AOIN Services?
            </h2>
            <p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service that goes beyond just selling clothes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4">
                Quality Assured
              </h3>
              <p className="text-gray-600 font-poppins">
                Every service is backed by our quality guarantee and customer satisfaction promise.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4">
                Fast & Efficient
              </h3>
              <p className="text-gray-600 font-poppins">
                Quick turnaround times and efficient processes to save you time and effort.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4">
                Expert Team
              </h3>
              <p className="text-gray-600 font-poppins">
                Skilled professionals with years of experience in fashion and customer service.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4">
                Customer First
              </h3>
              <p className="text-gray-600 font-poppins">
                Your satisfaction is our priority. We go above and beyond to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#e18a4b] to-orange-400">
        <div className="w-[1280px] max-w-full mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-lg font-poppins text-white/90 mb-8 max-w-2xl mx-auto">
            Start shopping with AOIN today and discover the difference our premium services can make in your fashion journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop1-allproductpage"
              className="bg-white text-[#e18a4b] px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
            <Link 
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-white hover:text-[#e18a4b] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
