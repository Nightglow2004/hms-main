import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                // Reset form
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <form onSubmit={onSubmitHandler} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Doctor</h2>
                
                {/* Image Upload */}
                <div className="flex items-center gap-6 mb-8">
                    <label htmlFor="doc-img" className="cursor-pointer group">
                        <div className="relative">
                            <img 
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 group-hover:border-amber-500 transition-colors" 
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                alt="Doctor preview" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                        </div>
                    </label>
                    <div>
                        <p className="text-gray-700 font-medium">Upload doctor picture</p>
                        <p className="text-sm text-gray-500">JPG, PNG (Max 2MB)</p>
                    </div>
                    <input 
                        onChange={(e) => setDocImg(e.target.files[0])} 
                        type="file" 
                        id="doc-img" 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Full Name</label>
                            <input 
                                onChange={e => setName(e.target.value)} 
                                value={name} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                type="text" 
                                placeholder="Dr. John Smith" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Email Address</label>
                            <input 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                type="email" 
                                placeholder="doctor@example.com" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Password</label>
                            <input 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                type="password" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Years of Experience</label>
                            <select 
                                onChange={e => setExperience(e.target.value)} 
                                value={experience} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(year => (
                                    <option key={year} value={`${year} Year`}>{year} {year === 1 ? 'Year' : 'Years'}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Consultation Fee</label>
                            <input 
                                onChange={e => setFees(e.target.value)} 
                                value={fees} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                type="number" 
                                placeholder="500" 
                                required 
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Speciality</label>
                            <select 
                                onChange={e => setSpeciality(e.target.value)} 
                                value={speciality} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                <option value="General physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatrician</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Degree</label>
                            <input 
                                onChange={e => setDegree(e.target.value)} 
                                value={degree} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                type="text" 
                                placeholder="MBBS, MD, etc." 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Address</label>
                            <input 
                                onChange={e => setAddress1(e.target.value)} 
                                value={address1} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-2" 
                                type="text" 
                                placeholder="Street address" 
                                required 
                            />
                            <input 
                                onChange={e => setAddress2(e.target.value)} 
                                value={address2} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                type="text" 
                                placeholder="City, State, ZIP" 
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">About Doctor</label>
                            <textarea 
                                onChange={e => setAbout(e.target.value)} 
                                value={about} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
                                rows="4" 
                                placeholder="Brief professional summary..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        type="submit" 
                        className="w-full md:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-colors"
                    >
                        Add Doctor
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor