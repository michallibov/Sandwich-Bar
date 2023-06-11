import { ShopContext } from '../../context/shop-context'
import './shop.css'
import React, { useContext }/*, { useEffect, useState }*/ from 'react'

export const Shop = () => {

  const {sandwiches, addToCart} = useContext(ShopContext);

  return (
      <div className='shop'>
        <div className='container'>
          <div className='row row-cols-1 row-cols-md-2 g-4 justify-content-center'>
          {sandwiches.map(sandwich => (
              <div className='card col' key={sandwich.id}>   
                <img src={sandwich.image} className="card-img-top" alt="img"/>
                <div className="card-body" key={sandwich.id}>
                  <h5 className="card-title">{sandwich.title}</h5>
                  <p className="card-text">{sandwich.desc}</p>
                  <span>{sandwich.price}.00 &#8362;</span>
                </div>
                <button type="button" className='btn btn-outline-secondary' onClick={()=>addToCart(sandwich.id)}>Add to cart!</button>
              </div>
          ))}
          </div>
        </div>
      </div>
  )
}
