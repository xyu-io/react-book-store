
import {BookParams, BookModel, GetInfoParams} from "../pages/BookPage/interface/model.interface";
import {getFetch, postFetch} from "../utils/httpUtils/RequestTool";

const bashUrl = "http://127.0.0.1:8089/api/v1/user"


/**
 * @description:获取书籍数据API
 * @param {} null
 * @return {*}
 */
const GetUserList = () => {
    console.log("+===");
    return getFetch(bashUrl+"/queryUser",null)
};

/**
 * @description:获取书籍数据API
 * @param {BookParams} params
 * @return {*}
 */
const GetUserByParams = (params: BookParams) => {
    //console.log("准备执行查询");
    return postFetch(bashUrl+"/getUserByName",params)
};


export { GetUserList, GetUserByParams };