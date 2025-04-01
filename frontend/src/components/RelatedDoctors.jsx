import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-800'>
            <h1 className='text-3xl font-bold text-amber-600'>Related Specialists</h1>
            <p className='sm:w-1/2 text-center text-gray-600'>Connect with other trusted {speciality} specialists in our network.</p>
            
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-4 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                        className='border border-amber-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-amber-200 bg-white'
                        key={index}
                    >
                        <div className='bg-amber-50 h-48 flex items-center justify-center'>
                            <img className='h-full w-full object-cover' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-5'>
                            <div className={`flex items-center gap-2 text-sm mb-2 ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></span>
                                <span>{item.available ? 'Available Today' : "Currently Unavailable"}</span>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900'>{item.name}</h3>
                            <p className='text-amber-600 font-medium'>{item.speciality}</p>
                            <div className='mt-3 flex items-center gap-1'>
                                <svg className='w-4 h-4 text-amber-500' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                                <span className='text-sm text-gray-600'>{item.rating || '4.8'} (120 reviews)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors