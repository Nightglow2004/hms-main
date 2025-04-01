import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat, currencySymbol } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Doctors Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <img className="w-8 h-8" src={assets.doctor_icon} alt="Doctors" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-600">Total Doctors</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <img className="w-8 h-8" src={assets.appointments_icon} alt="Appointments" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-600">Total Appointments</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <img className="w-8 h-8" src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-600">Total Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-100">
        <div className="px-6 py-4 border-b border-amber-100 bg-amber-50">
          <div className="flex items-center gap-3">
            <img className="w-5 h-5" src={assets.list_icon} alt="Bookings" />
            <h2 className="text-xl font-semibold text-gray-800">Latest Bookings</h2>
          </div>
        </div>

        <div className="divide-y divide-amber-100">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div 
              key={index} 
              className="flex items-center p-4 hover:bg-amber-50 transition-colors"
            >
              <img 
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-100" 
                src={item.docData.image} 
                alt={item.docData.name} 
              />
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.docData.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.docData.speciality} • {currencySymbol}{item.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)}, {item.slotTime}
                    </p>
                  </div>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Patient: {item.userData.name}
                  </p>
                  {item.cancelled ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Cancel Appointment"
                    >
                      <img className="w-12 h-12" src={assets.cancel_icon} alt="Cancel" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard