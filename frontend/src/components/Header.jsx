import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleMeetHealersClick = () => {
        navigate('/doctors'); // Make sure this matches your route for TopDoctors.jsx
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl overflow-hidden shadow-md">

            {/* Text Content */}
            <div className="lg:w-1/2 flex flex-col justify-center p-10 lg:p-12 xl:p-16">
                <div className="mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-amber-800 bg-amber-100 px-3 py-1 rounded-full">HOLISTIC CARE</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Where <span className="text-amber-500">Kindness</span> <br />Meets Medicine
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Experience healthcare that treats <br className="hidden md:block" />
                    the person, not just the symptoms
                </p>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleMeetHealersClick}
                        className="bg-amber-500 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-amber-200"
                    >
                        Meet Our Healers
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="flex items-center">
                        <div className="flex -space-x-3">
                            {['1', '2', '3'].map((num, index) => (
                                <div key={index} className="w-10 h-10 bg-white border-2 border-amber-100 rounded-full flex items-center justify-center text-amber-600 font-medium">
                                    {num}
                                </div>
                            ))}
                        </div>
                        <span className="ml-3 text-sm text-gray-500">Our approach</span>
                    </div>
                </div>
            </div>

            {/* Visual Content */}
            <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-0 bg-amber-100/50">
                <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">

                        <rect width="300" height="300" fill="transparent" />

                        <rect x="75" y="130" width="150" height="40" fill="#F59E0B" />
                        <rect x="130" y="75" width="40" height="150" fill="#F59E0B" />


                        <circle cx="150" cy="150" r="80" fill="#FDE68A" fillOpacity="0.2" />
                    </svg>

                    {/* Decorative elements */}
                    <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-amber-200 rounded-full opacity-40"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-amber-100 rounded-full opacity-30"></div>
                </div>
            </div>
        </div>
    );
};

export default Header;