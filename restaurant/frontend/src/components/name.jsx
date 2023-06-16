import React from 'react'

export const Name = (props) => {

    function handleChange(event) {
        const name = event.target.value;
        const isValid = /^[a-zA-Z]+$/.test(name);
        console.log(isValid)
        props.setName(name);
        props.setValid(isValid);
    }

    return (
        <div>
            <label htmlFor="validationServer01" className="form-label">Name</label>
            <input
                type="text"
                className={'form-control ' + (props.valid ? 'is-valid' : 'is-invalid')}
                id="validationServer01"
                value={props.name}
                onChange={handleChange}
                required
            />
            {props.valid ? (
                <div className="valid-feedback">Looks good!</div>
            ) : (
                <div className='invalid-feedback'>A name can only contain letters!</div>
            )}
        </div>
    )
}
