import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./main-page.css";
import ScreenOne from './screen1';

const MainPage = (props) => {
    const [formValues, setFormValues] = useState({
        itemname: '',
        itemnumber:'',
        quantity:''
    });

    const handleChange = (e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        props.history.push("/screenone",[formValues])
    }

    return (
        <div className="mainWrapper">
            <form onSubmit ={handleSubmit}>
                <div className="mainContainer">
                <div>
                <label htmlFor="name" className="labelStyles">Item Name:</label>
                <input type="text" id="name" name="itemname" value={formValues.itemname} onChange={handleChange} />
                </div>
                <div className="inputStyles">
                <label htmlFor="itemnumber" className="labelStyles">Item Number:</label>
                <input type="text" id="itemnumber" name="itemnumber" value={formValues.itemnumber} onChange={handleChange}/>
                </div>
                <div className="inputStyles">
                <label htmlFor="quantity" className="labelStyles">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value={formValues.quantity} onChange={handleChange}/>
                </div>
                <button type="submit" value="Submit" onClick={()=>{props.history.push("/screenone",formValues)}}>Submit</button>
                </div>
            </form>
        </div>
    );
};
export default MainPage;