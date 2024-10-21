import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [formContent, setFormContent] = useState({
        name: "",
        country: "",
        feedback: "",
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setFormContent({ ...formContent, [e.target.name]: e.target.value });
    }

    const Add_Feedback = async () => {
        setLoading(true);
        console.log(formContent);

        try {
            const response = await axios.post('http://localhost:3000/addfeedback', formContent, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert("Feedback added successfully");
                setLoading(false);
                setFormContent({
                    name: "",
                    country: "",
                    feedback: "",
                });
                window.location.reload();
            } else {
                alert("Feedback not added");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)', backgroundSize: 'cover', padding: '60px 0' }}>
            <div style={{ padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '0 auto', width: '50%' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ color: '#007bff', fontWeight: 'bold', fontSize: '36px' }}>We Value Your Feedback</h1>
                    <p style={{ color: '#6c757d', fontSize: '18px' }}>Your input helps us improve your experience</p>
                    <hr style={{ borderColor: '#007bff', borderWidth: '3px', width: '60px', margin: '10px auto' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Name</label>
                    <input
                        value={formContent.name}
                        onChange={changeHandler}
                        type="text"
                        style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%', marginBottom: '20px' }}
                        placeholder="Enter your name"
                        name="name"
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Country</label>
                    <input
                        value={formContent.country}
                        onChange={changeHandler}
                        type="text"
                        style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%', marginBottom: '20px' }}
                        placeholder="Enter your country"
                        name="country"
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Your Feedback</label>
                    <textarea
                        value={formContent.feedback}
                        onChange={changeHandler}
                        rows="5"
                        style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ced4da', width: '100%', marginBottom: '20px' }}
                        placeholder="Write your feedback"
                        name="feedback"
                        required
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={Add_Feedback}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease-in-out',
                            margin: '0 auto',
                            display: 'block',
                            width: 'auto'
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Submit Feedback'
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FeedbackForm;
