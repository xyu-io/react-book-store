import { action, observable,makeAutoObservable } from "mobx";
import {BookParams, BookModel, GetInfoParams, PageInfo, ModalParma} from "../interface/model.interface";
import {AddBookInfo, GetBookList, GetBookInfoByParams, DeleteBookById} from '../../../resouceApi/bookApi'
import { message } from "antd";

/*默认对话框配置*/
export const defaultModal: ModalParma = {
  title: "",
  visible: false,
  confirmLoading: false,
};

// 被监视对象
class BookStore {
  @observable// 当前book
  currentBook: BookModel|any = null;
  @observable // 当前字典ID
  currentBookID: Number = 0;
  @observable // 数据表加载状态
  BookLoading: boolean = false;
  @observable // 字典表对话框
  BookModal: ModalParma = defaultModal;
  @observable // 当前tab
  currentTab: string = "book";
  @observable // 书籍表数据
  BookData: BookModel[] = [];
  @observable // 数据条数
  BookPageInfo: PageInfo = { total: 0 };
  @observable // 获取book数据请求参数
  MapParams: BookParams = {book_name: ""};
  @observable
  interval: number = 0;
  @observable
  count: number = 0;
  @observable
  showBookModalTextArea: boolean = true;

  constructor() {
      makeAutoObservable(this);
  }

  @action
  setValue = (key: keyof BookStore, value: any) => {
      console.log(key, value);
      this[key] = value as never;
  }

  // @action 可以修改 Mobx 中 state 的值。
  /**
   * @description: tab跳转
   * @param {string} key
   * @return {*}
   */
  @action
  next = (key: string): void => {
    if (key == "book") message.info("点击查看详情按钮进行跳转").then(r => "按钮进行跳转失败");
    else {
      this.currentBook = [];
      this.currentBookID = 0;
      this.currentTab = key;
    }
  };

  /**
   * @description:保存mapping数据
   * @param {MappingModel} params
   * @return {*}
   */
  @action
  saveBookInfo = (params: BookModel): void => {
    if (params.book_name != '') {
      AddBookInfo(params)
          .then(() => {
            this.getBookList();
          })
          .catch(() => {
            //
          });
    }
  };

  /**
   * @description: 获取mapping表数据
   * @param {GetInfoParams} params
   * @return {*}
   */
  @action
  getBookList = (): any => {
    this.BookLoading = true;
    return GetBookList()
        .then(
            (data: any) =>{
              this.BookData = data.data
              this.BookPageInfo.total = data.data.length
              console.log("BookList get once success. len", this.BookData.length);
              this.BookLoading = false;
              return this.BookData
            }
        )
        .catch(() => {
            console.log("BookList get once failed. len", 0);
            this.BookLoading = false;
            return []
        });
  };

    @action
    getBookListOnce = (): any => {
        this.BookLoading = true;
        GetBookList()
            .then(
                (data: any) =>{
                    this.BookData = data.data
                    this.BookPageInfo.total = data.data.length
                    console.log("BookList get once success. len", this.BookData.length);
                    this.BookLoading = false;
                    console.log(bookStore.BookLoading,"====",bookStore.BookData.length)
                }
            )
            .catch(() => {
                //console.log("BookList get failed. len", 0);
                this.BookLoading = false;
            });
    };

  /**
   * @description: 获取mapping表数据
   * @param {GetInfoParams} params
   * @return {*}
   */
  @action
  getBookInfoByParams = (params?: BookParams): any => {
    if (params !== null && params !== undefined) {
      this.MapParams = params;
    }
    this.BookLoading = true;
    return GetBookInfoByParams(this.MapParams)
        .then(
            (data: any) =>{
              this.BookData = data.data;
              this.BookPageInfo.total = data.data.length;
              //console.log("BookList get success. len", this.BookData.length);
              this.BookLoading = false;
              return this.BookData
            }
        )
        .catch(() => {
            console.log("查询失败",this.MapParams);
            this.BookLoading = false;
            return []
        });
  };

    /**
     * @description: 获取mapping表数据
     * @return {*}
     */
  @action
    getBookListCycle() {
        this.interval = setInterval(() => this.getBookList(), 6000000);
        return this.getBookList()
    }

  @action
  deleteBookById = (id : Number) : any => {
    this.BookLoading = true;
    this.MapParams.id = id.toString();
    return DeleteBookById(this.MapParams).then(
        () => {
            return this.getBookList()
        })
        .catch((err) => {
            this.BookLoading = false;
            return []
        }
    );
};

  @action
  //组件销毁的时候清除定时器就行
  componentWillUnmount() {
    clearInterval(this.interval);
  }

}

export const bookStore = new BookStore();
export {BookStore};
export default { BookStore };

