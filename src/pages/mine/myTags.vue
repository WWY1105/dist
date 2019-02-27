<template>
<div id="myTags">
    <div class="topBox bgW" v-if="userData.type=='author'?true:false">
        <p class="title">书商评价标签（2018-7-1起）</p>
        <div class="content flexSpace">
            <div class="eachItem" v-for="item,index in tags">{{item.tagName}} <span class="num">30</span></div>
            <!-- <div class="eachItem">写作认证 <span class="num">30</span></div>
            <div class="eachItem">写作认证 <span class="num">30</span></div>
            <div class="eachItem">写作认证 <span class="num">30</span></div> -->
        </div>
    </div>
    <div class="bottomBox bgW">
        <p class="title">自我标签（选择后保存）</p>
        <div class="content flexSpace">
            <div :class="item.active?'eachItem active':'eachItem '" v-for="item,index in tags" @click="chooseTags(index)">{{item.tagName}}</div>
            <!-- <div class="eachItem">写作认证 <span class="num">30</span></div>
            <div class="eachItem">写作认证 <span class="num">30</span></div>
            <div class="eachItem">写作认证 <span class="num">30</span></div> -->
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
    AlertModule
} from 'vux'
export default {
    data() {
        return {
            userData: {},
            tags: [],
            uid: this.$store.state.uid,
            userTags: []
        }
    },
    components: {
        AlertModule
    },
    mounted() {
        // 获取当前用户信息
        this.getWebUser(this.uid);
        // 获取标签列表
        this.getTasgs()
        // 和我自己的标签对比 
        // this.isChoosed()

    },
    methods: {
        ...common,
        // 根据ID获取用户信息、
        getWebUser(uid) {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/UserTag/List?uid=' + that.$store.state.uid).then(function (res) {
                // 自我标签type=1
                for(let i in res.data.data){
                    if(res.data.data[i].type=='1'){
                        that.userTags.push(res.data.data[i])
                    }
                }
                // that.userTags = res.data.data;
console.log(that.tags.length+"============" + that.userTags.length)
                for (var i in that.tags) {
                    for (var j in that.userTags) {
                        console.log(that.tags[i].tagName+"============" + that.userTags[j].tag)
                        if (that.tags[i].tagName == that.userTags[j].tag) {
                            
                             that.tags[i].active = true;
                        }
                    }
                }
                // 我的标签列表
                console.log("我的标签列表")
                console.log(that.userTags);
                console.log(that.tags);
            })
        },
        // isChoosed() {
        //     var that = this;
        //     for (var i in that.tags) {
        //         for (var j in that.userTags) {
        //             if (that.tags[i].tagName == that.userTags[j].tagName) {
        //                 that.tags[i].active = true;
        //             }
        //         }
        //     }

        // },
        // 选择标签
        chooseTags(i) {
            this.tags[i].active = !this.tags[i].active;
        },
        // 保存我的标签
        saveMyTags() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            var arr = []
            for (var i in this.tags) {
                if (this.tags[i].active == true) {
                    arr.push(this.tags[i].tagName)
                }
            }
            if (arr.length == 0) {
                AlertModule.show({
                    title: '请选择标签'
                })
            } else {
                var postData = {
                    uid: this.$store.state.uid,
                    tags: arr.join(',')
                }
                that.$http('post', baseUrl + 'api/UserTag/User', postData).then(function (res) {
                    //   that.userData = res.data.data;
                    console.log("提交标签")
                    if (res.data.code == '00') {
                        AlertModule.show({
                            title: '提交成功',
                            onHide() {
                                that.$router.push({
                                    path: '/mineIndex'
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
    },
    components: {

    }
}
</script>

<style scoped>
#myTags .topBox,
#myTags .bottomBox {
    padding-left: 10px;
}

#myTags .bottomBox {
    margin-top: 10px;
}

#myTags .title {
    border-bottom: 1px solid #CECECE;
    height: 40px;
    line-height: 40px;
    color: #3375C5;
    font-size: 12px;
}

#myTags .content {
    padding-top: 14px;
    padding-right: 10px;
    /* padding-bottom: 16px; */
    flex-wrap: wrap;
}

#myTags .content .eachItem {
    padding: 7px 12px;
    border: 1px solid #848484;
    margin-bottom: 14px;
    color: #868686;
    font-size: 14px;
}

#myTags .content .eachItem.active {
    color: #fff;
    background: #3375C5;
    border: 1px solid #3375c5;
}

#myTags .content .eachItem span {
    color: #3375C5;
    margin-left: 5px;
}

#myTags .btnBox {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
}

#myTags .btnBox button.long_btn {
    width: 100%;
    margin-top: 54px;
}
</style>
