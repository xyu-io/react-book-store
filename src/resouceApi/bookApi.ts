
import {BookParams, BookModel, GetInfoParams} from "../pages/BookPage/interface/model.interface";
import {getFetch, postFetch} from "../utils/httpUtils/RequestTool";

const bashUrl = "http://127.0.0.1:8090/api/v1/book"


/**
 * @description:获取书籍数据API
 * @param {} null
 * @return {*}
 */
const GetBookList = () => {
    return getFetch(bashUrl+"/getBookList",null)
};

/**
 * @description:获取书籍数据API
 * @param {BookParams} params
 * @return {*}
 */
const GetBookInfoByParams = (params: BookParams) => {
    //console.log("准备执行查询");
    return postFetch(bashUrl+"/getBookInfoByName",params)
};


/**
 * @description:新增书籍API
 * @param {BookModel} params
 * @return {*}
 */
const AddBookInfo = (params: BookModel) => {
    return postFetch(bashUrl+"/addBookInfo",params)
}

const DeleteBookById = (params: BookParams) => {
    return postFetch(bashUrl+"/deleteBook",params)
}

export { GetBookList, AddBookInfo, GetBookInfoByParams, DeleteBookById };