import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
import './cartItem.css'

export const CartItem = (props) => {
  const { id, image, price, desc, title, quantity } = props.data;
  const { addToCart, removeFromCart, updateCartItemCount, deleteItemFromCart } = useContext(ShopContext);

    const handleMinusClick = () => {
        if (quantity === 1) {
          if (!props.removeSandwich) {
            props.setModal(true);
            props.id(id);
          }
            else {
                removeFromCart(id);
                props.setRemoveSandwich(false);
            }
        } else {
            removeFromCart(id);
        }
    };

  return (
    <div className="cartItem mb-3">
      <div className="row g-0">
        <div className="col-md-5">
          <img src={image} className="img-fluid rounded-start" alt="img" />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
          </div>
          <div className="description">
            <p className="card-text">{desc}</p>
            <p className="card-text">{price}.00 &#8362;</p>
            <div className="countHandler">
              <button onClick={handleMinusClick} data-bs-toggle="modal" data-bs-target="#exampleModal">-</button>
              <input
                value={quantity}
                onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
              />
              <button onClick={() => addToCart(id)}>+</button>
            </div>
          </div>
          <div className='mt-3'>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => deleteItemFromCart(id)}
            >Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};