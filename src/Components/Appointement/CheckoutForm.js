import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../Login/useAuth';


const CheckoutForm = ({ appointment }) => {
    const { user } = useAuth()
    const { price, patientName } = appointment
    const stripe = useStripe();
    const elements = useElements();
    // const [processing, setProcessing] = useState(false)
    const [error, setError] = useState('')
    const [clientSecreat, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecreat))

    }, [price])
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setError(error.message)
            setSuccess('')
        } else {
            setError('')
            console.log(paymentMethod);
        }
        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecreat,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message)
            setSuccess('')
        } else {
            setError('')
            setSuccess('your Payment SuccesFully')
            console.log(paymentIntent);
            // setProcessing(true)

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type='submit' disabled={!stripe} >
                    pay ${price}
                </button>
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{error}</p>
            }
        </div>
    );
};

export default CheckoutForm;


