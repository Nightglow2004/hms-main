import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <div className='flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200'>
      <div className='flex items-center gap-3'>
        <img 
          onClick={() => navigate('/')} 
          className='w-40 cursor-pointer transition-transform hover:scale-105' 
          src={assets.admin_logo} 
          alt="Logo" 
        />
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          aToken ? 'bg-amber-100 text-amber-800' : 'bg-amber-100 text-amber-400'
        }`}>
          {aToken ? 'Admin Panel' : 'Doctor Portal'}
        </span>
      </div>
      
      <button 
        onClick={logout}
        className='flex items-center gap-2 bg-amber-500 hover:bg-amber-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors'
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default Navbar;