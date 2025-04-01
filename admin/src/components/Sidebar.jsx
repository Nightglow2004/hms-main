import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && <ul className='text-[#515151] mt-5'>

        <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.home_icon} alt='' />  {/* Reduced size */}
          <p className='hidden md:block text-sm'>Dashboard</p>  {/* Reduced text size */}
        </NavLink>
        <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block text-sm'>Appointments</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.add_icon} alt='' />
          <p className='hidden md:block text-sm'>Add Doctor</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.people_icon} alt='' />
          <p className='hidden md:block text-sm'>Doctors List</p>
        </NavLink>
      </ul>}

      {dToken && <ul className='text-[#515151] mt-5'>
        <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.home_icon} alt='' />
          <p className='hidden md:block text-sm'>Dashboard</p>
        </NavLink>
        <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block text-sm'>Appointments</p>
        </NavLink>
        <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-2 py-3 px-3 md:px-6 md:min-w-64 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-amber-500' : ''}`}>
          <img className='w-5 h-5' src={assets.people_icon} alt='' />
          <p className='hidden md:block text-sm'>Profile</p>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar
