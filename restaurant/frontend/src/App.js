import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar';
import { Shop } from './pages/shop/shop'
import { Cart } from './pages/cart/cart';
import { ContactUs } from './pages/contact-us/contact-us';
import { ShopContextProvider } from './context/shop-context';
import { SignUp } from './pages/login/signUp';
import {Login} from './pages/login/login'
 
function App() {

  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
