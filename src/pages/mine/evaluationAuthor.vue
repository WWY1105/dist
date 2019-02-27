<template>
<div id="evaluationAuthor">
    <div class="topBox">
        <div class="areaBox bgW">
            <x-textarea :height="147" name="description" v-model="content" placeholder="请输入评价内容，100字以内"></x-textarea>
        </div>
    </div>
    <!-- 标签盒子 -->
    <div class="tagBox bgW">
        <p class="title">书商评价标签（2018-7-1起）</p>
        <div class="content flexSpace">
            <div :class="item.active?'eachItem active':'eachItem '" v-for="item,index in tags" @click="chooseTags(index)">{{item.tagName}} </div>
        </div>
    </div>
    <div class="btnBox">
        <button class="long_btn" @click="saveMyTags">保存</button>
    </div>
</div>
</template>

<script>
import common from "@/assets/js/common"
import {
    XTextarea,
    AlertModule
} from 'vux'
export default {
    data() {
        return {
            content: '',
            tags: [],
            // chooseTags:''
        }
    },
    components: {
        XTextarea,
        AlertModule
    },
    mounted() {
        this.getTasgs()
    },
    methods: {
        ...common,
        // 选择标签
        chooseTags(i) {
            this.tags[i].active = true;

        },
        saveMyTags() {
            // 提交评价
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            var arr = []
            for (var i in this.tags) {
                if (this.tags[i].active == true) {
                    arr.push(this.tags[i].tagName)
                }
            }
            var postData = {
                uid: this.$store.state.uid,
                taskId: this.$route.query.taskId,
                content: this.content,
                commentTags: arr.join(',')
            }
            that.$http('post', baseUrl + 'api/TaskComment', postData).then(function (res) {
                if (res.data.code == '00') {
                    AlertModule.show({
                        title: '提交成功',
                        onHide(){
                            that.$router.push({
                                path:'/missionInAfterEvaluteBuss',
                                query:{
                                    keepActive:true,
                                     id: that.$route.query.taskId
                                }
                            })
                        }
                    })
                } else {
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
#evaluationAuthor .topBox {
    padding: 20px 16px;
}

#evaluationAuthor .areaBox {
    border: 1px solid #B2B2B2;
    border-radius: 5px;
}

#evaluationAuthor .tagBox {
    padding-left: 10px;
}

#evaluationAuthor .title {
    border-bottom: 1px solid #CECECE;
    height: 40px;
    line-height: 40px;
    color: #3375C5;
    font-size: 12px;
}

#evaluationAuthor .content {
    padding-top: 14px;
    padding-right: 10px;
    /* padding-bottom: 16px; */
    flex-wrap: wrap;
}

#evaluationAuthor .content .eachItem {
    padding: 8px 25px;
    border: 1px solid #848484;
    margin-bottom: 14px;
    color: #868686;
    font-size: 14px;
}

#evaluationAuthor .content .eachItem.active {
    color: #fff;
    background: #3375C5;
    border: 1px solid #3375c5;
}

#evaluationAuthor .content .eachItem span {
    color: #3375C5;
    margin-left: 5px;
}

#evaluationAuthor .btnBox {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
}

#evaluationAuthor .btnBox button.long_btn {
    width: 100%;
    margin-top: 54px;
}
</style>
