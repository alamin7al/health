import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51K4VazLqEpkIafbhxY78CAju4W7myrBb1EUXOHaLUxJOfXiIOkgDdAz80kTGlvo21krfN9GaSpjIaK8wrNm5hK8600F6Zlahrc')

const Payment = () => {
    const { appointementId } = useParams()
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/appointement/${appointementId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointementId]);
    return (
        <div>
            <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Pay: ${appointment.price}</h4>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;
