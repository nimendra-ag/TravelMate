import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './SignupModal.css';
import logo from "../../assets/TravalMateLogo2.png"
import google from "../../assets/google.png"
import yahoo from "../../assets/yahoo.png"

import EmailSign from '../emailSign/EmailSign';


const SignupModal = () => {

    const [user,setUser] = useState();

useEffect(() => {
  auth.onAuthStateChanged((user) => {
    setUser(user);
    console.log(user);
    
  });
}, []);


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const signInwithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
        handleClose()
    }

    const signInwithYahoo = async () => {
        try {
            await signInWithPopup(auth, yahooProvider)
            // const credential = OAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;
            // const idToken = credential.idToken;
            // console.log(accessToken);
            // console.log(idToken);
            
        } catch (error) {
            console.log(error)
        }
        handleClose()
    }

    const logOut = async () => {
        try{
            await signOut(auth);
        } catch (err){
            console.error(err);
        }
    }

    return (
        <>
            <a className='nav-signin' onClick={user ? logOut :handleShow}>{user? "Logout" : "Sign up"}</a>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>

                <Modal.Body className="text-start" style={{ padding: '20px' }}>
                    <div className="d-flex justify-content-left align-items-left">
                        <img
                            src={logo}
                            alt="Icon"
                            style={{ height: "98px", paddingBottom: "33px" }} // Add your image/icon here
                        />
                    </div>
                    <h2 className='fw-bold' style={{ paddingBottom: "25px" }}>Hello, adventurer!</h2>

                    <div className="d-flex justify-content-center">
                        <Button
                            variant="outline-dark"
                            className="d-flex align-items-center justify-content-start"
                            style={{ borderRadius: '50px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                            onClick={signInwithGoogle}
                        >
                            <img src={google} style={{ width: "30px", marginLeft: "15px" }} />
                            <span className="text-center flex-grow-1">Continue with Google</span>
                        </Button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Button
                            variant="outline-dark"
                            className="d-flex align-items-center justify-content-start"
                            style={{ borderRadius: '50px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                            onClick={signInwithYahoo}
                        >
                            <img src={yahoo} style={{ width: "30px", marginLeft: "15px" }} />
                            <span className="text-center flex-grow-1">Continue with Yahoo!</span>
                        </Button>
                    </div>

                    <EmailSign />
                    <p className="text-center" style={{ fontSize: '0.8em', color: "rgba(159, 184, 196, 1)", marginTop: "20px" }}>
                        By proceeding, you agree to our <a href="#" style={{ color: "rgba(159, 184, 196, 1)" }}>Terms of Use</a> and confirm you have read our <a href="#" style={{ color: "rgba(159, 184, 196, 1)" }}>Privacy and Cookie Statement</a>.
                    </p>
                    <p className="text-center" style={{ fontSize: '0.8em', color: "rgba(159, 184, 196, 1)" }}>
                        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" style={{ color: "rgba(159, 184, 196, 1)" }}>Privacy Policy</a> and <a href="https://policies.google.com/terms" style={{ color: "rgba(159, 184, 196, 1)" }}>Terms of Service</a> apply.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignupModal