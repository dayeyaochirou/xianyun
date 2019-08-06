//存储的数据准备调用
export const state=()=>({
    form: []
})
//存储数据(同步)
export const mutations={
    // 传入两个参数,第一个参数是上面的需要调用时的state,第二个是传入的数据,这里使用解构赋值
    setForminfo(state,data){
        state.form.unshift(data)
        if(state.form.length>5)state.form.length=5
    }
}