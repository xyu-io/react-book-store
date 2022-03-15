import React, {useEffect} from "react";
import {BookProps} from "./interface/props.interface";
import {observer,inject, Provider} from 'mobx-react';
import { Tabs } from "antd";
import NewBookModal from "./components/NewBookModal";
import BookTable from "./components/BookTable";
import {bookStore} from "./store/bookStore";

export const BookPage: React.FC = () => {
    return (
        <Provider bookStore={bookStore}>
            <BasePage/>
            <NewBookModal/>
        </Provider>
    );
};

// 观察者： 被observer修饰的组件，将会根据组件内使用到的被observable修饰的state的变化而自动重新渲染
const BasePage: React.FC<BookProps> = inject("bookStore")(
    observer((props: BookProps) => {
        const { bookStore } = props;
        const { TabPane } = Tabs;
        return (
            <Tabs
                type={"card"}
                activeKey={bookStore?.currentTab}
                centered={true}
                destroyInactiveTabPane={true}
                renderTabBar={(props, DefaultTabBar) => <></>}
                onChange={(key) => bookStore?.next(key)}
            >
                <TabPane tab="书籍" key="book">
                    <BookTable />
                </TabPane>
            </Tabs>
        );
    })
);
