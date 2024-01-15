// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
  
        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += action.payload.quantity;
          return { ...state, items: updatedItems };
        } else {
          return { ...state, items: [...state.items, action.payload] };
        }
  
      // Add more cases as needed for your application
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
  
      // Add more cases as needed for your application
  
      default:
        return state;
    }
  };
  

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  }

  // Add more actions as needed for your application

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
