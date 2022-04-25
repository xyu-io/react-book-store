import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routers } from '../router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function AppLayout() {
    const location = useLocation();
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
    const [isInit, setIsInit] = useState<Boolean>(false);
    const [url, setUrl] = useState("/home");
    function handleMenuClick (e:any) {
        setUrl(e.key)
    };
    useEffect(() => {
        const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
        const pathArr: string[] = [];
        if(routes !== null) {
            routes.forEach((item) => {
                const path = item.route.path;
                if(path) {
                    pathArr.push(path);
                }
            })
        }
        setDefaultSelectedKeys(pathArr);
        setDefaultOpenKeys(pathArr);
        setIsInit(true);
    }, [location.pathname]);
    if(!isInit) {
        return null;
    }
    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="logo" ></div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">首页</Menu.Item>
                        <Menu.Item key="2">博客</Menu.Item>
                        <Menu.Item key="3">联系方式</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={defaultSelectedKeys}
                            defaultOpenKeys={defaultOpenKeys}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="/user" icon={<UserOutlined />} title="用户管理">
                                <Menu.Item key="/user/list" onClick ={handleMenuClick}>
                                    <Link to='/user/list'>用户信息</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="data-center" icon={<LaptopOutlined />} title="数据中心">
                                <Menu.Item key="/data-center/books" onClick ={handleMenuClick}>
                                    <Link to='/data-center/books'>表格展示</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="exception" icon={<LaptopOutlined />} title="异常页面">
                                <Menu.Item key="/exception/not-found" onClick ={handleMenuClick}>
                                    <Link to='/exception/not-found'>403</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>
                                {
                                    url
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}