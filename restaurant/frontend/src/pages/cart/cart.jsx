import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/shop-context'
import './cart.css'
import { CartItem } from './cartItem';
import Modal from './modal';
import CheckoutModal  from './checkoutModal';

export const Cart = () => {
  const { cartItems, removeFromCart, checkout } = useContext(ShopContext);
  const [openModal, setOpenModal] = useState(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [removeSandwich] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  let price = 0;


  const handleRemoveSandwich = () => {
    removeFromCart(selectedID); 
  }

  const handleModalClose = () => {
    setOpenModal(false);
    handleRemoveSandwich();
  }

  const handleCheckout = () => {
    checkout();
    setOpenCheckoutModal(true);
  }

  return (
    <div className='container'>
      <div className={`modal-container ${openModal ? 'modal-open' : ''}`}>
        {openModal && <Modal setOpenModal={setOpenModal} onClose={handleModalClose} />}
      </div>
      <div className={`cartItems ${openModal ? 'inactive' : ''}`}>
        {cartItems.length === 0 ? (
          <div className='no-items'>
            <h3>Oh no! It seems like your cart is empty! Let's fill it up:)</h3>
          </div>
        ) : (
          <div className='row'>
            <div className='col-8'>
              {cartItems.map(item => {
                
                  return (
                    <div key={item.id}>
                      <CartItem
                        data={item}
                        setModal={setOpenModal}
                        setRemoveSandwich={handleRemoveSandwich}
                        removeSandwich={removeSandwich}
                        id={setSelectedID}
                      />
                    </div>
                  );
              })}
            </div>
            <div className='col-4'>
                <div className='check'>
                  <h3 className='mb-5'>Check:</h3>
                    <div className='calculation row mb-6'>
                      {
                        cartItems.map(item => {
                          const itemPrice = item.price * item.quantity; // Calculate item price
                          price += itemPrice; // Accumulate item prices
                          return (
                            <div className='calculation-item row' key={item.id}>
                              <div className='calculation-details col-9'>
                                <span>{item.title} X {item.quantity}</span>
                              </div>
                              <div className='item-price col-3'>
                                <span>{itemPrice}.00 &#8362;</span>
                              </div>
                            </div>
                          )
                        })
                    }
                  </div>
                  <div className='total row mt-4'>
                    <div className='col-12'>
                      <h4>Total: {price}.00 &#8362;</h4>
                    </div>
                  </div>
                  <button type='button' className='btn btn-secondary checkout' onClick={handleCheckout}>Checkout</button>
                </div>
              </div>
          </div>
        )}
      </div>
      <div className='modal-container'>
        {openCheckoutModal && <CheckoutModal setOpenModal={setOpenCheckoutModal} />}
      </div>
    </div>
  );
};
