// PaypalButton.js
import React from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const style = { layout: 'vertical' };

function ButtonWrapper({ showSpinner, createOrder, onApprove, disabled }) {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons style={style} createOrder={createOrder} onApprove={onApprove} disabled={disabled || isPending}/>
    </>
  );
}

export default function PaypalButton({ onApprove, disabled, productPrice, quantity }) {
  // Ensure productPrice and quantity are valid numbers
  const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);

  // Check if both productPrice and quantity are valid numbers
  if (!isValidNumber(productPrice) || !isValidNumber(quantity)) {
    console.error('Invalid productPrice or quantity');
    return null; // or handle the error in your preferred way
  }

  const totalAmount = productPrice * quantity;
  console.log("TotalAmount in Paypal: ", totalAmount);

  const createOrder = (totalAmount) => (data, actions) => {
    const order = {
      purchase_units: [
        {
          amount: {
            value: totalAmount,
            currency_code: 'USD',
          },
        },
      ],
    };

    console.log('Order details:', order);

    return actions.order.create(order);
  };

  return (
    <div style={{ maxWidth: '750px', minHeight: '200px' }} onClick={console.log(productPrice, quantity)}>
      <PayPalScriptProvider
        options={{
          client_id: 'AVI65tOWTkV-pNjU3etkZnwO-55p66QnYq2lZ_VSP7fO-DRTIoURD1Lc9_OukLPln_-gUTF74mIeQoks',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <ButtonWrapper showSpinner={false} createOrder={createOrder(totalAmount)} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
}
