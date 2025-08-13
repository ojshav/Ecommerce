import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const SizeCharts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Size Charts</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Find Your Perfect Fit</h2>
              <p className="text-gray-700 mb-6">
                Use our comprehensive size charts to find your ideal fit. We recommend measuring yourself 
                before ordering to ensure the best possible fit for your AOIN pieces.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">How to Measure</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Use a flexible measuring tape</li>
                  <li>• Measure over light clothing or undergarments</li>
                  <li>• Keep the tape snug but not tight</li>
                  <li>• Take measurements in inches</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Women's Size Chart</h2>
              
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
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Men's Size Chart</h2>
              
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
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Measurement Guide</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Bust/Chest</h3>
                    <p className="text-gray-700">
                      Measure around the fullest part of your bust/chest, keeping the tape horizontal 
                      and snug but not tight.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Waist</h3>
                    <p className="text-gray-700">
                      Measure around your natural waistline, which is typically the narrowest part 
                      of your torso, usually at the level of your belly button.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Hips</h3>
                    <p className="text-gray-700">
                      Measure around the fullest part of your hips, keeping the tape horizontal 
                      and parallel to the floor.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Shoulders</h3>
                    <p className="text-gray-700">
                      Measure across the back from the tip of one shoulder to the tip of the other, 
                      keeping the tape straight and level.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Arm Length</h3>
                    <p className="text-gray-700">
                      Measure from the tip of your shoulder down to your wrist, with your arm 
                      slightly bent at the elbow.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Inseam</h3>
                    <p className="text-gray-700">
                      Measure from the crotch down to the desired length, typically to the ankle 
                      for full-length pants.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Fit Tips</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">For the Best Fit</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Measure yourself regularly</li>
                    <li>• Consider your preferred fit</li>
                    <li>• Check product descriptions</li>
                    <li>• Read customer reviews</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Fit Styles</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Slim: Close to body</li>
                    <li>• Regular: Standard fit</li>
                    <li>• Relaxed: Loose and comfortable</li>
                    <li>• Oversized: Extra roomy</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-purple-900">When in Doubt</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• Size up for comfort</li>
                    <li>• Check our return policy</li>
                    <li>• Contact customer service</li>
                    <li>• Visit our stores</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">International Sizing</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">US</th>
                      <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">UK</th>
                      <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">EU</th>
                      <th className="px-4 py-3 text-left font-futura font-semibold text-gray-800">AU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-700">2-4</td>
                      <td className="px-4 py-3 text-gray-700">6-8</td>
                      <td className="px-4 py-3 text-gray-700">34-36</td>
                      <td className="px-4 py-3 text-gray-700">6-8</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">4-6</td>
                      <td className="px-4 py-3 text-gray-700">8-10</td>
                      <td className="px-4 py-3 text-gray-700">36-38</td>
                      <td className="px-4 py-3 text-gray-700">8-10</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">6-8</td>
                      <td className="px-4 py-3 text-gray-700">10-12</td>
                      <td className="px-4 py-3 text-gray-700">38-40</td>
                      <td className="px-4 py-3 text-gray-700">10-12</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">8-10</td>
                      <td className="px-4 py-3 text-gray-700">12-14</td>
                      <td className="px-4 py-3 text-gray-700">40-42</td>
                      <td className="px-4 py-3 text-gray-700">12-14</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">10-12</td>
                      <td className="px-4 py-3 text-gray-700">14-16</td>
                      <td className="px-4 py-3 text-gray-700">42-44</td>
                      <td className="px-4 py-3 text-gray-700">14-16</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Need Help Finding Your Size?</h2>
              <p className="text-gray-700 mb-4">
                Still unsure about your size? Our customer service team is here to help you find the perfect fit.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> sizing@aoin.com<br />
                  <strong>Phone:</strong> 1-800-AOIN-HELP<br />
                  <strong>Live Chat:</strong> Available during business hours<br />
                  <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SizeCharts;
