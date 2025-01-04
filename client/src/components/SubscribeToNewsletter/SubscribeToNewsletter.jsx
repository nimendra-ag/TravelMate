import axios from 'axios'
import React, { useState } from 'react'

const SubscribeToNewsletter = () => {

    const [formData, setFormData] = useState({
        email: ''
    })

    const changeHandler = (e) => {
        setFormData({
            email: e.target.value
        })
    }

    const submitMail = async () => {
        try{
            const response = await axios.post('http://localhost:3000/travelmate/subscribetonewsletter', formData, {
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if(response.data.success){
                alert('Subscribed to the newsletter successfully');
            }
            else{
                alert('Subscription failed');
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <h5>Subscribe to our newsletter</h5>
            <p>Monthly digest of what's new and exciting from us.</p>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label for="newsletter1" className="visually-hidden">Email address</label>
                <input value={formData.email} onChange={changeHandler} type="email" className="form-control" placeholder="Email address" style={{ border: '0' }} />
                <button onClick={()=>{submitMail()}} className="btn btn-danger" type="button">Subscribe</button>
            </div>
        </>
    )
}

export default SubscribeToNewsletter