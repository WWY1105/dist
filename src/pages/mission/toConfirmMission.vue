<template>
  <div id="replyDetail">
    <div class="mainContent" v-if="!canTalk">
      <!--顶部提示信息-->
      <div class="topTips flexSpace">
        <x-icon type="ios-information-outline" size="40" class="icon"></x-icon>
        <span>有效交流的小推荐：先和对方直接电话交流一致的计划，可修改部份 已发布的任务信息和缺省付款方式，再执行本操作书面确认</span>
      </div>

      <!--简要信息-->
      <div class="bgW brifMsg flexSpace">
        <div class="lelft">
          <p>
            发布者：
            <span class="mainText">{{postUser.nickname}}</span>
          </p>
          <p>
            服务提供者：
            <span class="mainText">{{postUser.nickname}}</span>
          </p>
          <p>
            服务接收者：
            <span class="mainText">{{nicknameArr.length==0?'':nicknameArr.join(',')}}</span>
          </p>
        </div>
        <div class="right">
          <p>{{taskObj.classNo}} / {{taskObj.category}}</p>
          <p>{{taskObj.priceType=='1'?'独资出版':'合资出版'}} / {{taskObj.coordination=='online'?'线上沟通':taskObj.coordination=='author'?'作者上门':'书商拜访'}}</p>
          <p>{{taskObj.area}}</p>
        </div>
      </div>

      <!--详细简介-->
      <div class="bgDetail">
        <p class="firstP">简述：{{taskObj.introduction}}</p>
        <p>详述：{{taskObj.content}}</p>
      </div>
      <!--发送确认==================begin====================页面才会显示-->
     
      <!--发送确认==================end====================页面才会显示-->
      <!--每个盒子-1-->
      <div class="eachBox bgW">
        <div class="titleBox flexSpace">
          <span>费用明细与细节</span>
        </div>
        <div class="content flexStart">
          <div class="left">
            <p>
              总费用：
              <span class="mainText">￥{{infoObj.price}}</span>
            </p>
            <p>
              支付方式：
              <span class="mainText">分阶段在线支付</span>
            </p>
            <p>
              手续费({{serviceRate*100}}%)：
              <span class="mainText">￥{{infoObj.handlingFee}}</span>
            </p>
            <p>
              调解费({{adjustmentRate*100}}%)：
              <span class="mainText">￥{{infoObj.adjustmentFee}}</span>
            </p>
          </div>

          <div class="right">
            <p>
              协作阶段：
              <span class="mainText">{{infoObj.timeStage}}</span>
            </p>
            <p>
              开始日期：
              <span class="mainText">{{infoObj.beginDate}}</span>
            </p>
            <p>
              结束日期：
              <span class="mainText">{{infoObj.endDate}}</span>
            </p>
            <p>
              费用单价：
              <span class="mainText">￥1000/小时</span>
            </p>
          </div>
        </div>
        <p class="strongText">
          每阶段实际到账：
          <span class="mainText">￥{{eachPrice}}</span>
        </p>
      </div>
      <!--发送确认==================begin====================页面才会显示-->
      <!--中间提示信息-->
      <div class="topTips flexSpace">
        <x-icon type="ios-information-outline" size="30" class="icon"></x-icon>
        <div>
          <p>调解费为可能出现的纠纷，而带来的费用</p>
          <p>1.即使没有出现纠纷，该费用也会转给调解人</p>
          <p>2.初始调解人是您“我的网络”中的分享人，您可以去掉或替换 分享人从而改变调解人</p>
          <p>3.建议您选择调解人，可以提高本次合作的对方的信心度</p>
        </div>
      </div>
      <!--发送确认==================end====================页面才会显示-->
      <!--  2-->
      <div class="eachBox eachBox2 bgW">
        <div class="titleBox">每阶段费用明细（实际到账）</div>
        <div class="content">
          <div class="eachHang flexSpace" v-for="item,index in infoObj.infos">
            <p class="left">第{{index+1}}次</p>
            <p class="center">{{item.date.substring(0,11)}}</p>
            <p class="right mainText">￥{{item.amount}}</p>
          </div>
        </div>
      </div>
      <!--3-->
      <div class="eachBox eachBox3 bgW" >
        <div class="titleBox flexSpace">
          <span>留言交流</span>
          <span class="mainText" @click="goToTalk">留言</span>
        </div>
        <div class="content">
          <div class="eachItem flexSpace" v-for="item,index in talkList">
            <div class="leftBox" id="resultPeoples">
              <img :src="$store.state.imgUrl+item.imgurl" alt class="userImg">
            </div>
            <div class="rightTime flexSpace">
              <div>
                <p class="name">{{item.nickname}}</p>
                <p class="massage">{{item.content}}</p>
              </div>
              <p>{{item.createTime}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 第一次填写并确认 -->
      <div class="btnBox flexSpace bgw">
        <button  class="long_btn" @click="sendConfirm">确认同意，开始执行</button>
        <button  class="long_btn refuseBtn" @click="sendRefuse">拒绝</button>
      </div>
    </div>
    <!-- 留言页面 -->
    <div class="talkBox" v-if="canTalk">
          <textarea name id placeholder="请输入留言内容，200字以内" v-model="talkContent"></textarea>
           <div class="long_btn"  @click="sendTalkMsg">发送留言</div>
    </div>
  </div>
</template>

<script>
import common from "@/assets/js/common";
import axios from "axios";
import qs from "qs";
import datetimePicker from "@/components/datetimePicker";
import { XButton, Group, PopupPicker, Datetime, AlertModule } from "vux";

export default {
  components: {
    XButton,
    Group,
    PopupPicker,
    Datetime,
    datetimePicker,
    AlertModule
  },
  data() {
    return {
      finalPrice: 0,
      beginDate: "",
      endDate: "",
      leftText2: "每次时长",
      time: [],
      timeArr: [],
      times: [],
      timesArr: [],
      leftText1: "阶段次数",
      // 被选择的作者
      chooseWriterId: this.$route.query.chooseWriterId,
      // 是否填写过阶段信息
      // isNew: this.$route.query.isNew,
      canTalk: false,
      // 任务id
      taskId: this.$route.query.taskId,
      taskObj: {},
      stage: 0,
      sendSuccess: this.$route.query.sendSuccess,
      gapDay: 1,
      eachPrice: 0,
      timesList: [],
      serviceRate: 0,
      adjustmentRate: 0,
      postUser: {},
      confirmList: [],
      nicknameArr: [],
      talkContent:'',
      talkList:[],
      infoObj:{}
    };
  },

  mounted() {
    var arr = [];
    for (var i = 1; i <= 12; i++) {
      arr.push(i);
    }
    this.timesArr.push(arr);
    var arr2 = [];
    for (var i = 1; i <= 24; i++) {
      arr2.push(i);
    }
    this.timeArr.push(arr);

    this.getMissiondetail(this.taskId);
    // 调节费
    this.getBaseRate();
    // 被选择的作者
    this.getConfirmWriter(this.taskId);
    console.log("当前任务对象");

    this.getUser("postUser", this.$store.state.uid);
    this.getTalkList();
    this.getStageMsg(this.taskId)
  },
  methods: {
    ...common,
    // 点击留言按钮吧
    goToTalk(){
        this.canTalk=true;
    },
    // 发送私信
    sendTalkMsg(){
         var that = this;
      var baseUrl = that.$store.state.baseUrl;
      that
        .$http("post", baseUrl + "api/TaskTalk", {
            uid:that.$store.state.uid,
             taskId: that.taskId,
             content:that.talkContent
        })
        .then(function(res) {
            that.getTalkList()
            that.canTalk=false;
        //   that.talkList=res.data.dta;
        });
        
    },
    // 获取留言列表
    getTalkList() {
      var that = this;
      var baseUrl = that.$store.state.baseUrl;
      that
        .$http("get", baseUrl + "api/TaskTalk/List", {
          taskId: that.taskId
        })
        .then(function(res) {
          that.talkList=res.data.data;
          console.log("留言列表");
          console.log(that.talkList)
        });
    },

    // 根据用户id获取用户信息
    getUser(who, uid) {
      var that = this;
      var baseUrl = that.$store.state.baseUrl;
      var user;
      that.$http("get", baseUrl + "api/WebUser/" + uid).then(function(res) {
        if (who == "postUser") {
          that.postUser = res.data.data;
        }
        console.log("获取的用户对象");
        console.log(that.postUser);
      });
      // return user;
    },
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
        .then(function(res) {
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
      that
        .$http(
          "get",
          that.$store.state.baseUrl +
            "api/Task/" +
            id
            //  +
            // "?uid=" +
            // this.$store.state.uid
        )
        .then(function(res) {
          if (res.data.code != "00") {
            AlertModule.show({
              title: res.data.msg
            });
          } else {
            that.taskObj = res.data.data;
            // alert(res.data.data)
          }
        });
    },
    //获取阶段信息
    getStageMsg(id){
             var that = this;
             that
        .$http(
          "get",
          that.$store.state.baseUrl +
            "api/Task/Stage/" +
            id
            //  +
            // "?uid=" +
            // this.$store.state.uid
        )
        .then(function(res) {
          if (res.data.code != "00") {
            AlertModule.show({
              title: res.data.msg
            });
          } else {
           var  result=res.data.data
           result.beginDate=result.beginDate.substr(0,10);
            result.endDate=result.endDate.substr(0,10);
            that.infoObj = result;
            //  console.log('阶段信息')
            //  that.timesList=res.data.data.infos
            //  console.log(res.data.data)
          }
        });
    },
    // 发送拒绝
    sendRefuse(){
         var that = this;
      var postData = {
        taskId: that.taskId,
        status: "4"
      };
       that
        .$http(
          "post",
          that.$store.state.baseUrl +
            "api/Task/Stage/Confirm" ,
            postData
        ).then(function(res) {
          if (res.data.code != "00") {
            AlertModule.show({
              title: res.data.msg
            });
          } else {
            AlertModule.show({
              title: "拒绝成功"
            });
          }
        });
     
    },
    // 发送确认
    sendConfirm() {
      var that = this;
      var postData = {
        taskId: that.taskId,
        status: "2"
      };
       that
        .$http(
          "post",
          that.$store.state.baseUrl +
            "api/Task/Stage/Confirm" ,
            postData
        ).then(function(res) {
          if (res.data.code != "00") {
            AlertModule.show({
              title: res.data.msg
            });
          } else {
            AlertModule.show({
              title: "确认成功",
              onHide(){
                that.$router.push({
                  name:'myEnrollMission'
                })
              }

            });
      
          }
        });
     
    
    },
    // 获取阶段次数
    timesChange(val) {
      // console.log(val)
      this.stage = val.join("");
    },
    // 获取每次时长
    timeChange(val) {},
    // 开始时间
    beginDateChange(val) {
      this.beginDate = val;
    },
    // 结束日期
    endDateChange(val) {
      this.endDate = val;
    }
  }
};
</script>

<style scoped>
body {
  background: #f5f5f5 !important;
}

#replyDetail {
  /* padding-bottom: 60px; */
}
#replyDetail .refuseBtn{
    background: #fff;
    color: #EA4A5C;
    border: 1px solid #EA4A5C;
    margin-left: 10px;
 }
.smallBtn {
  border: 1px solid #3375c5;
  border-radius: 5px;
  padding: 3px 5px;
  color: #999999;
}

#replyDetail .topTips {
  padding: 10px;
  align-items: flex-start;
  vertical-align: top;
  color: #8a8a8a;
  font-size: 11px;
}

#replyDetail .icon {
  height: auto;
  margin-right: 7px;
  display: inline-block;
  fill: #f83345;
}

#replyDetail .brifMsg {
  padding: 12px 10px;
  color: #999;
  line-height: 20px;
}

#replyDetail .brifMsg .mainText {
  text-decoration: underline;
}

#replyDetail .bgDetail {
  padding: 13px 11px;
  color: #999999;
  font-size: 12px;
  background: #f5f5f5;
  border-bottom: 16px solid #fff;
  margin-bottom: 10px;
}

#replyDetail .bgDetail .firstP {
  margin-bottom: 10px;
}

#replyDetail .eachBox {
  margin-bottom: 10px;
}

#replyDetail .eachBox .titleBox {
  padding: 14px 19px;
  color: #999999;
  font-size: 12px;
  border-bottom: 1px solid #b2b2b2;
}

#replyDetail .eachBox .content {
  padding: 21px 18px 0px 18px;
  line-height: 25px;
  color: #999999;
  font-size: 12px;
}

#replyDetail .eachBox .content .right {
  padding-left: 44px;
}

#replyDetail .eachBox .strongText {
  font-size: 14px;
  margin-top: 13px;
  color: #999999;
  padding-left: 18px;
  padding-bottom: 24px;
  font-weight: bold;
}

#replyDetail .eachBox .content .eachHang {
  font-size: 14px;
  margin-bottom: 10px;
}

#replyDetail .eachBox .content .eachHang .center {
  color: #242424;
  padding: 4px 15px;
  border-radius: 5px;
  background: #f5f5f5;
  border: 1px solid #cecece;
  min-width: 105px;
}

#replyDetail .eachBox2 {
  padding-bottom: 16px;
}

#replyDetail .eachBox2 .content .right {
  padding-left: 0;
  font-weight: bold;
}

#replyDetail .eachBox3 .content .eachItem {
  margin-bottom: 10px;
}

#replyDetail .eachBox3 .content .eachItem .rightTime {
  width: 100%;
  align-items: flex-start;
  border-bottom: 1px solid #b2b2b2;
  padding-bottom: 10px;
}

#replyDetail .eachBox3 .content .eachItem .rightTime div {
  color: #333333;
}

#replyDetail .eachBox3 {
  margin-bottom: 129px;
}

#replyDetail .bottomBtnBox {
  padding: 7px 10px;
  font-size: 14px;
}

#replyDetail .btnBox {
  position: fixed;
  bottom: 0;
  padding: 8px 10px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #c3c3c3;
}

#replyDetail .long_btn {
  width: 100%;
  margin-top: 0px !important;
}

#replyDetail .long_btn.disable {
  background: #c3c3c3;
}

#replyDetail .bottomBtnBox button.refuce {
  background: #fff !important;
  color: #ea4a5c !important;
  border-color: #ea4a5c !important;
}

#replyDetail .bottomBtnBox button.refuce.weui-btn:after {
  border-color: #ea4a5c !important;
}

#replyDetail .sendConfirm .content {
  padding-right: 0;
  padding-top: 0;
}

#replyDetail .sendConfirm .eachLink {
  color: #333333;
  font-size: 15px;
  border-bottom: 1px solid #d9d9d9;
  padding-top: 8px;
  padding-bottom: 14px;
  padding-right: 8px;
}

#replyDetail .sendConfirm .eachLink.slide {
  padding: 0;
}

#replyDetail .sendConfirm .eachLink > div {
  width: 100%;
}

#replyDetail .sendConfirm .eachLink.finalPriceLink > div {
  width: auto;
}

#replyDetail .weui-cells:before,
#replyDetail .weui-cells:after {
  border: none;
}

#replyDetail .weui-cell {
  padding-left: 0;
  width: 100%;
}

#replyDetail
  .sendConfirm
  .eachLink
  .vux-x-icon.vux-x-icon-ios-arrow-right.arrow {
  fill: #7f7f7f;
}

.finalPrice {
  height: 100%;
  border: none;
  text-align: left;

  width: auto;
  max-width: 70px;
}
 /* ====================== */
 .talkBox {
    background: #f5f5f5;
    padding: 20px 18px;
    min-height: 670px;
}

 .talkBox textarea {
    padding: 16px;
    width: 100%;
    height: 207px;
    border-radius: 4px;
    border-color: rgba(178, 178, 178, 0.4);
    margin-bottom: 20px;
}
 .talkBox .long_btn {
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    margin-top: 45px;
}
</style>
