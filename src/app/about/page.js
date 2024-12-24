"use client";
import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-800 text-gray-800">
      <div className="w-full max-w-4xl p-8 bg-black shadow-lg rounded-lg ">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          {/* "About Us" Heading */}
          <h1 className="text-4xl font-bold text-center text-violet-600 flex-grow">
            About Us
          </h1>
          {/* Logo on the Right */}
          <Image
            src="/Custom.png"
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        {/* About Us Content */}
        <p className="text-lg text-center text-gray-400 mb-6">
          Welcome to our custom T-shirt website! We’re passionate about helping
          you create unique, personalized designs that express your style.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-violet-500 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-400">
              At our core, we aim to empower individuals and businesses with the
              ability to design and wear their creativity. Whether it’s for
              events, branding, or personal use, we’re here to make your ideas
              come to life.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-violet-500 mb-2">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Easy-to-use 3D customization tools.</li>
              <li>High-quality T-shirts that stand out.</li>
              <li>Quick and reliable delivery.</li>
              <li>Exceptional customer support.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-violet-500 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-400">
              We envision a world where everyone can effortlessly design their
              own apparel, turning imagination into wearable art.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
