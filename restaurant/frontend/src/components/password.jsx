import React from 'react';

export const Password = (props) => {
  const { setPassword, setValid, password, valid } = props;

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const isValid = newPassword.length >= 8;

    setPassword(newPassword);
    setValid(isValid);
  };

  return (
    <div>
      <label htmlFor="validationServer02" className="form-label">Password</label>
      <input
        type="password"
        className={'form-control ' + (valid ? 'is-valid' : 'is-invalid')}
        id="validationServer02"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <div className="valid-feedback">
        Looks good!
      </div>
      <div className='invalid-feedback'>
        Please enter a password that contains at least 8 characters.
      </div>
    </div>
  );
};
