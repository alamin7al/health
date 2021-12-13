import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from './Booking';

const bookings = [
    {
        id: 1,
        name: 'Teeth Orthodonics',
        time: '08.00 AM - 09.00 AM',
        space: 10,
        price:23
    },
    {
        id: 2,
        name: 'Cosmetic Dentistry',
        time: '09.00 AM - 10.00 AM',
        space: 8,
        price:45
    },
    {
        id: 3,
        name: 'Teeth Cleaning',
        time: '10.00 AM - 11.00 AM',
        space: 9,
        price:90
    },
    {
        id: 4,
        name: 'Cavity Protection',
        time: '11.00 AM - 12.00 PM',
        space: 5,
        price:23
    },
    {
        id: 5,
        name: 'Pediatric Dental',
        time: '06.00 PM - 07.00 PM',
        space: 10,
        price:23
    },
    {
        id: 6,
        name: 'Oral Surgery',
        time: '07.00 PM - 08.00 PM',
        space: 10,
        price:89
    },
]

const AvailableAppointement = ({date}) => {
    const [success,setSuccess]=useState(false)
    return (
        <Container>
            <Typography variant="h4" sx={{ color: 'info.main', mb: 3 }}>Available Appointments on {date.toDateString()}</Typography>
           {success &&  <Alert severity="success">AppointementBooking SucccessFull</Alert>}
            <Grid container spacing={2}>
                {
                    bookings.map(booking => <Booking
                      date={date}
                        booking={booking}
                     setSuccess={setSuccess}
                    >
                    </Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointement;