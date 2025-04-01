import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className='m-4'>

      {/* Dashboard Stats */}
      <div className='flex flex-wrap gap-2'>
        <div className='flex items-center gap-2 bg-white p-3 min-w-44 rounded border border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-lg font-semibold text-gray-700'>{currency} {dashData.earnings}</p>
            <p className='text-gray-500 text-sm'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-3 min-w-44 rounded border border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-lg font-semibold text-gray-700'>{dashData.appointments}</p>
            <p className='text-gray-500 text-sm'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-3 min-w-44 rounded border border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-lg font-semibold text-gray-700'>{dashData.patients}</p>
            <p className='text-gray-500 text-sm'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white mt-8 rounded border border-gray-200'>
        <div className='flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-b'>
          <img className='w-5' src={assets.list_icon} alt="" />
          <p className='font-semibold text-gray-700 text-sm'>Latest Bookings</p>
        </div>

        <div className='pt-3'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-4 py-2 gap-2 hover:bg-amber-100' key={index}>
              <img className='rounded-full w-8 h-8' src={item.userData.image} alt="" />
              <div className='flex-1 text-xs'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex gap-1'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-6 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-6 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;
