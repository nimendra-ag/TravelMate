import React from 'react'
import beach from "../../assets/Beachactivities.png"
import { Button } from 'react-bootstrap'
import logo from "../../assets/TravalMateLogo2.png"

import surfing from "../../assets/surfing.png"
import tekling from "../../assets/Tekling.png"
import Hiking from "../../assets/Hiking.png"



const Activities = () => {
    return (
        <div>

            <div className="container mt-4  justify-content-center align-items-center">



                {/* First Row - Beach Activities and Surfing */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 mb-4 px-4 pt-5" style={{
                        backgroundImage: `url(${beach})`,
                        backgroundSize: 'cover', // Adjusts the background to cover the entire div
                        backgroundPosition: 'center',
                        height: "960px", width: "656px"
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: "880px", width: "600px" }}>
                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Beach Activities
                                </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Button
                                    className="px-4 py-1 border-0 rounded-pill"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>Discover More</div>
                                        <div>
                                            <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 mb-4" style={{ height: "960px", width: "660px" }}>
                        <div className=" mb-4 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "656px",

                            backgroundImage: `url(${surfing})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                            height: "467px", width: "656px"


                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Surfing                                </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Button
                                    className="px-4 py-1 border-0 rounded-pill"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>Discover More</div>
                                        <div>
                                            <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>




                        <div className=" mb-3 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "656px",

                            backgroundImage: `url(${tekling})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                            height: "467px", width: "656px"


                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Trekking                               </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Button
                                    className="px-4 py-1 border-0 rounded-pill"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>Discover More</div>
                                        <div>
                                            <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>




                    </div>

                </div>




                



                {/* Third Row - Hiking (full width) */}


                <div className=" mb-3 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "1358px",

                            backgroundImage: `url(${Hiking})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                            height: "467px", width: "1358px"


                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Trekking                               </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Button
                                    className="px-4 py-1 border-0 rounded-pill"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div>Discover More</div>
                                        <div>
                                            <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                





                {/* Fourth Row - Food and Cultural Attractions */}
                {/* <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card " style={{ height: "467px", width: "656px" }}>
                            
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title">Food</h5>
                                <a href="#" className="btn btn-primary mt-2">
                                    Discover More
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card " style={{ height: "467px", width: "656px" }}>
                           
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title">Cultural Attractions</h5>
                                <a href="#" className="btn btn-primary mt-2">
                                    Discover More
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>


    )
}

export default Activities