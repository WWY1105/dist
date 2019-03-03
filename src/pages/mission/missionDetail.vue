<template>
<div id="missionDetail" class="bgW">
    <div class="content">
        <div class="peple flexSpace">
            <div class="left flexStart">
                <img :src="$store.state.imgUrl+showData.webUser.imgurl" alt="" @click="seeUserDetail(showData.uid)">
                <div class="desc">
                    <p class="name">{{showData.webUser.nickname}}</p>
                    <p class="tag">
                        <span>实名
                               <i class="iconfont icon-wenhao" v-if="showData.realAuth!=2?true:false"></i>
                        <i class="iconfont icon-gouxuan" v-if="showData.realAuth==2?true:false"></i>
                            </span>
                        <span>学历
                               <i class="iconfont icon-wenhao" v-if="showData.eduAuth!=2?true:false"></i>
                        <i class="iconfont icon-gouxuan" v-if="showData.eduAuth==2?true:false"></i>
                            </span>
                    </p>
                </div>
            </div>
            <div class="right">
                <p class="button searchSS" v-if="showData.taskType=='2'?true:false">找书商</p>
                <p class="button searchZZ" v-if="showData.taskType=='1'?true:false">找作者</p>
                <p class="button searchSZ" v-if="showData.taskType=='3'?true:false">找作者和书商</p>
                <p class="price">￥{{showData.priceRange}}/人时</p>
            </div>
        </div>
        <div class="detailShift">
            <p class="blueTitle flexSpace">
                <span>状态：{{showData.status}}</span>
                <!-- <span>截至报名：{{showData.deadline.substr(0,10)}}</span> -->
            </p>
            <p class="flexSpace">
                <span>{{authorInfo.classNo}} / {{authorInfo.subject}} / {{showData.coordination}}</span>
                <span>已报名：{{showData.applicationCount}} </span>
            </p>
            <p class="flexSpace">
                <span>书商拜访 / {{showData.area}}</span>
                <span>发布日期：{{showData.createTime}}</span>
            </p>
        </div>
        <div class="bgDetail">
            <p class="firstP">简述：{{showData.introduction}}</p>
            <div style="word-wrap: break-word;">详述：{{showData.content}}
            </div>
        </div>

        <!--进度条-->
        <div class="stepBox flexSpace">
            <div class="line"></div>
            <div :class="showData.status=='待确认'?'active item flexCenter':''">
                <p class="circle"></p>
                <p class="text">待确认</p>
            </div>
            <div :class="showData.status=='执行中'?'active item flexCenter':''">
                <p class="circle"></p>
                <p class="text">执行</p>
            </div>
            <div :class="showData.status=='已结束'?'active item flexCenter':''">
                <p class="circle"></p>
                <p class="text">结束</p>
            </div>
        </div>

    </div>
    <div class="enrollBox bgW" v-if="showData.taskType=='1'||showData.taskType=='3'?true:false">
        <div class="title flexSpace">
            <div class="left flexSpace">
                <p>作者报名名单（单选）</p>
                <p>排序<i class="iconfont icon-paixu"></i></p>
            </div>
            <div class="right">筛选<i class="iconfont icon-shaixuan"></i></div>
        </div>
        <div class="writerBox" v-if="isMyTask">
            <writers :isMissionDetail='false' 
            :imgurl="item.user.imgurl"
            :isCanChoose="isCanChoose" 
            @click.native="chooseWriter(index)" 
            :isChoosen="item.isChoosen" 
            v-if="enrollerWriterList.length==0?false:true"
            v-for="item,index in enrollerWriterList" 
            :realAuth="item.user.realAuth" 
            :eduAuth="item.user.eduAuth" 
            :networkCount="item.user.networkCount" 
            :workAge="item.user.authorAuthInfo.workAge" 
            :soleCost="item.user.authorInfo.soleCost" 
            :shortName="item.user.nickname"
            :uid="item.uid"
            :userTags="item.user.authorInfo.userTags"></writers>
        </div>
    </div>
      <div class="enrollBox bgW" v-if="showData.taskType=='2'||showData.taskType=='3'?true:false">
        <div class="title flexSpace">
            <div class="left flexSpace">
                <p>书商报名名单</p>
                <p>排序<i class="iconfont icon-paixu"></i></p>
            </div>
            <div class="right">筛选<i class="iconfont icon-shaixuan"></i></div>
        </div>
        <div class="writerBox" v-if="isMyTask">
            <writers :isMissionDetail='false' 
            :isCanChoose="isCanChoose" 
            @click.native="chooseBuss(index)" 
            :isChoosen="item.isChoosen" 
            v-if="enrollerBussList.length==0?false:true"
            v-for="item,index in enrollerBussList" 
            :realAuth="item.user.realAuth" 
            :eduAuth="item.user.eduAuth" 
            :networkCount="item.user.networkCount" 
            :workAge="item.user.authorAuthInfo.workAge" 
            :soleCost="item.user.authorInfo.soleCost" 
            :shortName="item.user.nickname"
            :imgurl="item.user.imgurl"
            :uid="item.uid"></writers>
        </div>
    </div>
    <!-- 不是我的任务 -->
    <div class="btnBox bgw" v-if="!isMyTask">

        <button v-if="apply?taskStatus=='3'?true:false:false" class="long_btn" @click="toConfirmTask">发布者已回复，请确认（剩余？？？）</button>
        <button v-if="apply&&taskStatus=='7'?true:false" class="long_btn disable">已报名，请等待发布者确认</button>
        <button v-if="!apply" class="long_btn" @click="toEnroll">参加报名（截至{{showData.deadline}}）</button>

    </div>
    <div class="btnBox bgw" v-if="isMyTask">
        <flexbox>
            <flexbox-item>
                <router-link tag="button" class="long_btn clbm" :to="{path:'/handelEnroll',query:{taskId:id,priceType:showData.priceType,taskType:showData.taskType,busniessCount:showData.busniessCount}}">处理报名
                    <badge v-if="enrollerWriterList.length+enrollerBussList.length==0?false:true" :text="enrollerWriterList.length+enrollerBussList.length"></badge>
                </router-link>
            </flexbox-item>
            <flexbox-item><button  class="long_btn red" @click.stop="deleteTesk">取消发布</button></flexbox-item>
        </flexbox>
    </div>
</div>
</template>

<script>
import common from '@/assets/js/common'
import writers from '@/components/writer/writer'
import {
    Step,
    StepItem,
    XButton,
    XHr,
    AlertModule,
    Flexbox,
    FlexboxItem,
    Badge,
    Toast
} from 'vux'
export default {
    components: {
        Badge,
        writers,
        Step,
        StepItem,
        XButton,
        XHr,
        AlertModule,
        Flexbox,
        FlexboxItem,
        Toast
    },
    data() {
        return {
            isCanChoose: true,

            step1: 1,
            step2: 0,
            // 任务的id
            id: this.$route.query.id,
            showData: {},
            shortClass: '',
            shortSubject: '',
            // 是否已报名
            apply: false,
            enrollerWriterList: [],
             enrollerBussList: [],
            // 是不是我的任务
            isMyTask: this.$route.query.isMyTask,
            authorInfo: {},
            userData:{},
            taskStatus:'',
            taskType:'1'
        }
    },
    mounted() {
        // console.log()
        this.getMissiondetail(this.id);
        this.getEnrollWriter(this.id)
        // 获取当前登陆用户信息
        this.getWebUser(this.$store.state.uid)
      
    },
    methods: {
        ...common,
        // 作者已经回复，去确认任务信息
        toConfirmTask(){
            var that=this;
            that.$router.push({
                path:'/toConfirmMission',
                query:{
                    chooseWriterId:that.$store.state.uid,
                    isNew:false,
                    taskId:that.id,
                    sendSuccess:true
                }
            })
        },
        // 单选一个作者
        chooseWriter(i) {
            console.log('点击了')
            var that = this;
            for (var i in that.enrollerWriterList) {
                that.enrollerWriterList[i].isChoosen = false;
            }
            that.enrollerWriterList[i].isChoosen = !that.enrollerWriterList[i].isChoosen;
        },
        // 取消发布
        deleteTesk() {
            var that = this;
            that.$http('delete', that.$store.state.baseUrl + 'api/Task/' + that.id).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    AlertModule.show({
                        title: "取消成功"
                    });
                    that.$router.go(-1)
                }
            })
        },
        // 获取报名的作者列表
        getEnrollWriter() {
            var that = this;
            var postData = {
                // taskId: that.id,
                taskId: that.id,
                status: "1"
                // uid: this.$store.state.uid
            }
            that.$http('get', that.$store.state.baseUrl + 'api/Task/Apply/List', postData).then(function (res) {
                // console.log(res.data.data);
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    var result = res.data.data;
                    var arr=[]
                    var arr1=[]
                    for (var i in result) {
                        if(result[i].userType=='author'){
                            arr.push(result[i])
                        }else{
                            arr1.push(result[i])
                        }
                        result[i].isChoosen = false
                    }

                    that.enrollerBussList = arr1;
                    that.enrollerWriterList = arr;
                    console.log('获取报名的作者列表')
                    console.log(that.enrollerBussList)
                }
            })
        },
        // 报名
        toEnroll() {
            var that = this;
            //任务类型：1-找作者,2-找书商,3-找作者和书商
            var missionType=that.showData.taskType;
            // 当前用户的身份
            var userType=that.userData.type;
            if(userType=='author'&&missionType=='2'||userType=='business'&&missionType=='1'){
                AlertModule.show({
                        title: "报名身份条件不满足",
                })
            }else{
                var postData = {
                taskId: that.id,
                uid: this.$store.state.uid
            }
            that.$http('post', that.$store.state.baseUrl + 'api/Task/Apply', postData).then(function (res) {
                // console.log(res.data.data);
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg,
                        onHide: function () {
                            that.$router.push({
                                name: 'mission'
                            })
                        }
                    })
                } else {
                    AlertModule.show({
                        title: '报名成功',
                        onHide: function () {
                            that.$router.push({
                                name: 'mission'
                            })
                        }

                    })

                }
            })
            }
        },
        // 获取任务详情
        getMissiondetail(id) {
            var that = this;
            that.$http('get', that.$store.state.baseUrl + 'api/Task/' + id + "?uid=" + this.$store.state.uid).then(function (res) {
                that.apply = res.data.data.apply
                that.taskType=res.data.data.taskType
                 that.taskStatus=res.data.data.status;
            
                // 1-发布中,2-已选定服务人,3-执行中,4-已结束,6-已经取消,99-已失败
                switch (res.data.data.status) {
                    case 1:
                        res.data.data.status = '发布中'
                        break;
                    case 2:
                        res.data.data.status = '已确认'
                        break;
                    case 3:
                        res.data.data.status = '执行中'
                        break;
                    case 7:
                        res.data.data.status = '待确认'
                        break;
                    case 4:
                        res.data.data.status = '已结束'
                        break;
                    case 6:
                        res.data.data.status = '已取消'
                        break;
                    case 99:
                        res.data.data.status = '已失败'
                        break;
                }
                // 都是任务的信息
                that.authorInfo = res.data.data.webUser.authorInfo;
               
                that.showData = res.data.data;
                 console.log(that.apply+"---"+that.taskStatus)
            })
        },
        nextStep() {
            this.step2++
        }
    }
}
</script>

<style scoped>
#missionDetail {
    min-height: 500px;
    height: 100%;
    overflow: scroll;
    padding-bottom: 60px;
}

.stepBox .line {
    z-index: 0;
}

body {
    background: #F5F5F5 !important;
}

#missionDetail .content .peple {
    padding: 11px;
}

#missionDetail .content .peple img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 11px;
}

#missionDetail .content .peple .name {
    font-weight: bold;
    color: #646464;
    font-size: 14px;
    margin-bottom: 10px;
}

#missionDetail .content .peple .tag {
    color: #999;
}

#missionDetail .content .peple .tag i {
    color: #3375C5;
    margin-left: 4px;
}

#missionDetail .content .peple {
    padding-bottom: 12px;
    border-bottom: 1px solid #cecece;
}

#missionDetail .content .peple .right .smallBtn {
    color: #2EA200;
    border: 1px solid #2EA200;
    width: 60px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 8px;
}

#missionDetail .content .peple .right .price {
    color: #FF3636;
    font-weight: bold;
}

#missionDetail .detailShift {
    padding: 13px 11px;
    color: #999999;
    font-size: 12px;
}

#missionDetail .detailShift .flexSpace {
    margin-bottom: 3px;
}

#missionDetail .detailShift .flexSpace.blueTitle {
    color: #3374C4;
}

#missionDetail .bgDetail {
    padding: 13px 11px;
    color: #999999;
    font-size: 12px;
    background: #F5F5F5;
}

#missionDetail .bgDetail .firstP {
    margin-bottom: 10px;
}

#missionDetail .btnBox {
    position: fixed;
    bottom: 0;
    padding: 8px 10px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #C3C3C3;
}

#missionDetail .long_btn {
    width: 100%;
    margin-top: 0px !important;
}

#missionDetail .long_btn.disable {
    background: #C3C3C3;
}

.content .right .button {
    font-size: 14px;
    padding: 1px 7px 1px 12px;
    border-radius: 5px;
    margin-bottom: 8px;
}

.content .right .button.searchSS {
    color: #2EA200;
    border: 1px solid #2EA200;
}

.content .right .button.searchZZ {
    color: #3375C5;
    border: 1px solid #3375C5;
}

.content .right .button.searchSZ {
    color: #FEAB29;
    border: 1px solid #FEAB29;
}

#missionDetail .enrollBox .title {
    /* height: 40px;
    line-height: 40px; */
    color: #636363;
    font-size: 15px;
    border-top: 10px solid #F5F5F5;
    padding: 7px 15px;
    border-bottom: 1px solid #CECECE;
    /*  margin-top: 10px;
    margin-bottom: 60px; */
}

#missionDetail .enrollBox .title i.iconfont {
    color: #3374C4;
}

#missionDetail .enrollBox .title .right {
    padding-left: 30px;
    border-left: 1px solid #CECECE;
    min-width: 80px;
}

#missionDetail .enrollBox .title .left {
    width: 100%;
    padding-right: 30px;
}

#missionDetail .enrollBox .reacResult .titleBox {
    margin-bottom: 0;

}

#missionDetail .enrollBox .reacResult .details {
    font-size: 12px;
}

#missionDetail .reacResult {
    margin-top: 0;
}

#missionDetail .long_btn.red {
    background: #fff;
    color: #EA4A5C;
    border: 1px solid #EA4A5C;
}

#missionDetail .long_btn.clbm {
    position: relative;
}

#missionDetail .long_btn.clbm .vux-badge-single {
    position: absolute;
    top: 5px;
}
</style>
