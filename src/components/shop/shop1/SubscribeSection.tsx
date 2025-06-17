import React from 'react';

const SubscribeSection = () => {
  return (
    <section className="flex flex-col w-full max-w-[1280px] mx-auto md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
      {/* Left Image */}
      <div className=" max-w-[522px] h-[389px] mx-auto md:w-1/2 mb-8 md:mb-0">
        <img
          src="/assets/images/subscribe.jpg"
          alt="Fashion Models"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Text + Form */}
      <div className="w-full md:w-1/2 md:pl-12">
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight">
          Stay in the loop with <br />
          <em className="italic font-semibold">exclusive offers, fashion news</em>, and more.
        </h2>

        <p className="mt-4 text-gray-600 text-lg">
          Subscribe to our Aoin newsletter!
        </p>

        <form className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-base"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
