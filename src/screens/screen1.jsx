import React, { useState } from 'react';

const ScreenOne = (props) => {
    console.log(props.location.state);
    const {itemname,itemnumber,quantity} = props.location.state;
    return (
        <div className="viewWrapper">
            <strong>Item Name: {itemname}</strong><br />
            <strong>Item Number: {itemnumber}</strong><br />
            <strong>Quantity: {quantity}</strong>
        </div>
    );
};
export default ScreenOne;