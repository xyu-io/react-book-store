import { action, observable,makeAutoObservable } from "mobx";
import { message } from "antd";
import {ModalParma, PageInfo, UserModel, UserParams} from "../interface/model.interface";
import {GetUserList} from "../../../resouceApi/userApi";

/*默认对话框配置*/
export const defaultModal: ModalParma = {
    title: "",
    visible: false,
    confirmLoading: false,
};

// 被监视对象
class UserStore {
    @observable// 当前
    currentUser: UserModel|any = null;
    @observable // 当前字典ID
    currentUserID: Number = 0;
    @observable // 数据表加载状态
    UserLoading: boolean = false;
    @observable // 字典表对话框
    UserModal: ModalParma = defaultModal;
    @observable // 当前tab
    currentTab: string = "user";
    @observable // 书籍表数据
    UserData: UserModel[] = [];
    @observable // 数据条数
    UserPageInfo: PageInfo = { total: 0 };
    @observable // 获取数据请求参数
    MapParams: UserParams = {user_name: ""};

    constructor() {
        makeAutoObservable(this);
    }

    // @action 可以修改 Mobx 中 state 的值。
    /**
     * @description: tab跳转
     * @param {string} key
     * @return {*}
     */
    @action
    next = (key: string): void => {
        if (key == "user") message.info("点击查看详情按钮进行跳转").then(r => "按钮进行跳转失败");
        else {
            this.currentUser = [];
            this.currentUserID = 0;
            this.currentTab = key;
        }
    };

    @action
    getUserListOnce = (): any => {
        this.UserLoading = true;
        GetUserList()
            .then(
                (data: any) =>{
                    this.UserData = data.data
                    this.UserPageInfo.total = data.data.length
                    console.log(" get once success. len", this.UserData.length);
                    this.UserLoading = false;
                    console.log(userStore.UserLoading,"====",userStore.UserData.length)
                }
            )
            .catch(() => {
                //console.log(" get failed. len", 0);
                this.UserLoading = false;
            });
    };

}

export const userStore = new UserStore();
export {UserStore};
export default { UserStore };

