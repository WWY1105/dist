<template>
<div id="missionInExecutionBuss">
    <!--任务详情（书商版）-->
    <div class="topBox bgW">
        <div class="hang flexSpace">
            <p class="left"><span class="title">发布者：</span><span>{{nickname}}</span></p>
            <p class="right">{{showData.category}}/{{showData.classNo}}</p>
        </div>
        <div class="hang flexSpace">
            <p class="left"><span class="title">服务提供者：</span><span>{{showData.webUser.nickname}}</span></p>
            <p class="right">{{showData.priceType =='1'?'独资出版':"合资出版"}}/{{showData.coordination=="online"?"远程协作":showData.coordination=="author"?"作者上门":"书商拜访"}}</p>
        </div>
        <div class="hang flexSpace">
            <p class="left"><span class="title">服务接收者：</span>
                <span class="mainText">{{nicknameArr.length==0?'':nicknameArr.join(',')}}</span>
            </p>
            <p class="right">{{showData.area}}</p>
        </div>
    </div>
    <div class="contentText">
        <div class="each">
            <span class="title">简述：{{showData.introduction}}</span>
        </div>
        <div class="each">
            <span class="title">详述：{{showData.content}}</span>
        </div>
    </div>

    <!--进度条-->
    <div class="stepBox flexSpace bgW">
        <div class="line"></div>
        <div :class="showData.status=='已选定服务人'?'active item flexCenter':''">
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
    <div class="statusBox flexSpace bgW">
        <p class="left">状态：{{showData.status}}</p>
        <div class="right">
            <button class="cancelExecute" @click="cancelExecute">取消执行</button>
        </div>
    </div>
    <!-- 是否有取消执行的信息 -->
    <div class="eachPart bgW">
        <div class="title flexSpace">
            <div class="left">取消执行确认</div>
            <div class="right"></div>
        </div>
        <div class="content cancelMsg" v-if="Boolean(missionCancelMsg)&&missionCancelMsg.receviceUid!=$store.state.uid">
            <p><span class="name">{{missionCancelMsg.user.nickname}}</span> 提出取消任务执行</p>
            <p><span class="mainText">理由：</span> 经双方友好协商，同意取消执行当前任务！</p>
            <p class="last flexStart">
                <span class='time'>剩余{{remainingTime.day}}天{{remainingTime.hour}}小时{{remainingTime.minute}}分</span>
                <span class="agree" @click="agreeCancel('2')">同意取消</span>
                <span class="agree agreeNot" @click="agreeCancel('3')">不同意</span>
            </p>
        </div>
    </div>

    <!-- 每个部分 -->
    <div class="eachPart bgW">
        <div class="title flexSpace">
            <div class="left">费用明细与细节</div>
            <div class="right">查看每期</div>
        </div>
        <div class="content">
            <div class="hang flexSpace">
                <p class="left"><span class="title">总费用：</span><span class="mainText">{{stageDetail.price}}</span></p>
                <p class="right "><span class="title">协作阶段：</span><span class="mainText">{{stageDetail.stage}}次</span></p>
            </div>
            <div class="hang flexSpace">
                <p class="left"><span class="title">支付方式：</span><span class="mainText">分阶段在线支付</span></p>
                <p class="right "><span class="title">开始日期：</span><span class="mainText">{{stageDetail.beginDate.substr(0,10)}}</span></p>
            </div>
            <div class="hang flexSpace">
                <p class="left"><span class="title">手续费：</span><span class="mainText">{{stageDetail.handlingFee}}</span></p>
                <p class="right "><span class="title">结束日期：</span><span class="mainText">{{stageDetail.endDate.substr(0,10)}}</span></p>
            </div>
            <div class="hang flexSpace">
                <p class="left"><span class="title">调节费：</span><span class="mainText">{{stageDetail.adjustmentFee}}</span></p>
                <p class="right "><span class="title">费用标准：</span><span class="mainText">￥ {{stageDetail.timeStage}}/人时</span></p>
            </div>
            <div class="lastHang flexStart">
                <div class="bigTitle">每阶段实际到账：<span>￥396</span> </div>
            </div>
        </div>
    </div>
    <!-- 每个部分 -->
    <div class="eachPart bgW">
        <div class="title flexSpace">
            <div class="left">执行情况</div>
            <div class="">下一阶段：{{nextStageTime}}</div>
        </div>
        <div class="content">
            <div class="hang hangList" v-for="item,index in stageDetail.infos">
                <p class="times flexSpace">
                    <span>第{{index+1}}次</span><span>{{item.date}}</span>
                </p>
                <p class="main">计划：{{item.content}}</p>
                <p class="bottom">结果：{{item.success?'按期完成':"未完成"}}</p>
            </div>
        </div>
    </div>
    <div class="btnBox bgW flexSpace">
        <button class="long_btn" @click="gotoWrite">写阶段计划</button>
        <!-- <button class="long_btn" @click="gotoRegist">登记阶段成果</button> -->
        <button :class="isCanRegister?'long_btn':'long_btn disabled'" @click="gotoRegist">登记阶段成果</button>
    </div>

</div>
</template>

<script>
import common from '@/assets/js/common'

import {
    XButton,
    Group,
    PopupPicker,
    Datetime,
    AlertModule
} from 'vux'

export default {
    components: {
        XButton,
        Group,
        PopupPicker,
        Datetime,
        AlertModule
    },
    data() {
        return {
            missionId: this.$route.query.id,
            // 下一阶段时间
            nextStageTime: "",
            // 剩余时间
            remainingTime: {},
            showData: {},
            nickname: '',
            stageDetail: {},
            nicknameArr: [],
            confirmList: [],
            missionCancelMsg: {},
            isCanRegister: false,
            isPay: false

        }
    },

    mounted() {
        this.getMissiondetail(this.missionId);
        this.getStageDetail()
        this.getConfirmWriter(this.missionId)
        this.getCancelMsg();

    },
    methods: {
        // 获取已经确认得用户信息
        getConfirmWriter(id) {
            var that = this;
            var postData = {
                taskId: id,
                status: "2"
            };
            that
                .$http(
                    "get",
                    that.$store.state.baseUrl + "api/Task/Apply/List",
                    postData
                )
                .then(function (res) {
                    // console.log(res.data.data);
                    if (res.data.code != "00") {
                        AlertModule.show({
                            title: res.data.msg
                        });
                    } else {
                        var result = res.data.data;
                        var nicknameArr = [];
                        for (var i in result) {
                            nicknameArr.push(result[i].user.nickname);
                        }
                        that.confirmList = result;
                        that.nicknameArr = nicknameArr;
                        console.log("已确认列表");
                        console.log(nicknameArr);
                    }
                });
        },
        // 获取任务详情
        getMissiondetail(id) {
            var that = this;
            that.$http('get', that.$store.state.baseUrl + 'api/Task/' + id + "?uid=" + this.$store.state.uid).then(function (res) {
                if (res.data.code == '00') {
                    var obj = res.data.data.webUser;
                    if (res.data.data.payTime == null) {
                        that.isPay = false;
                    } else {
                        isPay = true
                    }
                    that.nickname = obj.nickname;
                    // 1-发布中,2-已选定服务人,3-执行中,4-已结束,6-已经取消,99-已失败
                    switch (res.data.data.status) {
                        case 1:
                            res.data.data.status = '发布中'
                            break;
                        case 2:
                            res.data.data.status = '已选定服务人'
                            break;
                        case 3:
                            res.data.data.status = '执行中'
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
                    that.showData = res.data.data;
                } else {
                    AlertModule.show({
                        title: res.data.msg
                    })
                }

            })
        },
        // 是否同意别人的取消
        agreeCancel(num) {
            var that = this;
            var postData = {
                status: num
            }

            var url = that.$store.state.baseUrl + 'api/Task/Cancel/' + that.missionCancelMsg.id;
            // console.log(url)
            that.$http('put', url, postData).then(function (res) {
                if (res.data.code == '00') {
                    AlertModule.show({
                        title: "操作成功"
                    })
                } else {
                    AlertModule.show({
                        title: "操作失败"
                    })
                }
            })
        },
        // 取消执行
        cancelExecute() {
            var that = this;
            that.$http('post', that.$store.state.baseUrl + 'api/Task/Cancel', {
                taskId: that.missionId,
                uid: that.$store.state.uid
            }).then(function (res) {
                if (res.data.code == '00') {
                    AlertModule.show({
                        title: "取消成功"
                    })
                } else {
                    AlertModule.show({
                        title: res.data.msg
                    })
                }
            })
        },
        // 获取任务取消信息
        getCancelMsg() {
            var that = this;
            that.$http('get', that.$store.state.baseUrl + 'api/Task/CancelTask', {
                taskId: that.missionId
            }).then(function (res) {
                if (res.data.code == '00') {
                    that.missionCancelMsg = res.data.data;
                    var time = res.data.data.applyTime;
                    var time3;
                    time3 = new Date(time.replace(/-/g, "/")).getTime() + 1000 * 60 * 60 * 24 * 3;
                    time3 = that.format(time3)
                    var end = that.format(new Date())
                    var day = that.GetDateDiff(end, time3, "day")
                    var hour = Number(that.GetDateDiff(end, time3, "hour")) - day * 24
                    var minute = that.GetDateDiff(end, time3, "minute") - (day * 24 * 60 + hour * 60)
                    console.log('时间' + day + "-" + hour + "-" + minute)
                    that.remainingTime = {
                        day: day,
                        hour: hour,
                        minute: minute
                    };

                    console.log(res.data.data)
                } else {
                    AlertModule.show({
                        title: res.data.msg
                    })
                }
            })
        },
        // 转时间相关======================================
        GetDateDiff(startTime, endTime, diffType) {
            //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
            startTime = startTime.replace(/\-/g, "/");
            endTime = endTime.replace(/\-/g, "/");

            //将计算间隔类性字符转换为小写
            diffType = diffType.toLowerCase();
            var sTime = new Date(startTime); //开始时间
            var eTime = new Date(endTime); //结束时间
            //作为除数的数字
            var divNum = 1;
            switch (diffType) {
                case "second":
                    divNum = 1000;
                    break;
                case "minute":
                    divNum = 1000 * 60;
                    break;
                case "hour":
                    divNum = 1000 * 3600;
                    break;
                case "day":
                    divNum = 1000 * 3600 * 24;
                    break;
                default:
                    break;
            }
            return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
        },

        add0(m) {
            return m < 10 ? '0' + m : m
        },

        format(shijianchuo) {
            var that = this;
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + that.add0(m) + '-' + that.add0(d) + ' ' + that.add0(h) + ':' + that.add0(mm) + ':' + that.add0(s);
        },
        // ====================================================
        // 获取任务费用明细
        getStageDetail() {
            var that = this;
            that.$http('get', that.$store.state.baseUrl + 'api/Task/Stage/' + that.missionId).then(function (res) {
                if (res.data.code == '00') {
                    // nextStageTime
                    var result = res.data.data.infos;
                    for (var i in result) {
                        if (result[i].success) {
                            continue;
                        } else {
                            that.nextStageTime = result[i].date;
                            break;
                        }
                    }
                    // console.log(new Date(that.nextStageTime).getTime() )
                    // console.log(new Date().getTime())
                    if (new Date().getTime() >= new Date(that.nextStageTime).getTime()) {
                        that.isCanRegister = true;
                    }
                    that.stageDetail = res.data.data;

                }
            })

        },
        // 去写阶段计划
        gotoWrite() {
            var that = this;
            if (that.isPay) {
                that.$router.push({
                    path: 'stagePlan',
                    query: {
                        missionId: that.missionId,
                        stageDetail: JSON.stringify(that.stageDetail)
                    }
                })
            } else {
                AlertModule.show({
                    title: "对方尚未支付"
                })
            }

        },
        // 登记阶段成果
        gotoRegist() {
            var that = this;
            that.$router.push({
                path: '/registAchievement',
                query: {
                    missionId: that.missionId,
                    stageDetail: JSON.stringify(that.stageDetail)
                }
            })
        }

    }
}
</script>

<style scoped>
body {
    background: #F5F5F5 !important;
}

#missionInExecutionBuss {
    padding-bottom: 50px;

}

.topBox {
    margin-top: 13px;
    padding: 14px 10px;
}

.topBox .hang {
    margin-bottom: 5px;
    font-size: 12px;
}

.topBox .hang .left span {
    color: #3374C4;
    font-size: 12px;
}

.topBox .hang .left .title {
    color: #999;
    font-size: 12px;
}

.topBox .hang .right {
    color: #999;
    font-size: 12px
}

.contentText {
    padding: 11px;
    color: #999;
    font-size: 12px;
}

.contentText .each {
    margin-bottom: 10px;
}

.stepBox .line {
    z-index: 0;
}

.statusBox {
    padding: 19px;
    margin-bottom: 13px;
}

.statusBox .left {
    color: #3374C4;
    font-size: 14px;
}

.statusBox .right button {
    color: #EA4A5C;
    font-size: 14px;
    width: 85px;
    height: 30px;
    /* padding: 9 13px; */
    border: 1px solid #EA4A5C;
    border-radius: 5px;
}

.eachPart>.title {
    padding: 14px 19px;
    border-bottom: 1px solid #B2B2B2;
    color: #999;
    font-size: 12px;
}

.eachPart>.title .right {
    color: #3374C4;
    text-decoration: underline;

}

.eachPart {
    margin-bottom: 10px;
}

.eachPart>.content {
    padding: 20px 18px;
}

.eachPart>.content {
    color: #3374C4;
}

.eachPart>.content.cancelMsg {
    color: #999999;
    font-size: 12px;
}

.eachPart>.content.cancelMsg p {
    margin-bottom: 16px;
}

.eachPart>.content.cancelMsg p.last {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 38px;
}

.eachPart>.content.cancelMsg .time {
    color: #F83345;
    font-size: 14px;
    font-weight: bolder;
}

.eachPart>.content .name {
    color: #3374C4;
    text-decoration: underline
}

.eachPart>.content .agree {
    display: inline-block;
    width: 85px;
    height: 30px;
    line-height: 30px;
    background: #F83345;
    border: 1px solid #F83345;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    margin-left: 10px;

}

.eachPart>.content .agreeNot {
    color: #F83345;
    background: #fff;
}

.eachPart>.content .left .title {
    color: #999;
}

.eachPart>.content .hangList {
    border-bottom: 1px solid #cecece;
    margin-bottom: 10px;
}

.eachPart>.content .bigTitle {
    color: #999999;
    font-size: 14px;
    font-weight: bolder;
    margin-top: 26px;
}

.eachPart>.content .bigTitle span {
    color: #3374C4;
}

.eachPart>.content .hang p {
    color: #999;
    margin-bottom: 10px;

}

.eachPart>.content .hang p.main {
    color: #242424;
    font-size: 14px;
}

.eachPart>.content .hang p.bottom {
    color: #3375C5;
    font-size: 14px;
}

.btnBox {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.btnBox button {
    margin-top: 7px;
    margin-bottom: 7px;
    width: 40%;
}

.btnBox button.disabled {
    background: #C3C3C3;
    pointer-events: none;
}
</style>
