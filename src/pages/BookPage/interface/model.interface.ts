// 书籍书籍总览
export interface BookModel  {
    id: Number,
    book_name: String,
    author: String,
    release_date: Date,
    price: Number,
    describe: String,
    status: Number
}

// 获取数据通用请求结构
export interface GetInfoParams {
    bookInfo?: BookParams;
}

// 书籍表请求参数
export interface BookParams {
    id?: string; // 书籍ID
    book_name: string; // 书籍名字
   // status?: number; // 书籍状态
}

// 页面数据信息
export interface PageInfo {
    total: number; // 数据条数
}

export interface ModalParma {
    /** 对话框是否可见 */
    visible?: boolean;
    /** 确定按钮 loading */
    confirmLoading?: boolean;
    /** 标题 */
    title?: string;
}
