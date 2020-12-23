import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
// import { Button, message } from 'antd';
import axios from "axios";

const SalesTable = () => {

    const [review, setReview] = useState({
        list: []
    })
//    const  refreshPage = () => {
//         window.location.reload();
//       }
    //   const info = () => {
    //     message.info('Requested Item is not available');
    //   };

    useEffect(() => {
        axios.get("/sales")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
            })
    }, [])

    // const handleReviewApproval= (record,action) => {
    //     if(action==="accept"){
    //         props.history.push('/productdetails');
    //         const data = {
    //             id:record.id,
    //             productId:record.productId,
    //             productName: record.productName,
    //             quantity:record.quantity,
    //             status: "APPROVED"
    //         };
    //         console.log("data: ", data);
    //         axios.put("/finished-product-approval", data)
    //         .then(response => {
    //              refreshPage() 
    //              const result = response.data;
    //             setReview({ ...review, list: result })
    //             console.log(response.data);
    //         })
    //     }else{
    //         props.history.push('/productdetails');
    //     const data = {
    //         id:record.id,
    //         name: record.name,
    //         quantity:record.quantity,
    //         status: "RECEIVED"
    //     };
    //     console.log("data: ", data);
    //     axios.put("/finished-product-approval", data)
    //     .then(response => {
    //          refreshPage() 
    //          const result = response.data;
    //         setReview({ ...review, list: result })
    //         console.log(response.data);
    //     })
    //     }
             
       
    // }
    const columns = [
        {
            title: 'ID',
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
            title: 'Status',
            dataIndex: 'status',
        },
        // {
        //     title: 'Action',
        //     render: (record) => (
        //         <div>
        //             <Button type='primary' onClick = {()=>{handleReviewApproval(record,"accept")}} >
        //                 Accept
        //             </Button>
        //             <Button type='danger' style={{ marginLeft: "10px" }} onClick = {()=>{handleReviewApproval(record,"decline")}} >
        //                 Decline
        //             </Button>
        //         </div>
        //     ),


        // }
    ];
    
    return (
        <>
        <Table columns={columns} dataSource={review.list} size="middle" />
        </>
    )
}
export default SalesTable;