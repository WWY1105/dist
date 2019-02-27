<template>
<div id="myNetwork" class="flexCenter">
    <!-- 上半部分 -->
    <div class="topBox bgW">
        <div class="user flexCenter ">
            <img :src="$store.state.imgUrl+userData.imgurl" class="userImg" alt="">
            <div class="text">
                <p class="name">{{userData.nickname}}</p>
                <p class="id">ID：{{userData.id}}</p>
            </div>
        </div>
        <!-- 二维码 -->
        <img :src="myEwm" class="ewmPic" alt="">
        <p class="mainText">邀请您加入作者书商线上平台</p>
    </div>
    <!-- 上半部分 END-->
    <p class="midTitle">
        上图长按保存图片后分享好友或群
    </p>
    <div class="mymediator topMyMediator">
        <p class="smallTitle">我的调解人</p>
        <div class="mediator flexSpace bgW" v-if="myMediator.length==0?false:true" v-for="item,index in myMediator">
            <!-- 有数据的时候 -->
            <div class="left flexStart">
                <img :src="$store.state.imgUrl+item.imgurl" class="userImg mediatorImg" alt="">
                <p class="name">{{item.nickname}}</p>
            </div>
            <div class="right">
                <i class="iconfont icon-jiantou"></i>
            </div>

        </div>
        <div class="mediator flexSpace bgW" @click="addMyMediator" v-if="myMediator.length==0?true:false">
            <!-- 没有数据的时候 -->
            <div class="left flexStart">添加我的调解人</div>
            <div class="right">
                <i class="iconfont icon-jiantou"></i>
            </div>
        </div>
    </div>
    <!-- 最底部 -->
    <div class="mymediator bottomMediator">
        <p class="smallTitle">我要调解的人</p>
        <p class="tips"><i class="iconfont icon-warming"></i> 下方用户产生交易时，您将获得一定比例奖励</p>
        <div class="mediator flexSpace bgW" v-for="item,index in needMediator">
            <div class="left flexStart">
                <img :src="$store.state.imgUrl+item.imgurl" class="userImg mediatorImg" alt="">
                <p class="name">{{item.nickname}}</p>
            </div>
            <div class="right">
                <i class="iconfont icon-jiantou"></i>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import common from "@/assets/js/common"
export default {
    data() {
        return {
              uid: this.$store.state.uid,
           
            myEwm: '',
            userData: {},
            myMediator: [],
            needMediator: []

        }
    },
    mounted() {
        this.getEWM();
        this.getWebUser(this.uid);
        this.getMediator()
    },
    methods: {
        ...common,
        // 获取我的二维码
        getEWM() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/WebUser/Qr/' + that.uid).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    that.myEwm = res.data.data;
                }

            })
        },
        // 获取我的调解人
        getMediator() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/Mediator/List', {
                uid: that.uid
            }).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    that.myMediator = res.data.data.myMediator;
                    that.needMediator = res.data.data.needMediator;
                }

            })
        },
        // 添加我的调解人
        addMyMediator() {
            this.$router.push({
                path: '/myMediator'
            })
        }
    }

}
</script>

<style scoped>
#myNetwork {
    width: 100%;
}

#myNetwork .midTitle {
    color: #2A2A2A;
    font-size: 14px;
    margin-top: 18px;
    margin-bottom: 36px;
}

#myNetwork .mymediator {
    width: 100%;
}

#myNetwork .topMyMediator {
    margin-bottom: 29px;
}

#myNetwork .mediator {
    padding: 17px;
}

#myNetwork .mediator p.name {
    font-size: 16px;
    color: #4D4D4D;
}

#myNetwork .mymediator .tips {
    padding-left: 19px;
    margin-bottom: 14px;
}

#myNetwork .mymediator .tips .iconfont {
    color: #F83345;
    font-size: 15px;

}

#myNetwork .mediatorImg {
    width: 36px;
    height: 36px;
    border: 2px solid #B2B2B2;
}

#myNetwork .mymediator .smallTitle {
    color: #8A8A8A;
    font-size: 13px;
    margin-bottom: 10px;
    padding-left: 19px;
}

#myNetwork .topBox {
    width: 100%;
}

#myNetwork .user {
    flex-direction: row;
    padding: 11px 0;
    text-align: center;
}

#myNetwork .user .text .name {
    color: #000000;
    font-size: 16px;
    margin-bottom: 8px;
}

#myNetwork .user .text .id {
    font-size: 12px;
    color: #242424;
}

#myNetwork .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

#myNetwork .ewmPic {
    width: 230px;
    height: 220px;
    margin: 0 auto;
    display: table;

}

#myNetwork .mainText {
    text-align: center;
    margin: 10px 0;
    font-size: 16px;
}

#myNetwork .bottomMediator {
    padding-bottom: 131px;
}
</style>
