import React, {useState } from "react";
import "./SpaceProgramForm.css";
import "./animation.css";
import logo from "../../images/logo.gif";
import { useLocation, useNavigate } from 'react-router-dom';
import PlayAudio from "../../PlayAudio";

const SpaceProgramForm = () => {
    const stripePromise = "pk_live_51NblfNCZjdGT7ryJx3kFicMIQsUtIleZtuBcHRzoJuAlhdy2s3Aks8PFg7g3bdCYTsgN0ElE253HoajenVw4wMTS00sQ9iprTM";
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [expiryDate, setExpiryDate] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const [email, setEmail] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state || {};
  //   const userData = {
  //     "message": "User created successfully",
  //     "user": {
  //         "id": 225,
  //         "first_name": "y",
  //         "last_name": "y",
  //         "email": "gvt@hb.hd",
  //         "avatar": "1736679047378-Screenshot 2025-01-11 221458.png"
  //     },
  //     "checkoutUrl": null,
  //     "session": {
  //         "id": "cs_test_a1tEdh7bwjPuJXUCCKTPKewmqMSc3fO0JHHXQoJmMtstmf9YfOIcWBIwiO",
  //         "object": "checkout.session",
  //         "adaptive_pricing": {
  //             "enabled": false
  //         },
  //         "after_expiration": null,
  //         "allow_promotion_codes": null,
  //         "amount_subtotal": 10000,
  //         "amount_total": 10000,
  //         "automatic_tax": {
  //             "enabled": false,
  //             "liability": null,
  //             "status": null
  //         },
  //         "billing_address_collection": null,
  //         "cancel_url": null,
  //         "client_reference_id": null,
  //         "client_secret": "cs_test_a1tEdh7bwjPuJXUCCKTPKewmqMSc3fO0JHHXQoJmMtstmf9YfOIcWBIwiO_secret_fidwbEhqYWAnPydgaGdgYWFgYScpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ3dgYWx3YGZxSmtGamh1aWBxbGprJz8nZGlyZHx2J3gl",
  //         "consent": null,
  //         "consent_collection": null,
  //         "created": 1736679048,
  //         "currency": "usd",
  //         "currency_conversion": null,
  //         "custom_fields": [],
  //         "custom_text": {
  //             "after_submit": null,
  //             "shipping_address": null,
  //             "submit": null,
  //             "terms_of_service_acceptance": null
  //         },
  //         "customer": null,
  //         "customer_creation": "if_required",
  //         "customer_details": null,
  //         "customer_email": null,
  //         "expires_at": 1736765448,
  //         "invoice": null,
  //         "invoice_creation": {
  //             "enabled": false,
  //             "invoice_data": {
  //                 "account_tax_ids": null,
  //                 "custom_fields": null,
  //                 "description": null,
  //                 "footer": null,
  //                 "issuer": null,
  //                 "metadata": {},
  //                 "rendering_options": null
  //             }
  //         },
  //         "livemode": false,
  //         "locale": null,
  //         "metadata": {
  //             "user_id": "225"
  //         },
  //         "mode": "payment",
  //         "payment_intent": null,
  //         "payment_link": null,
  //         "payment_method_collection": "if_required",
  //         "payment_method_configuration_details": {
  //             "id": "pmc_1OmiuACZjdGT7ryJ3xF9Ao4F",
  //             "parent": null
  //         },
  //         "payment_method_options": {
  //             "card": {
  //                 "request_three_d_secure": "automatic"
  //             }
  //         },
  //         "payment_method_types": [
  //             "card",
  //             "link"
  //         ],
  //         "payment_status": "unpaid",
  //         "phone_number_collection": {
  //             "enabled": false
  //         },
  //         "recovered_from": null,
  //         "redirect_on_completion": "always",
  //         "return_url": "https://www.yaavaay.com/return?session_id={CHECKOUT_SESSION_ID}",
  //         "saved_payment_method_options": null,
  //         "setup_intent": null,
  //         "shipping_address_collection": null,
  //         "shipping_cost": null,
  //         "shipping_details": null,
  //         "shipping_options": [],
  //         "status": "open",
  //         "submit_type": null,
  //         "subscription": null,
  //         "success_url": null,
  //         "total_details": {
  //             "amount_discount": 0,
  //             "amount_shipping": 0,
  //             "amount_tax": 0
  //         },
  //         "ui_mode": "embedded",
  //         "url": null
  //     }
  // }
    const { message, user, checkoutUrl, session } = userData;

    React.useEffect(() => {
      if(!userData){
        navigate('/');
      }
    }, []);
    
      const handleExpiryChange = (e) => {
      let value = e.target.value;

      // Remove all non-numeric characters
      value = value.replace(/\D/g, "");

      // Add a slash between the month and year (MM/YY format)
      if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }

      setExpiryDate(value);
    };

    const handleDropdownFocus = () => {
      setIsDropdownOpen(true);
    };
  
    const handleDropdownBlur = () => {
      setIsDropdownOpen(false);
    };

    const handleInputChange = (e) => {
      const input = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    const formattedInput = input
      .match(/.{1,4}/g) // Group into chunks of 4
      ?.join(" ") // Join chunks with a space
      .slice(0, 19); // Limit length to 19 (16 digits + 3 spaces)
    setCardNumber(formattedInput || "");
    };

    const handleSubmit = async (e) => {
      setIsLoading(true);
      e.preventDefault();
      try {
        setErrorMessage(null);
        setSuccessMessage(null);
        const clientSecret = session.client_secret;
        const  splitIndex = clientSecret.indexOf("_secret_");
        const Key = clientSecret.slice(0, splitIndex);

        const cardData = await cardDetail();

        if (!cardData.id) {
          setErrorMessage(cardData.error?.message || "Invalid card details");
          setIsLoading(false);
          return;
        }

        const mymyHeader = new Headers();
        mymyHeader.append("content-type", "application/x-www-form-urlencoded");
        
        const urlencoded = new URLSearchParams();
          urlencoded.append("expected_payment_method_type", "card");
          urlencoded.append("payment_method", cardData.id);
          urlencoded.append("key", stripePromise);
          urlencoded.append("client_secret", clientSecret);
        
        const requestOptions = {
          method: "POST",
          myHeader: mymyHeader,
          body: urlencoded,
          redirect: "follow"
        };

        const response= await fetch(`https://api.stripe.com/v1/payment_intents/${Key}/confirm`, requestOptions)
        const result = await response.json();

        if (result?.status === 'succeeded') {
          navigate(`/return?session_id=${result.id}`);
        } else if(result?.error){
          setErrorMessage(result.error.message);
        } else{
          setErrorMessage("Try with another card");
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        setErrorMessage("Something went wrong!");
      }

      
          // if (!stripe || !elements) {
          //   return;
          // }
      
          // Get CardElement
          // const cardElement = elements.getElement(CardElement);    
      // const clientSecret = "pi_3QenCrCZjdGT7ryJ0TOtUmTC_secret_bdBfcQDoVyVyxX9O2Rk5yR5mQ";
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
        };

        const cardDetail = async () => {
          const myHeaders = new Headers();
          myHeaders.append("content-type", "application/x-www-form-urlencoded");
      
          const urlencoded = new URLSearchParams();
          urlencoded.append("type", "card");
          urlencoded.append("card[number]", cardNumber.replace(/\D/g, ""));
          urlencoded.append("card[cvc]", cvc);
          urlencoded.append("card[exp_month]", parseInt(expiryDate.split('/')[0], 10));
          urlencoded.append("card[exp_year]", parseInt(expiryDate.split('/')[1], 10));
          urlencoded.append("billing_details[name]", name);
          urlencoded.append("billing_details[email]", email);
          urlencoded.append("billing_details[address][country]", country);
          urlencoded.append("billing_details[address][postal_code]", postalCode);
          urlencoded.append("key", stripePromise);
      
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
      
    // const handleSubmit = async (e) => {
    //   setIsLoading(true);
    //   e.preventDefault();
    //   try {
    //     setErrorMessage(null);
    //     setSuccessMessage(null);
    //     const clientSecret = session.client_secret;
    //     const  splitIndex = clientSecret.indexOf("_secret_");
    //     const Key = clientSecret.slice(0, splitIndex);

    //     const myHeader = new Headers();
    //     myHeader.append("content-type", "application/x-www-form-urlencoded");
    //     myHeader.append("origin", "https://js.stripe.com");

    //     const urlencodedCARD = new URLSearchParams();
    //     urlencodedCARD.append("type", "card");
    //     urlencodedCARD.append("card[number]", cardNumber.replace(/\D/g, ""));
    //     urlencodedCARD.append("card[cvc]", cvc);
    //     urlencodedCARD.append("card[exp_month]", parseInt(expiryDate.split('/')[0], 10));
    //     urlencodedCARD.append("card[exp_year]", parseInt(expiryDate.split('/')[1], 10));
    //     urlencodedCARD.append("billing_details[name]", name);
    //     urlencodedCARD.append("billing_details[email]", email);
    //     urlencodedCARD.append("billing_details[address][country]", country);
    //     urlencodedCARD.append("billing_details[address][postal_code]", postalCode);
    //     urlencodedCARD.append("key", stripePromise);

    //     const requestOptionsCard = {
    //       method: "POST",
    //       myHeader: myHeader,
    //       body: urlencodedCARD,
    //       redirect: "follow"
    //     };

    //     const cardResponse = await fetch("https://api.stripe.com/v1/payment_methods", requestOptionsCard);
    //     const cardData = await cardResponse.json();
    //     if (cardData?.error?.message) {
    //       setErrorMessage(cardData.error.message);
    //       return
    //     }

    //     const urlencoded = new URLSearchParams();
    //     urlencoded.append("payment_method", cardData.id);
    //     urlencoded.append("expected_amount", session.amount_total);
    //     urlencoded.append("last_displayed_line_item_group_details[subtotal]", session.amount_subtotal);
    //     urlencoded.append("last_displayed_line_item_group_details[total_exclusive_tax]", "0");
    //     urlencoded.append("last_displayed_line_item_group_details[total_inclusive_tax]", "0");
    //     urlencoded.append("last_displayed_line_item_group_details[total_discount_amount]", "0");
    //     urlencoded.append("last_displayed_line_item_group_details[shipping_rate_amount]", "0");
    //     urlencoded.append("expected_payment_method_type", "card");
    //     urlencoded.append("key", stripePromise);

    //     const requestOptions = {
    //       method: "POST",
    //       myHeader: myHeader,
    //       body: urlencoded,
    //       redirect: "follow"
    //     };

    //     const paymentResponse = await fetch( `https://api.stripe.com/v1/payment_pages/${session.id}/confirm`, requestOptions)
    //     const paymentData = await paymentResponse.json();
    //     console.log("SHAK_Payment:",paymentData);
    //     if(paymentData.status === 'complete'){
    //       navigate(`/return?session_id=${session.id}`);
    //     }else{
    //       setErrorMessage(paymentData.error.message);
    //     }
        
    //     setIsLoading(false);
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log("Error:",error);
    //     setErrorMessage("Something went wrong!");
        
    //   }
    // };

  return (
    <div className="space-container">
     <PlayAudio/>
      <div className="glass-card media-object">
        <div className="cross-icon" onClick={() => navigate("/")}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(45)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#fff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#fff"></path> </g></svg>
        </div>
        <div className="logo-wrapper">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <p className="title">Civilian Space Program</p>
        
        {/* Divider between the title and the form */}
        <div className="divider"></div>
        
        <form className="checkout-form" onSubmit={handleSubmit} >
          {/* Email Field */}
          <div className="input-group">
            <div className="icon">
          <svg className="icon" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2091 5.41992C15.5991 16.0599 8.39906 16.0499 2.78906 5.41992" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1.99023 7.39001V17.39C1.99023 18.4509 2.41166 19.4682 3.1618 20.2184C3.91195 20.9685 4.92937 21.39 5.99023 21.39H17.9902C19.0511 21.39 20.0685 20.9685 20.8186 20.2184C21.5688 19.4682 21.9902 18.4509 21.9902 17.39V7.39001C21.9902 6.32915 21.5688 5.31167 20.8186 4.56152C20.0685 3.81138 19.0511 3.39001 17.9902 3.39001H5.99023C4.92937 3.39001 3.91195 3.81138 3.1618 4.56152C2.41166 5.31167 1.99023 6.32915 1.99023 7.39001Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
          </div>
          {/* Debit Card Field */}
          <div className="input-group card-r">
            <div className="icon-card">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.6873 8.18385 22.7244 8.9671 22.7395 9.87428C22.7464 9.91516 22.75 9.95716 22.75 10C22.75 10.0353 22.7476 10.0699 22.7429 10.1039C22.75 10.6696 22.75 11.2818 22.75 11.9436V12.0564C22.75 13.8942 22.75 15.3498 22.5969 16.489C22.4392 17.6614 22.1071 18.6104 21.3588 19.3588C20.6104 20.1071 19.6614 20.4392 18.489 20.5969C17.3498 20.75 15.8942 20.75 14.0564 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24999 11.2818 1.24999 10.6696 1.25714 10.1039C1.25243 10.0699 1.25 10.0352 1.25 10C1.25 9.95716 1.25359 9.91517 1.26049 9.87429C1.27564 8.96711 1.31267 8.18385 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM2.75199 10.75C2.75009 11.1384 2.75 11.5541 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C15.9068 19.25 17.2615 19.2484 18.2892 19.1102C19.2952 18.975 19.8749 18.7213 20.2981 18.2981C20.7213 17.8749 20.975 17.2952 21.1102 16.2892C21.2484 15.2615 21.25 13.9068 21.25 12C21.25 11.5541 21.2499 11.1384 21.248 10.75H2.75199ZM21.2239 9.25H2.77607C2.79564 8.66327 2.82987 8.15634 2.88976 7.71085C3.02502 6.70476 3.27869 6.12511 3.7019 5.7019C4.12511 5.27869 4.70476 5.02502 5.71085 4.88976C6.73851 4.75159 8.09318 4.75 10 4.75H14C15.9068 4.75 17.2615 4.75159 18.2892 4.88976C19.2952 5.02502 19.8749 5.27869 20.2981 5.7019C20.7213 6.12511 20.975 6.70476 21.1102 7.71085C21.1701 8.15634 21.2044 8.66327 21.2239 9.25ZM5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16ZM11.75 16C11.75 15.5858 12.0858 15.25 12.5 15.25H14C14.4142 15.25 14.75 15.5858 14.75 16C14.75 16.4142 14.4142 16.75 14 16.75H12.5C12.0858 16.75 11.75 16.4142 11.75 16Z" fill="#fff"></path> </g></svg>
            </div>
            <input 
              type="text"
              value={cardNumber}
              onChange={(e) => handleInputChange(e)}
              placeholder="Debit Card"
              maxLength="19"
              required
            />
          </div>
          
          {/* Expiry Date and CVC on the same line */}
          <div className="input-group-row">
            <div className="input-group mr-top-0 exp-r">
              <div className="icon">
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V3.26272C8.41203 3.24999 9.1414 3.24999 9.94358 3.25H14.0564C14.8586 3.24999 15.588 3.24999 16.25 3.26272V2.5C16.25 2.08579 16.5858 1.75 17 1.75C17.4142 1.75 17.75 2.08579 17.75 2.5V3.32709C18.0099 3.34691 18.2561 3.37182 18.489 3.40313C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33855 22.5969 7.51098C22.6472 7.88567 22.681 8.29459 22.7037 8.74007C22.7337 8.82106 22.75 8.90861 22.75 9C22.75 9.06932 22.7406 9.13644 22.723 9.20016C22.75 10.0021 22.75 10.9128 22.75 11.9436V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V11.9436C1.24999 10.9127 1.24998 10.0021 1.27701 9.20017C1.25941 9.13645 1.25 9.06932 1.25 9C1.25 8.90862 1.26634 8.82105 1.29627 8.74006C1.31895 8.29458 1.35276 7.88566 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40313C5.7439 3.37182 5.99006 3.34691 6.25 3.32709V2.5C6.25 2.08579 6.58579 1.75 7 1.75ZM2.76309 9.75C2.75032 10.4027 2.75 11.146 2.75 12V14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14V12C21.25 11.146 21.2497 10.4027 21.2369 9.75H2.76309ZM21.1683 8.25H2.83168C2.8477 8.06061 2.86685 7.88123 2.88976 7.71085C3.02502 6.70476 3.27869 6.12511 3.7019 5.7019C4.12511 5.27869 4.70476 5.02502 5.71085 4.88976C6.73851 4.75159 8.09318 4.75 10 4.75H14C15.9068 4.75 17.2615 4.75159 18.2892 4.88976C19.2952 5.02502 19.8749 5.27869 20.2981 5.7019C20.7213 6.12511 20.975 6.70476 21.1102 7.71085C21.1331 7.88123 21.1523 8.06061 21.1683 8.25ZM16.5 15.75C16.0858 15.75 15.75 16.0858 15.75 16.5C15.75 16.9142 16.0858 17.25 16.5 17.25C16.9142 17.25 17.25 16.9142 17.25 16.5C17.25 16.0858 16.9142 15.75 16.5 15.75ZM14.25 16.5C14.25 15.2574 15.2574 14.25 16.5 14.25C17.7426 14.25 18.75 15.2574 18.75 16.5C18.75 17.7426 17.7426 18.75 16.5 18.75C15.2574 18.75 14.25 17.7426 14.25 16.5Z" fill="#fff"></path> </g></svg>
              </div>
              <input 
                type="text" 
                value={expiryDate} 
                onChange={handleExpiryChange} 
                placeholder="MM/YY" 
                maxLength="5"
                required
              />
            </div>
            <div className="input-group mr-top-0 cvc-r">
              <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 13.25C12.4142 13.25 12.75 13.5858 12.75 14V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V14C11.25 13.5858 11.5858 13.25 12 13.25Z" fill="#fff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M5.25 9.30277V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V9.30277C18.9768 9.31872 19.1906 9.33948 19.3918 9.36652C20.2919 9.48754 21.0497 9.74643 21.6517 10.3483C22.2536 10.9503 22.5125 11.7081 22.6335 12.6082C22.75 13.4752 22.75 14.5775 22.75 15.9451V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6516C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6516C1.74643 21.0497 1.48754 20.2919 1.36652 19.3918C1.24996 18.5248 1.24998 17.4225 1.25 16.0549V15.9451C1.24998 14.5775 1.24996 13.4752 1.36652 12.6082C1.48754 11.7081 1.74643 10.9503 2.34835 10.3483C2.95027 9.74643 3.70814 9.48754 4.60825 9.36652C4.80938 9.33948 5.02317 9.31872 5.25 9.30277ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V9.25344C16.8765 9.24999 16.4784 9.24999 16.0549 9.25H7.94513C7.52161 9.24999 7.12353 9.24999 6.75 9.25344V8ZM4.80812 10.8531C4.07435 10.9518 3.68577 11.1322 3.40901 11.409C3.13225 11.6858 2.9518 12.0743 2.85315 12.8081C2.75159 13.5635 2.75 14.5646 2.75 16C2.75 17.4354 2.75159 18.4365 2.85315 19.1919C2.9518 19.9257 3.13225 20.3142 3.40901 20.591C3.68577 20.8678 4.07435 21.0482 4.80812 21.1469C5.56347 21.2484 6.56459 21.25 8 21.25H16C17.4354 21.25 18.4365 21.2484 19.1919 21.1469C19.9257 21.0482 20.3142 20.8678 20.591 20.591C20.8678 20.3142 21.0482 19.9257 21.1469 19.1919C21.2484 18.4365 21.25 17.4354 21.25 16C21.25 14.5646 21.2484 13.5635 21.1469 12.8081C21.0482 12.0743 20.8678 11.6858 20.591 11.409C20.3142 11.1322 19.9257 10.9518 19.1919 10.8531C18.4365 10.7516 17.4354 10.75 16 10.75H8C6.56459 10.75 5.56347 10.7516 4.80812 10.8531Z" fill="#fff"></path> </g></svg>
              </div>
              <input 
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="CVC"
                maxLength="3"
                required
                />
            </div>
          </div>

          <div className="input-group">
            <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z" fill="#fff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12.25C9.96067 12.25 8.07752 12.7208 6.67815 13.5204C5.3 14.3079 4.25 15.5101 4.25 17C4.25 18.4899 5.3 19.6921 6.67815 20.4796C8.07752 21.2792 9.96067 21.75 12 21.75C14.0393 21.75 15.9225 21.2792 17.3219 20.4796C18.7 19.6921 19.75 18.4899 19.75 17C19.75 15.5101 18.7 14.3079 17.3219 13.5204C15.9225 12.7208 14.0393 12.25 12 12.25ZM5.75 17C5.75 16.2807 6.26701 15.483 7.42236 14.8228C8.55649 14.1747 10.1733 13.75 12 13.75C13.8267 13.75 15.4435 14.1747 16.5776 14.8228C17.733 15.483 18.25 16.2807 18.25 17C18.25 17.7193 17.733 18.517 16.5776 19.1772C15.4435 19.8253 13.8267 20.25 12 20.25C10.1733 20.25 8.55649 19.8253 7.42236 19.1772C6.26701 18.517 5.75 17.7193 5.75 17Z" fill="#fff"></path> </g></svg>
            </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full name on Card"
                required
              />
          </div>
          
          {/* Country Dropdown */}
          <div className="input-group">
            <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.25 8.10747C5.25 4.3328 8.25958 1.25 12 1.25C15.7404 1.25 18.75 4.3328 18.75 8.10747C18.75 9.9148 18.2356 11.85 17.3281 13.5209C16.4221 15.1891 15.0919 16.6514 13.4148 17.4353C12.517 17.8549 11.483 17.8549 10.5852 17.4353C8.90807 16.6514 7.57789 15.1891 6.6719 13.5209C5.76445 11.85 5.25 9.9148 5.25 8.10747ZM12 2.75C9.113 2.75 6.75 5.13601 6.75 8.10747C6.75 9.64677 7.19305 11.3375 7.99005 12.805C8.78851 14.2752 9.90972 15.4638 11.2204 16.0764C11.7156 16.3079 12.2844 16.3079 12.7796 16.0764C14.0903 15.4638 15.2115 14.2752 16.01 12.805C16.8069 11.3375 17.25 9.64677 17.25 8.10747C17.25 5.13601 14.887 2.75 12 2.75ZM12 6.75C11.3096 6.75 10.75 7.30964 10.75 8C10.75 8.69036 11.3096 9.25 12 9.25C12.6904 9.25 13.25 8.69036 13.25 8C13.25 7.30964 12.6904 6.75 12 6.75ZM9.25 8C9.25 6.48122 10.4812 5.25 12 5.25C13.5188 5.25 14.75 6.48122 14.75 8C14.75 9.51878 13.5188 10.75 12 10.75C10.4812 10.75 9.25 9.51878 9.25 8ZM3.62731 14.5342C3.88455 14.8589 3.82989 15.3306 3.50523 15.5878C2.93157 16.0424 2.75 16.443 2.75 16.75C2.75 16.993 2.86028 17.288 3.19064 17.6296C3.52438 17.9747 4.04582 18.3252 4.75556 18.6471C6.00981 19.2159 7.74351 19.6466 9.75 19.8343V19.375C9.75 19.0807 9.9221 18.8136 10.1901 18.692C10.4581 18.5704 10.7724 18.6168 10.9939 18.8106L12.4939 20.1231C12.6566 20.2655 12.75 20.4712 12.75 20.6875C12.75 20.9038 12.6566 21.1095 12.4939 21.2519L10.9939 22.5644C10.7724 22.7582 10.4581 22.8046 10.1901 22.683C9.9221 22.5614 9.75 22.2943 9.75 22V21.3404C7.56512 21.1487 5.60927 20.6813 4.13599 20.0131C3.32214 19.644 2.62069 19.1979 2.11244 18.6724C1.60081 18.1434 1.25 17.494 1.25 16.75C1.25 15.7998 1.81667 15.012 2.5737 14.4122C2.89836 14.1549 3.37008 14.2096 3.62731 14.5342ZM20.3727 14.5342C20.6299 14.2096 21.1016 14.1549 21.4263 14.4122C22.1833 15.012 22.75 15.7998 22.75 16.75C22.75 18.1281 21.5819 19.1606 20.2034 19.8514C18.7617 20.5738 16.791 21.0851 14.5756 21.3096C14.1635 21.3514 13.7956 21.0512 13.7538 20.6391C13.7121 20.227 14.0123 19.859 14.4244 19.8173C16.522 19.6047 18.3014 19.1266 19.5314 18.5103C20.8246 17.8623 21.25 17.2066 21.25 16.75C21.25 16.443 21.0684 16.0424 20.4948 15.5878C20.1701 15.3306 20.1155 14.8589 20.3727 14.5342Z" fill="#fff"></path> </g></svg>
            </div>
            <select
              className={isDropdownOpen ? "open" : (country != '' ? "color-cc" : "")}
              onFocus={handleDropdownFocus}
              onBlur={handleDropdownBlur}
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              >
              <option value="" disabled hidden>
                Select Country
              </option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Åland Islands</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antarctica</option>
              <option value="AG">Antigua &amp; Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermuda</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BA">Bosnia &amp; Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BR">Brazil</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo - Brazzaville</option>
              <option value="CD">Congo - Kinshasa</option>
              <option value="CR">Costa Rica</option>
              <option value="HR">Croatia</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czechia</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="EE">Estonia</option>
              <option value="SZ">Eswatini</option>
              <option value="ET">Ethiopia</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GR">Greece</option>
              <option value="GD">Grenada</option>
              <option value="GT">Guatemala</option>
              <option value="GN">Guinea</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong SAR China</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IE">Ireland</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JO">Jordan</option>
              <option value="KE">Kenya</option>
              <option value="KR">South Korea</option>
              <option value="KW">Kuwait</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MO">Macao SAR China</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MX">Mexico</option>
              <option value="MD">Moldova</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar (Burma)</option>
              <option value="NA">Namibia</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NG">Nigeria</option>
              <option value="MK">North Macedonia</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PA">Panama</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="QA">Qatar</option>
              <option value="RO">Romania</option>
              <option value="RU">Russia</option>
              <option value="RW">Rwanda</option>
              <option value="SA">Saudi Arabia</option>
              <option value="RS">Serbia</option>
              <option value="SG">Singapore</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="ZA">South Africa</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="TW">Taiwan</option>
              <option value="TH">Thailand</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Vietnam</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
            </select>

          </div>
          <div className="input-group">
            <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
              <input 
                type="text" 
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
                required
              />
          </div>
          {errorMessage && <div className="error-p-container"><p className="error-p">{errorMessage}</p></div>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <button
            className={`confirm-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}  >
            {!isLoading && 'Confirm'}
            {isLoading && 
              <div style={{height:20}}>
                <span class="loader"></span>
            </div>
            }
          </button>

        </form>
      
      </div>
    </div>
  );
};

// Wrap your form in the Stripe Elements provider
const StripCUstomPaymentForm = () => (
    <SpaceProgramForm />
);

export default StripCUstomPaymentForm;
