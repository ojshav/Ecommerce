import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

const sections = [
  { title: "Overview", content: "This is the product overview." },
  { title: "Materials", content: "Made from eco-friendly materials." },
  { title: "Return Policy", content: "Returns accepted within 30 days." },
];

const reviews = [
  {
    name: "Marvin McKinney",
    rating: 4,
    content: "I love this store's shirt! It's so comfortable and easy to wear with anything. I ended up buying one in every color during their sale. The quality is great too. Thank you!",
    daysAgo: "2 days ago"
  },
  {
    name: "Savannah Nguyen",
    rating: 5,
    content: "I'm so impressed with the customer service at this store! The staff was friendly and helpful, and I found the perfect shirt. It looks and feels amazing. I'll definitely be shopping here again!",
    daysAgo: "19 days ago"
  },
  {
    name: "Wade Warren",
    rating: 2,
    content: "Unfortunately, I didn't have a great experience with this store's product. The quality wasn't what I expected and it didn't fit well. I wouldn't recommend it.",
    daysAgo: "22 days ago"
  },
];

const DescriptionAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1310px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12">
      {/* Accordion Section */}
      <div className="max-w-3xl p-2 sm:p-4 pt-8 sm:pt-10 lg:pt-12 pl-0">
        <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold mb-3 sm:mb-4 text-left font-bebas">DESCRIPTION</h2>
        <div className="divide-y border-t border-b">
          {sections.map((section, index) => (
            <div key={index}>
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex font-gilroy items-center justify-between py-3 sm:py-4 text-left"
              >
                <span className="text-sm sm:text-base font-medium">{section.title}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-3xl mt-8 sm:mt-12 lg:mt-16 pl-0 p-2 sm:p-4 pt-6 sm:pt-8 lg:pt-9">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-normal text-left font-bebas">REVIEWS</h2>
            <p className="underline text-xs sm:text-sm">Showing {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
          </div>
          <button className="px-4 sm:px-6 py-2 bg-black text-white rounded-full font-gilroy text-sm sm:text-lg font-semibold w-full sm:w-auto">Write Review</button>
        </div>

        {reviews.map((review, index) => (
          <div key={index} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold font-bebas text-lg sm:text-xl uppercase truncate">{review.name}</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-base text-gray-400 font-gilroy whitespace-nowrap self-start sm:self-auto">{review.daysAgo}</p>
            </div>
            <p className="text-xs sm:text-sm text-black font-gilroy leading-relaxed">{review.content}</p>
            <hr className="mt-3 sm:mt-4" />
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default DescriptionAccordion;
