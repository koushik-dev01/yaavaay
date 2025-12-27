import React, { useCallback, useEffect, useState } from 'react';
import image from '../images/backgroundpayment.jpg';
import alpha from '../images/WITH-ALPHA-CHANNEL_GIhan_BTV_Creation_2nd-option__the-better-Y-BUTTON_Fiverr-Test_.gif'
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { PaymentElement, Elements } from "@stripe/react-stripe-js";
import image1 from '../images/gihan_btv Y-BUTTON.gif'

function Payment() {
  const [stripePromise] = useState(loadStripe("pk_live_51NblfNCZjdGT7ryJx3kFicMIQsUtIleZtuBcHRzoJuAlhdy2s3Aks8PFg7g3bdCYTsgN0ElE253HoajenVw4wMTS00sQ9iprTM"));
  const location = useLocation();
  const { userData } = location.state || {};
  console.log(userData)
  const { message, user, checkoutUrl, session } = userData;

  const options = { "clientSecret": session.client_secret };

  return (
    <section style={{ position: "relative" }}>
      <div
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Place it behind the content
        }}
      />
      <div className="container">
        <img
          src={image1}
          alt="Space Program Logo"
          className="image"
        />
        <div className='payment-container'>
          <h1 className="headline">Civilian Space Program</h1>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </section>
  );
}

export default Payment;
