import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-6 my-16 px-4 bg-white py-10 rounded-xl'>
            <div className='text-center max-w-2xl'>
                <h1 className='text-3xl font-bold text-amber-500 mb-3'>Our Top Specialists</h1>
                <p className='text-gray-600'>
                    Connect with our most experienced healthcare professionals.
                </p>
            </div>
            
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { 
                            navigate(`/appointment/${item._id}`); 
                            window.scrollTo(0, 0) 
                        }} 
                        className='border border-amber-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 bg-white hover:border-amber-300'
                        key={index}
                    >
                        <div className='bg-amber-100 h-48 flex items-center justify-center p-4'>
                            <img 
                                className='h-full w-full object-cover rounded-t-xl' 
                                src={item.image} 
                                alt={`Dr. ${item.name}`} 
                            />
                        </div>
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></span>
                                <span>{item.available ? 'Available Today' : "Currently Unavailable"}</span>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-900 mt-1'>{item.name}</h3>
                            <p className='text-amber-600 font-medium'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => { 
                    navigate('/doctors'); 
                    window.scrollTo(0, 0) 
                }} 
                className='bg-amber-500 text-white px-8 py-3 rounded-full mt-8 hover:bg-amber-600 transition-colors shadow-md hover:shadow-amber-200'
            >
                Browse All Doctors
            </button>
        </div>
    )
}

export default TopDoctors