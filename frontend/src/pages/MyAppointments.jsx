import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token, currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`
    }

    const getUserAppointments = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to fetch appointments')
        } finally {
            setIsLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return
        
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-appointment', 
                { appointmentId }, 
                { headers: { token } }
            )
            toast.success(data.message)
            getUserAppointments()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to cancel appointment')
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'QuickDoc Appointment',
            description: "Appointment Payment",
            order_id: order.id,
            theme: {
                color: '#F59E0B'
            },
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + "/api/user/verifyRazorpay", 
                        response, 
                        { headers: { token } }
                    )
                    if (data.success) {
                        toast.success('Payment successful!')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.error(error)
                    toast.error('Payment verification failed')
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-razorpay', 
                { appointmentId }, 
                { headers: { token } }
            )
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Payment failed')
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-stripe', 
                { appointmentId }, 
                { headers: { token } }
            )
            if (data.success) {
                window.location.replace(data.session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Payment failed')
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        } else {
            navigate('/login')
        }
    }, [token])

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6">My Appointments</h1>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                </div>
            ) : appointments.length === 0 ? (
                <div className="bg-amber-50 rounded-xl p-8 text-center">
                    <h3 className="text-xl font-medium text-amber-800 mb-2">
                        No appointments found
                    </h3>
                    <p className="text-gray-600 mb-4">
                        You haven&apos;t booked any appointments yet.
                    </p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
                    >
                        Book an Appointment
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {appointments.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
                            <div className="p-6 md:flex gap-6">
                                <div className="md:w-1/6 mb-4 md:mb-0">
                                    <img 
                                        className="w-full h-auto rounded-lg border-2 border-amber-100" 
                                        src={item.docData.image} 
                                        alt={item.docData.name} 
                                    />
                                </div>
                                
                                <div className="md:w-4/6">
                                    <h2 className="text-xl font-bold text-gray-800">{item.docData.name}</h2>
                                    <p className="text-amber-600 font-medium">{item.docData.speciality}</p>
                                    
                                    <div className="mt-3 space-y-2 text-gray-700">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                            <div>
                                                <p>{item.docData.address.line1}</p>
                                                <p>{item.docData.address.line2}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                            <p>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <p>Fee: {currencySymbol}{item.docData.fees}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="md:w-1/6 flex flex-col gap-3">
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                        <button 
                                            onClick={() => setPayment(item._id)}
                                            className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                    
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                        <>
                                            <button 
                                                onClick={() => appointmentStripe(item._id)}
                                                className="w-full py-2 border border-amber-200 hover:bg-amber-50 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                                <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                                            </button>
                                            <button 
                                                onClick={() => appointmentRazorpay(item._id)}
                                                className="w-full py-2 border border-amber-200 hover:bg-amber-50 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                                <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                                            </button>
                                        </>
                                    )}
                                    
                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                        <div className="text-center py-2 bg-green-100 text-green-800 rounded-lg">
                                            Payment Completed
                                        </div>
                                    )}
                                    
                                    {item.isCompleted && (
                                        <div className="text-center py-2 bg-green-100 text-green-800 rounded-lg">
                                            Appointment Completed
                                        </div>
                                    )}
                                    
                                    {!item.cancelled && !item.isCompleted && (
                                        <button 
                                            onClick={() => cancelAppointment(item._id)}
                                            className="w-full py-2 border border-red-300 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    
                                    {item.cancelled && !item.isCompleted && (
                                        <div className="text-center py-2 bg-red-100 text-red-800 rounded-lg">
                                            Cancelled
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments