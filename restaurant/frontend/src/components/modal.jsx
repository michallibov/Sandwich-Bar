import React from 'react'
import '../pages/cart/cart.css'


function Modal({ setOpenModal, onClose }) {

    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setOpenModal(false);
              }}
            ></button>
          </div>
          <div className="title">
            <h2>Are you sure you want to continue?</h2>
          </div>
          <div className="mt-4">
            <p>The sandwich quantity is 1, would you like to remove the sandwich from your cart?</p>
          </div>
          <div className="footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setOpenModal(false);
                onClose(true); 
              }}
            >
              Yes
            </button>
            <button type="button" className="btn btn-secondary cancel" onClick={() => setOpenModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
}
export default Modal;
  