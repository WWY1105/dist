<template>
<div id="feedback">
    <div class="topInput">
        <input type="text" class="bgW" v-model="nickname" placeholder="请输入您的称呼（非必填）">
        </div>
        <div class="centerInput">
            <input type="text" class="bgW" v-model="mobile" placeholder="请输入联系电话（非必填）">
        </div>
            <div class="bottomArea bgW">
                <x-textarea :height="147" name="description" v-model="content" placeholder="感谢您的宝贵建议，如果有特殊问题我们会与您
取得联系"></x-textarea>
            </div>
            <button class="long_btn" @click="postFeedback">提交</button>
        </div>
</template>

<script>
import {
    XTextarea,
    AlertModule
} from 'vux'

export default {
    data() {
        return {
            uid: this.$store.state.uid,
            nickname: '',
            mobile: '',
            content: ''
        }

    },
    components: {
        XTextarea,
        AlertModule
    },
    methods: {
        postFeedback() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            var postData = {
                uid: this.uid,
                nickname: this.nickname,
                mobile: this.mobile,
                content: this.content
            }
            that.$http('get', baseUrl + 'api/CommonProblem/List', postData).then(function (res) {
                console.log("提交结果")
                console.log(res.data)
                if (res.data.code == '00') {
                    AlertModule.show({
                        title: '提交成功',
                        onHide(){
                            that.$router.go(-1)
                        }
                    })
                }else{
                    AlertModule.show({
                        title: res.data.msg
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
#feedback {
    padding: 0 16px;

}

#feedback input {
    width: 100%;
    margin-top: 19px;
    border: 1px solid #B2B2B2;
    height: 44px;
    line-height: 44px;
    padding-left: 21px;
    border-radius: 4px;
    font-size: 14px;
}

#feedback input::placeholder,
#feedback textarea::placeholder {
    color: #B6B6B6;
}

#feedback .bottomArea {
    margin-top: 19px;
}

#feedback .bottomArea .weui-cell {
    padding: 0;
    padding: 16px 20px;
    border: 1px solid #B2B2B2;
    border-radius: 4px;
    font-size: 14px;
}

#feedback .bottomArea textarea.weui-textarea {
    padding: 16px 20px;
}

#feedback .long_btn {
    margin-top: 28px;
    width: 100%;
}
</style>
