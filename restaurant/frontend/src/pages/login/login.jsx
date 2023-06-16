import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Email } from '../../components/email';
import { Password } from '../../components/password';

export const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies(['customer']);
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();

        if (validEmail && validPassword) {
        try {
            const response = await axios.post("http://localhost:8800/login", { email, password });
            console.log(response.data);
            if (response.data.code !== 200) {
                setErrorMessage(response.data.message);
                removeCookie('customer'); // Remove the 'customer' cookie
            } else {
                setErrorMessage('');
                setCookie('customer', response.data.customer, { path: '/' });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        } else {
            console.log("Invalid data");
        }
    }

    function handleLogout() {
        removeCookie('customer'); // Remove the 'customer' cookie
    }

    return (
        <div className='container login-signup-container'>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            {cookie.customer ? (
                <div>
                    <p>Would you like to log out?</p>
                    <button className='btn btn-secondary' onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form className="row g-3" onSubmit={login}>
                    <div className="col-md-6">
                        <Email
                            setEmail={setEmail}
                            setValid={setValidEmail}
                            email={email}
                            valid={validEmail}
                        />
                    </div>
                    <div className="col-md-6">
                        <Password
                            setPassword={setPassword}
                            setValid={setValidPassword}
                            password={password}
                            valid={validPassword}
                        />
                    </div>  
                    <div className="col-12 submit mt-4">
                        <button className="btn btn-secondary" type="submit">Login</button>
                        <Link to="/signup" className="btn btn-secondary">
                            Sign Up
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};
