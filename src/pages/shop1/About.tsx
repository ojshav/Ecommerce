import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/shop/shop1/Header';
import Footer from '../../components/shop/shop1/AllProductpage/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#222222] mb-6">
              About AOIN
            </h1>
            <p className="text-lg md:text-xl font-poppins text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the story behind AOIN - where fashion meets innovation, and every piece tells a unique story of style, quality, and craftsmanship.
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

      {/* Our Story Section */}
      <section className="py-20">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#222222] mb-8">
                Our Story
              </h2>
              <div className="space-y-6 font-poppins text-gray-700 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize the fashion industry, AOIN emerged from a simple yet powerful idea: to create clothing that not only looks beautiful but also tells a story. Our journey began in the heart of India, where traditional craftsmanship meets modern innovation.
                </p>
                <p>
                  What started as a small boutique has grown into a fashion empire, serving customers worldwide with our unique blend of contemporary design and timeless elegance. Every piece in our collection is carefully curated to reflect the diverse tastes and lifestyles of our global community.
                </p>
                <p>
                  At AOIN, we believe that fashion is more than just clothing—it's a form of self-expression, a way to connect with others, and a celebration of individuality. Our commitment to quality, sustainability, and innovation drives everything we do.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#e18a4b] to-orange-400 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-playfair font-bold mb-4">Our Mission</h3>
                <p className="font-poppins leading-relaxed">
                  To inspire confidence and creativity through fashion that celebrates diversity, promotes sustainability, and empowers individuals to express their unique style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#222222] mb-6">
              Our Values
            </h2>
            <p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
              The principles that guide our journey and shape our commitment to excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4 text-center">
                Quality
              </h3>
              <p className="text-gray-600 font-poppins text-center leading-relaxed">
                We never compromise on quality. Every piece is crafted with premium materials and attention to detail, ensuring lasting beauty and comfort.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4 text-center">
                Sustainability
              </h3>
              <p className="text-gray-600 font-poppins text-center leading-relaxed">
                We're committed to sustainable practices, from eco-friendly materials to ethical manufacturing processes that protect our planet.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#e18a4b] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-4 text-center">
                Community
              </h3>
              <p className="text-gray-600 font-poppins text-center leading-relaxed">
                We celebrate diversity and inclusivity, creating fashion that empowers individuals from all walks of life to express their unique style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="w-[1280px] max-w-full mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#222222] mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind AOIN's success story
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-[#e18a4b] to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-playfair font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-2">
                Creative Director
              </h3>
              <p className="text-gray-600 font-poppins">
                Visionary leader behind our unique designs
              </p>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-[#e18a4b] to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-playfair font-bold text-white">O</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-2">
                Operations Manager
              </h3>
              <p className="text-gray-600 font-poppins">
                Ensuring seamless customer experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-[#e18a4b] to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-playfair font-bold text-white">I</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-2">
                Innovation Lead
              </h3>
              <p className="text-gray-600 font-poppins">
                Driving sustainable fashion forward
              </p>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-[#e18a4b] to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-playfair font-bold text-white">N</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#222222] mb-2">
                Customer Success
              </h3>
              <p className="text-gray-600 font-poppins">
                Building lasting relationships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section 
      <section className="py-20 bg-gradient-to-r from-[#e18a4b] to-orange-400">
        <div className="w-[1280px] max-w-full mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-lg font-poppins text-white/90 mb-8 max-w-2xl mx-auto">
            Have questions about AOIN? We'd love to hear from you. Reach out to our team and let's start a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-[#e18a4b] px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <a 
              href="mailto:auoinstore@gmail.com" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-white hover:text-[#e18a4b] transition-colors"
            >
              Email Us
            </a>
            <a 
              href="tel:+917879702202" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-white hover:text-[#e18a4b] transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default About;
