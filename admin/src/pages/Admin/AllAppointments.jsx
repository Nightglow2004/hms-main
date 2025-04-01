import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, currencySymbol } = useContext(AppContext)

  // Corrected date formatting function
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    const day = dateArray[0]
    const monthIndex = parseInt(dateArray[1]) - 1 // Convert to 0-indexed
    const year = dateArray[2]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${day} ${months[monthIndex]} ${year}`
  }

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
          <p className="text-gray-600 mt-1">{appointments.length} total appointments</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 py-4 px-6 bg-gray-50 font-medium text-gray-700">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Patient</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-3">Doctor</div>
            <div className="col-span-1">Fees</div>
            <div className="col-span-1">Status</div>
          </div>

          {appointments.map((item, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 gap-4 py-4 px-6 border-b border-gray-100 hover:bg-amber-50 transition-colors"
            >
              <div className="col-span-1 flex items-center text-gray-500">{index + 1}</div>
              
              <div className="col-span-3 flex items-center gap-3">
                <img 
                  src={item.userData.image} 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                  alt="Patient" 
                />
                <span className="text-gray-800">{item.userData.name}</span>
              </div>
              
              <div className="col-span-1 flex items-center text-gray-500">
                {calculateAge(item.userData.dob)}
              </div>
              
              <div className="col-span-2 flex items-center text-gray-600">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </div>
              
              <div className="col-span-3 flex items-center gap-3">
                <img 
                  src={item.docData.image} 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 bg-gray-100" 
                  alt="Doctor" 
                />
                <span className="text-gray-800">{item.docData.name}</span>
              </div>
              
              <div className="col-span-1 flex items-center font-medium text-amber-600">
                {currencySymbol}{item.amount}
              </div>
              
              <div className="col-span-1 flex items-center justify-end">
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
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    title="Cancel Appointment"
                  >
                    <img className="w-6 h-6" src={assets.cancel_icon} alt="Cancel" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {appointments.map((item, index) => (
            <div key={index} className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{index + 1}.</span>
                  <img 
                    src={item.userData.image} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                    alt="Patient" 
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.userData.name}</h3>
                    <p className="text-xs text-gray-500">{calculateAge(item.userData.dob)} years</p>
                  </div>
                </div>
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
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    title="Cancel Appointment"
                  >
                    <img className="w-10 h-10" src={assets.cancel_icon} alt="Cancel" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Date & Time</p>
                  <p className="text-gray-800">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500">Doctor</p>
                  <div className="flex items-center gap-2">
                    <img 
                      src={item.docData.image} 
                      className="w-6 h-6 rounded-full object-cover border border-gray-200 bg-gray-100" 
                      alt="Doctor" 
                    />
                    <span className="text-gray-800">{item.docData.name}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500">Fees</p>
                  <p className="text-amber-600 font-medium">
                    {currencySymbol}{item.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments