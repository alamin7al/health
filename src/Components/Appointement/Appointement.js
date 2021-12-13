import React, { useState } from 'react';
import Navigation from '../Share/Navigation';
import AppointementHeader from './AppointementHeader';
import AvailableAppointement from './AvailableAppointement';

const Appointement = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <Navigation></Navigation>
            <AppointementHeader date={date} setDate={setDate}> </AppointementHeader>
            <AvailableAppointement date={date}></AvailableAppointement>
        </div>
    );
};

export default Appointement;