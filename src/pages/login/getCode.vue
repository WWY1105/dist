<template>

</template>

<script>
export default {
    data() {
        return {
            code: '',
        }
    },
    mounted() {
        this.getBaseInfo()
        this.GetQueryString('code');
        this.code = this.GetQueryString('code')
      
    },
    methods: {
        getBaseInfo() {
            var that = this;
            var appid = "wx086161b30df8e46d";
            var redirect_uri = encodeURI("http://nian.im/app/index.html");
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
            window.location.href = url;

           
           
           

        },
     

       
    }
}
</script>

<style>

</style>
