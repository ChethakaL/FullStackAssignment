// PaymentScreen.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import PaypalButton from '../components/PaypalButton';

function PaymentScreen() {
  const navigate = useNavigate();
  // Use useLocation instead of useParams for accessing query parameters
  const { state } = useLocation();
  console.log('Received data:', state);

  // Parse the products from state
  const productDetails = state && state.products;

  if (!productDetails || productDetails.length === 0) {
    // Handle the case where products are not available
    return <div style={{ color: 'white' }}>Products are not available</div>;
  }

  return (
    <div style={{ color: 'white' }} className='payment-screen'>
      <h2 color='white' style={{fontSize:'32px'}}>PaymentScreen</h2>
      <div className='form-container' style={{display:'flex', flexDirection:'column'}}>
        {/* Display product details */}
      {productDetails.map((product, index) => (
        <div key={index} className='payment-details'>
          <p>Product Code: {product.productCode}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
          <p>Total Amount: {product.totalAmount}</p>
          <hr /> {/* Add a separator between products */}
        </div>
      ))}

      {/* Integrate PaypalButton with product details */}
      <PaypalButton
        onApprove={(data, actions) => {
          // Handle payment approval logic
          console.log('Payment approved:', data);
          actions.order.capture().then((details) => {
            // Handle capturing payment details
            console.log('Payment details:', details);
          });
        }}
        disabled={false} // Enable or disable the button based on your logic
        // Assuming totalAmount is the sum of all products' totalAmount
        productPrice={productDetails.reduce((sum, product) => sum + product.totalAmount, 0)}
        // Assuming quantity is the sum of all products' quantity
        quantity={productDetails.reduce((sum, product) => sum + product.quantity, 0)}
      />
      </div>
    </div>
  );
}

export default PaymentScreen;
