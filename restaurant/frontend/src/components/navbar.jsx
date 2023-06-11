import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react' 
import './navbar.css'

export const Navbar = () => {
  const [activeContact, setActiveContact] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [activeLogo, setActiveLogo] = useState(true);

  function handleContactButtonClick() {
    if (activeCart)
      setActiveCart(!activeCart);
    
    setActiveContact(!activeContact);
  }

  function handleCartButtonClick() {
    if (activeContact)
      setActiveContact(!activeContact);
    
    setActiveCart(!activeCart);
  }

  function handleHomeButtonClick() {
    setActiveCart(false);
    setActiveContact(false);
    setActiveLogo(false);
  }

  return (
    <nav className='navbar navbar-fixed'>
      <div className='logo'> 
        <Link onClick={handleHomeButtonClick} className={activeLogo ? 'navbar-brand logo' : 'logo'} to='/'>
          <img src="/logo.png" className="d-inline-block align-top logo-img" alt="Logo" />
          Sandwich Bar
        </Link>
      </div>
      <div className='links'>
        <Link to="/contact-us" className={activeContact ? 'active' : ''} onClick={handleContactButtonClick}>Contact Us</Link>
        <Link to="/cart" className={activeCart ? 'active' : ''} onClick={handleCartButtonClick}><ShoppingCart size={32} /></Link>
      </div>
    </nav>
  )
}
