import React from 'react'
import { Table } from 'antd';

const ReviewTable = () => {
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Product Id',
            dataIndex: 'id',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Requested-By',
            dataIndex: 'requestedby',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Screws',
            id: 1,
            quantity: 3,
            requestedby: 'John',
            status: 'Approved',
        },
        {
            key: '2',
            name: 'Nuts',
            id: 2,
            quantity: 5,
            requestedby: 'Jim',
            status: 'Approved',
        },
        {
            key: '3',
            name: 'Studs',
            id: 3,
            quantity: 8,
            requestedby: 'Joe',
            status: 'Rejected',
        },
    ];
    return (
        <Table columns={columns} dataSource={data} size="middle" />
    )
}
export default ReviewTable;
