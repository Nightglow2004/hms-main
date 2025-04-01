import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white px-6 py-12 rounded-xl md:mx-10">
      {/* Main Footer Content */}
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">

        {/* Logo and Description */}
        <div className="md:max-w-md">
          <div
            className="flex items-center gap-3 cursor-pointer mb-5"
            onClick={() => handleNavigation('/')}
          >
            {/* Logo */}
            <svg
              className="w-44 h-auto"
              viewBox="0 0 176 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="QuickDoc Medical Logo"
            >
              {/* Rod of Asclepius (medical snake symbol) */}
              <path
                d="M30 32V12M30 22H50"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 22C50 22 45 18 45 15C45 12 48 10 50 10C52 10 55 12 55 15C55 18 50 22 50 22Z"
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M50 22C50 22 55 26 55 29C55 32 52 34 50 34C48 34 45 32 45 29C45 26 50 22 50 22Z"
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
              />

              {/* QuickDoc text - modern medical typography */}
              <text
                x="70"
                y="28"
                fontFamily="Arial, sans-serif"
                fontSize="24"
                fontWeight="bold"
                fill="#4B5563"  // Slightly darker gray for better contrast
              >
                Quick<tspan fill="#F59E0B">Doc</tspan>
              </text>
            </svg>
          </div>
          <p className="text-black">
            Connecting patients with trusted healthcare professionals since 2024.
            Our mission is to make quality healthcare accessible to everyone.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-10 md:flex md:gap-16">
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/doctors', label: 'Doctors' },
                { path: '/privacy', label: 'Privacy Policy' }
              ].map((item) => (
                <li
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="text-black hover:text-[#4B5563] cursor-pointer transition-colors"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-black">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91-999-999-9999
              </li>
              <li className="flex items-center gap-2 text-black">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                contact@quickdoc.com
              </li>
              <li
                onClick={() => handleNavigation('/contact')}
                className="mt-4 text-black hover:text-[#4B5563] cursor-pointer transition-colors"
              >
                Contact   →
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-amber-100">
        <p className="text-center text-sm text-black">
          © {new Date().getFullYear()} QuickDoc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;