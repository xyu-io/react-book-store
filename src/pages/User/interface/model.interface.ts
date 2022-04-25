// 书籍书籍总览
export interface UserModel  {
    id:         Number,
    user_name:  String,
    email:      String,
    salt:       String,
    password:   String
}

// 获取数据通用请求结构
export interface GetParams {
    userInfo?: UserParams;
}

// 书籍表请求参数
export interface UserParams {
    email?: string; // 书籍ID
    user_name: string; // 书籍名字
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
