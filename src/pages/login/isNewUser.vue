<template>

</template>

<script>
import {
    AlertModule
} from 'vux'
export default {
    data() {
        return {
            code: ''
        }
    },
    components: {
        AlertModule,
    },
    mounted() {
        this.code = this.GetQueryString('code');
        if (this.code != null) {
            // alert(this.code)
            this.$store.commit('setCode', this.code)
        }
        this.isNewUser()
    },
    methods: {
        isNewUser() {
            var that = this;
            var baseUrl = that.$store.state.baseUrl;
            that.code = that.$store.state.code
            if (that.code != null) {
                that.$http('get', baseUrl + 'api/WebUser/WeixinUser', {
                    code: that.code
                }).then(function (res) {
                    if (res.data.code != '00') {
                        AlertModule.show({
                            title: res.data.msg
                        })
                    } else {
                        // alert('新用户吗' + res.data.data.newUser)
                        //                 alert(JSON.stringify(res.data.data.webUser.id))
                        // 存到store里面

                        // 存到store里面---end

                        // localStorage.setItem("uid", res.data.data.webUser.uid);

                        // alert("仓库里的uid:::::" + that.$store.state.uid)
                        //                     var that = this;
                        //   var baseUrl = this.$store.state.baseUrl;
                        // alert('res.data.data.webUser.uid')
                        //  localStorage.setItem('newUser',res.data.data.newUser)
                        if (res.data.data.newUser) {
                            // 新用户

                            localStorage.setItem("openid", res.data.data.openid);
                            localStorage.setItem("imgurl", res.data.data.headimgurl);
                            that.$router.push({
                                path: "/bindTel",
                                query: {
                                    imgurl: res.data.data.headimgurl,
                                    openid: res.data.data.openid
                                }
                            })
                        } else {
                            //  alert("‘执行" + res.data.data.webUser.id + "///" + that.GetQueryString('recommadd'))
                            // 添加调解人recommadd是调解人的id
                            if (that.GetQueryString('recommadd')) {

                                that.$http('post', baseUrl + 'api/Mediator/add', {
                                    uid: res.data.data.webUser.id,
                                    mediator: that.GetQueryString('recommadd').split('_')[0]
                                }).then(function (res) {
                                    if (res.data.code != '00') {
                                        AlertModule.show({
                                            title: res.data.msg
                                        })
                                    } else {

                                    }

                                })
                            }

                            // 老用户
                            that.$store.commit('setuid', res.data.data.webUser.id)
                            that.$store.commit('setOpenid', res.data.data.openid)
                            that.$store.commit('setUserImg', res.data.data.headimgurl)
                            if (that.GetQueryString('recommadd')) {
                                that.$router.push({
                                    path: "/writerDetail",
                                    query: {
                                        writerId: that.GetQueryString('recommadd').split('_')[1]
                                    }
                                })
                            } else {
                                that.$router.push({
                                    path: "/index",
                                    query: {
                                        imgurl: res.data.data.headimgurl,
                                        openid: res.data.data.openid
                                    }
                                })
                            }

                        }

                    }

                })
            }
        },
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
    }
}
</script>

<style>

</style>
