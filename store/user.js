//数据
export const state=()=>({
    userInfo:{
        token: "",
        user: {}
    }
})
//存储数据(同步)
export const mutations={
    // 传入两个参数,第一个参数是上面的需要调用时的state,第二个是传入的数据,这里使用解构赋值
    setUserinfo(state,data){
        state.userInfo=data
    }
}
//传入数据的时候 mutations下的方法都必须使用commit来调用
// 第一个参数是调用的方法名，第二个参数就是数据
//this.$store.commit("user/setUserInfo", res.data);


//存储数据(异步)
// export const actions = {
//     // 登录
//     login({commit}, data){
//         return this.$axios({
//             url: "/accounts/login",
//             method: "POST",
//             data: data
//         }).then(res => {
//             const data = res.data;
//             // 保存到state
//             commit("setUserInfo", data);
//             return data;
//         })
//     }
// };