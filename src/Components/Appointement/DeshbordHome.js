import { Grid } from '@mui/material';
import { useState } from 'react';
import Calender from '../Share/Calender';
import Appointements from './Appointements';
const DeshbordHome = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div>
             <Grid container spacing={2}>
                    <Grid item xs={12} md={5} sm={5}>
                        <Calender date={date}setDate={setDate}></Calender>
                    </Grid>
                    <Grid item xs={12} md={7} sm={7}>
                        <Appointements date={date}></Appointements>
                    </Grid>
                </Grid>
        </div>
    );
};

export default DeshbordHome;