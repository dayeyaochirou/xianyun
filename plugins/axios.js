import { Message } from 'element-ui'
// 暴露一个方法,参数为请求方法和重新调配方法
export default function ({$axios, redirect,router}) {
    //当axios出现错误后调用
    $axios.onError(err => {
        // 解构出err返回的res值中的code和message
        const {statusCode, message} = err.response.data;
        // 当错误为400时,弹出提示框
        if (statusCode == 400) {
            Message.warning({ message })
        }
        // if (statusCode == 401) {
        //     Message.warning({ message })
        // }
        // if (statusCode == 403) {
        //     Message.warning({ message })
        // }
    })
}