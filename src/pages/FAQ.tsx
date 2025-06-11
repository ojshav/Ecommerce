import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MessengerPopup from '../components/MessengerPopup';

// FAQ Item component with accordion behavior
const FAQItem: React.FC<{
  question: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ question, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full text-left py-4"
        onClick={onToggle}
      >
        <span className="text-gray-900 font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#FF4D00]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#FF4D00]" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">
            Nulla malesuada iaculis nisi, vitae sagittis lacus laoreet in. Morbi aliquet pulvinar orci non vulputate. Donec aliquet ullamcorper gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed molestie accumsan dui, non iaculis magna mattis id. Ut consectetur massa at viverra euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent eget sem purus.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Vivamus sed est non arcu porta aliquet et vitae nulla.</li>
            <li>• Integer et lacus vitae justo fermentum rutrum. In nec ultrices massa.</li>
            <li>• Proin blandit nunc risus, at semper turpis sagittis nec.</li>
            <li>• Quisque ut dolor erat.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(1); // Second item open by default

  const faqItems = [
    {
      question: "Suspendisse ultrices pharetra libero sed interdum."
    },
    {
      question: "Fusce molestia condimentum facilisis."
    },
    {
      question: "Quisque quis nunc quis urna tempor lobortis vel non orci."
    },
    {
      question: "Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus."
    },
    {
      question: "Nulla sed sapien maximus, faucibus massa vitae."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h1 className="text-[36px] font-medium text-[#FF4D00] mb-8">Frequently Asked Questions</h1>
            <div className="space-y-2">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  isOpen={index === openIndex}
                  onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                />
              ))}
            </div>
          </div>

          {/* Support Form */}
          <div className="bg-[#FFF9E5] p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Don't find your answer? Ask for support.</h2>
            <p className="text-gray-600 mb-6">
              Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed molestie accumsan dui, non iaculis primis in faucibu raesent eget sem purus.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all"
              />
              <textarea
                placeholder="Message (Optional)"
                rows={4}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Messenger Popup */}
      <MessengerPopup />
    </div>
  );
};

export default FAQ; 