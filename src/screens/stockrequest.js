import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './stock.css';

const StockRequestPage = (props) => {
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
                <div >
                <div>
                <label htmlFor="name" className="labelStyles">Product Name:</label>
                <input type="text" id="name" name="itemname" value={formValues.itemname} onChange={handleChange} />
                </div>
                <div className="inputStyles">
                <label htmlFor="itemnumber" className="labelStyles">Product Number:</label>
                <input type="text" id="itemnumber" name="itemnumber" value={formValues.itemnumber} onChange={handleChange}/>
                </div>
                <div className="inputStyles">
                <label htmlFor="quantity" className="labelStyles">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value={formValues.quantity} onChange={handleChange}/>
                </div>
                <button type="submit" value="Submit" onClick={()=>{props.history.push("/request",formValues)}}>Submit</button>
                </div>
            </form>
        </div>
    );
};
export default StockRequestPage;