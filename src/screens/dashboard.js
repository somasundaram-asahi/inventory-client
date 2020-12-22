import React from 'react';
import './index.css';
import { Card } from 'antd';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Dashboard = ({children, location}) => {
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
    return (
        <div className="site-card-border-less-wrapper">
            <Card>
                <Layout>
                <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="Stock Request">
                                    <Menu.Item key="/stockrequest"><Link to="/stockrequest">Request-Form</Link></Menu.Item>
                                    <Menu.Item key="/statusdetails"><Link to="/statusdetails">Status</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<UserOutlined />} title="Review">
                                <Menu.Item key="/reviewtable"><Link to="/reviewtable">Review</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<UserOutlined />} title="Verify">
                                    {/* <Menu.Item key="9">option1</Menu.Item> */}
                                </SubMenu>
                            </Menu>
                        </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item></Menu.Item>
                            <Menu.Item key="1">Production Manager</Menu.Item>
                            {/* <Menu.Item></Menu.Item> */}
                            {/* <Menu.Item key="2">Stock Incharger</Menu.Item> */}
                            {/* <Menu.Item></Menu.Item> */}
                            {/* <Menu.Item key="3">QA-Manager</Menu.Item> */}
                        </Menu>
                    </Header>
                    <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {children}
                    </Content>
                    </Layout>
                        
                </Layout>
            </Card>
        </div>
    )
}
export default Dashboard;