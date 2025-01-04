import React from 'react'
import logo from "../../assets/Logo.png"
import SubscribeToNewsletter from '../SubscribeToNewsletter/SubscribeToNewsletter'

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#1E5580" }}>
        <div className="container border-top">
          <footer className="py-5">
            <div className="row">
              <div className="col-6 col-md-2 mb-1">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Home</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Features</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Pricing</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">FAQs</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">About</a></li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Home</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Features</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Pricing</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">FAQs</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">About</a></li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 text">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Home</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Features</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">Pricing</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">FAQs</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-dark-50">About</a></li>
                </ul>
              </div>

              <div className="col-md-5 offset-md-1 mb-3">

                <SubscribeToNewsletter/>

              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
              <p>&copy; 2024 CineBase, Inc. All rights reserved.</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#twitter" /></svg></a></li>
                <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#instagram" /></svg></a></li>
                <li className="ms-3"><a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#facebook" /></svg></a></li>
              </ul>
            </div>
          </footer>
        </div>
      </div>

    )
}

export default Footer