import React from 'react'
import logo from "../../assets/Logo.png"

const Footer = () => {
    return (
        <div >
            <div style={{ height: "522px",  backgroundColor: "#0A2E41" }} className="d-flex">







                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "522px", width: "33.33%" }}>



                    <div className='mb-5'>
                        <img src={logo} alt="logo" style={{ height: "244px", width: "274px" }} />
                    </div>

                    <div>
                        <p className='text-white text-center ' style={{ fontSize: '22px', }}>
                            "Bringing You Closer to the World’s <br /> Best Travel Experiences"
                        </p>

                    </div>


                </div>





                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "522px", width: "33.33%" }}>



                    <div>
                        <p className='text-white text-center ' style={{ fontSize: '30px', }}>
                            Quick Links
                        </p>
                    </div>



                    <div className='d-flex'>

                        <div className='my-5' style={{ marginRight: "90px" }} >

                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    Destinations
                                </a>
                            </p>





                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    Hotels
                                </a>
                            </p>


                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    About us
                                </a>
                            </p>

                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    Contact us
                                </a>
                            </p>


                        </div>

                        <div className='my-5'>


                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    Question Bank
                                </a>
                            </p>


                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    Reviews
                                </a>
                            </p>


                            <p className='text-white text-left' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    My account
                                </a>
                            </p>




                        </div>


                    </div>



                </div>
















                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "522px", width: "33.33%" }}>






                    <div className='d-flex'>

                        <div className='my-5 ' style={{ marginRight: "90px" }} >

                            <p className='text-white text-left mb-5' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    Contact us
                                </a>
                            </p>





                            <p className='text-white text-left mb-5' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    +94 XXXX XXX
                                </a>
                            </p>


                            <p className='text-white text-left mb-5' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    bncshop.lk
                                </a>
                            </p>

                            <p className='text-white text-left mb-5' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white" style={{ textDecoration: 'none' }}>
                                    34/2 wakwella,
                                    <br /> Galle
                                </a>
                            </p>


                        </div>

                        <div className='my-5 d-flex flex-column justify-content-center align-items-center'>


                            <p className='text-white text-center' style={{ fontSize: '30px' }}>
                                <a href="https://example.com" className="text-white d-block" style={{ textDecoration: 'none', textAlign: 'center' }}>
                                    Subscribe<br />
                                    us<br />
                                    Today!
                                </a>
                            </p>
                          <button className='px-5 py-3 rounded-pill '   style={{ backgroundColor: '#FCCC0A', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}>


                          Subscribe
                          </button>





                        </div>


                    </div>



                </div>









            </div>












        </div>

    )
}

export default Footer