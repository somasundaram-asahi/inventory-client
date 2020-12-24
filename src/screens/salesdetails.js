import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import axios from "axios";

const SalesTable = () => {

    const [review, setReview] = useState({
        list: []
    })
    useEffect(() => {
        axios.get("/sales")
            .then(response => {
                const result = response.data;
                setReview({ ...review, list: result })
            })
    }, []);
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
    ];

    return (
        <>
            <Table columns={columns} dataSource={review.list} size="middle" />
        </>
    )
}
export default SalesTable;