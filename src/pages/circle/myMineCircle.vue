<template>
<div id="myMineCircle">
   

    <!-- 每一个朋友圈 -->
    <div class="eachCircle bgW" v-for="item,index in circleList">
        <div class="top flexSpace">
            <div class="left flexStart">
                <!-- <img :src="item.imgurl" class="userImg" alt=""> -->
                <div class="text">
                    <!-- <p class="name">{{item.nickname==''?'暂无':item.nickname}}</p> -->
                    <p class="date">{{item.createTime}}</p>
                </div>
            </div>
            <!-- <div class="right">
                <div class="fellowBtn active" v-if="!item.follow" @click="toFellow(index)">+关注</div>
                <div class="fellowBtn" v-if="item.follow" @click="toFellow(index)">已关注</div>
            </div> -->
        </div>

        <p class="textContent">{{item.content}}</p>
        <div class="picBox" v-if="item.imgurls.length==0?false:true">
            <img :src="'http://nian.im/storage/'+i" alt="" class="uploadImg" v-for="i,j in item.imgurls">
        </div>

            <div class="btnBox flexSpace">
                <div :class="item.collection?'eachBtn flexCenter SCactive':'eachBtn flexCenter'" @click="toCollection(item.id)"><i class="iconfont icon-tubiaozhizuomoban"></i> {{item.collectionCount==0?'':item.collectionCount}}收藏</div>
                <div :class="item.like?'eachBtn flexCenter DZactive':'eachBtn flexCenter '" @click="toLike(item.id)"><i class="iconfont icon-aixin"></i> {{item.likeCount==0?'':item.likeCount}}点赞</div>
                <div class="eachBtn flexCenter " @click="toComment(item.id)"><i class="iconfont icon-tubiaopinglunshu"></i> {{item.commentCount==0?'':item.commentCount}}评论</div>
            </div>
        </div>
    </div>
    
</template>

<script>
import {
    Flexbox,
    FlexboxItem,
    AlertModule
} from 'vux'

export default {
    components: {
        Flexbox,
        FlexboxItem,
        AlertModule
    },
    data() {
        return {
            circleList: [],
            uid:this.$route.query.uid,
            loginUid: this.$store.state.uid
        }
    },
    mounted() {
        this.getCircleLoist()
    },
    methods: {
        // 收藏
        toCollection(id) {
            var that = this;
            var postData = {
                uid: this.uid,
                circleId: id
            }
            that.$http('post', that.$store.state.baseUrl + 'api/Circle/Collection', postData).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    that.getCircleLoist()
                }
            })
        },
        // 点赞
        toLike(id) {
            var that = this;
            var postData = {
                uid: this.uid,
                circleId: id
            }
            that.$http('post', that.$store.state.baseUrl + 'api/Circle/Like', postData).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    that.getCircleLoist()
                }
            })
        },
        // 评论
        toComment(id) {
            this.$router.push({
                path:'/circleDetail',
                query:{
                    circleId:id
                }
            })
        },
       
        // 获取圈子列表
        getCircleLoist() {
            var that = this;
            var baseUrl = that.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/Circle/List', {
                loginUid: that.loginUid,
                uid:that.uid
            }).then(function (res) {
                var result = res.data.data;

                for (var i in result) {
                    if(result[i].imgurls.indexOf(',')==-1){
                        var arr=[];
                        if(result[i].imgurls!=''){
                            arr.push(result[i].imgurls)
                            result[i].imgurls=arr;
                        }else{
                            result[i].imgurls=[]
                        }
                        
                    }else{
                       result[i].imgurls= result[i].imgurls.split(',')
                    }
                    
                }

                that.circleList = result;
            })
        },
        // 关注
        toFellow(i) {
            var that = this;
            var postData = {
                uid: this.uid,
                followingUid: this.circleList[i].uid
            }
            that.$http('post', that.$store.state.baseUrl + 'api/UserFollowing', postData).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    that.getCircleLoist()
                }
            })
            this.circleList[i].follow = !this.circleList[i].follow;
        }
    }
}
</script>

<style scoped>


#myMineCircle .eachCircle {
    margin-bottom: 10px;
    padding-bottom: 18px;
}

#myMineCircle .eachCircle .top {
       padding: 13px 19px 10px 30px;
    align-items: flex-end;
}

#myMineCircle .eachCircle .top .left {
    align-items: flex-start;
}

#myMineCircle .eachCircle .top .left .name {
    color: #333333;
    font-size: 15px;
    margin-bottom: 10px;
}

#myMineCircle .eachCircle .top .left .date {
    color: #686868;
    font-size: 10px;
}

#myMineCircle .eachCircle .top .right .fellowBtn {
    color: #989898;
    font-size: 12px;
    padding: 4px 7px;
    border: 1px solid #B2B2B2;
    border-radius: 2px;
}

#myMineCircle .eachCircle .top .right .fellowBtn.active {
    color: #3375C5;
    font-size: 12px;
    padding: 4px 7px;
    border: 1px solid #3375C5;
    border-radius: 2px;
}

#myMineCircle .eachCircle .textContent {
    padding-left: 30px;
    color: #333333;
    font-size: 12px;
    margin-bottom: 15px;
    padding-right: 64px;
    word-wrap: break-word;
}

#myMineCircle .eachCircle .picBox {
    padding-left: 30px;
    padding-right: 64px;
}

#myMineCircle .eachCircle .picBox .uploadImg {
    height: 79px;
    width: 79px;
}

#myMineCircle .eachCircle .btnBox {
    padding-left: 64px;
    padding-right: 17px;
    margin-top: 20px;
}

#myMineCircle .eachCircle .btnBox .eachBtn {
    flex-direction: row;
}
  #myMineCircle .eachCircle .btnBox .eachBtn.SCactive {
fill: #3375C5;
color: #3375C5;
  }
  #myMineCircle .eachCircle .btnBox .eachBtn.DZactive {
fill: #EA4A5C;
color: #EA4A5C;
  }
#myMineCircle .eachCircle .btnBox .eachBtn i {
    margin-right: 3px;
}
</style>
