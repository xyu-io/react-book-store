import React, {useEffect, useState} from "react";
import 'antd/dist/antd.css';
import {Modal, Button, Divider, Form, Input, Popconfirm, Tooltip} from "antd";
import {ColumnProps} from "antd/lib/table";
import {inject, observer} from "mobx-react";
import {DeleteTwoTone, EditTwoTone, EyeTwoTone} from "@ant-design/icons";
import {BookModel, BookParams} from "../interface/model.interface";
import {BookProps} from "../interface/props.interface";
import {TablePage} from "../../../components/table-page";

enum Oprate {
    MINUS = 'MINUS',
    PLUS = 'PLUS'
}

const BookTable = inject("bookStore")(
    observer((props: BookProps | any) => {
        const { bookStore } = props
        const [form] = Form.useForm()
        const [dataSource,setDataSource] = useState([])
        const [isModalVisible, setIsModalVisible] = useState(false);

        const oprate = (type: Oprate) => {
            switch (type) {
                case Oprate.MINUS:
                    bookStore.setValue('count', bookStore.count - 1);
                    break;
                case Oprate.PLUS:
                    bookStore.setValue('count', bookStore.count + 1);
                    break;
                default:
                    break;
            }
        }

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            setIsModalVisible(false);
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
                title: '书名',
                dataIndex: 'book_name',
                key: 'book_name',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.book_name.length - b.book_name.length,
            },
            {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.author.length - b.author.length,
            },
            {
                title: '出版时间',
                dataIndex: 'release_date',
                key: 'release_date',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.release_date - b.release_date,
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.price - b.price,
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.status - b.status,
            },
            {
                title: '内容简介',
                dataIndex: 'describe',
                key: 'describe',
            },
            {
                title: "操作",
                dataIndex: "op",
                key: 'op',
                width: 230,
                align: "center",
                render: (text, record: BookModel) => (
                    <div>
                        <Tooltip title="查看详情">
                            <EyeTwoTone
                                onClick={showModal}
                            />
                        </Tooltip>
                        <Divider type="vertical"/>
                        <Tooltip title="编辑">
                            <EditTwoTone
                                onClick={() => {
                                    bookStore.currentBookID = record.id;
                                    bookStore.currentBook = record;
                                    bookStore.BookModal.visible = true;
                                    bookStore.BookModal.title = "编辑";
                                    console.log("----编辑")
                                }}
                            />
                        </Tooltip>
                        <Divider type="vertical"/>
                        <Tooltip title="删除">
                            <Popconfirm
                                title="确定删除吗？"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={
                                    () => {
                                        bookStore.deleteBookById(record.id).then(
                                            (data: any) => {
                                                setDataSource(data);
                                            }
                                        )
                                    }
                                }
                            >
                                <DeleteTwoTone />
                            </Popconfirm>
                        </Tooltip>
                    </div>
                ),
            },
        ];
        /**
         * @description: 初始化获取book列表
         * @param {*}
         * @return {*}
         */
        useEffect(() => {
                bookStore.getBookListOnce();
            },
            []);

        /**
         * @description: 提交表单数据
         * @param {BookParams} values
         * @return {*}
         */
        const handleSubmit = (values: BookParams): void => {
            bookStore.getBookInfoByParams(values).then(
                (data: any) => {
                    setDataSource(data)
                }
            )
        };
        console.log(bookStore.BookData.length)

        const onFinishFailed = (val: any) => {
            console.log("onFinishFailed", val);
        };
        return(
            <>
                <div>
                    测试mobx状态管理：
                    <button onClick={() => oprate(Oprate.MINUS)}>-</button>
                    <span>{bookStore?.count}</span>
                    <button onClick={() => oprate(Oprate.PLUS)}>+</button>
                </div>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    onFinishFailed = {onFinishFailed}
                    layout="inline"
                    style={{ marginBottom: 10 }}
                >
                    <Form.Item label="书名" name="book_name">
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
                    <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            bookStore.BookModal = {
                                ...bookStore.BookModal,
                                title: "新增",
                                visible: true,
                            };
                            console.log("新增....")
                        }}
                    >
                        新增书籍
                    </Button>
                </Form>
                <TablePage
                    columns={columns}
                    pages={dataSource.length? dataSource.length : 1}
                    dataSource={bookStore.BookData }
                    loading={bookStore.BookLoading}
                    search={() => {
                        bookStore.getBookList();
                    }}
                />
                <Modal title="书籍详情:" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
                    <p>ID: {bookStore.currentBookID}</p>
                    <p>Name: Some contents...</p>
                    <p>Desc: contents...</p>
                </Modal>
            </>
        );
    })
)

export default BookTable;

/*const BookTable = (props: BookProps|any) => {
    const { bookStore }  = props
    const [form] = Form.useForm()
    const [dataSource,setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const oprate = (type: Oprate) => {
        switch (type) {
            case Oprate.MINUS:
                bookStore.setValue('count', bookStore.count - 1);
                break;
            case Oprate.PLUS:
                bookStore.setValue('count', bookStore.count + 1);
                break;
            default:
                break;
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
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
            title: '书名',
            dataIndex: 'book_name',
            key: 'book_name',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.book_name.length - b.book_name.length,
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.author.length - b.author.length,
        },
        {
            title: '出版时间',
            dataIndex: 'release_date',
            key: 'release_date',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.release_date - b.release_date,
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.price - b.price,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.status - b.status,
        },
        {
            title: '内容简介',
            dataIndex: 'describe',
            key: 'describe',
        },
        {
            title: "操作",
            dataIndex: "op",
            key: 'op',
            width: 230,
            align: "center",
            render: (text, record: BookModel) => (
                <div>
                    <Tooltip title="查看详情">
                        <EyeTwoTone
                            onClick={showModal}
                        />
                    </Tooltip>
                    <Divider type="vertical"/>
                    <Tooltip title="编辑">
                        <EditTwoTone
                            onClick={() => {
                                bookStore.currentBookID = record.id;
                                bookStore.currentBook = record;
                                bookStore.BookModal.visible = true;
                                console.log("----编辑")
                            }}
                        />
                    </Tooltip>
                    <Divider type="vertical"/>
                    <Tooltip title="删除">
                        <Popconfirm
                            title="确定删除吗？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={
                            () => {
                                bookStore.deleteBookById(record.id).then(
                                    (data: any) => {
                                        setDataSource(data);
                                    }
                                )
                            }
                        }
                        >
                            <DeleteTwoTone />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];
    /!**
     * @description: 初始化获取book列表
     * @param {*}
     * @return {*}
     *!/
    useEffect(() => {
        console.log("123");
        bookStore.getBookListOnce();
        }, []);
    /!**
     * @description: 提交表单数据
     * @param {BookParams} values
     * @return {*}
     *!/
    const handleSubmit = (values: BookParams): void => {
        bookStore.getBookInfoByParams(values).then(
            (data: any) => {
                setDataSource(data)
            })
    };
    console.log(bookStore.BookData.length)
    const onFinishFailed = (val: any) => {
        console.log("onFinishFailed", val);
    };
    return(
        <>
            <button onClick={() => oprate(Oprate.MINUS)}>-</button>
             <span>{bookStore?.count}</span>
            <button onClick={() => oprate(Oprate.PLUS)}>+</button>
            <Form
                form={form}
                onFinish={handleSubmit}
                onFinishFailed = {onFinishFailed}
                layout="inline"
                style={{ marginBottom: 10 }}
            >
                <Form.Item label="书名" name="book_name">
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
                <Button
                    type="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        bookStore.BookModal = {
                            ...bookStore.BookModal,
                            title: "新增",
                            visible: true,
                        };
                        console.log("新增....")
                    }}
                >
                    新增书籍
                </Button>
            </Form>
            <TablePage
                columns={columns}
                pages={dataSource.length? dataSource.length : 1}
                dataSource={bookStore.BookData }
                loading={bookStore.BookLoading}
                search={() => {
                    bookStore.getBookList();
                }}
            />
            <Modal title="书籍详情:" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
                <p>ID: {bookStore.currentBookID}</p>
                <p>Name: Some contents...</p>
                <p>Desc: contents...</p>
            </Modal>
        </>
    );
};

export default observer(BookTable);*/
