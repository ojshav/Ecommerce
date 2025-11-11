import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Clock, Globe, CreditCard } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">{t('shipping.title')}</h1>
          <p className="text-gray-600 text-center mb-12">
            {t('shipping.lastUpdated')}: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          {/* Quick overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <Truck className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">{t('shipping.overview.freeShipping.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('shipping.overview.freeShipping.description')}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <Clock className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">{t('shipping.overview.fastProcessing.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('shipping.overview.fastProcessing.description')}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <Globe className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">{t('shipping.overview.international.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('shipping.overview.international.description')}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex items-start space-x-4">
              <CreditCard className="text-black flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-2">{t('shipping.overview.customs.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('shipping.overview.customs.description')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Shipping Methods Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{t('shipping.methods.title')}</h2>
            
            <div className="border-t border-gray-200">
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">{t('shipping.methods.standard.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('shipping.methods.standard.description')}
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>{t('shipping.methods.standard.features.0')}</li>
                  <li>{t('shipping.methods.standard.features.1')}</li>
                </ul>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">{t('shipping.methods.express.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('shipping.methods.express.description')}
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>{t('shipping.methods.express.features.0')}</li>
                  <li>{t('shipping.methods.express.features.1')}</li>
                </ul>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">{t('shipping.methods.overnight.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('shipping.methods.overnight.description')}
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>{t('shipping.methods.overnight.features.0')}</li>
                  <li>{t('shipping.methods.overnight.features.1')}</li>
                  <li>{t('shipping.methods.overnight.features.2')}</li>
                </ul>
              </div>
              
              <div className="py-4 border-b border-gray-200">
                <h3 className="font-semibold mb-2">{t('shipping.methods.international.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('shipping.methods.international.description')}
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
                  <li>{t('shipping.methods.international.features.0')}</li>
                  <li>{t('shipping.methods.international.features.1')}</li>
                  <li>{t('shipping.methods.international.features.2')}</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('shipping.processing.title')}</h2>
              <p className="text-gray-700 mb-3">
                {t('shipping.processing.description')}
              </p>
              <p className="text-gray-700">
                {t('shipping.processing.confirmation')}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('shipping.restrictions.title')}</h2>
              <p className="text-gray-700 mb-3">
                {t('shipping.restrictions.description')}
              </p>
              <p className="text-gray-700">
                {t('shipping.restrictions.poBoxes')}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('shipping.delays.title')}</h2>
              <p className="text-gray-700 mb-3">
                {t('shipping.delays.description')}
              </p>
              <p className="text-gray-700">
                {t('shipping.delays.contact')}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('shipping.support.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('shipping.support.description')}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg inline-block">
                <p className="text-gray-700 mb-2">
                  <strong>{t('common.email')}:</strong> <a href="mailto:infoaoinstore@gmail.com" className="text-blue-600 hover:underline">infoaoinstore@gmail.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>{t('common.phone')}:</strong> <a href="tel:+18002846435" className="text-blue-600 hover:underline">989 336 1102 </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy; 