import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header Section */}
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-amber-500 mb-4'>
          ABOUT <span className='text-amber-600'>US</span>
        </h2>
        <div className='w-20 h-1 bg-amber-500 mx-auto'></div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row gap-12 items-center mb-20'>
        <img 
          className='w-full md:w-1/2 rounded-xl shadow-lg' 
          src={assets.about_image} 
          alt="Medical professionals" 
        />
        <div className='md:w-1/2 space-y-6'>
          <p className='text-gray-700 leading-relaxed'>
            Welcome to QuickDoc, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className='text-gray-700 leading-relaxed'>
            QuickDoc is committed to excellence in healthcare technology. We continuously enhance our platform with the latest advancements to improve your experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, we're here to support you.
          </p>
          <div className='bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500'>
            <h3 className='text-xl font-semibold text-amber-800 mb-3'>Our Vision</h3>
            <p className='text-gray-700'>
              To create a seamless healthcare experience that bridges the gap between patients and providers, making quality care accessible whenever you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-amber-500 mb-4'>
          WHY <span className='text-amber-600'>CHOOSE US</span>
        </h2>
        <div className='w-20 h-1 bg-amber-500 mx-auto'></div>
      </div>

      {/* Features Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
        {[
          {
            title: "EFFICIENCY",
            description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
          },
          {
            title: "CONVENIENCE",
            description: "Access to a network of trusted healthcare professionals in your area.",
          },
          {
            title: "PERSONALIZATION",
            description: "Tailored recommendations and reminders to help you stay on top of your health.",
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className='border border-amber-200 rounded-xl p-8 flex flex-col gap-4 hover:bg-amber-50 hover:shadow-md transition-all duration-300 cursor-pointer'
            onClick={() => navigate('/services')}
          >
            <h3 className='text-lg font-bold text-amber-700'>{feature.title}</h3>
            <p className='text-gray-600'>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className='bg-amber-100 rounded-xl p-8 text-center'>
        <h3 className='text-2xl font-bold text-amber-800 mb-4'>Ready to experience better healthcare?</h3>
        <button 
          onClick={() => navigate('/doctors')}
          className='bg-amber-500 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md'
        >
          Find Your Doctor
        </button>
      </div>
    </div>
  )
}

export default About;