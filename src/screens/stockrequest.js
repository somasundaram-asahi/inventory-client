import React, { useEffect, useState } from 'react';
import axios from "axios";
import 'antd/dist/antd.css';
import './index.css';
import './stock.css';
import {
    Form,
    Input,
    Button,
    Select,
    Col,
    Card,
} from 'antd';

const StockRequestPage = (props) => {
    const [formValues, setFormValues] = useState({
        products: [],
        itemCode:"",
        quantity:"",
        id:""
    });

    useEffect(() => {
        axios.get('/item')
        .then(response => {
            const resData = response.data;
            setFormValues({...formValues,products:resData});
        })
    },[]);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleselectedProduct = (data)=>{
        const item = formValues.products.find((item)=>item.id==data);
        setFormValues({...formValues,itemCode:item.code,id:item.id});

    }
 const handleData = () =>{
    const data = {
        itemCode: formValues.itemCode,
        itemId:formValues.id,
        quantity:formValues.quantity,
        requestedBy: "PRODUCTION",
        status: "REQUESTED"
    };
    axios.post('/item-request', data)
        .then(response => {
            if(response.status == 201){
                props.history.push('/stockrequestreview');
            }
        });
 }
    return (
        <div>
            <Col span={16}>
                <Card>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                     <Form.Item
                        name="itemId"
                        hidden
                    />
                    <Form.Item name="ItemName" label="Item Name:">
                        <Select onChange={handleselectedProduct}>
                            {formValues.products && formValues.products.map((product)=>{
                               return <Select.Option 
                                key={product.id}
                                value = {product.id}
                                >
                                    {product.name}
                                </Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Item ID:">
                        <Input value={formValues.itemCode} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label=" Quantity:">
                        <Input name="quantity" value={formValues.quantity} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" style={{ marginLeft: "285px" }} onClick={handleData}>Submit</Button>
                    </Form.Item>
                </Form>
                </Card>
            </Col>
            
        </div>
    );
};
export default StockRequestPage;