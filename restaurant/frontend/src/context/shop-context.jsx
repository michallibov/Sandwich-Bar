import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';


export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [sandwiches, setSandwiches] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      Cookies.set('cart', JSON.stringify(cartItems));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cartItems]);

  useEffect(() => {
    const fetchSandwiches = async () => {
      try {
        const res = await axios.get("http://localhost:8800/sandwiches");
        setSandwiches(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const name = Cookies.get('cart');
    if (name) {
      setCartItems(JSON.parse(name));
    } else {
      setCartItems([]);
    }

    fetchSandwiches();
  }, []);
  
  const addToCart = (itemId) => {
    setCartItems((prev) => {
        const updatedCartItems = prev.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      const itemExists = updatedCartItems.some((item) => item.id === itemId);
  
        if (!itemExists) {
            console.log();
        const newItem = {
          id: sandwiches[itemId-1].id,
          image: sandwiches[itemId - 1].image,
          price: sandwiches[itemId - 1].price,
          desc: sandwiches[itemId - 1].desc,
          title: sandwiches[itemId - 1].title,
          quantity: 1,
        };
        updatedCartItems.push(newItem);
      }
  
      return updatedCartItems;
    });
    
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => 
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity !== 0)
    );
  };
    
    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === itemId && newAmount !== 0 ? { ...item, quantity: newAmount } : item
            ).filter((item) => item.quantity !== 0)
      );
    };
      
    const checkout = () => {
      setCartItems([]);
      Cookies.remove('cart');
    };
    
  const deleteItemFromCart = (id) => {
    setCartItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, quantity: 0 } : item
      ).filter((item) => item.quantity !== 0));
    }

    const contextValue = { sandwiches, cartItems, addToCart, removeFromCart, updateCartItemCount, deleteItemFromCart, checkout };

    return (
        <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
    );
};