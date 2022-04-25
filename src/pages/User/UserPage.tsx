import React from "react";
import {observer,inject, Provider} from 'mobx-react';
import { Tabs } from "antd";
import {userStore} from "./store/userStore";
import {UserProps} from "./interface/props.interface";
import UserTable from "./components/UserTable";

export const UserPage: React.FC = () => {
    return (
        <Provider userStore={userStore}>
            <BasePage/>
        </Provider>
    );
};

// 观察者： 被observer修饰的组件，将会根据组件内使用到的被observable修饰的state的变化而自动重新渲染
const BasePage: React.FC<UserProps> = inject("userStore")(
    observer((props: UserProps) => {
        const { userStore } = props;
        const { TabPane } = Tabs;
        return (
            <Tabs
                type={"card"}
                activeKey={userStore?.currentTab}
                centered={true}
                destroyInactiveTabPane={true}
                renderTabBar={(props, DefaultTabBar) => <></>}
                onChange={(key) => userStore?.next(key)}
            >
                <TabPane tab="用户" key="user">
                    <UserTable />
                </TabPane>
            </Tabs>
        );
    })
);
