import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!userData.name) newErrors.name = 'Name is required'
        if (!userData.phone) newErrors.phone = 'Phone number is required'
        else if (!/^\d{10}$/.test(userData.phone)) newErrors.phone = 'Invalid phone number'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const updateUserProfileData = async () => {
        if (!validateForm()) return
        
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(
                backendUrl + '/api/user/update-profile', 
                formData, 
                { headers: { token } }
            )

            if (data.success) {
                toast.success('Profile updated successfully')
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setIsEdit(false)
        setImage(false)
        loadUserProfileData() // Reset any changes
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file && file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB')
            return
        }
        setImage(file)
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6">My Profile</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Picture Section */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        {isEdit ? (
                            <label htmlFor="image" className="cursor-pointer group relative">
                                <div className="relative">
                                    <img 
                                        className="w-40 h-40 rounded-full object-cover border-4 border-amber-100 group-hover:opacity-75 transition-opacity" 
                                        src={image ? URL.createObjectURL(image) : userData.image} 
                                        alt="Profile preview" 
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <img 
                                            className="w-10" 
                                            src={assets.upload_icon} 
                                            alt="Upload icon" 
                                        />
                                    </div>
                                </div>
                                <input 
                                    onChange={handleImageChange} 
                                    type="file" 
                                    id="image" 
                                    accept="image/*" 
                                    className="hidden" 
                                />
                            </label>
                        ) : (
                            <img 
                                className="w-40 h-40 rounded-full object-cover border-4 border-amber-100" 
                                src={userData.image} 
                                alt="Profile" 
                            />
                        )}
                        
                        {isEdit ? (
                            <p className="mt-3 text-sm text-gray-500 text-center">
                                Click on image to change (Max 2MB)
                            </p>
                        ) : (
                            <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
                                {userData.name}
                            </h2>
                        )}
                    </div>
                    
                    {/* Profile Details Section */}
                    <div className="md:w-2/3 space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            {isEdit ? (
                                <>
                                    <input
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="text"
                                        value={userData.name}
                                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </>
                            ) : (
                                <p className="px-4 py-2 text-gray-800">{userData.name}</p>
                            )}
                        </div>
                        
                        <hr className="border-amber-100" />
                        
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information</h3>
                            
                            <div className="space-y-4">
                                {/* Email - Not Editable */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="px-4 py-2 text-amber-600">{userData.email}</p>
                                </div>
                                
                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    {isEdit ? (
                                        <>
                                            <input
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                type="tel"
                                                value={userData.phone}
                                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                        </>
                                    ) : (
                                        <p className="px-4 py-2 text-gray-800">{userData.phone || 'Not provided'}</p>
                                    )}
                                </div>
                                
                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    {isEdit ? (
                                        <div className="space-y-2">
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                type="text"
                                                placeholder="Address Line 1"
                                                value={userData.address.line1}
                                                onChange={(e) => setUserData(prev => ({ 
                                                    ...prev, 
                                                    address: { ...prev.address, line1: e.target.value } 
                                                }))}
                                            />
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                type="text"
                                                placeholder="Address Line 2"
                                                value={userData.address.line2}
                                                onChange={(e) => setUserData(prev => ({ 
                                                    ...prev, 
                                                    address: { ...prev.address, line2: e.target.value } 
                                                }))}
                                            />
                                        </div>
                                    ) : (
                                        <p className="px-4 py-2 text-gray-800">
                                            {userData.address.line1 || 'Not provided'}
                                            {userData.address.line2 && <br />}
                                            {userData.address.line2}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <hr className="border-amber-100" />
                        
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Basic Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    {isEdit ? (
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            value={userData.gender}
                                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p className="px-4 py-2 text-gray-800">{userData.gender || 'Not specified'}</p>
                                    )}
                                </div>
                                
                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    {isEdit ? (
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            type="date"
                                            value={userData.dob}
                                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                        />
                                    ) : (
                                        <p className="px-4 py-2 text-gray-800">
                                            {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not specified'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            {isEdit ? (
                                <>
                                    <button
                                        onClick={updateUserProfileData}
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
                                    >
                                        {isLoading && (
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile