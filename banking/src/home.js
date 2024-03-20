import React from 'react';
import Card from './context';
import bankImage from './bank.png';

function Home(){
    return (
        <Card
            bgcolor="primary"
            txtcolor="white"
            header="Bad Bank Home Page"
            title="Welcome to the bank"
            text="Please use the navigation bar to complete transactions."
            body={(<img src={bankImage} className="img-fluid" alt="Responsive image"/>)}
        />    
    );  
}

export default Home;