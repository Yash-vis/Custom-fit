"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send the message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-16 pt-36 ">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-white">Contact Us</h1>
          <p className="mt-4 text-lg bg-clip-text text-transparent bg-gradient-to-b from-gray-400 to-blue-500">
          Your style, your voice! Reach out with your ideas or feedback—we’d love to hear from you 
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8">
          <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none shadow-lg"
            >
              Send Message
            </button>
          </form>
          {status && <p className="text-center text-gray-700 mt-4">{status}</p>}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-lime-700">Our Information</h2>
          <p className="mt-4 text-lg text-gray-400">You can also reach us through the following methods:</p>
          <div className="mt-8 space-y-4">
            <p className="text-lg text-gray-400">📍 Address: Purushottam Nagar Semra Bhopal, India</p>
            <p className="text-lg text-gray-400">📞 Phone: 94247****</p>
            <p className="text-lg text-gray-400">✉️ Email: yash200vi@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}