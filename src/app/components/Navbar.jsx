"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-violet-950 via-purple-500 to-violet-950 w-full shadow-md fixed top-0 z-50">
      <div className="flex justify-around items-center px-4 py-2">
        {/* Logo */}
        <div className="text-lg font-bold bg-gradient-to-r from-gray-400  to-white bg-clip-text text-transparent animate-shimmer">Custom fit</div>

        {/* Navigation Links */}
        <ul
          className={`hidden sm:flex gap-8 items-center text-white font-medium`}
        >
          <li className="hover:text-yellow-300 transition duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-yellow-300 transition duration-300">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-yellow-300 transition duration-300">
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="text-white sm:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } sm:hidden flex flex-col items-center gap-4 py-2 text-white font-medium`}
      >
        <li className="hover:text-yellow-300 transition duration-300">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-yellow-300 transition duration-300">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:text-yellow-300 transition duration-300">
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
