import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Button, message } from 'antd';
import axios from "axios";

const ProductTable = (props) => {

    const [review, setReview] = useState({
        list: []
    })
    const refreshPage = () => {
        window.location.reload();
    }
    const info = () => {
        message.info('Requested Item is not available');
    };

    useEffect(() => {
        axios.get("/products")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
            })
    }, [])

    const handleReviewApproval = (record, action) => {
        if (action === "accept") {
            props.history.push('/productdetails');
            const data = {
                id: record.id,
                name: record.name,
                quantity: record.quantity,
                status: "APPROVED"
            };
            axios.put("/finished-product-approval", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        } else {
            props.history.push('/productdetails');
            const data = {
                id: record.id,
                name: record.name,
                quantity: record.quantity,
                status: "REDO"
            };
            axios.put("/finished-product-approval", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        }


    }
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (record) => (
                <div>
                    <Button  disabled={record.status && record.status=== "APPROVED"} type='primary' onClick={() => { handleReviewApproval(record, "accept") }} >
                        Accept
                    </Button>
                    <Button disabled={record.status && record.status=== "APPROVED"} type='danger' style={{ marginLeft: "10px" }} onClick={() => { handleReviewApproval(record, "decline") }} >
                        Decline
                    </Button>
                </div>
            ),


        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={review.list} size="middle" />
        </>
    )
}
export default ProductTable;
