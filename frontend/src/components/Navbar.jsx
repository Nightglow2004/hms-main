import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      {/* Logo */}
      <svg
  onClick={() => navigate('/')}
  className="w-44 h-auto cursor-pointer transition-transform hover:scale-105"
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
    fill="#333"
  >
    Quick<tspan fill="#F59E0B">Doc</tspan>
  </text>
</svg>

      {/* Desktop Navigation - Amber/orange color scheme */}
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1 hover:text-amber-600 transition-colors'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1 hover:text-amber-600 transition-colors'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1 hover:text-amber-600 transition-colors'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1 hover:text-amber-600 transition-colors'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-amber-500 w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/* User Actions - Amber/orange buttons */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 h-8 rounded-full object-cover border-2 border-amber-100' src={userData.image} alt="User" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-amber-50 rounded flex flex-col gap-4 p-4 shadow-lg'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-amber-600 cursor-pointer transition-colors'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-amber-600 cursor-pointer transition-colors'>My Appointments</p>
                <p onClick={logout} className='hover:text-amber-600 cursor-pointer transition-colors'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className='hidden md:block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md'
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setShowMenu(true)} 
          className='md:hidden p-2 focus:outline-none'
          aria-label="Open menu"
        >
          <img className='w-6' src={assets.menu_icon} alt="Menu" />
        </button>

        {/* Mobile Menu - Amber/orange scheme */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-amber-100'>
            <img src={assets.logo} className='w-36' alt="Logo" />
            <button 
              onClick={() => setShowMenu(false)} 
              className='p-2 focus:outline-none'
              aria-label="Close menu"
            >
              <img src={assets.cross_icon} className='w-7' alt="Close" />
            </button>
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/'
              className={({ isActive }) => 
                `block w-full px-4 py-3 rounded-lg text-center ${isActive ? 'bg-amber-500 text-white' : 'hover:bg-amber-50'}`
              }
            >
              HOME
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/doctors'
              className={({ isActive }) => 
                `block w-full px-4 py-3 rounded-lg text-center ${isActive ? 'bg-amber-500 text-white' : 'hover:bg-amber-50'}`
              }
            >
              ALL DOCTORS
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/about'
              className={({ isActive }) => 
                `block w-full px-4 py-3 rounded-lg text-center ${isActive ? 'bg-amber-500 text-white' : 'hover:bg-amber-50'}`
              }
            >
              ABOUT
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/contact'
              className={({ isActive }) => 
                `block w-full px-4 py-3 rounded-lg text-center ${isActive ? 'bg-amber-500 text-white' : 'hover:bg-amber-50'}`
              }
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar