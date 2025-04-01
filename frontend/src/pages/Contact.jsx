import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-amber-500 mb-4'>
          CONTACT <span className='text-amber-700'>US</span>
        </h2>
        <div className='w-20 h-1 bg-amber-500 mx-auto'></div>
        <p className='mt-4 text-gray-500 max-w-2xl mx-auto'>
          We're here to help and answer any questions you might have.
        </p>
      </div>

      {/* Contact Content */}
      <div className='flex flex-col md:flex-row gap-12 items-center'>
        {/* Contact Image */}
        <div className='md:w-1/2'>
          <img 
            className='w-full rounded-xl shadow-lg border-2 border-amber-100' 
            src={assets.contact_image} 
            alt="Contact our office" 
          />
        </div>

        {/* Contact Information */}
        <div className='md:w-1/2 space-y-8'>
          <div className='space-y-1'>
            <h3 className='text-xl font-semibold text-amber-600'>OUR OFFICE</h3>
            <div className='text-gray-600 space-y-2'>
              <p>15 Street, GandhiNagar</p>
              <p>New Delhi, India</p>
            </div>
          </div>

          <div className='space-y-1'>
            <h3 className='text-xl font-semibold text-amber-600'>CONTACT DETAILS</h3>
            <div className='text-gray-600 space-y-2'>
              <p className='flex items-center gap-2'>
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91-999-999-9999
              </p>
              <p className='flex items-center gap-2'>
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                contact@quickdoc.com
              </p>
            </div>
          </div>

          <div className='space-y-1'>
            <h3 className='text-xl font-semibold text-amber-600'>CAREERS AT QUICKDOC</h3>
            <p className='text-gray-600'>
              Join our team of healthcare innovators and make a difference.
            </p>
            <button 
              onClick={() => navigate('/careers')}
              className='mt-4 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors'
            >
              Explore Job Opportunities
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='mt-20 bg-amber-50 rounded-xl p-8 md:p-12'>
        <h3 className='text-2xl font-bold text-amber-500 mb-6'>Send Us a Message</h3>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-gray-600 mb-2'>Name</label>
            <input 
              type="text" 
              className='w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
            />
          </div>
          <div>
            <label className='block text-gray-600 mb-2'>Email</label>
            <input 
              type="email" 
              className='w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
            />
          </div>
          <div className='md:col-span-2'>
            <label className='block text-gray-600 mb-2'>Message</label>
            <textarea 
              rows="4"
              className='w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
            ></textarea>
          </div>
          <button 
            type="submit"
            className='md:col-span-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;