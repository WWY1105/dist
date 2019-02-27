<template>
<div id="mailDetail">
    <!-- 信箱详情 -->
    <div class="eachMail flexSpace bgW">
        <div class="imgBox">
            <img :src="mailDetail.formUser.imgurl"  class="userImg"  alt="">
            <!-- <span class="redDot"></span> -->
        </div>
        <div class="text">
            <p class="name">{{mailDetail.formUser.nickname}}</p>
            <p class="detailText">{{mailDetail.content}}</p>
            <p class="flexSpace">
                <span class="date">{{mailDetail.msgTime}}</span>
                <span class="money">红包：{{mailDetail.redEnvelope}}元</span>
            </p>
        </div>
    </div>

    <!-- 回复详情 -->
    <div class="eachMail replayBox flexSpace bgW" v-for="i,j in  comments" @click="replayMsgId(i.msgId)">
        <div class="imgBox">
            <img  :src="i.user.imgurl"   class="userImg"  alt="">
        </div>
            <div class="text">
                <p class="name">{{i.nickname}}</p>
                <p class="detailText">{{i.content}}</p>
                <p class="flexSpace">
                    <span class="date">{{i.msgTime}}</span>
                    <!-- <span class="money">红包：1元</span> -->
                </p>
            </div>
        </div>
        <div class="replay bgW">
            <input type="text" placeholder="回复私信" v-model="content" @keypress="sendMsg" ref='input'>
    </div>
        </div>
</template>

<script>
import {
    AlertModule
} from 'vux'
export default {
    data() {
        return {
            isSaw: false,
            mailId: this.$route.query.mailId,
            mailDetail: {},
            comments: [],
            msgId:'',
            content:''
        }
    },
    components: {
        AlertModule
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + '/api/UserMsg/' + this.mailId).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    that.mailDetail = res.data.data;
                    that.comments = res.data.data.comments
                }
            })
        },
        // 选中要回复的信息
        replayMsgId(id){
            this.$refs.input.focus()
            this.msgId=id;
        },
        sendMsg() {
            if (event.keyCode == 13) {
                //如果按的是enter键 13是enter
                event.preventDefault(); //禁止默认事件（默认是换行）
                var that = this;
                var baseUrl = this.$store.state.baseUrl;
                that.$http('post', baseUrl + 'api/UserMsg/Comments', {
                    msgId:that.msgId,
                    uid:that.$store.state.uid,
                    content:that.content
                }).then(function (res) {
                    if (res.data.code != '00') {
                        AlertModule.show({
                            title: res.data.msg
                        })
                    } else {
                        that.getDetail();
                        that.content=''
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
#mailDetail {
    position: relative;
    height: 100%;
    width: 100%;
}

#mailDetail .eachMail {
    padding: 13px 23px 16px 11px;
    align-items: flex-start;
}

#mailDetail .eachMail .text {
    width: 100%;
}

#mailDetail .eachMail.replayBox {
    margin-top: 10px;
}

#mailDetail .eachMail .name {
    color: #333333;
    font-size: 15px;
    margin-bottom: 10px;

}

#mailDetail .eachMail .imgBox {
    position: relative;
}

#mailDetail .eachMail .detailText {
    font-size: 12px;
    color: #333;
    margin-bottom: 10px;
}

#mailDetail .eachMail .date {
    font-size: 10px;
    color: #686868;
}

#mailDetail .eachMail .money {
    font-size: 12px;
    color: #EA4A5C;
}

#mailDetail .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;

}

#mailDetail .replay {
    padding: 9px 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

}

#mailDetail .replay input {
    width: 100%;
    height: 36px;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    background: #f2f2f2;
    padding-left: 15px;
    font-size: 15px;
}

#mailDetail .replay input::placeholder {
    color: #A2A2A2;

}
</style>
