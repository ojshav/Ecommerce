import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import { motion } from 'framer-motion';

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our wide selection of products across these popular categories</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/categories/${category.slug}`} className="block h-full">
                <div className="relative overflow-hidden rounded-lg shadow-md h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/80">{category.productCount} Products</p>
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        Browse →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;