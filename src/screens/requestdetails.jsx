import React, { useState } from 'react';
import "./stock.css"; 

const RequestDetails = (props) => {
    console.log(props.location.state);
    const {itemname,itemnumber,quantity} = props.location.state;
    return (
        <div className="mainWrapper">
            <strong>Product Name: {itemname}</strong><br />
            <strong>Product Number: {itemnumber}</strong><br />
            <strong>Quantity: {quantity}</strong>
        </div>
    );
};
export default RequestDetails;