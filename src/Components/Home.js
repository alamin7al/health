import React from 'react';
import AppointementBanner from './AppointementBanner';
import Banner from './Banner';
import Ser from './Ser';
import Navigation from './Share/Navigation';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <Ser></Ser>
            <AppointementBanner></AppointementBanner>
           
        </div>
    );
};

export default Home;