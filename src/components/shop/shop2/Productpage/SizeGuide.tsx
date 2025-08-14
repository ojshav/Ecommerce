import React from 'react';
import { X } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bebas text-gray-900">SIZE GUIDE</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Find Your Perfect Fit</h3>
            <p className="text-gray-700 mb-6">
              Use our comprehensive size charts to find your ideal fit. We recommend measuring yourself 
              before ordering to ensure the best possible fit for your AOIN pieces.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-futura font-semibold mb-3 text-blue-900">How to Measure</h4>
              <ul className="space-y-2 text-blue-800">
                <li>• Use a flexible measuring tape</li>
                <li>• Measure over light clothing or undergarments</li>
                <li>• Keep the tape snug but not tight</li>
                <li>• Take measurements in inches</li>
              </ul>
            </div>
          </div>

          {/* Women's Size Chart */}
          <div className="mb-8">
            <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Women's Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Size</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Bust</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Waist</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Hips</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">US Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">XS</td>
                    <td className="px-4 py-3 text-gray-700">32-34"</td>
                    <td className="px-4 py-3 text-gray-700">24-26"</td>
                    <td className="px-4 py-3 text-gray-700">34-36"</td>
                    <td className="px-4 py-3 text-gray-700">2-4</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">S</td>
                    <td className="px-4 py-3 text-gray-700">34-36"</td>
                    <td className="px-4 py-3 text-gray-700">26-28"</td>
                    <td className="px-4 py-3 text-gray-700">36-38"</td>
                    <td className="px-4 py-3 text-gray-700">4-6</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">M</td>
                    <td className="px-4 py-3 text-gray-700">36-38"</td>
                    <td className="px-4 py-3 text-gray-700">28-30"</td>
                    <td className="px-4 py-3 text-gray-700">38-40"</td>
                    <td className="px-4 py-3 text-gray-700">6-8</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">L</td>
                    <td className="px-4 py-3 text-gray-700">38-40"</td>
                    <td className="px-4 py-3 text-gray-700">30-32"</td>
                    <td className="px-4 py-3 text-gray-700">40-42"</td>
                    <td className="px-4 py-3 text-gray-700">8-10</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">XL</td>
                    <td className="px-4 py-3 text-gray-700">40-42"</td>
                    <td className="px-4 py-3 text-gray-700">32-34"</td>
                    <td className="px-4 py-3 text-gray-700">42-44"</td>
                    <td className="px-4 py-3 text-gray-700">10-12</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">XXL</td>
                    <td className="px-4 py-3 text-gray-700">42-44"</td>
                    <td className="px-4 py-3 text-gray-700">34-36"</td>
                    <td className="px-4 py-3 text-gray-700">44-46"</td>
                    <td className="px-4 py-3 text-gray-700">12-14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Men's Size Chart */}
          <div className="mb-8">
            <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Men's Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Size</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Chest</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Waist</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">Hips</th>
                    <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">US Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">XS</td>
                    <td className="px-4 py-3 text-gray-700">34-36"</td>
                    <td className="px-4 py-3 text-gray-700">28-30"</td>
                    <td className="px-4 py-3 text-gray-700">34-36"</td>
                    <td className="px-4 py-3 text-gray-700">28-30</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">S</td>
                    <td className="px-4 py-3 text-gray-700">36-38"</td>
                    <td className="px-4 py-3 text-gray-700">30-32"</td>
                    <td className="px-4 py-3 text-gray-700">36-38"</td>
                    <td className="px-4 py-3 text-gray-700">30-32</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">M</td>
                    <td className="px-4 py-3 text-gray-700">38-40"</td>
                    <td className="px-4 py-3 text-gray-700">32-34"</td>
                    <td className="px-4 py-3 text-gray-700">38-40"</td>
                    <td className="px-4 py-3 text-gray-700">32-34</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">L</td>
                    <td className="px-4 py-3 text-gray-700">40-42"</td>
                    <td className="px-4 py-3 text-gray-700">34-36"</td>
                    <td className="px-4 py-3 text-gray-700">40-42"</td>
                    <td className="px-4 py-3 text-gray-700">34-36</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">XL</td>
                    <td className="px-4 py-3 text-gray-700">42-44"</td>
                    <td className="px-4 py-3 text-gray-700">36-38"</td>
                    <td className="px-4 py-3 text-gray-700">42-44"</td>
                    <td className="px-4 py-3 text-gray-700">36-38</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">XXL</td>
                    <td className="px-4 py-3 text-gray-700">44-46"</td>
                    <td className="px-4 py-3 text-gray-700">38-40"</td>
                    <td className="px-4 py-3 text-gray-700">44-46"</td>
                    <td className="px-4 py-3 text-gray-700">38-40</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Guide */}
          <div className="mb-8">
            <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Measurement Guide</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-futura font-semibold mb-2 text-gray-800">Bust/Chest</h4>
                  <p className="text-gray-700 text-sm">
                    Measure around the fullest part of your bust/chest, keeping the tape horizontal 
                    and snug but not tight.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-futura font-semibold mb-2 text-gray-800">Waist</h4>
                  <p className="text-gray-700 text-sm">
                    Measure around your natural waistline, which is typically the narrowest part 
                    of your torso, usually at the level of your belly button.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-futura font-semibold mb-2 text-gray-800">Hips</h4>
                  <p className="text-gray-700 text-sm">
                    Measure around the fullest part of your hips, keeping the tape horizontal 
                    and parallel to the floor.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-futura font-semibold mb-2 text-gray-800">Shoulders</h4>
                  <p className="text-gray-700 text-sm">
                    Measure across the back from the tip of one shoulder to the tip of the other, 
                    keeping the tape straight and level.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-futura font-semibold mb-2 text-gray-800">Arm Length</h4>
                  <p className="text-gray-700 text-sm">
                    Measure from the tip of your shoulder down to your wrist, with your arm 
                    slightly bent at the elbow.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-futura font-semibold mb-2 text-gray-800">Inseam</h4>
                  <p className="text-gray-700 text-sm">
                    Measure from the crotch down to the desired length, typically to the ankle 
                    for full-length pants.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fit Tips */}
          <div className="mb-8">
            <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Fit Tips</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-futura font-semibold mb-2 text-green-900">For the Best Fit</h4>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• Measure yourself regularly</li>
                  <li>• Consider your preferred fit</li>
                  <li>• Check product descriptions</li>
                  <li>• Read customer reviews</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-futura font-semibold mb-2 text-blue-900">Fit Styles</h4>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Slim: Close to body</li>
                  <li>• Regular: Standard fit</li>
                  <li>• Relaxed: Loose and comfortable</li>
                  <li>• Oversized: Extra roomy</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-lg font-futura font-semibold mb-2 text-purple-900">When in Doubt</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• Size up for comfort</li>
                  <li>• Check our return policy</li>
                  <li>• Contact customer service</li>
                  <li>• Visit our stores</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Need Help Finding Your Size?</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Still unsure about your size? Our customer service team is here to help you find the perfect fit.
            </p>
            <div className="text-sm text-gray-700">
              <p><strong>Email:</strong> sizing@aoin.com</p>
              <p><strong>Phone:</strong> 1-800-AOIN-HELP</p>
              <p><strong>Live Chat:</strong> Available during business hours</p>
              <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-white rounded-full font-gilroy font-semibold hover:bg-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
