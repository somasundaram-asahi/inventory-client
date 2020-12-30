import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Button, message } from 'antd';
import axios from "axios";

const ReviewTable = (props) => {

    const [review, setReview] = useState({
        list: [],
        // errorMessage:"error",
    })
    const refreshPage = () => {
        window.location.reload();
    }
    const info = () => {
        message.info('Requested Item is not available');
    };

    const errorInfo = () => {
        message.info('Requested Item is not available, will be provided shortly');
    };

    useEffect(() => {
        axios.get("/item-requested")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
            })
    }, [])

    const handleReviewApproval = (record,action) => {
        if(action === "accept"){
        props.history.push('/stockrequestreview');
        console.log(record);
        debugger;
        const data = {
            id: record.id,
            itemCode: record.itemCode,
            itemName: record.itemName,
            itemId: record.itemId,
            quantity: record.quantity,
            itemAvailable: record.itemAvailable,
            requestedBy: "WAREHOUSE",
            status: "APPROVED"
        };
        if (data.quantity > data.itemAvailable) {
            errorInfo();
        } else {
            debugger;
            axios.put("/item-request", data)
                .then(response => {
                    debugger;
                    refreshPage()
                    const result = response.data;
                    setReview({ ...review, list: result })
                })
        }
    }
    else
    {
        props.history.push('/stockrequestreview');
        console.log(record);
        debugger;
        const data = {
            id: record.id,
            itemCode: record.itemCode,
            itemName: record.itemName,
            itemId: record.itemId,
            quantity: record.quantity,
            itemAvailable: record.itemAvailable,
            requestedBy: "WAREHOUSE",
            status: "DECLINED"
        };
            axios.put("/item-request", data)
                .then(response => {
                    // refreshPage()
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
            title: 'Quantity Requested',
            dataIndex: 'quantity',
        },
        {
            title: 'Quantity Available',
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
                    <Button  disabled={record.status && record.status=== "DECLINED"} type='primary' onClick={() => { handleReviewApproval(record,"accept") }} >
                        Approve
                    </Button>
                    <Button disabled={record.status && record.status=== "DECLINED"}  type='danger' style={{ marginLeft: "10px" }} onClick={() => handleReviewApproval(record,"decline")} >
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
export default ReviewTable;
