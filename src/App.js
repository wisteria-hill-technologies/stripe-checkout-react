import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ stripe, setStripe ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState('');
  useEffect(() => {
    console.log('mounted!');
    setStripe(window.Stripe('pk_test_2aTYM95z89mk47yuj78Es5sE'));
  }, []);

  const handleCheckout = () => {
// When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [{sku: 'sku_FrAi44DBOlfpml', quantity: 1}],
      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: window.location.protocol + '//503fd113.ngrok.io/success',
      cancelUrl: window.location.protocol + '//503fd113.ngrok.io/canceled',
    })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          setErrorMessage(result.error.message);
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click the button below to buy
        </p>
        {
          errorMessage && (
            <p>{errorMessage}</p>
          )
        }
        <button
          style={{ backgroundColor: "#6772E5", color: "#FFF", padding: "8px 12px", border:0,borderRadius: "4px", fontSize: "1em" }}
          onClick={handleCheckout}
          role="link"
        >
          Checkout
        </button>
      </header>
    </div>
  );
}

export default App;
