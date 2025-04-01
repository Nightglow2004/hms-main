import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='flex flex-col items-center gap-6 py-16 px-4 bg-white mt-6'>
            <div className='text-center max-w-2xl'>
                <h1 className='text-3xl font-bold text-amber-500 mb-3'>Browse by Specialty</h1>
                <p className='text-gray-600'>Connect with specialists who provide personalized care in each medical field.</p>
            </div>
            
            <div className='flex justify-start sm:justify-center gap-6 w-full overflow-x-auto pb-4 px-2'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => window.scrollTo(0, 0)} 
                        className='flex flex-col items-center group cursor-pointer flex-shrink-0 w-24 sm:w-32'
                        key={index}
                    >
                        <div className='bg-white p-4 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-amber-100 transition-all duration-300 mb-3 border border-amber-100'>
                            <img 
                                className='w-12 h-12 sm:w-16 sm:h-16 object-contain' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        <p className='text-sm font-medium text-gray-800 text-center group-hover:text-amber-600 transition-colors'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default SpecialityMenu