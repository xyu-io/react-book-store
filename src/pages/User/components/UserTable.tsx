import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import {Modal, Button, Form, Input} from "antd";
import {ColumnProps} from "antd/lib/table";
import {inject, observer} from "mobx-react";
import {UserProps} from "../interface/props.interface";
import {UserParams} from "../interface/model.interface";
import {TablePage} from "../../../components/table-page";
import moment from "moment";

const UserTable = inject("userStore")(
    observer((props: UserProps | any) => {
        const { userStore } = props
        const [form] = Form.useForm()
        const [isModalVisible, setIsModalVisible] = useState(false);

        const handleOk = () => {
            setIsModalVisible(false);
        };
        const timeFormat = (val: string) => {
            return val ? moment(val).format("YYYY/MM/DD HH:mm") : "";
        };

        const columns: ColumnProps<any>[] = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.id - b.id,
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.user_name.length - b.user_name.length,
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.password.length - b.password.length,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.email.length - b.email.length,
            },
            {
                title: '注册时间',
                dataIndex: "created_at",
                key: "created_at",
                align: "center",
                sortDirections: ["descend", "ascend", "descend"],
                sorter: (a, b) => {
                    let aTimeString = a.created_at;
                    let bTimeString = b.created_at;
                    let aTime = new Date(aTimeString).getTime();
                    let bTime = new Date(bTimeString).getTime();
                    return aTime - bTime;
                },
                render: timeFormat,
            }
        ];
        /**
         * @description: 初始化获取book列表
         * @param {*}
         * @return {*}
         */
        useEffect(() => {
                userStore.getUserListOnce()
            },
            []);
        console.log("-----",userStore.UserData)

        /**
         * @description: 提交表单数据
         * @param {BookParams} values
         * @return {*}
         */
        const handleSubmit = (values: UserParams): void => {

        };
       // console.log(userStore.UserData.length)

        const onFinishFailed = (val: any) => {
            console.log("onFinishFailed", val);
        };
        return(
            <>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    onFinishFailed = {onFinishFailed}
                    layout="inline"
                    style={{ marginBottom: 10 }}
                >
                    <Form.Item label="用户" name="user_name">
                        <Input style={{ width: 120 }} />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 10 }}
                    >
                        查询
                    </Button>
                    <Button
                        onClick={() => form.resetFields()}
                        style={{ marginRight: 10 }}
                        htmlType="submit"
                    >
                        重置页面
                    </Button>
                </Form>
                <TablePage
                    columns={columns}
                    pages={1}
                    dataSource={userStore.UserData }
                    loading={userStore.UserLoading}
                    search={() => {
                        userStore.getBookList();
                    }}
                />
                <Modal title="用户详情:" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
                    <p>ID: {userStore.currentUserID}</p>
                    <p>Name: Some contents...</p>
                    <p>Desc: contents...</p>
                </Modal>
            </>
        );
    })
)

export default UserTable;

