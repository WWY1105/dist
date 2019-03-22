import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        imgUrl:"http://nian.im/storage/",
        baseUrl: "http://nian.im/works/",
        uid:'',
        role:'',
        openid:'', 
        userImg:'',
        code:''
        
    },
    mutations: {
        setCode(state, n) {
            state.code = n
        },
        setuid(state, n) {
            state.uid = n
        },
        setrole(state, n) {
            state.role = n
        },
        setOpenid(state, n) {
            state.openid = n
        },
        setUserImg(state,n){
            state.userImg=n
        }

    }
})