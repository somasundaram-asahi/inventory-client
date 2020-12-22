import React from 'react'
import { Table } from 'antd';
import { Button } from 'antd';

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
            dataIndex: 'key',
            render: (text, record) => (
                <div>
                    <Button type='primary'  onClick={() => console.log(record)}>
                        Accept
                    </Button>
                    <Button type='danger' style={{marginLeft:"10px"}} onClick={() => console.log(record)}>
                        Decline
                    </Button>
                </div>
            ),


        }
    ];
    const data = [
        {
            key: '1',
            name: 'Screws',
            id: 1,
            quantity: 3,
            requestedby: 'John',
        },
        {
            key: '2',
            name: 'Nuts',
            id: 2,
            quantity: 5,
            requestedby: 'Jim',
        },
        {
            key: '3',
            name: 'Studs',
            id: 3,
            quantity: 8,
            requestedby: 'Joe',
        },
    ];
    return (
        <Table columns={columns} dataSource={data} size="middle" />
    )
}
export default ReviewTable;
