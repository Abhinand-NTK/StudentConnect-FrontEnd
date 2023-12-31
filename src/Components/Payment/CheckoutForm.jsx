import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

// import ApiService from "../api";
const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }
  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });
    console.log(paymentMethod)

    if (error) {
      setError(error.response.data)
    }
    else {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/payment/save-stripe-info/', {
          email,
          payment_method_id: paymentMethod.id,
        });

        console.log(response.data);
        // Handle the response as needed
      } catch (apiError) {
        console.log(apiError);
        // Handle the API error as needed
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="email">
          Email Address
        </label>
        <input
          className="form-input"
          id="email"
          name="name"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="form-row">
        <label htmlFor="card-element">
          Credit or debit card
        </label>

        <CardElement
          id="card-element"
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <button type="submit" className="submit-btn">Submit Payment</button>
    </form>
  );
};
export default CheckoutForm;