import React, { useEffect, useState } from 'react'
import { Table,Button} from 'antd';
import axios from "axios";

const SalesTable = () => {

    var salesStatus;

    const [review, setReview] = useState({
        list: [],
        disabled: false,
        // statusNew:"",
        })
    useEffect(() => {
        axios.get("/sales")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
                // setReview({...review,statusNew:result.data.status})
            })
            console.log(review.list.status);
    }, []);

    const handleReviewApproval = (record, action) => {}


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