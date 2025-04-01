import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [docInfo, setDocInfo] = useState(false);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSolts = async () => {
        setDocSlots([]);
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1; // Correctly get 1-indexed month for storage
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTime = formattedTime;

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                        displayMonth: months[currentDate.getMonth()] // Store display month separately
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Please login to book an appointment');
            return navigate('/login');
        }

        const date = docSlots[slotIndex][0].datetime;

        let day = date.getDate();
        let month = date.getMonth() + 1; // 1-indexed for storage
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', 
                { docId, slotDate, slotTime }, 
                { headers: { token } }
            );
            if (data.success) {
                toast.success('Appointment booked successfully!');
                getDoctosData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to book appointment. Please try again.');
        }
    };

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts();
        }
    }, [docInfo]);

    return docInfo ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Doctor Details */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                    <img 
                        className="w-full h-auto rounded-xl shadow-md border-2 border-amber-100" 
                        src={docInfo.image} 
                        alt={docInfo.name} 
                    />
                </div>

                <div className="lg:w-2/3 bg-white rounded-xl shadow-sm p-6 border border-amber-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                                {docInfo.name}
                                <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
                            </h1>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-amber-600 font-medium">{docInfo.degree}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-600">{docInfo.speciality}</span>
                                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                                    {docInfo.experience} years exp
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600">Appointment fee</p>
                            <p className="text-xl font-bold text-amber-600">
                                {currencySymbol}{docInfo.fees}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <img className="w-4 h-4" src={assets.info_icon} alt="About" />
                            About
                        </h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">
                            {docInfo.about}
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="mt-10 bg-white rounded-xl shadow-sm p-6 border border-amber-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Book Your Appointment</h2>
                
                {/* Date Selection */}
                <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-3">Select Date</h3>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {docSlots.length > 0 && docSlots.map((item, index) => (
                            <div 
                                key={index}
                                onClick={() => setSlotIndex(index)}
                                className={`flex flex-col items-center justify-center min-w-20 h-20 rounded-xl cursor-pointer transition-colors ${
                                    slotIndex === index 
                                        ? 'bg-amber-600 text-white' 
                                        : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
                                }`}
                            >
                                <span className="text-sm font-medium">
                                    {item[0]?.displayMonth || months[new Date().getMonth()]}
                                </span>
                                <span className="text-sm font-medium">
                                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                                </span>
                                <span className="text-lg font-semibold">
                                    {item[0] && item[0].datetime.getDate()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Time Selection */}
                <div className="mb-8">
                    <h3 className="text-gray-700 font-medium mb-3">Available Time Slots</h3>
                    <div className="flex flex-wrap gap-3">
                        {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setSlotTime(item.time)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    item.time === slotTime
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
                                }`}
                            >
                                {item.time.toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Book Button */}
                <button 
                    onClick={bookAppointment}
                    disabled={!slotTime}
                    className={`w-full py-3 rounded-xl font-medium text-white transition-colors ${
                        slotTime 
                            ? 'bg-amber-600 hover:bg-amber-700 shadow-md'
                            : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    {slotTime ? 'Confirm Appointment' : 'Select a time slot'}
                </button>
            </div>

            {/* Related Doctors */}
            <div className="mt-16">
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading doctor information...</p>
        </div>
    );
};

export default Appointment;