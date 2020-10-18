import React from 'react';
import NavBar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Header from './Header';

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="wrapper">
                <Header />
            </div>
            <Footer />
        </>
    );
};

export default Home;
