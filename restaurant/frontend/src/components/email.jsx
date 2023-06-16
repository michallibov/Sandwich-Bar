import React from 'react';

export const Email = (props) => {
    
  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    props.setEmail(email);
    props.setValid(isValidEmail);
  };

  return (
    <div>
      <label htmlFor="validationServer01" className="form-label">Email</label>
      <input
        type="text"
        className={'form-control ' + (props.valid ? 'is-valid' : 'is-invalid')}
        id="validationServer01"
        value={props.email}
        onChange={handleEmailChange}
        required
      />
      {props.valid ? (
        <div className="valid-feedback">Looks good!</div>
      ) : (
        <div className='invalid-feedback'>Please enter a valid email.</div>
      )}
    </div>
  );
};
