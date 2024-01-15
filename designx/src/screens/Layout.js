// Layout.js
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Search, ShoppingCart, Twitter, User } from 'react-feather';
import CartDrawer from '../components/CartDrawer';
import axios from 'axios';

const Layout = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/profile');
  };

  const handleSearchToggle = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Make the API call here using the searchTerm
    try {
      axios.get(`http://localhost:4000/api/products/search?q=${searchTerm}`).then((response) => {
        console.log(response.data);

        // Redirect to the result page with the search term
        navigate(`/result/${searchTerm}`);
      });
    } catch (error) {
      console.error('Error searching products:', error);
      // Handle error scenarios
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src="../assets/Logo.png" alt="Logo" width="120px" onClick={handleHome}/>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          {isSearchVisible && (
            <div className="search-bar">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  placeholder="Search..."
                />
              </form>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'row', width: '5%', justifyContent: 'space-around' }}>
            <Search color="white" size={15} onClick={handleSearchToggle} />
            <ShoppingCart onClick={handleCartToggle} color="white" size={15} />
            <User color="white" size={15} onClick={handleLogin} />
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={handleCartToggle} />

      <Outlet />

      <footer className="footer">
        <div className="left">
          <img src="../assets/logo.png" alt="Company Logo" />
          <p>
          Design X: Elevate Your Style
Discover a world where innovation meets elegance with Design X. Embrace individuality, make a statement, and redefine your style with Design X.
          </p>
          <div className="social-icons" style={{padding:'20px'}}>
            <Facebook />
            <Instagram />
            <Twitter />
            <Linkedin />
          </div>
        </div>
        <div className="right">
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#return">Return Policy</a>
          <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
