import React from 'react';
import './index.css';
import { Card } from 'antd';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Dashboard = ({ children, location }) => {

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
                            
                            <SubMenu key="sub1" className= {location.pathname === '/stockrequest'? "ant-menu-submenu-open ant-menu-submenu-selected" : ""}  icon={<UserOutlined />} title="Production">
                                <Menu.Item key="/stockrequest" className= {location.pathname === '/stockrequest'? "ant-menu-item ant-menu-item-only-child ant-menu-item-selected" : ""}><Link to="/stockrequest">Request Rawmaterial</Link></Menu.Item>
                                <Menu.Item key="/statusdetails" className= {location.pathname === '/statusdetails'? "ant-menu-item ant-menu-item-only-child ant-menu-item-selected" : ""}><Link to="/statusdetails">Request Status</Link></Menu.Item>
                            </SubMenu>
                            
                            <SubMenu key="/stockrequestreview" className= {location.pathname === '/stockrequestreview'? "ant-menu-submenu-open ant-menu-submenu-selected" : ""}  icon={<UserOutlined />} title="Warehouse">
                                <Menu.Item key="/stockrequestreview" className= {location.pathname === '/stockrequestreview'? "ant-menu-item ant-menu-item-only-child ant-menu-item-selected" : ""}><Link to="/stockrequestreview">Review Request</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="/productdetails" icon={<UserOutlined />} title="Quality Analysis">
                                <Menu.Item key="/productdetails"><Link to="/productdetails">Production Report</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="/salesdetails" icon={<UserOutlined />} title="Sales">
                                <Menu.Item key="/salesdetails"><Link to="/salesdetails">Sales Report</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Header className="header">
                            <div className="logo" />
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                <Menu.Item></Menu.Item>
                                <Menu.Item key="1">Production Manager</Menu.Item>
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