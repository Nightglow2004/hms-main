import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl shadow-xl mx-4 my-12 md:mx-8 lg:mx-12 p-8 md:p-12'>

            {/* Left Side - Content */}
            <div className='relative z-10 max-w-2xl'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                    Connect With <span className='text-amber-100'>Expert Doctors</span>
                </h1>
                <p className='mt-4 text-lg md:text-xl text-white opacity-90'>
                    100+ certified specialists ready to help you
                </p>
                
                <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                    <button 
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                        className='px-8 py-3 bg-white text-amber-600 font-medium rounded-lg hover:bg-gray-100 hover:scale-[1.02] transition-all shadow-md hover:shadow-lg'
                    >
                        Get Started Now
                    </button>
                    <button 
                        onClick={() => { navigate('/contact') }} 
                        className='px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-all'
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className='absolute -top-20 -left-20 w-40 h-40 bg-white bg-opacity-10 rounded-full'></div>
            <div className='absolute -bottom-10 -right-10 w-60 h-60 bg-orange-500 bg-opacity-20 rounded-full'></div>
        </div>
    );
};

export default Banner;