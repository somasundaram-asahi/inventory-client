import React, { useEffect, useState } from 'react'
import { Table,Button} from 'antd';
import axios from "axios";

const SalesTable = (props) => {
    const refreshPage = () => {
        window.location.reload();
    }

    const [review, setReview] = useState({
        list: [],
        disabled: false,
        })
    useEffect(() => {
        axios.get("/sales")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
            })
    }, []);

    const handleReviewApproval = (record, action) => {

            props.history.push('/salesdetails');
            const data = {
                "id": record.id,
                "productId": record.productId,
                "productName": record.productName,
                "quantity": record.quantity,
                "status": "SHIPPED"
            };
            axios.put("/sales-product-shipment", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        
    }


    const columns = [
        {
            title: 'ORDER ID',
            dataIndex: 'id',
        },
        {
            title: 'Product ID',
            dataIndex: 'productId',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
        },
        {
            title:'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (record) => {
                console.log(record);
                return <div>
                    <Button  type='primary' disabled={record.status && record.status=== "SHIPPED"} onClick={() => { handleReviewApproval(record) }}>
                        Ship Order
                    </Button>
                </div>
            },


        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={review.list} size="middle" />
        </>
    )
}
export default SalesTable;