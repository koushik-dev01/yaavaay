// import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const {error: submitError} = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }

 

//     const {error} = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       clientSecret:"pi_3Qen8bCZjdGT7ryJ0GseRGW5_secret_PtvZkIZrMc81GaIeXSXXawJSG",
//       confirmParams: {
//         return_url: 'http://localhost:3000/success',
//       },
//     });

//     if (error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//       setErrorMessage(error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe || !elements}>
//         Pay
//       </button>
//       {/* Show error message to your customers */}
//       {errorMessage && <div>{errorMessage}</div>}
//     </form>
//   );
// };

// const stripePromise = loadStripe('pk_live_51NblfNCZjdGT7ryJx3kFicMIQsUtIleZtuBcHRzoJuAlhdy2s3Aks8PFg7g3bdCYTsgN0ElE253HoajenVw4wMTS00sQ9iprTM');

// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// const App = () => {
    
//     return(
//   <Elements stripe={stripePromise} options={options}>
//     <CheckoutForm />
//   </Elements>
// )};

// export default App;

















// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import "./payment.css";
// // Initialize Stripe
// const stripePromise = loadStripe("pk_live_51NblfNCZjdGT7ryJx3kFicMIQsUtIleZtuBcHRzoJuAlhdy2s3Aks8PFg7g3bdCYTsgN0ElE253HoajenVw4wMTS00sQ9iprTM");

// const CustomPaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     // Get CardElement
//     const cardElement = elements.getElement(CardElement);

    
// const clientSecret = "pi_3QewycCZjdGT7ryJ07LagFBS_secret_OSFKUZUCsMWhlnsSd2WzU059h";
//     // Confirm the payment
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: { email },
//       },
//     });

//     if (result.error) {
//       setErrorMessage(result.error.message);
//     } else if (result.paymentIntent.status === "succeeded") {
//       setPaymentSuccess(true);
//     }
//   };

//   return (
//     <div className="payment-form-container">
//       {paymentSuccess ? (
//         <h2>Payment Successful! 🎉</h2>
//       ) : (
//         <form onSubmit={handleSubmit} className="payment-form">
//           <h2>Custom Payment Form</h2>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />

//           <label>Card Details</label>
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": { color: "#aab7c4" },
//                 },
//                 invalid: { color: "#9e2146" },
//               },
//             }}
//           />

//           {errorMessage && <p className="error">{errorMessage}</p>}

//           <button type="submit" disabled={!stripe}>
//             Pay $50
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// // Wrap your form in the Stripe Elements provider
// const App = () => (
//   <Elements stripe={stripePromise}>
//     <CustomPaymentForm />
//   </Elements>
// );

// export default App;














import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


function PaymentForm() {
  const [email, setEmail] = useState('test@gmail.com');
  const [cardNumber, setCardNumber] = useState('4000002760003184');
  const [expiryDate, setExpiryDate] = useState('12/34');
  const [cvc, setCvc] = useState('123');
  const [amount, setAmount] = useState(5000); // Example amount in cents
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myHeaders1 = new Headers();
    myHeaders1.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders1.append("Authorization", "");
    
    const urlencoded1 = new URLSearchParams();
    urlencoded1.append("amount", "50");
    urlencoded1.append("currency", "usd");
    urlencoded1.append("metadata[user_id]", "007");
    
    const requestOptions1 = {
      method: "POST",
      headers: myHeaders1,
      body: urlencoded1,
      redirect: "follow"
    };
    
    fetch("https://api.stripe.com//v1/payment_intents", requestOptions1)
      .then((response) => response.json())
      .then(async (result1) => {
        console.log(result1);
        const cardData = await cardDetail();

        const clientSecret = result1.client_secret;
        const  splitIndex = clientSecret.indexOf("_secret_");
        const Key = clientSecret.slice(0, splitIndex);
        const myHeaders = new Headers();
      myHeaders.append("content-type", "application/x-www-form-urlencoded");
      
      const urlencoded = new URLSearchParams();
      // urlencoded.append("payment_method_data[type]", "card");
      // urlencoded.append("payment_method_data[billing_details][email]", "gvt@hb.hd");
      // urlencoded.append("payment_method_data[billing_details][address][postal_code]", "12345");
      // urlencoded.append("payment_method_data[card][number]", "4242424242424242");
      // urlencoded.append("payment_method_data[card][cvc]", "123");
      // urlencoded.append("payment_method_data[card][exp_month]", "12");
      // urlencoded.append("payment_method_data[card][exp_year]", "34");
      urlencoded.append("key", stripeKey);
      urlencoded.append("client_secret", clientSecret);
      urlencoded.append("expected_payment_method_type", "card");
      urlencoded.append("payment_method", cardData.id);
      
      
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };
      
      fetch(`https://api.stripe.com/v1/payment_intents/${Key}/confirm`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          console.log(result);
          if (result.status === 'succeeded') {
              setSuccessMessage('Payment successful!');
          }else{
              setErrorMessage(result.error.message)
          }
      })
      .catch((error) => setErrorMessage(error.error.message));
    })
      .catch((error) => console.error(error));


    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: cardElement,
    //     payment_user_agent: 'stripe.js/f998a153d0; stripe-js-v3/f998a153d0; card-element',
    //     // referrer: window.location.href,
    //     type:"card",
    //     card: {
    //       number: cardNumber,
    //       exp_month: parseInt(expiryDate.split('/')[0], 10),
    //       exp_year: parseInt(expiryDate.split('/')[1], 10),
    //       cvc,
    //     },
    //     billing_details: {
    //       email,
    //       address:{
    //         postal_code:"12345"
    //       }
    //     },
    //   },
    // });

    // if (result.error) {
    //   setErrorMessage(result.error.message);
    // } else if (result.paymentIntent.status === 'succeeded') {
    //   setSuccessMessage('Payment successful!');
    // }
  };

  const cardDetail = async () => {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("type", "card");
    urlencoded.append("card[number]", "4242424242424242");
    urlencoded.append("card[cvc]", "123");
    urlencoded.append("card[exp_month]", "12");
    urlencoded.append("card[exp_year]", "34");
    urlencoded.append("billing_details[name]", "asfd rff");
    urlencoded.append("billing_details[email]", "test@gami.com");
    urlencoded.append("key", "pk_live_51NblfNCZjdGT7ryJx3kFicMIQsUtIleZtuBcHRzoJuAlhdy2s3Aks8PFg7g3bdCYTsgN0ElE253HoajenVw4wMTS00sQ9iprTM");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    const cardRes = await fetch("https://api.stripe.com/v1/payment_methods", requestOptions);
    const cardData = await cardRes.json();
    return cardData;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Debit Card"
          maxLength="16"
          required
        />
      </div>

      <div className="input-group-row">
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          maxLength="5"
          required
        />
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="CVC"
          maxLength="3"
          required
        />
      </div>

      <button type="submit">Pay ${amount / 100}</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

const StripCUstomPaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripCUstomPaymentForm;

