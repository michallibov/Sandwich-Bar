import React, { useState } from 'react'
import { Email } from '../../components/email'
import { Password } from '../../components/password'
import { Name } from '../../components/name'
import axios from 'axios'

export const SignUp = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successfulMessage, setSuccessfulMessage] = useState('');

    const signUp = async (event) => {
        event.preventDefault();

        if (validEmail && validPassword && validName) {
            try {
                const response = await axios.post("http://localhost:8800/signup", { email, password, name });
                
                if (response.data.code !== 200) {console.log("fsjd")
                    setErrorMessage(response.data.message);
                    setSuccessfulMessage('');
                } else {
                    setErrorMessage('');
                    setSuccessfulMessage(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Invalid data");
        }
    }

    return (
        <div className='container login-signup-container'>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            {successfulMessage && (
                <div className='alert alert-success' role="alert">
                    {successfulMessage}    
                </div>
            )}
            <form className="row g-3" onSubmit={signUp}>
                <div className="col-md-4">
                    <Email
                        setEmail={setEmail}
                        setValid={setValidEmail}
                        email={email}
                        valid={validEmail} />
                </div>
                <div className="col-md-4">
                    <Password
                        setPassword={setPassword}
                        setValid={setValidPassword}
                        password={password}
                        valid={validPassword}
                    />
                </div>
                <div className='col-md-4'>
                    <Name 
                        setName={setName}
                        setValid={setValidName}
                        name={name}
                        valid={validName}
                    /> 
                </div>
                <div className="col-12 submit mt-4">
                    <button className="btn btn-secondary" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}
