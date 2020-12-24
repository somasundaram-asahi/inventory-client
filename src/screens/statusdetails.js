import React, { useEffect, useState } from 'react'
import { Table, Button,message } from 'antd';
import axios from "axios";

const ReviewTable = (props) => {
    const [review, setReview] = useState({
        list: []
    })
    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        axios.get("/item-approved")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
            })
    }, [])

    const handleReviewApproval = (record, action) => {

        if (action === "accept") {
            props.history.push('/statusdetails');
            const data = {
                id: record.id,
                itemCode: record.itemCode,
                itemId: record.itemId,
                quantity: record.quantity,
                itemName: record.itemName,
                requestedBy: "PRODUCTION",
                status: "ACCEPTED"
            };
            axios.put("/item-request-approval", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        } 
        else {
            props.history.push('/statusdetails');
            const data = {
                id: record.id,
                itemCode: record.itemCode,
                itemId: record.itemId,
                quantity: record.quantity,
                itemName: record.itemName,
                requestedBy: "PRODUCTION",
                status: "DECLINED"
            };
            axios.put("/item-request-approval", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        }
    }
    const info = (record) => {
        {
            props.history.push('/statusdetails');
            const data = {
                id: record.id,
                itemCode: record.itemCode,
                itemId: record.itemId,
                quantity: record.quantity,
                itemName: record.itemName,
                requestedBy: "PRODUCTION",
                status: "DECLINED"
            };
            axios.put("/item-request", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        }
        message.info('The Item is not the same which requested');
    };
    const columns = [
        {
            title: 'Item Code',
            dataIndex: 'itemCode',
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
        },
        {
            title: 'Quantity Requested',
            dataIndex: 'quantity',
        },
        {
            title: 'Updated By',
            dataIndex: 'requestedBy',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (record) => (
                <div>
                    <Button type='primary' disabled={record.status && record.status=== "DECLINED"} onClick={() => { handleReviewApproval(record, "accept") }}>
                        Approve
                    </Button>

                    <Button type='danger'  disabled={record.status && record.status=== "DECLINED"} style={{ marginLeft: "10px" }} onClick={() => { handleReviewApproval(record, "decline") }}>
                        Decline
                    </Button>
                </div>
            ),


        }
    ];

   
    return (
        <Table columns={columns} dataSource={review.list} align="middle" />
    )
}
export default ReviewTable;
