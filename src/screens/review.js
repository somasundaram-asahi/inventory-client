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

    const handleReviewApproval = (record) => {
        props.history.push('/reviewtable');
        const data = {
            id: record.id,
            itemCode: record.itemCode,
            itemId: record.itemId,
            quantity: record.quantity,
            itemAvailable: record.itemAvailable,
            requestedBy: "WAREHOUSE",
            status: "APPROVED"
        };
        // const errorMsg = () => {
        //     message.info(errorMessage);
        // };
        if(data.quantity > data.itemAvailable){
           errorInfo();
        }else{
            axios.put("/item-request", data)
            .then(response => {
                refreshPage()
                const result = response.data;
                setReview({ ...review, list: result })
            })
        }


            // .catch(error => {
            //    return(setReview({ ...review, errorMessage: error.response.data }))
            
                
                // console.log(error.response.data)})

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
                    <Button type='primary' onClick={() => { handleReviewApproval(record) }} >
                        Accept
                    </Button>
                    <Button type='danger' style={{ marginLeft: "10px" }} onClick={() => info()} >
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
