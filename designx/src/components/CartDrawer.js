// CartDrawer.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { useCart } from './CartContext';
import PaypalButton from './PaypalButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { state, removeFromCart } = useCart();
  const [checkoutError, setCheckoutError] = useState(null);
  const navigate = useNavigate();

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handlePayment = () => {
    const products = state.items.map((item) => ({
      productCode: item.id,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
      totalAmount: item.quantity * item.price,
    }));
  
    // Navigate to the payment screen with product details as state
    navigate('/payment', { state: { products } });
  };


  const calculateTotalAmount = () => {
    return state.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const totalAmount = calculateTotalAmount();

  const handleCheckout = async () => {
    try {
      // Prepare the array of products for the backend
      const products = state.items.map((item) => ({
        productCode: item.id,
        quantity: item.quantity,
        color: item.color, // Modify this based on your actual data structure
        size: item.size,   // Modify this based on your actual data structure
        totalAmount: item.quantity * item.price,
      }));

      // Make a POST request to create the purchase order
      const response = await axios.post('http://localhost:4000/api/purchase/create', { products }, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTkzMGIzM2UyZWRhMzBjMGU1YTQzMyIsImlhdCI6MTcwNDU3MzAwMCwiZXhwIjoxNzA3MTY1MDAwfQ.mriiAagnuxp-Z48-ft6tfVUjkTIrOwLVHPquPFRJpzQ', // Replace with your actual access token
        },
      });

      if (response.status === 201) {
        // Purchase order created successfully, you may perform additional actions if needed
        console.log('Purchase order created:', response.data);
        setCheckoutError(null);
      } else {
        console.error('Error creating purchase order:', response.data.error);
        setCheckoutError(response.data.error);
      }
    } catch (error) {
      console.error('Error creating purchase order:', error);
      setCheckoutError('Error creating purchase order. Please try again.');
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: '450px', padding: '20px' }}>
        <h2 style={{ width: '100%', display: 'flex', padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>Add To Cart <span role="img" aria-label="cart">🛒</span></h2>
        <List>
          {state.items.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.image} />
              </ListItemAvatar>
              <ListItemText
                style={{ color: 'white' }}
                primary={item.name}
                secondary={`Quantity: ${item.quantity} - Price: ${item.price}`}
              />
              <Button variant="outlined" color="primary" onClick={() => handleRemove(item.id)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
        <div style={{ marginTop: '20px', borderTop: '1px solid white', paddingTop: '10px' }}>
          <p style={{ color: 'white', fontWeight: 'bold' }}>Total Amount: ${totalAmount}</p>
          {checkoutError && <p style={{ color: 'red' }}>{checkoutError}</p>}
          <button className='cartBtn' onClick={handlePayment}>Proceed Payment</button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
