import React from 'react'
import '../pages/cart/cart.css';

function CheckoutModal({ setOpenModal }) {

  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">
                <h2>Thank you!</h2>
            </div>
            <div className="mt-4">
                <h4>We already started working on your order!</h4>
                <p>Hope to see you again soon:)</p>
            </div>
            <div className="footer">
                <button type="button" className="btn btn-secondary cancel" onClick={() => setOpenModal(false)}>
                    YAY
                </button>
            </div>
        </div>
    </div>
  )
}
export default CheckoutModal;