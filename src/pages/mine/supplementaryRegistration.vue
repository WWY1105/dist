<template>
<div id="supplementaryRegistration">
    <div class="myFallow" v-if="myFallowShow">
        <!-- 作者列表 -->
        <div class="reacResult wbg" v-for="item,index in writerList" @click="chooseMyFelloUser(index)">
            <div class="flexBox">
                <div class="left">
                    <img :src="$store.state.imgUrl+item.followingUser.imgurl" class="userImg" alt>
                </div>
                    <div class="right">
                        <p class="titleBox">
                            <span class="title">{{item.followingUser.nickname}}</span>
                            <span class="radios"><i class="iconfont icon-dagouyouquan" v-if="item.isChoosen"></i><i class="circle" v-if="!item.isChoosen"></i></span>
                        </p>
                        <p class="options">
                            <span class="option">实名
                                <i class="iconfont icon-wenhao" v-if="item.followingUser.realAuth!=2?true:false"></i>
                                <i class="iconfont icon-gouxuan" v-if="item.followingUser.realAuth==2?true:false"></i>
                            </span>
                            <span class="option">学历
                                <i class="iconfont icon-wenhao" v-if="item.followingUser.eduAuth!=2?true:false"></i>
                                <i class="iconfont icon-gouxuan" v-if="item.followingUser.eduAuth==2?true:false"></i>
                            </span>
                            <span class="option">资历：{{item.followingUser.authorAuthInfo.workAge}}年</span>
                        </p>
                        <div class="details">
                            <div class="hang">
                                <p class="text">写作小时:<span class="mainText">3123</span>
                                </p>
                                <p class="text">写作值:<span class="mainText">3123</span>
                                </p>
                                <p class="text"> 相关用户: <span class="mainText">{{item.followingUser.networkCount}}</span>
                                </p>
                            </div>
                            <div class="hang">
                                <p class="box">
                                    <span class="smallBox">{{item.followingUser.authorAuthInfo.workAge}}年作者</span>
                                </p>
                                <p v-if="item.length==0?false:true" class="box" v-for="item,index in item.userTags">
                                    <span class="smallBox">{{item.tag}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnBox bgw">
                <button  class="long_btn disable" @click="myFallowShow=false">取消</button>
                <button  class="long_btn" @click="confirmWriter">确定</button>
            </div>
        </div>
        <!-- 选择 内容-->

        <div class="chooseContent" v-if="!myFallowShow">
            <!--顶部tab栏-->
            <div class="flexSpace topTab bgW">
                <p class="tabItem" v-for="item,index in tabItem" :class="item.isActive?'active':''" @click="chooseTab(item.id)" :key="item.id"><i v-if="index==1" class="iconfont  icon-jia"></i> {{item.text}}</p>
            </div>

            <!--顶部tab栏END-->
            <!-- 登记列表 -->
            <div v-if="showPart==0">列表</div>
            <!-- 添加登记 -->
            <div v-if="showPart==1" class="content bgW">
                <!--选项内容-->
                <div class="eachArea">
                    <slidePicker :sliderArr="serverList" :leftText="leftText7" v-on:changeResult="changeResultWayServer1"></slidePicker>
                    <slidePicker :sliderArr="serverList" :leftText="leftText8" v-on:changeResult="changeResultWayServer2"></slidePicker>
                </div>
                <div class="eachArea">
                    <!--年级选择-->
                    <!-- <input type="text" :placeholder="$refs.picker1&&$refs.picker1.getNameValues()"> -->
                    <sliderPopupPicker :gradesArr="sliderClassArr" :leftText="leftText1" v-on:changeResult="changeResultGrade"></sliderPopupPicker>
                    <!--科目选择器-->
                    <sliderPopupPicker :gradesArr="sliderSubjectArr" :leftText="leftText2" v-on:changeResult="changeResultKM"></sliderPopupPicker>
                    <!--出版方式-->
                    <radioPicker :radiosArr="radiosArr" :title="publish_title" v-on:getRadioValue="getPublicWay"></radioPicker>
                    <!-- 协作方式 -->
                    <slidePicker :sliderArr="coordination" :leftText="leftText4" v-on:changeResult="changeResultWay"></slidePicker>
                    <!--协作区域-->
                    <x-address :gradesArr="addressData" :title="leftText5" v-model="myarea" :list="addressData" class="areaBox" @on-hide="onAddressChange"></x-address>
                </div>
                <!-- 阶段列表 start-->
                <div class="eachArea">

                    <div class="eachLink slide flexSpace">
                        <group>
                            <!--阶段次数选择器start-->
                            <popup-picker :title="leftText9" @on-change="timesChange" v-model="times" :data="timesArr" class="gradePicker"></popup-picker>
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
                            <popup-picker :title="leftText10" @on-change="timeChange" v-model="time" :data="timeArr" class="gradePicker"></popup-picker>
                            <!--每次时长选择器end-->
                        </group>
                    </div>
                    <div class="eachLink slide flexSpace">
                        <datetimePicker title="开始日期" v-model="beginDate" class="datetimePicker" v-on:dateChange="beginDateChange"></datetimePicker>
                        <!-- <span class="left">开始日期</span>
                <span class="right flexSpace mainText">2018-09-31
                        <x-icon class="arrow" type="ios-arrow-right" size="20"></x-icon>
              </span>-->
                    </div>
                    <div class="eachLink slide flexSpace">
                        <datetimePicker title="结束日期" v-model="endDate" class="datetimePicker" v-on:dateChange="endDateChange"></datetimePicker>
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
                <!-- 阶段列表 end-->
                <div class="eachArea">
                    <group title="简述（20字内，必填）">
                        <x-textarea :show-counter="false" :rows="3" :max="20" autosize v-model="introduction"></x-textarea>
                    </group>
                </div>
                <div class="eachArea">
                    <group title="详述（200字内，选填）">
                        <x-textarea :show-counter="false" :rows="8" :max="200" autosize v-model="content"></x-textarea>
                    </group>
                </div>
                <!-- 上传 -->
                <div class="imgArea">
                    <span class="titleBox leftText">证明资料（最多上传三张）</span>
                    <div class="imgBox flexSpace">
                        <div class="eachBox" @click.stop="frontImg(1)">
                            <img :src="showUrl1" alt="" v-if="showUrl1==''?false:true">
                            <img src="../../assets/img/sfz@3x.png" alt="" v-if="showUrl1==''?true:false">
                            <input v-if="isios" type="file" name="img" accept="image/*" id="upload_file1" mutiple="mutiple" class="add" @change="chooseImageFront(1)">
                            <input v-if="!isios" type="file" name="img" accept="image/*" id="upload_file1" capture="camera" mutiple="mutiple" class="add" @change="chooseImageFront(1)">

                            <!-- <img src="../../assets/img/sfz@3x.png" alt=""> -->
                            <p class="text">资料一</p>
                        </div>
                        <div class="eachBox" @click.stop="frontImg(2)">
                            <img :src="showUrl2" alt="" v-if="showUrl2==''?false:true">
                            <img src="../../assets/img/sfz@3x.png" alt="" v-if="showUrl2==''?true:false">
                            <input v-if="isios" type="file" name="img" accept="image/*" id="upload_file2" mutiple="mutiple" class="add" @change="chooseImageFront(2)">
                            <input v-if="!isios" type="file" name="img" accept="image/*" id="upload_file2" capture="camera" mutiple="mutiple" class="add" @change="chooseImageFront(2)">

                            <!-- <img src="../../assets/img/sfz@3x.png" alt=""> -->
                            <p class="text">资料二</p>
                        </div>
                        <div class="eachBox" @click.stop="frontImg(3)">
                            <img :src="showUrl3" alt="" v-if="showUrl3==''?false:true">
                            <img src="../../assets/img/sfz@3x.png" alt="" v-if="showUrl3==''?true:false">
                            <input v-if="isios" type="file" name="img" accept="image/*" id="upload_file3" mutiple="mutiple" class="add" @change="chooseImageFront(3)">
                            <input v-if="!isios" type="file" name="img" accept="image/*" id="upload_file3" capture="camera" mutiple="mutiple" class="add" @change="chooseImageFront(3)">

                            <!-- <img src="../../assets/img/sfz@3x.png" alt=""> -->
                            <p class="text">资料三</p>
                        </div>
                    </div>
                </div>
                <!--选项内容END-->
            </div>
            <!-- 帮助说明 -->
            <div v-if="showPart==2" class="help">
                <div class="content">
                    <p> 您可以补充登记任务</p>
                    <p class="line"></p>
                    <p> 目的：建立您写作活动的信思,提高被搜索或被信任的程度</p>
                    <p class="line"></p>
                    <p>条件：</p>
                    <p> 1.必须是2018年7月1日后到补充登记日前己完成的写作活动</p>
                    <p> 2必须上传证明资料（资料不会公开）</p>
                    <p>3. 如是1对1，对方必须也是平台注册者，可以咨询
                        <p>4. 如是1对多，至少有1位参与者必须是平台注册者，而且愿意证明您的写作任务详悄</p>
                        <p>5. 如写作任务是2018年7月1日到2020年7月1日，您可
                            以补充登记2018年7月1日后到补充登记日前完成的写
                            作活动；以后的活动可以在平合上走标准流程，这样
                            的好处是您可以有过程记录，作者书商互动，和其他
                            注册者之间的互动.</p>
                        <p class="line"></p>
                        <p>费用：免费</p>
                </div>
            </div>
            <div class="btnBox  bgW" v-if="showPart==1">
                <button class="long_btn" @click="supplementaryRegistration">提交审核</button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import slidePicker from '@/components/slidePicker'
import sliderPopupPicker from '@/components/sliderPopupPicker'
import radioPicker from '@/components/radioPicker'
import datetimePicker from '@/components/datetimePicker'
import common from '@/assets/js/common'
import {
    Range,
    Popup,
    XSwitch,
    Cell,
    XButton,
    Group,
    Picker,
    Datetime,
    XTextarea,
    ChinaAddressV4Data,
    XAddress,
    AlertModule,
    Alert,
    PopupPicker,
    Value2nameFilter as value2name
} from 'vux'
import writers from '@/components/writer/writer'
export default {
    data() {
        return {
            myFallowShow: false,
            // 根据顶部tab某些部件不显示
            seeZZ: true,
            seeSS: true,
            seezzss: false,
            // data--start
            classNo: '',
            category: '',
            taskType: '', //出版方式
            priceType: '',
            area: '',
            introduction: '',
            content: '',
            priceMin: '',
            priceMax: '',
            // data--end
            myarea: [],
            addressData: ChinaAddressV4Data,
            sliderSubjectArr: [],
            sliderClassArr: [],
            stage: 0,
            // 顶部tab
            tabItem: [{
                    id: 0,
                    isActive: true,
                    text: '已登记'
                },
                {
                    id: 1,
                    isActive: false,
                    text: '添加登记'
                }, {
                    id: 2,
                    isActive: false,
                    text: '帮助说明'
                }
            ],
            finalPrice: 0,
            // 顶部tab--end
            // 组件传入
            // 传入slidePicker的数据
            gradesArr: [],
            leftText1: '年级',
            rightText1: '不限',
            subjectArr: [],
            priceArr: [],
            timesArr: [],
            slidePriceArr2: [],
            coordination: [
                ['不限', '作者拜访', '书商拜访', '远程协作']
            ],

            leftText2: '科目',
            leftText4: '协作方式',
            leftText5: '协作区域',
            leftText7: '服务提供方',
            leftText8: '服务接收方',
            leftText9: "阶段次数",
            beginDate: "",
            endDate: "",
            leftText10: "每次时长",
            time: [],
            timeArr: [],
            times: [],
            timesArr: [],
            serverList: [
                ['我', '选择用户']
            ],
            // rightText2: '不限',
            // 传入radio的值
            radioTitle: '选择性别',
            publish_title: '出版方式',
            radiosArr: [{
                    value: 1,
                    text: '独资',
                    selected: true
                },
                {
                    value: 2,
                    text: '合资',
                    selected: false
                },
            ],
            postData: {
                priceType: '',
                classNo: '',
                category: '',
                priceType: '',
                priceRange: '',
                busniessCount: '',
                deadline: '',
                coordination: '',
                area: '',
                introduction: ''
            },
            userData: {},
            showPart: 0,
            writerList: [],
            chooseWriterList: {},
            serviceRate: 0,
            adjustmentRate: 0,
            taskId: '',
            isios: false,
            frontUrl1: '',
            frontUrl2: '',
            frontUrl3: '',
            showUrl1: '',
            showUrl2: '',
            showUrl3: '',
            isMulSelection: false

        }
    },
    components: {
        writers,
        datetimePicker,
        XTextarea,
        Range,
        Popup,
        XSwitch,
        Cell,
        XButton,
        Group,
        Picker,
        sliderPopupPicker,
        radioPicker,
        ChinaAddressV4Data,
        XAddress,
        Alert,
        slidePicker,
        PopupPicker,
        AlertModule
    },
    mounted() {
        this.getCategory();
        this.getGrade();
        // this.getPriceArr()
        // 调节费
        this.getBaseRate();

        this.getUser(this.$store.state.uid);
        this.postData.taskType = '';

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
        // this.booksellerArr.push(arr)
        // ======
        this.getFellowList()
    },
    methods: {

        ...common,
        frontImg(id) {
            var file = document.getElementById("upload_file" + id);
            file.click()
        },
        changeResultEdu(val) {
            this.degree = val.value
            this.rightText = val.value
        },

        //   选择正面
        chooseImageFront(id) {
            var that = this;
            var baseUrl = "https://nian.im/works/"
            var file = document.getElementById("upload_file" + id).files[0];
            var formdata1 = new FormData(); // 创建form对象
            formdata1.append('img', file); // 通过append向form对象添加数据,可以通过append继续添加数据
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            //添加请求头
            axios.post(baseUrl + 'file/img', formdata1, config).then(function (res) {
                // console.log(res)
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    switch (id) {

                        case 1:
                            that.frontUrl1 = res.data.data;
                            that.showUrl1 = 'http://nian.im/storage/' + res.data.data
                            break;
                        case 2:
                            that.frontUrl2 = res.data.data;
                            that.showUrl2 = 'http://nian.im/storage/' + res.data.data
                            break;
                        case 3:
                            that.frontUrl3 = res.data.data;
                            that.showUrl3 = 'http://nian.im/storage/' + res.data.data;

                            break;
                    }
                }
            })
        },
        // 我的关注列表
        getFellowList() {
            var that = this;
            var baseUrl = that.$store.state.baseUrl;
            that
                .$http("get", baseUrl + "api/UserFollowing/List", {
                    uid: that.$store.state.uid
                })
                .then(function (res) {
                    if (res.data.code == '00') {
                        var result = res.data.data;
                        var resultArr = [];
                        for (var i in result) {
                            result[i].isChoosen = false;
                        }
                        console.log('我关注的')
                        console.log(resultArr)
                        that.writerList = result;
                    } else {
                        AlertModule.show({
                            title: res.data.msg
                        });
                    }
                });
        },
        // 区域
        onAddressChange(val) {
            this.postData.area = value2name(this.myarea, ChinaAddressV4Data).split(' ').join(",");
        },

        getUser(uid) {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/WebUser/' + uid).then(function (res) {
                that.userData = res.data.data;
            })
        },
        //出版方式：独资合资
        getPublicWay(val) {

            console.log(val)
            this.postData.priceType = val
            // if (this.userData.type == 'author' && this.postData.taskType == '1') {
            //     AlertModule.show({
            //         title: "抱歉，作者找作者只能选择独资方式"
            //     })
            //     for (var i in this.radiosArr) {
            //         this.radiosArr[i].selected = false
            //     }
            //     this.radiosArr[0].selected = true
            // } else {
            //     this.postData.priceType = val
            // }
        },
        // 协作方式
        changeResultWay(val) {
            console.log(val)
            this.postData.coordination = val[0];
        },
        chooseMyFelloUser(index) {
            var that = this;
            if (that.isMulSelection) {
                // 单选
                for (var i in that.writerList) {
                    that.writerList[i].isChoosen = false
                }
                that.writerList[index].isChoosen = true;
            } else {
                that.writerList[index].isChoosen = !that.writerList[index].isChoosen
            }
        },
        // 服务提供方(单选)isMulSelection
        changeResultWayServer1(val) {
            var that = this;
            if (val[0] == '选择用户') {
                that.myFallowShow = true;
                that.isMulSelection = true;
            }

        },
        // 任务接收者（多选）
        changeResultWayServer2(val) {
            var that = this;
            console.log(val)
            // var that = this;
            if (val[0] == '选择用户') {
                that.myFallowShow = true;
                that.isMulSelection = false;
            }
        },
        // 年级
        changeResultGrade(value) {
            var that = this;
            that.postData.classNo = value.name;

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
        },
        // 科目
        changeResultKM(value) {
            this.postData.category = value.name;
            console.log(this.postData.category)
        },
        // 选择作者
        confirmWriter() {
            var that = this;
            for (var i in that.writerList) {
                if (that.writerList[i].isChoosen) {
                    that.chooseWriterList.push(that.writerList[i])
                }
            }
            that.myFallowShow = false;

        },
        // 生成费用列表=============================
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

            var arr = [{
                index: 1,
                date: s1
            }];
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
            var finalPrice = this.finalPrice - this.serviceRate * this.finalPrice - this.finalPrice * this.adjustmentRate;
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
                console.log('oooooooooooooooooooooooooooooooooooooooo')
                console.log(postData);

                axios
                    .post(that.$store.state.baseUrl + "api/Task/Stage", postData, {
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        }
                    })
                    .then(function (res) {
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
        // 生成费用列表=============================
        chooseTab(id) {
            var that = this;
            // that.postData = {};
            for (var i in that.tabItem) {
                that.tabItem[i].isActive = false;
            }
            that.tabItem[id].isActive = true;
            that.showPart = id
            // if (id == 2) {
            //     this.seezzss = true
            // } else if (id == 0) {
            //     for (var i in this.radiosArr) {
            //         this.radiosArr[i].selected = false
            //     }
            //     this.radiosArr[0].selected = true
            // } else {
            //     this.seezzss = false
            // }
            // 出版方式，顶部tab
            // this.postData.taskType = ++id;
            // console.log(this.postData.taskType)

        },

        // 发布任务
        posiMission() {
            var that = this;
            if (!that.postData.classNo) {
                that.postData.classNo = '';
            }
            if (!that.postData.category) {
                that.postData.category = '';
            }
            if (!that.postData.priceType) {
                that.postData.priceType = '';
            }
            if (!that.postData.priceRange) {
                that.postData.priceRange = '';
            }
            if (!that.postData.busniessCount) {
                that.postData.busniessCount = '';
            }

            if (!that.postData.deadline) {
                that.postData.deadline = '';
            }
            if (!that.postData.coordination) {
                that.postData.coordination = '';
            }
            if (!that.postData.area) {
                that.postData.area = '';
            }
            if (!that.postData.introduction) {
                that.postData.introduction = '';
            }

            that.postData.introduction = that.introduction;
            that.postData.content = that.content;
            that.postData.uid = that.$store.state.uid;
            that.postData.supplement = true;
            for (var i in that.postData) {
                that.postData[i] = that.postData[i].toString()
            }
            if (that.frontUrl1) {
                that.postData.ziliao = that.frontUrl1 + ","
            }
            if (that.frontUrl2) {
                that.postData.ziliao = that.postData.ziliao + that.frontUrl2 + ","
            }
            if (that.frontUrl3) {
                that.postData.ziliao = that.postData.ziliao + that.frontUrl3
            }
            console.log(that.postData)
            that.$http('post', that.$store.state.baseUrl + 'api/Task', that.postData).then(function (res) {
                console.log(res.data)
                if (res.data.code == '00') {
                    that.taskId = res.data.data.id;
                    // 任务发布成功之后，选择报名用户/api/Task/Apply/Select/uid
                    if (that.chooseMyFelloUser.length == 0) {
                        AlertModule.show({
                            title: '请选择服务提供者/服务接收者'
                        })
                    } else {
                        for (var i in that.chooseMyFelloUser) {
                            var obj = {
                                uid: that.chooseMyFelloUser[i].id,
                                id:that.taskId,
                                status:'2'
                            }
                            that.$http('post', that.$store.state.baseUrl + 'api/Task', that.postData).then(function (res) {
                                if (res.data.code == '00') {

                                }
                            })
                        }
                    }

                } else {
                    AlertModule.show({
                        title: res.data.msg
                    })
                }
            })

        },
        supplementaryRegistration() {
            var that = this;
            that.posiMission()
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

            var arr = [{
                index: 1,
                date: s1
            }];
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
            var finalPrice = this.finalPrice - this.serviceRate * this.finalPrice - this.finalPrice * this.adjustmentRate;
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
            // that.getTimesList();
            that.sendConfirm()
            // if (!that.postData.priceType) {
            //     that.postData.priceType = 1;
            // }

            // console.log(that.postData)

            // if (that.postData.taskType == '1') {
            //     var dataArr = [that.postData.classNo, that.postData.category, that.postData.taskType, that.postData.priceType, that.postData.priceRange, that.postData.deadline, that.postData.coordination, that.postData.area, that.postData.introduction];
            //     var nameArr = ['年级', "科目", '出版方式', '出资方式', '价格区间', '截止日期', '协作方式', '写作区域', '简述']

            // } else {
            //     var dataArr = [that.postData.classNo, that.postData.category, that.postData.taskType, that.postData.priceType, that.postData.priceRange, that.postData.busniessCount, that.postData.deadline, that.postData.coordination, that.postData.area, that.postData.introduction];
            //     var nameArr = ['年级', "科目", '出版方式', '出资方式', '价格区间', '书商数量', '截止日期', '协作方式', '写作区域', '简述']

            // }
            // if (that.isEmpty(dataArr, nameArr).length != 0) {
            //     AlertModule.show({
            //         title: "请填写：" + that.isEmpty(dataArr, nameArr).join(',')
            //     })
            // } else {
            //     if (that.priceType == '1' && that.postData.busniessCount != 1) {
            //         AlertModule.show({
            //             title: "抱歉，独资方式只能选择一名书商"
            //         })
            //     } else {
            // that.$http('post', that.$store.state.baseUrl + 'api/Task', that.postData).then(function (res) {
            //     console.log(res.data)
            //     if (res.data.code == '00') {
            //         AlertModule.show({
            //             title: '操作成功！',
            //             onHide() {
            //                 that.$router.go(-1)
            //             }
            //         })
            //     } else {
            //         AlertModule.show({
            //             title: res.data.msg
            //         })
            //         that.$router.push({
            //             path: '/mission'
            //         })
            //     }
            //         // })
            //     }
            // }

        }
    }
}
</script>

<style>
body,
html,
#supplementaryRegistration {
    background: #fff;
    height: 100%;
}

#supplementaryRegistration .topTab .tabItem.active {
    color: #3375C5;
    border-bottom: 3px solid #3375C5;
}

#supplementaryRegistration .topTab .tabItem {
    padding: 0 5px;
}

#supplementaryRegistration .topTab {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    border-bottom: 1px solid #CECECE;
    font-size: 15px;
    color: #636363;
}

.help {
    background: #f5f5f5;
    padding: 20px;
    height: 100%;
}

.eachLink.slide.flexSpace>div {
    width: 100%;
}

.help .line {
    height: 15px;
}

#supplementaryRegistration .chooseContent {
    padding-bottom: 50px;
}

#supplementaryRegistration .imgArea {
    background: #fff;
}

#supplementaryRegistration .titleBox {
    height: 50px;
    line-height: 50px;
    /* border-bottom: 1px solid #DDDDDD; */

}

#supplementaryRegistration .content {
    padding: 15px 11px;
    background: #fff;
}

#supplementaryRegistration .titleBox input {
    height: 100%;
    border: none;
    text-align: right;
    color: #3375C5;
    font-size: 13px;
}

#supplementaryRegistration .eachArea .titleBox {
    border: none;
}

#supplementaryRegistration .vux-x-textarea.weui-cell {
    padding: 0;
    border-radius: 5px;
}

#supplementaryRegistration .imgBox {
    /* margin-top: 20px; */
    text-align: center;
    color: #C2C3C3;
    font-size: 12px;
}

#supplementaryRegistration .imgBox img {
    width: 92px;
    height: 63px;
    margin-bottom: 12px;
}

#supplementaryRegistration .submit_btn {
    margin-top: 45px;
}

#supplementaryRegistration .weui-cells:before {
    border: none
}

#supplementaryRegistration .imgBox input {
    display: none;
}

#supplementaryRegistration .priceBox {
    padding: 10px 16px;
    background: #f5f5f5;
}

#supplementaryRegistration .areaBox .weui-cell {
    padding: 12px 15px;
    background: #f5f5f5;
}

#supplementaryRegistration .priceBox span.title {
    font-size: 14px;
    color: #242424
}

#supplementaryRegistration .btnBox {
    position: fixed;
    bottom: 0;
    padding: 8px 10px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #C3C3C3;
    display: flex;
}

#supplementaryRegistration .long_btn {
    width: 100%;
    margin-top: 0px !important;
}

#supplementaryRegistration .long_btn.disable {
    background: #C3C3C3;
    margin-right: 10px;
}

#supplementaryRegistration .vux-x-textarea.weui-cell {

    padding: 0 15px;
    font-size: 14px;
    color: #242424;
}

#supplementaryRegistration .priceBox input {
    width: 80px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
}

#supplementaryRegistration .content .eachArea {
    border: 1px solid #CECECE;
    border-radius: 5px;
    margin-bottom: 8px;
}

#supplementaryRegistration .content .weui-cells,
#supplementaryRegistration .content .sexBox {
    background: #F5F5F5 !important;
}

.eachLink.flexSpace.finalPriceLink {
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    font-size: 14px;
    background: #f5f5f5;
}

input.finalPrice.mainText {
    height: 40px;
    border: none;
    width: 50px;
    text-align: left;
}

.vux-cell-value {
    color: #3375C5;
}

#supplementaryRegistration .content .datetimePicker {
    background: #F5F5F5;
    height: 44px;
    color: #242424;
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid #D9D9D9;
}

#supplementaryRegistration .weui-cells:before {
    display: none;
}

#supplementaryRegistration .vux-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
}

#supplementaryRegistration .eachArea .weui-cells__title {
    background: #F5F5F5;
    height: 44px;
    color: #242424;
    font-size: 14px;
    margin: 0;
    line-height: 44px;
}

#supplementaryRegistration .weui-textarea {
    background: #F5F5F5;
}

#supplementaryRegistration .long_btn {
    /* width: 90%;
    margin-top: 10px;
    margin-bottom: 35px; */
}

#supplementaryRegistration .booksellerBox {
    border-top: 1px solid #D9D9D9;
}

/* 00000000000000000000 */

.reacResult {
    margin-top: 10px;
}

.reacResult>.flexBox,
.hang {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 7px;
}

.hang p {
    width: 33.33%;
}

.hang p.text {
    text-align: left;
}

.reacResult .details {
    background: #efefef;
    padding: 6px 7px;
    padding-top: 1px;
}

.reacResult .details .each .text {
    color: #242424;
    font-size: 12px;
    margin-bottom: 8px;
}

.reacResult .details p.box {
    text-align: left;
}

.reacResult .details .smallBox {
    border: 1px solid #b1b1b1;
    padding: 3px 0px;
    color: #707070;
    font-size: 12px;
    width: 65px;
    display: inline-block;
    text-align: center;
}

.reacResult .titleBox {
    display: flex;
    justify-content: space-between;
    color: #242424;
    font-size: 14px;
    font-weight: bold;
    align-items: center;
    margin-bottom: 10px;
}

.reacResult .titleBox .radios .iconfont {
    font-size: 18px;
    color: #3375c5;
}

.reacResult .titleBox .radios .circle {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 1px solid #cccccc;
    display: inline-block;
}

.reacResult .options {
    color: #242424;
    font-size: 12px;
    margin-bottom: 8px;
    display: flex;
}

.reacResult .options .option {
    margin-right: 17px;
}

.reacResult .options .option i {
    color: #3375c5;
}

.reacResult .titleBox .price {
    color: #ff3939;
    font-size: 12px;
}

.reacResult>.flexBox .left {
    width: 15%;
}

.reacResult>.flexBox .right {
    width: 85%;
}

.userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

#searchResult {
    background: #f5f5f5;
}

.reacResult {
    margin-top: 10px;
    padding: 10px;
}

.reacResult .options .option i.icon-wenhao {
    color: #ccc;
}
</style>
