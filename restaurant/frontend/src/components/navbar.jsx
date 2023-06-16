import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react' 
import { useCookies } from 'react-cookie';
import './navbar.css'

export const Navbar = () => {
  const [activeContact, setActiveContact] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [activeLogo, setActiveLogo] = useState(true);
  const [activeLogin, setActiveLogin] = useState(false);
  const [cookies] = useCookies(['customer']);

  function handleContactButtonClick() {
    setActiveCart(false);
    setActiveLogin(false);
    setActiveContact(true);
  }

  function handleCartButtonClick() {
    setActiveContact(false);
    setActiveLogin(false);
    setActiveCart(true);
  }

  function handleHomeButtonClick() {
    setActiveCart(false);
    setActiveContact(false);
    setActiveLogo(false);
    setActiveLogin(false);
  }

  function handleLoginButton() {
    setActiveCart(false);
    setActiveContact(false);
    setActiveLogin(true);
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
        <Link to="/login"
          className={activeLogin ? 'active' : ''}
          onClick={handleLoginButton}>
            {cookies.customer ? 'Welcome back ' + cookies.customer.name + "!" : 'Login'}
        </Link>
        <Link to="/cart" className={activeCart ? 'active' : ''} onClick={handleCartButtonClick}><ShoppingCart size={25} /></Link>
      </div>
    </nav>
  )
}
