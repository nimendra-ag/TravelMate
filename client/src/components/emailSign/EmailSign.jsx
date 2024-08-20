import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './EmailSign.css';
import logo from "../../assets/TravalMateLogo2.png"
import Form from 'react-bootstrap/Form';
import emailIcon from "../../assets/email.png"


const EmailSign = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [hasAccount, setHasAccount] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const signUp = async () => {
        try{
            console.log(email);
            console.log(password);
            
            
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signed Up");
            console.log(auth.currentUser.email);
            console.log(auth.currentUser.password);
        } catch (err){
            console.error(err);
        }
    }

    const signIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed In");
            console.log(auth.currentUser.email);
            console.log(auth.currentUser.password);
        } catch (err){
            console.error(err);
        }
    }

    
    return (
        <>
            <div className="d-flex justify-content-center">
                <Button
                    variant="outline-dark"
                    className="d-flex align-items-center justify-content-start"
                    style={{ borderRadius: '50px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                    onClick={handleShow}
                >
                    <img src={emailIcon} style={{ width: "30px", marginLeft: "15px" }} />
                    <span className="text-center flex-grow-1">Continue with Email</span>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>

                <Modal.Body className="text-start" style={{ padding: '20px' }}>
                    <div className="d-flex justify-content-left align-items-left">
                        <img
                            src={logo}
                            alt="Icon"
                            style={{ height: "98px", paddingBottom: "33px" }} 
                        />
                    </div>
                    <h2 className='fw-bold' style={{ paddingBottom: "25px" }}>Hello, adventurer!</h2>


                    <Form >
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                style={{ borderRadius: '10px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                style={{ borderRadius: '10px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>




                    </Form>
                    <p>{ hasAccount ? "Already have an account?  ":"Don't have an account ?  "  } <span onClick={()=> setHasAccount(!hasAccount)} style={{fontWeight:"bold", color:"rgba(16, 77, 108,1)"}}>{ hasAccount ? " SignIn":" SignUp"}</span></p>


                    <div className="d-flex justify-content-center">
                        <Button
                            variant="outline-dark"
                            className="d-flex align-items-center justify-content-start"
                            style={{ borderRadius: '50px', marginBottom: "25px", width: "250px", height: "50px", borderWidth: "2px" }}
                            onClick={hasAccount ? signIn : signUp}
                        >

                            <span className="text-center flex-grow-1">{ !hasAccount ? "Sign up":"Sign in"}</span>
                        </Button>
                    </div>






                    <p className="text-center" style={{ fontSize: '0.8em', color: "rgba(159, 184, 196, 1)", marginTop: "20px" }}>
                        By proceeding, you agree to our <a href="#" style={{ color: "rgba(159, 184, 196, 1)" }}>Terms of Use</a> and confirm you have read our <a href="#" style={{ color: "rgba(159, 184, 196, 1)" }}>Privacy and Cookie Statement</a>.
                    </p>
                    <p className="text-center" style={{ fontSize: '0.8em', color: "rgba(159, 184, 196, 1)" }}>
                        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" style={{ color: "rgba(159, 184, 196, 1)" }}>Privacy Policy</a> and <a href="https://policies.google.com/terms" style={{ color: "rgba(159, 184, 196, 1)" }}>Terms of Service</a> apply.
                    </p>
                </Modal.Body>
            </Modal>





        </>
    )
}

export default EmailSign