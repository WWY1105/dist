<template>
  <div id="replyDetail">
    <div class="main" v-if="mainShow">
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
            <p>服务提供者：
              <span class="mainText">{{serviceProvider}}</span>
              <!-- <span class="mainText">{{nicknameArr.length==0?'':nicknameArr.join(',')}}</span> -->
            </p>
            <!-- 出钱的人 -->
            <p>服务接收者：
              <span class="mainText" @click="mainShow=!mainShow;serviceRecipientShow=!serviceRecipientShow">{{serviceReceiver.split(',').length>=5?"查看详细名单共"+bussArr.length+"人":serviceReceiver}}</span>
              <!-- <span class="mainText">{{postUser.nickname}}</span> -->
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
          <p style="word-wrap: break-word">详述：{{taskObj.content}}</p>
        </div>
        <!--发送确认==================begin====================页面才会显示-->
        <div class="eachBox bgW sendConfirm" v-if="!sendSuccess">
          <div class="titleBox flexSpace">
            <span>细节确认</span>
            <!-- <button class="smallBtn" @click="getTimesList">生成费用列表</button> -->
          </div>
          <div class="content">
            <div class="eachLink slide flexSpace">
              <group>
                <!--阶段次数选择器start-->
                <popup-picker
                  :title="leftText1"
                  @on-change="timesChange"
                  v-model="times"
                  :data="timesArr"
                  class="gradePicker"
                ></popup-picker>
                <!--阶段次数选择器end-->
              </group>
            </div>
            <div class="eachLink slide flexSpace">
              <!-- <span class="left">每次时长</span>
                <span class="right flexSpace mainText">1小时
                        <x-icon class="arrow" type="ios-arrow-right" size="20"></x-icon>
              </span>-->
              <group>
                <!--每次时长选择器start-->
                <popup-picker
                  :title="leftText2"
                  @on-change="timeChange"
                  v-model="time"
                  :data="timeArr"
                  class="gradePicker"
                ></popup-picker>
                <!--每次时长选择器end-->
              </group>
            </div>
            <div class="eachLink slide flexSpace">
              <datetimePicker
                title="开始日期"
                v-model="beginDate"
                class="datetimePicker"
                v-on:dateChange="beginDateChange"
              ></datetimePicker>
              <!-- <span class="left">开始日期</span>
                <span class="right flexSpace mainText">2018-09-31
                        <x-icon class="arrow" type="ios-arrow-right" size="20"></x-icon>
              </span>-->
            </div>
            <div class="eachLink slide flexSpace">
              <datetimePicker
                title="结束日期"
                v-model="endDate"
                class="datetimePicker"
                v-on:dateChange="endDateChange"
              ></datetimePicker>
              <!-- <span class="left">结束日期</span>
                <span class="right flexSpace mainText">2018-12-31
                        <x-icon class="arrow" type="ios-arrow-right" size="20"></x-icon>
              </span>-->
            </div>
            <div class="eachLink flexSpace finalPriceLink">
              <span class="left">最终总价</span>
              <div class="right flexSpace mainText">
                <p class="finalPriceBox">
                  <span>￥</span>
                  <input
                    type="number"
                    v-model="finalPrice"
                    placeholder="0"
                    class="finalPrice mainText"
                  >
                </p>
                <x-icon class="arrow" type="ios-arrow-right" size="20"></x-icon>
              </div>
            </div>
          </div>
          <div class="titleBox flexSpace">
            <span></span>
            <button class="smallBtn" @click="getTimesList">生成费用列表</button>
          </div>
        </div>
        <!--发送确认==================end====================页面才会显示-->
        <!--每个盒子-1-->
        <div class="eachBox bgW">
          <div class="titleBox flexSpace">
            <span>费用明细与细节</span>
            <span class="mainText" v-if="sendSuccess" @click="reEditInfo">修改</span>
          </div>
          <div class="content flexSpace">
            <div class="left">
              <p>
                总费用：
                <span class="mainText">￥{{finalPrice}}</span>
              </p>
              <p>
                阶段次数：
                <span class="mainText">{{times.join('')}}</span>
              </p>
              <p>
                每次时长：
                <span class="mainText">{{time.join('')}}</span>
              </p>
              <p>
                总共时长：
                <span class="mainText">{{time.join('')*times.join('')}}</span>
              </p>
              <p>
                费用单价：
                <span
                  class="mainText"
                >￥{{Math.round(Math.floor(finalPrice-(serviceRate*finalPrice+finalPrice*adjustmentRate))/(times.join('')*time.join(''))*100)/100}}/小时</span>
              </p>
            </div>

            <div class="right">
              <p>
                开始日期：
                <span class="mainText">{{beginDate}}</span>
              </p>
              <p>
                结束日期：
                <span class="mainText">{{endDate}}</span>
              </p>
              <p>
                支付方式：
                <span class="mainText">分阶段在线支付</span>
              </p>
              <p>
                手续费({{serviceRate*100}}%)：
                <span class="mainText">￥{{serviceRate*finalPrice}}</span>
              </p>
              <p>
                调解费({{adjustmentRate*100}}%)：
                <span class="mainText">￥{{finalPrice*adjustmentRate}}</span>
              </p>
            </div>
          </div>
          <p class="strongText">
            服务最终实际到账
            <span
              class="mainText"
            >￥{{finalPrice-serviceRate*finalPrice-finalPrice*adjustmentRate}}</span>
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
            <div class="eachHang flexSpace" v-for="item,index in timesList">
              <p class="left">第{{item.index}}次</p>
              <p class="center">{{item.date.split('/').join('-')}}</p>
              <p class="right mainText">￥{{item.money}}</p>
            </div>
            <!-- <div class="eachHang flexSpace">
                <p class="left">第1次</p>
                <p class="center">2018-9-31</p>
                <p class="right mainText">￥396</p>
            </div>-->
          </div>
        </div>
        <!--3-->
        <div class="eachBox eachBox3 bgW" v-if="sendSuccess">
          <div class="titleBox flexSpace">
            <span>留言交流</span>
            <span class="mainText" @click="goToTalk">留言</span>
          </div>
          <div class="content">
            <div class="eachItem flexSpace" v-for="item,index in talkList">
              <div class="leftBox" id="resultPeoples">
                <img :src="item.imgurl" alt class="userImg">
              </div>
              <div class="rightTime flexSpace">
                <div>
                  <p class="name">{{item.nickname}}</p>
                  <p class="massage">{{item.content}}</p>
                </div>
                <p>{{item.createTime}}</p>
              </div>
            </div>
            <!-- <div class="eachItem flexSpace">
            <div class="leftBox" id="resultPeoples">
              <img src="../../assets/logo.png" alt class="userImg">
            </div>
            <div class="rightTime flexSpace">
              <div>
                <p class="name">小初高数李书商</p>
                <p class="massage">价格好商量</p>
              </div>
              <p>2018-12-21 21:21:41</p>
            </div>
            </div>-->
          </div>
        </div>

        <!-- 第一次填写并确认 -->
        <div class="btnBox bgw" v-if="isNew">
          <button v-if="!sendSuccess" class="long_btn" @click.stop="sendConfirm">发送确认</button>
          <!-- 发送成功以后的禁用按钮 -->
          <button v-if="sendSuccess" class="long_btn disable">已发送确认，等待对方回复</button>
        </div>
      </div>
      <!-- 留言页面 -->
      <div class="talkBox" v-if="canTalk">
        <textarea name id placeholder="请输入留言内容，200字以内" v-model="talkContent"></textarea>
        <div class="long_btn" @click.stop="sendTalkMsg">发送留言</div>
      </div>
    </div>
    <!-- ==============查看接收者================ -->
     <div id="serviceRecipient" v-if="serviceRecipientShow">
        <p class="title">
            共{{bussArr.length}}人，{{bussHasPay}}人
            <span class="mainText">已支付</span>
            ，{{bussNotPay.length}}人待支付，{{bussRefuse.length}}人
            <span class="redText">已拒绝</span>
        </p>
        <div class="content bgW">
            <div class="eachList flexSpace" v-for="item,index in bussArr">
                <span class="mainText">{{item.user.nickname}}</span>
                <span class="mainText">{{item.pay=='1'?'不需要支付':item.pay=='2'?'待支付':item.pay=='3'?"已支付":"已拒绝"}}</span>
            </div>
             <!-- <div class="eachList flexSpace">
                <span class="mainText">小初高数学贾书商</span><span class="mainText">已支付</span>
            </div> -->
        </div>
    </div>
  </div>
</template>

<script>
import common from "@/assets/js/common";
import axios from "axios";
import qs from "qs";
import datetimePicker from "@/components/datetimePicker";
import { XButton, Group, PopupPicker, Datetime, AlertModule, Alert } from "vux";

export default {
  components: {
    XButton,
    Group,
    PopupPicker,
    Datetime,
    datetimePicker,
    AlertModule,
    Alert
  },
  data() {
    return {
        mainShow:true,
        serviceRecipientShow:false,
        //  mainShow:false,
        //  serviceRecipientShow:true,
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
      chooseWriterId: "",
      // 是否填写过阶段信息
      isNew: this.$route.query.isNew,
      canTalk: false,
      // 任务id
      taskId: this.$route.query.taskId,
      taskObj: {},
      stage: 0,
      sendSuccess: this.$route.query.sendSuccess,
      gapDay: 1,
      eachPrice: 0,
      actualEachStage: 0,
      timesList: [],
      serviceRate: 0,
      adjustmentRate: 0,
      postUser: {},
      confirmList: [],
      nicknameArr: [],
      talkContent: "",
      talkList: [],
      writerArr: [],
      bussArr: [],
      bussNotPay:[],
      bussRefuse:[],
      bussHasPay:[],
      missionType: "",
      // 服务接受者
      serviceReceiver: "",
      // 服务提供者
      serviceProvider: ""
    };
  },

  mounted() {
    // 被选择的作者
    this.getConfirmWriter(this.taskId);
    if (this.$route.query.chooseWriterId instanceof Array) {
      this.chooseWriterId = this.$route.query.chooseWriterId.split(",");
    } else {
      this.chooseWriterId = this.$route.query.chooseWriterId;
    }
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

    console.log("当前任务对象");

    this.getUser("postUser", this.$store.state.uid);
    this.getTalkList();
    // 循环被选择的人物与
    // for (var i in this.chooseWriterId) {
    //     this.getUser('recipient', this.chooseWriterId[i])
    // }
  },
  methods: {
    ...common,
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
          if (res.data.code != "00") {
            AlertModule.show({
              title: res.data.msg
            });
          } else {
            var result = res.data.data;
            console.log("已确认");
            console.log(result);
            // 服务提供者，永远是一个作者
            // 服务接收者，就是付钱的人
            if (result.length > 0) {
              var nicknameArr = [];
              for (var i in result) {
                if (result[i].userType == "author") {
                  that.writerArr.push(result[i]);
                } else {
                  that.bussArr.push(result[i]);
                  
                }

                if (Boolean(result[i].user.nickname)) {
                  nicknameArr.push(result[i].user.nickname);
                }
              }
              that.nicknameArr = nicknameArr;
            }
             // 1:找作者，// 2：找书商// 3.找书商找作者
            // 服务接受者serviceReceiver（付钱的人）
            // 服务提供者serviceProvider
            // 被发布者选定的人nicknameArr
            if (that.missionType == "1") {
              that.serviceReceiver = that.postUser.nickname;
              that.serviceProvider = that.nicknameArr.join(",");
            } else if (that.missionType == "2") {
              that.serviceProvider = that.postUser.nickname;
              that.serviceReceiver = that.nicknameArr.join(",");
            } else {
              var writerNickname = [];
              var bussNickname = [];
             
              for (var i in that.writerArr) {
                writerNickname.push(that.writerArr[i].user.nickname);
              }
              for (var j in that.bussArr) {
                bussNickname.push(that.bussArr[j].user.nickname);
                if(that.bussArr[j].pay=='2'){
                    that.bussNotPay.push(that.bussArr[j])
                }else if(that.bussArr[j].pay=='4'){
                    that.bussRefuse.push(that.bussArr[j])
                }else if(that.bussArr[j].pay=='3'){
                    that.bussHasPay.push(that.bussArr[j])
                }
              }
              that.serviceProvider = writerNickname.join(",");
              that.serviceReceiver = bussNickname.join(",");
              console.log("00000");
              console.log(writerNickname);
              console.log(bussNickname);
            }
          }
        });
    },
    // 点击留言按钮吧
    goToTalk() {
      this.canTalk = true;
    },
    // 发送私信
    sendTalkMsg() {
      var that = this;
      var baseUrl = that.$store.state.baseUrl;
      that
        .$http("post", baseUrl + "api/TaskTalk", {
          uid: that.$store.state.uid,
          taskId: that.taskId,
          content: that.talkContent
        })
        .then(function(res) {
          if (res.data.code == "00") {
            AlertModule.show({
              title: "发送成功",
              onHide() {
                that.getTalkList();
                that.canTalk = false;
              }
            });
          } else {
            AlertModule.show({
              title: res.data.msg
            });
          }
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
          console.log("留言列表");
          that.talkList = res.data.dta;
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
        } else {
          that.nicknameArr.push(res.data.data.nickname);
        }
        console.log("获取的用户对象");
        console.log(that.postUser);
      });
      // return user;
    },

    // 点击修改费用明细
    reEditInfo() {
      this.sendSuccess = false;
    },
    // 获取下面的渲染列表
    getTimesList() {
      var step = this.times.join("");
      var s1 = this.beginDate.replace(/-/g, "/");
      var s2 = this.endDate.replace(/-/g, "/");
      var originPrice = this.finalPrice;

      if (s1 != "" && s2 != "") {
        var totalDay = Number(this.DateDiff(s1, s2));
        // alert("总天数" + totalDay);
        var yushu = Number(totalDay) % Number(step);
        //  alert("余数" + yushu);
        totalDay -= Number(yushu);
        //  alert("总天数" + totalDay);
        var gapDay = parseInt(totalDay / step);
      }
      // alert("总金额" + this.finalPrice);

      var arr = [
        {
          index: 1,
          date: s1
        }
      ];
      for (var i = 1; i <= step; i++) {
        var obj = {};
        obj.index = i;
        obj.date = "";
        obj.money = 0;
        arr.push(obj);
        arr[i].date = this.getNextDate(arr[i - 1].date, gapDay);
      }
      arr = arr.slice(1, arr.length);
      var yushuPrice = this.finalPrice % arr.length;
      // console.log('余下的'+yushuPrice)
      // this.finalPrice -= yushuPrice;
      // var finalPrice = this.finalPrice;
     var finalPrice=this.finalPrice-this.serviceRate*this.finalPrice-this.finalPrice*this.adjustmentRate;
      finalPrice -= yushuPrice;
      this.eachPrice = finalPrice / arr.length;
      for (var i in arr) {
        arr[i].money = this.eachPrice;
      }
      // console.log("价格余数" + yushuPrice);
      if (yushu != 0) {
        arr[arr.length - 1].date = this.getNextDate(
          arr[arr.length - 1].date,
          yushu
        );
        this.finalPrice = originPrice;
      }
      if (yushuPrice != 0) {
        arr[arr.length - 1].money += yushuPrice;
      }
      this.timesList = arr;
      this.actualEachStage =
        Math.floor(
          this.finalPrice -
            this.serviceRate * this.finalPrice -
            this.finalPrice * this.adjustmentRate
        ) / this.timesList.length;
    },
    getNextDate(beginDate, day) {
      var that = this;
      beginDate = that.convertDateFromString(beginDate);

      var time1 =
        beginDate.getFullYear() +
        "/" +
        (beginDate.getMonth() + 1) +
        "/" +
        beginDate.getDate(); //time1表示当前时间
      var date2 = new Date(beginDate);

      date2.setDate(beginDate.getDate() + day);

      var time2 =
        date2.getFullYear() +
        "/" +
        (date2.getMonth() + 1) +
        "/" +
        date2.getDate();

      return time2;
    },
    // 字符串转date对象
    convertDateFromString(dateString) {
      if (dateString) {
        var date = new Date(dateString.replace(/-/, "/"));

        return date;
      }
    },

    // 求两个日期之间差多少天
    DateDiff(sDate1, sDate2) {
      //sDate1和sDate2是2002-12-18格式
      var aDate, oDate1, oDate2, iDays;
      aDate = sDate1.split("/");
      oDate1 = new Date(aDate[1] + "/" + aDate[2] + "/" + aDate[0]); //转换为12-18-2002格式
      aDate = sDate2.split("/");
      oDate2 = new Date(aDate[1] + "/" + aDate[2] + "/" + aDate[0]);
      iDays = parseInt(
        Math.abs(Date.parse(oDate1) - Date.parse(oDate2)) / 1000 / 60 / 60 / 24
      ); //把相差的毫秒数转换为天数

      return iDays;
    },
    // 获取任务详情
    getMissiondetail(id) {
      var that = this;
      that
        .$http(
          "get",
          that.$store.state.baseUrl +
            "api/Task/" +
            id +
            "?uid=" +
            this.$store.state.uid
        )
        .then(function(res) {
          if (res.data.code != "00") {
            AlertModule.show({
              title: res.data.msg
            });
          } else {
            that.taskObj = res.data.data;
            var type = res.data.data.taskType;
            that.missionType = res.data.data.taskType;
          
          }
        });
    },
    // 发送确认
    sendConfirm() {
      var that = this;
      var infos = [];
      for (var i in that.timesList) {
        var obj = {};
        obj.amount = that.timesList[i].money;
        obj.date = that.timesList[i].date.split("/").join("-") + " 00:00:00";
        // obj.taskId=that.taskId;
        (obj.taskId = that.taskId),
          // obj.taskId ='16'
          (obj.workHours = that.time.join(""));
        infos.push(obj);
      }
      // console.log(qs.stringify(infos));
      if (infos.length) {
        var postData = {
          adjustmentFee: that.finalPrice * that.adjustmentRate,
          handlingFee: that.serviceRate * that.finalPrice,
          price: that.finalPrice,
          timeStage: that.time[0],
          totalTime: that.stage * that.time[0],
          taskId: that.taskId,
          stage: that.stage,
          beginDate: that.beginDate + " 00:00:00",
          endDate: that.endDate + " 00:00:00",
          status: "2",
          infos: infos
        };
        //  postData = qs.stringify(postData)
        console.log(postData);

        axios
          .post(that.$store.state.baseUrl + "api/Task/Stage", postData, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          })
          .then(function(res) {
            //  alert(res.data.code)
            if (res.data.code == "00") {
              // alert('走到这')
              AlertModule.show({
                title: "确认成功",
                onHide() {
                  that.sendSuccess = true;
                }
              });
            } else {
              //  alert('走到这1')
              AlertModule.show({
                title: res.data.msg
              });
            }
          });
      } else {
        AlertModule.show({
          title: "请点击生成费用列表"
        });
      }
    },
    // 获取阶段次数
    timesChange(val) {
      // console.log(val)
      this.stage = val.join("");
    },
    // 获取每次时长
    timeChange(val) {
      console.log(val);
      console.log(this.time);
    },
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
#serviceRecipient .title{
    background: #F5F5F5;
    padding: 18px 0px;
    text-align: center;
    font-size: 14px;
}
#serviceRecipient  .content{
    padding-left: 40PX;
    padding-top: 20px;
}

#serviceRecipient  .content .eachList{
    height:50px;
    line-height: 50px;
    border-bottom: 1px solid #CECECE;
    padding-right: 45px;
}
body {
  background: #f5f5f5 !important;
}

#replyDetail {
  padding-bottom: 95px;
  position: relative;
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
  padding: 21px 10px 0px 10px;
  line-height: 25px;
  color: #999999;
  font-size: 12px;
}

#replyDetail .eachBox .content .right {
  /* padding-left: 44px; */
}

#replyDetail .eachBox .strongText {
  font-size: 14px;
  margin-top: 13px;
  color: #999999;
  padding-left: 18px;
  padding-bottom: 24px;
  font-weight: bold;
}
#replyDetail  .vux-cell-value{
  color: #3375C5!important
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
  position: absolute;
  bottom: 0;
  padding: 16px 10px;
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
