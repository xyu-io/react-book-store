import {getFetch, postFetch } from '../utils/httpUtils/RequestTool'
import {useState} from "react";
import {Button} from "antd";

const baseUrl = 'http://127.0.0.1:8090/api/v1/test/getAllInfo';
//定义一个数组，将数据存入数组
const  postData = {
    title: String,
    vote: Number,
}
export default function Test(){
    const [data,setData] = useState<typeof postData[]>()
    function getData(){
        getFetch(baseUrl,null).then(
            (result:any) => {
                setData(result.data);
            }
        )
    };
    return <div>
        <Button onClick={getData}>测试请求</Button>
        <div>
            {
                data?.map((item)=>
                    <div>
                        {item.vote}&nbsp;
                        <a>{item.title}</a>
                        <hr/>
                    </div>
                )
            }

        </div>
    </div>
}