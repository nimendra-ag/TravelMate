import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const SubscribeToNewsletter = () => {
    const [formData, setFormData] = useState({
        email: ''
    })

    const [isValid, setIsValid] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const changeHandler = (e) => {
        const newEmail = e.target.value
        setFormData({
            email: newEmail
        })
        setIsValid(validateEmail(newEmail))
    }

    const submitMail = async () => {
        if (!isValid) return

        try {
            const response = await axios.post('http://localhost:3000/travelmate/subscribetonewsletter', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            if (response.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully subscribed to newsletter!",
                    showConfirmButton: false,
                    timer: 1500
                })
                setFormData({ email: '' })
                setIsValid(false)
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Subscription failed",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
            <h5>Subscribe to our newsletter</h5>
            <p>Monthly digest of what's new and exciting from us.</p>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input 
                    id="newsletter1"
                    value={formData.email} 
                    onChange={changeHandler} 
                    type="email" 
                    className="form-control" 
                    placeholder="Email address" 
                    style={{ border: '0' }} 
                />
                <button 
                    onClick={submitMail} 
                    className="btn btn-danger" 
                    type="button"
                    disabled={!isValid}
                >
                    Subscribe
                </button>
            </div>
        </>
    )
}

export default SubscribeToNewsletter
