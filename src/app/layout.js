import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Custom fit",
  description: "This is customizable hoodies website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
     
     <link rel="icon" href="/apple-touch-icon.png" />
   </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative w-full flex items-center justify-center">
          <Navbar/>
        </div>
        {children}
      </body>
    </html>
  );
}
