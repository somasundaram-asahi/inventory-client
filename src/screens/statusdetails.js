import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
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
    }, [refreshPage])

    const handleReviewApproval = (record, action) => {

        if (action === "accept") {
            props.history.push('/statusdetails');
            const data = {
                id: record.id,
                itemCode: record.itemCode,
                itemId: record.itemId,
                quantity: record.quantity,
                itemAvailable: record.itemAvailable,
                requestedBy: "PRODUCTION",
                status: "ACCEPTED"
            };
            axios.put("/item-request", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        } else {
            props.history.push('/statusdetails');
            const data = {
                id: record.id,
                itemCode: record.itemCode,
                itemId: record.itemId,
                quantity: record.quantity,
                itemAvailable: record.itemAvailable,
                requestedBy: "PRODUCTION",
                status: "REQUESTED"
            };
            axios.put("/item-request", data)
                .then(response => {
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        }
    }

    const columns = [
        {
            title: 'Item Code',
            dataIndex: 'itemCode',
        },
        {
            title: 'Item Requested',
            dataIndex: 'quantity',
        },
        {
            title: 'Item Available',
            dataIndex: 'itemAvailable',
        },
        {
            title: 'Requested By',
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
                    <Button type='primary' onClick={() => { handleReviewApproval(record, "accept") }}>
                        Accept
                    </Button>

                    <Button type='danger' style={{ marginLeft: "10px" }} onClick={() => { handleReviewApproval(record, "decline") }}>
                        Decline
                    </Button>
                </div>
            ),


        }
    ];

    // const data = [
    //     {
    //         key: '1',
    //         name: 'Screws',
    //         id: 1,
    //         quantity: 3,
    //         requestedby: 'John',
    //         status: 'Approved',
    //     },
    //     {
    //         key: '2',
    //         name: 'Nuts',
    //         id: 2,
    //         quantity: 5,
    //         requestedby: 'Jim',
    //         status: 'Approved',
    //     },
    //     {
    //         key: '3',
    //         name: 'Studs',
    //         id: 3,
    //         quantity: 8,
    //         requestedby: 'Joe',
    //         status: 'Rejected',
    //     },
    // ];
    return (
        <Table columns={columns} dataSource={review.list} align="middle" />
    )
}
export default ReviewTable;
