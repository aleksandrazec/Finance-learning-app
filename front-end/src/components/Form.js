import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TabContainer from "./tab-navigator/TabContainer";
import growthImg from "../images/growth.png";

import "../styles/Form.css"; // We'll create this CSS file

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    // };

    const logIn = async () => {
        if  (email && password) {
            try {
                
            } catch (error) {
                console.error(error);
            }
        }
    }

    return(
         <>
        <TabContainer/>

        <img src={growthImg} id="growthImg"></img>

        <div className="form-container">
           
            
            <div className="form-card">
                <div className="form-header">
                    <h1 className="form-title">Welcome to <span className="app-name">app_name</span></h1>
                    <p className="form-subtitle">Please fill in your details to continue</p>
                </div>

                <form className="modern-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        {/* <div className="form-row">
                            <div className="input-field">
                                <input 
                                    type="text" 
                                    id="name"
                                    className="form-input"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name" className="form-label">First Name</label>
                                <div className="input-underline"></div>
                            </div>
                            
                             <div className="input-field">
                                <input 
                                    type="text" 
                                    id="surname"
                                    className="form-input"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="surname" className="form-label">Last Name</label>
                                <div className="input-underline"></div>
                            </div> 
                        </div> */}

                        <div className="input-field">
                            <input 
                                type="email" 
                                id="email"
                                className="form-input"
                                placeholder=" "
                                required
                                onChange={({ target: { value: input } }) => setEmail(input)}
                                value={email}
                            />
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-underline"></div>
                        </div>

                        <div className="input-field">
                            <input 
                                type="password" 
                                id="password"
                                className="form-input"
                                placeholder=" "
                                required
                                onChange={({ target: { value: input } }) => setPassword(input)}
                                value={password}
                            />
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-underline"></div>
                        </div>
                    </div>

                    <Link to="/home" className="submit-link">
                        <button className="submit-button" onClick={() => logIn()}>
                            <span className="button-text">Get Started</span>
                            <span className="button-icon">→</span>
                        </button>
                    </Link>
                </form>

                <div className="form-footer">
                    <p className="footer-text">
                        By continuing, you agree to our <a href="#" className="footer-link">Terms</a> and <a href="#" className="footer-link">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Form;