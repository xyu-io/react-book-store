/*
 * @Description:字典页面用于新增和修改的对话框
 * @Version: 0.2.0
 * @Autor: song.zhou
 * @Date: 2021-04-06 14:08:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-02 17:29:55
 */
import { Button, Divider, Form, Input, Modal, Select,Row,Col } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import {BookModalProps, BookProps} from "../interface/props.interface";
import {defaultModal} from "../store/bookStore";

const NewBookModal: React.FC<BookProps> = inject("bookStore")(
    observer((props: BookModalProps|any) => {
        const { bookStore } = props;
        const [form] = Form.useForm();
        const { Item } = Form;
        const { Option } = Select;
        const { TextArea } = Input;

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 24 },
        };

        // 副作用，监测需要监听的操作
        useEffect(() => {
            if ( bookStore.currentBook != null && bookStore.BookModal.visible ) {
                form.setFieldsValue(bookStore.currentBook);
            }
            if (bookStore.BookModal.visible == false) {
                form.resetFields();
            }
        }, [bookStore.BookModal.visible]);


        /**
         * @description: 取消对话框展-同时清空对话框数据
         * @param {*}
         * @return {*}
         */
        const modalCancelClear = (): void => {
            form.resetFields();
            bookStore.currentBook = null;
            bookStore.currentBookID = 0;
            bookStore.showBookModalTextArea = true;
            bookStore.BookModal = defaultModal;
        };
        const onFinish = (values: any): void => {
            console.log("onFinish -----")
        };
        return (
            <Modal
                title={bookStore?.BookModal.title}
                visible={bookStore?.BookModal.visible}
                forceRender = {true}
                onCancel={modalCancelClear}
                destroyOnClose={true}
                width={600}
                footer={null}
            >
                <Form {...layout}
                    form={form}
                    name="book-from"
                    onFinish={onFinish}
                >
                    <Item name="book_name" label="书名" rules={[{ required: true }]}>
                        <Input
                            disabled={bookStore.currentBookID != 0}
                        />
                    </Item>
                    <Row gutter={[2, 16]}>
                        <Col span={12}>
                            <Item name="author" label="作者" rules={[{ required: true }]} >
                                <Input  maxLength={100} readOnly={bookStore.showBookModalTextArea} />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item name="price" label="单价" rules={[{ required: true }]} >
                                <Input  maxLength={50} readOnly={bookStore.showBookModalTextArea} />
                            </Item>
                        </Col>
                    </Row>
                    <Item name="describe" label="描述" rules={[{ required: true }]}>
                        <TextArea showCount maxLength={128} readOnly={bookStore.showBookModalTextArea} />
                    </Item>
                    <Divider type="horizontal" />
                    <div style={{ width: "100%", textAlign: "right" }}>
                        <Button onClick={modalCancelClear} style={{ marginRight: 10 }}>
                            取消
                        </Button>
                        <Button
                            loading={bookStore?.BookModal.confirmLoading}
                            style={{ marginRight: 10 }}
                            type="primary"
                            htmlType="submit"
                        >
                            保存
                        </Button>
                    </div>
                </Form>
            </Modal>
        );
    })
);

export default NewBookModal;
