<template>
<div id="mission">
   
    <!-- ================================================================================================-->
    <div class="main" >
         <div class="shaixuanBox sxPop" v-if="sxIsShow">
        <!--筛选弹窗-->
        <!--筛选条件底部弹窗-->
        <p class="bigtitle">
            <span class="lightText">{{totalWriter}}</span>个作者中有
            <span class="lightText">{{allWriter}}</span>个可供查看
        </p>
        <!--年级选择-->
        <sliderPopupPicker :gradesArr="sliderBigClassArr" :leftText="leftText1" v-on:changeResult="changeResultGrade"></sliderPopupPicker>
        <!--科目选择器-->
        <sliderPopupPicker :gradesArr="sliderSubjectArr" :leftText="leftText2" v-on:changeResult="changeResultKM"></sliderPopupPicker>
        <!--出版方式-->
        <radioPicker :radiosArr="radiosArr" :title="publish_title" v-on:getRadioValue="getPublicWay"></radioPicker>
        <!--价格区间-->
        <sliderPopupPicker :rightText="rightText4" :gradesArr="slidePriceArr2" :leftText="leftText3" v-on:changeResult="changeResultPrice"></sliderPopupPicker>
        <!--协作方式-->
        <slidePicker :sliderArr="coordination" :leftText="leftText4" v-on:changeResult="changeResultWay"></slidePicker>
        <!--协作区域-->
        <group>
            <x-address @on-show="addressChange" v-model="myarea" :gradesArr="addressData" :title="leftText5" :list="addressData" class="areaBox" @on-hide="onAddressChange"></x-address>
        </group>
        <group>
            <x-switch title="需要身份认证" v-model="stringValue1"></x-switch>
        </group>
        <group>
            <x-switch title="需要学历认证" v-model="stringValue2"></x-switch>
        </group>
        <group>
            <x-switch title="需要作者资质" v-model="stringValue3"></x-switch>
        </group>
        <!--性别选择-单选组件-->
        <radioPicker :radiosArr="radios_sex_Arr" :title="radioTitle" @getRadioValue="getRadioValue"></radioPicker>
        <!--rang-->
        <group>
            <p class="smalltitle">
                写作年限范围
                <span>0年 ----- 80年</span>
            </p>
            <div class="workAgeBox flexCenter">
                <input type="number" v-model="minWorkAge" >-
                <input v-model="maxWorkAge" type="number">
        </div>
        </group>
        <div style="padding:0px 10px;" class="popBtnBox">
            <button class="long_btn cancelResultBtn" @click.prevent="cancelSS">取消</button>
            <button class="long_btn seeResultBtn" @click="showSSdata">显示筛选结果</button>
        </div>
        <!--筛选弹窗 end-->
    </div>
        <div v-if="mainShow">
            <!--顶部按钮-->
        <div class="topBox flexSpace">
            <div class="eachBtn" @click="typeShow=!typeShow;pxIsShow=false;sxIsShow=false;">
                <!-- 全部类型 -->
                {{missionTypeText}}
                <i class="iconfont icon-iconfontzhizuobiaozhun45"></i>
            </div>
            <span class="line"></span>
            <div class="eachBtn shortOne" @click="pxIsShow=!pxIsShow">
                排序
                <i class="iconfont icon-paixu"></i>
            </div>
            <span class="line"></span>
            <!-- v-model="sxIsShow"-->
            <div class="eachBtn shortOne" @click.stop="clickSS">
                筛选
                <i class="iconfont icon-shaixuan"></i>
            </div>
            <router-link tag="div" class="eachBtn shortOne lastItem" :to="{path:'/postMission'}">
                发布
                <i class="iconfont icon-jia"></i>
            </router-link>
        </div>
        <!-- 类型筛选 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
        <!-- <div v-if="typeShow"> -->
        <div v-transfer-dom class="bgW" id="sortPopup">
            <popup v-model="typeShow" style="background-color:#fff;" class="sortBox bgW">
                <div style="background-color:#fff;height:auto;margin:0 auto;border-radius:5px;text-align:center">
                    <group>
                        <cell v-for="item,index in typeOptions" :title="item.title" :key="index" @click.native="choostTypeItem(index)">
                            <!-- <div>
                                    <x-icon class="mainColor" type="ios-arrow-thin-up" stroke-width="18" size="30"></x-icon>
                </div>-->
                        </cell>
                    </group>
                    <!-- <div style="padding:13px 10px;" class="popBtnBox"> -->
                    <!-- <x-button @click.native="saveOrder" class="popBtn saveBtn">保存并退出</x-button>
            <x-button class="popBtn backBtn" @click.native="backSave">恢复默认排序</x-button>-->
                    <!-- </div> -->
                </div>
            </popup>
        </div>
        <!-- </div> -->
        <!-- 类型筛选 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
        <div class="scrollerBox" v-if="scrollerShow">
            <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore" use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh" lock-x ref="scrollerBottom" height="-48">
                <div>
                    <!--任务示例-->
                    <div class="reacResult" id="resultPeoples">
                        <div class="eachPeople ss bgW">
                            <div class="titleBox flexSpace">
                                <div class="left flexStart">
                                    <img src="../../assets/logo.png" class="userImg" alt>
                                    <div>
                                        <p class="name">小初高数作者</p>
                                        <p class="options flexSpace">
                                            <span class="option flexStart">
                          实名
                          <i class="iconfont icon-gouxuan"></i>
                        </span>
                                            <span class="option">
                          实名
                          <i class="iconfont icon-gouxuan"></i>
                        </span>
                                        </p>
                                    </div>
                                </div>
                                <div class="right flexEnd">
                                    <p class="button searchSS">找书商</p>
                                    <p class="price">￥1230-￥2333</p>
                                </div>
                            </div>
                            <div class="details">
                                <p class="hang flexSpace">
                                    <span class="eachItem">年级：五年级</span>
                                    <span class="eachItem">年级：五年级</span>
                                    <span class="eachItem">年级：五年级</span>
                                </p>
                                <p class="hang flexStart">
                                    <span class="eachItem">年级：五年级</span>
                                    <span class="eachItem">年级：五年级</span>
                                </p>

                                <p class="hang">
                                    <span>简述：针对2018年考试习题市场的大环境下的综合因素考虑 写一本合适的书。</span>
                                </p>
                            </div>
                            <div class="otherMsg flexSpace">
                                <p class="left">
                                    <span>截至报名：2018-03-31</span>
                                    <span>已报名：312/1</span>
                                </p>
                                <p class="right">
                                    <button class="submitBtn">报名</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--任务示例end-->
                    <!--任务list-->
                    <div class="reacResult" id="resultPeoples">
                        <div :class="'eachPeople bgW '+item.borderColor" v-for="item,index of postList" @click.stop="toSeeMissionDetail(index)">
                            <div class="titleBox flexSpace">
                                <div class="left flexStart">
                                    <img
                      :src="$store.state.imgUrl+item.webUser.imgurl"
                      @click="seeUserDetail(item.uid)"
                      class="userImg"
                      alt
                    >
                                    <div>
                                        <!-- {{item.webUser.type=='author'?"作者":"书商"}} -->
                                        <p class="name">{{item.nickname==null?'':item.nickname}}</p>
                                        <p class="options flexSpace">
                                            <span class="option flexStart">
                          实名
                          <i class="iconfont icon-gouxuan" v-if="item.realAuth=='2'?true:false"></i>
                          <i class="iconfont icon-wenhao" v-if="item.realAuth=='2'?false:true"></i>
                        </span>
                                            <span class="option">
                          学历
                          <i class="iconfont icon-gouxuan" v-if="item.eduAuth=='2'?true:false"></i>
                          <i class="iconfont icon-wenhao" v-if="item.eduAuth=='2'?false:true"></i>
                        </span>
                                        </p>
                                    </div>
                                </div>
                                <div class="right flexEnd">
                                    <p class="button searchSS" v-if="item.taskType=='2'?true:false">找书商</p>
                                    <p class="button searchZZ" v-if="item.taskType=='1'?true:false">找作者</p>
                                    <p class="button searchSZ" v-if="item.taskType=='3'?true:false">找作者和书商</p>
                                    <p class="price">￥ {{item.priceMin}} - ￥{{item.priceMax}}/小时</p>
                                </div>
                            </div>
                            <div class="details">
                                <p class="hang flexSpace">
                                    <span class="eachItem">年级：{{item.classNo}}</span>
                                    <span class="eachItem">科目：{{item.category}}</span>
                                    <span class="eachItem">出版：{{item.taskType=='1'?'独资出版':"合资出版"}}</span>
                                </p>
                                <p class="hang flexStart">
                                    <span class="eachItem">协作：{{item.coordination}}</span>
                                    <span class="eachItem add">区域：{{item.area}}</span>
                                </p>
                                <p class="hang">
                                    <span>简述：{{item.introduction}}</span>
                                </p>
                            </div>
                            <div class="otherMsg flexSpace">
                                <p class="left">
                                    <span>截至报名：{{item.deadline.substr(0,10)}}</span>
                                    <span>已报名：{{item.applicationCount}}</span>
                                </p>
                                <p class="right">
                                    <button class="submitBtn" @click.stop="toEnroll(index)">报名</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </scroller>
            <!--循环任务列表-->
            <!--任务list end-->
            <!--全部-->
            <div v-transfer-dom id="myPop">
                <popup class="aLLIsShow" height :should-rerender-on-show="false"></popup>
            </div>
            <!--排序-->
            <div v-transfer-dom id="myPop">
                <sortPopup :pxIsShow="pxIsShow" :sortOptions="sortOptions" @getPxIsShow="getPxIsShow" @getOrderType="getOrderType"></sortPopup>
            </div>
        </div>
        <div class="component">
            <div id="multiPicker">
                <!-- 年级 -->
                <div class="gradeContent" v-if="classShow">
                    <p class="title bgW">{{leftText1}}（选择后保存）</p>
                    <div class="content flexSpace bgW">
                        <p :class="item.active==true?'item active':'item'" v-for="item,index in gradesArr" @click="addActive(index)">{{item.className}}</p>
                    </div>
                    <button class="long_btn" @click="getResult">确认</button>
                </div>
                <!-- 科目 -->
                <div class="categoryContent" v-if="categoryShow">
                    <p class="title bgW">{{leftText2}}（选择后保存）</p>
                    <div class="content flexSpace bgW">
                        <p :class="item.active==true?'item active':'item'" v-for="item,index in subjectArr" @click="addActive2(index)">{{item.categroy}}</p>
                    </div>
                    <button class="long_btn" @click="getResult2">确认</button>
                </div>
                <!-- 协作方式 -->
                <div class="categoryContent" v-if="coordinationShow">
                    <p class="title bgW">{{leftText5}}（选择后保存）</p>
                    <div class="content flexSpace bgW">
                        <p :class="item.active==true?'item active':'item'" v-for="item,index in coordination" @click="addActive3(index)">{{item.name}}</p>
                    </div>
                    <button class="long_btn" @click="getResult3">确认</button>
                </div>
            </div>
        </div>
        <appFooter :nowPath="nowPath"></appFooter>
        </div>
    </div>
</div>
</template>

<script>
import common from "@/assets/js/common";
import slidePicker from "@/components/slidePicker";
import writers from "@/components/writer/writer";
import radioPicker from "@/components/radioPicker";
import sortPopup from "@/components/sortPopup/sortPopup";
import appFooter from "@/components/footer/appFooter";
import sliderPopupPicker from "@/components/sliderPopupPicker";
import {
    Range,
    Popup,
    XSwitch,
    Cell,
    XButton,
    Group,
    Picker,
    AlertModule,
    ChinaAddressV4Data,
    XAddress,
    Loading,
    Scroller,
    Value2nameFilter as value2name
} from "vux";
const pulldownDefaultConfig = {
    content: "下拉刷新",
    height: 40,
    autoRefresh: false,
    downContent: "下拉刷新",
    upContent: "释放后刷新",
    loadingContent: "正在刷新...",
    clsPrefix: "xs-plugin-pulldown-"
};
const pullupDefaultConfig = {
    content: "上拉加载更多",
    pullUpHeight: 60,
    height: 40,
    autoRefresh: false,
    downContent: "释放后加载",
    upContent: "上拉加载更多",
    loadingContent: "加载中...",
    clsPrefix: "xs-plugin-pullup-"
};
export default {
    data() {
        return {
            totalWriter:0,
            scrollerShow: true,
            // follow-关注,userCount-用户数,workHours-写作小时,price-单价最低,work-写作值
            sortOptions: [{
                    title: "优先显示我关注用户的任务",
                    value: "follow"
                },
                {
                    title: "优先显示相关用户数最多的用户的任务",
                    value: "userCount"
                },
                {
                    title: "优先显示写作小时数最多的用户的任务",
                    value: "workHours"
                },
                {
                    title: "优先显示每人小时费最少的任务",
                    value: "price"
                },
                {
                    title: "优先显示累计写作值最多的用户的任务",
                    value: "work"
                }
            ],
            typeOptions: [{
                    title: "找作者",
                    value: "1"
                },
                {
                    title: "找书商",
                    value: "2"
                },
                {
                    title: "找书商找作者",
                    value: "3"
                },
                {
                    title: "全部类型",
                    value: ""
                }
            ],
            order: "",
            addressData: ChinaAddressV4Data,
            nowPath: "/mission",
            borderColor: "",
            aLLIsShow: false,
            pxIsShow: false,
            sxIsShow: false,
            typeShow: false,
            rangValue: 0,
            sliderSubjectArr: [],
            sliderBigClassArr: [],
            sliderClassArr: [],
            slidePriceArr: [],
            slidePriceArr2: [],
            // 传入slidePicker的数据
            subjectArr: [],
            gradesArr: [],
            leftText1: "年级",
            leftText2: "科目",
            rightText1: "不限",
            rightText4: "",
            rightText3: "",
            leftText3: "价格区间",
            leftText4: "协作方式",
            leftText5: "协作区域",
            myarea: [],
            coordination: [
                ["不限", "作者拜访", "书商拜访", "远程协作"]
            ],

            rightText2: "不限",
            // 传入radio的值
            radioTitle: "选择性别",
            publish_title: "出版方式",
            publish_Arr: [{
                    value: 0,
                    text: "独资",
                    selected: true
                },
                {
                    value: 1,
                    text: "合资",
                    selected: false
                }
            ],
            radios_sex_Arr: [{
                    value: 0,
                    text: "不限",
                    selected: true
                },
                {
                    value: 1,
                    text: "男",
                    selected: false
                },
                {
                    value: 2,
                    text: "女",
                    selected: false
                }
            ],
            minWorkAge: "",
            maxWorkAge: "",
            // 传入radio的值 end
            step: 1,
            pxIsShow: false,
            stringValue1: false,
            stringValue2: false,
            stringValue3: false,
            //任务列表
            postList: [],
            // 获取参数
            postData: {},
            priceMin: "",
            priceMax: "",
            publish_title: "出版方式",
            radiosArr: [{
                    value: 1,
                    text: "独资",
                    selected: true
                },
                {
                    value: 2,
                    text: "合资",
                    selected: false
                }
            ],
            SSdata: {},
            nowPage: 1,
            isBottom: false,
            onFetching: false,
            classShow: false,
            categoryShow: false,
            coordinationShow: false,
            mainShow: true,
            allWriter: "",
            list: [],
            userData: {},
            missionTypeText: "全部类型",
            pullupDefaultConfig: pullupDefaultConfig,
            pulldownDefaultConfig: pulldownDefaultConfig
        };
        // dataend
    },
    watch: {
        order: {
            handler(newName, oldName) {
                // alert("新排序" + newName);
                this.nowPage=1;
                this.order = newName;
                this.getMIssionlist(this.nowPagenewName);
            },
            deep: true,
            immediate: true
        }
    },
    components: {
        Range,
        Popup,
        XSwitch,
        Cell,
        XButton,
        Group,
        Picker,
        slidePicker,
        radioPicker,
        sortPopup,
        AlertModule,
        appFooter,
        sliderPopupPicker,
        XAddress,
        Scroller,
        Loading
    },
    mounted() {
        var that = this;
        that.myarea = [];
        that.getPriceArr();
        that.getCategory();
        that.getBigGrade();
        // 获取当前登陆用户信息
        this.getWebUser(this.$store.state.uid);
        // 获取作者总数
        that.getTotalWriter();
        // 上拉刷新！---------------------------------
        that.$nextTick(() => {
            that.$refs.scrollerBottom.reset({
                top: 0
            });
        });
        that.loadMore();
        // 上拉刷新！---------------------------------
        console.log("所有价格");
        console.log(that.slidePriceArr2);
    },

    methods: {
        ...common,
        // 点击每个任务右下角报名，直接报名
        toEnroll(index) {
            var that = this;
            //任务类型：1-找作者,2-找书商,3-找作者和书商
            var missionType = that.postList[index].taskType;
            // 当前用户的身份
            var userType = that.userData.type;

            console.log(userType + "====" + missionType);
            if (
                (userType == "author" && missionType == "2") ||
                (userType == "business" && missionType == "1")
            ) {
                AlertModule.show({
                    title: "报名身份条件不满足"
                });
            } else {
                var postData = {
                    taskId: that.postList[index].id,
                    uid: that.$store.state.uid
                };
                that
                    .$http("post", that.$store.state.baseUrl + "api/Task/Apply", postData)
                    .then(function (res) {
                        if (res.data.code != "00") {
                            AlertModule.show({
                                title: res.data.msg
                            });
                        } else {
                            AlertModule.show({
                                title: "报名成功",
                                onHide: function () {
                                    that.nowPage = 1;
                                    that.loadMore();
                                }
                            });
                        }
                    });
            }
        },
        // 任务筛选
        choostTypeItem(index) {
            this.order = "";
            this.nowPage = 1;
            this.realAuth = "";
            this.eduAuth = "";
            this.authorAuth = "";
            this.postData = {
                order: "",
                currentPage: this.nowPage,
                realAuth: this.realAuth,
                eduAuth: this.eduAuth,
                authorAuth: this.authorAuth,
                minWorkAge: "",
                maxWorkAge: "",
                classNo: "",
                category: "",
                priceRange: "",
                area: "",
                taskType: this.typeOptions[index].value
            };
            this.getMIssionlist();
            this.loadMore();
            this.typeShow = false;
            this.missionTypeText = this.typeOptions[index].title;
        },
        // 点击筛选
        clickSS() {
            var that = this;
            that.sxIsShow = true;
            that.pxIsShow= false;
            that.scrollerShow = false;
            that.mainShow = false;
        },
        // 性别
        getRadioValue(val) {
            this.postData.gender = val;
        },
        // 所有作者总数
        getTotalWriter() {
            // /WebUser/AuthorTotal
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that
                .$http("get", baseUrl + "api/WebUser/AuthorTotal")
                .then(function (res) {
                    if (res.data.code != "00") {
                        AlertModule.show({
                            title: res.data.msg
                        });
                    } else {
                        
                        that.allWriter = res.data.data;
                        // alert(res.data.data)
                    }
                });
        },
        // 分页======================================
        // ==========================================

        getResult() {
            // 年级
            var arr = [];
            for (let i in this.gradesArr) {
                if (this.gradesArr[i].active == true) {
                    arr.push(this.gradesArr[i].className);
                    this.classNo.push(this.gradesArr[i].id);
                }
            }
            this.mainShow = true;
            this.classShow = false;
            this.rightText1 = arr.join(",");
        },
        getResult2() {
            // 科目
            var arr = [];
            for (let i in this.subjectArr) {
                if (this.subjectArr[i].active == true) {
                    arr.push(this.subjectArr[i].categroy);
                    this.subject.push(this.subjectArr[i].id);
                }
            }
            this.mainShow = true;
            this.categoryShow = false;
            this.rightText2 = arr.join(",");
        },
        // 每个item的点击书简
        addActive(index) {
            this.gradesArr[index].active = !this.gradesArr[index].active;
        },
        addActive2(index) {
            this.subjectArr[index].active = !this.subjectArr[index].active;
        },
        addActive3(index) {
            this.coordination[index].active = !this.coordination[index].active;
        },
        gotoMultiPicker(val) {
            if (val == "class") {
                //   console.log(1)
                this.classShow = true;
                (this.categoryShow = false),
                (this.coordinationShow = false),
                (this.mainShow = false);
            } else {
                (this.classShow = false),
                (this.coordinationShow = false),
                (this.categoryShow = true);
                this.mainShow = false;
            }
        },
        // 查看任务详情
        toSeeMissionDetail(i) {
            var that = this;
            // 任务的id
            var id = that.postList[i].id;
            // 任务发布人的id
            var postUid = that.postList[i].uid;
            var isMyTask = false;
            if (postUid == that.$store.state.uid) {
                isMyTask = true;
            }
            // 如果要传递参数，一定要指定neme
            that.$router.push({
                // name: "missionDetail",
                path: "/missionDetail",
                query: {
                    id: id,
                    isMyTask: isMyTask
                }
            });
        },
        addressChange() {},
        // 全部类型
        getAllType() {
            // this.order = "";
            // this.nowPage = 1;
            // this.realAuth = "";
            // this.eduAuth = "";
            // this.authorAuth = "";
            // this.postData = {
            //     order: "",
            //     currentPage: this.nowPage,
            //     realAuth: this.realAuth,
            //     eduAuth: this.eduAuth,
            //     authorAuth: this.authorAuth,
            //     minWorkAge: "",
            //     maxWorkAge: "",
            //     classNo: "",
            //     category: "",
            //     priceRange: "",
            //     area: ""
            // };
            // this.getMIssionlist();
            // this.loadMore();
        },
        // 提交筛选条件
        showSSdata() {
            var that = this;
            that.postData.realAuth = that.stringValue1 ? that.stringValue1 : "";
            that.postData.eduAuth = that.stringValue2 ? that.stringValue2 : "";
            that.postData.authorAuth = that.stringValue3 ? that.stringValue3 : "";
            that.postData.minWorkAge = that.minWorkAge;
            that.postData.maxWorkAge = that.maxWorkAge;

            console.log(that.postData);
            if(that.postData.minWorkAge<0||that.postData.maxWorkAge>80){
                 AlertModule.show({
                        title: "写作年限不在范围中"
                    })
            }else{
                that
                .$http(
                    "get",
                    that.$store.state.baseUrl + "api/Task/Page",
                    that.postData
                )
                .then(function (res) {
                    if (res.data.code == "00") {
                        // that.totalWriter=res.pi.totalSize;
                       
                        var result = res.data.data;
                        for (var i in result) {
                            var arr = result[i].priceRange.split("-");
                            result[i].priceMin = arr[0];
                            result[i].priceMax = arr[1];
                            result[i].nickname = result[i].webUser.nickname;
                            console.log(result[i].webUser.nickname);
                            if (result[i].taskType == 1) {
                                result[i].borderColor = "zz";
                            } else if (result[i].taskType == 2) {
                                result[i].borderColor = "ss";
                            } else {
                                result[i].borderColor = "sz";
                            }
                        }
                        // fn(result);
                        that.postList = result;
                    }
                    console.log("任务列表");
                    console.log(that.postList);
                });
            that.sxIsShow = false;
            that.scrollerShow = true;
            that.mainShow = true;
            }
            
        },
        // 取消筛选
        cancelSS() {
            // console.log('11')
            this.sxIsShow = false;
            this.scrollerShow = true;
            this.mainShow = true;
        },
        // ========================================
        refresh() {
            var that = this;
            if (that.nowPage != 0) {
                that.nowPage--;
                that.getMIssionlist(data => {
                    that.postList = data;
                    that.$refs.scrollerBottom.enablePullup();
                    that.$refs.scrollerBottom.donePulldown();
                });
            }
        },
        loadMore() {
            console.log("加载");
            var that = this;
            that.getMIssionlist(data => {
                that.postList = data;
                if (data.length >= 10) {
                    that.$refs.scrollerBottom.disablePullup();
                }
                that.postList = that.postList.concat(data);
                that.$refs.scrollerBottom.donePullup();
            });
            that.nowPage++;
        },
        // ======================================
        // 获取任务列表
        getMIssionlist(fn) {
            var that = this;
            that.postData.order = that.order;
            that.postData.currentPage = that.nowPage;
             that.postData.loginUid = that.$store.state.uid;
            that
                .$http(
                    "get",
                    that.$store.state.baseUrl + "api/Task/Page",
                    that.postData
                )
                .then(function (res) {
                    if (res.data.code == "00") {
                        //  alert(res.data.pi.totalSize)
                        that.totalWriter=res.data.pi.totalSize
                        var result = res.data.data;
                        for (var i in result) {
                            var arr = result[i].priceRange.split("-");
                            result[i].priceMin = arr[0];
                            result[i].priceMax = arr[1];
                            result[i].nickname = result[i].webUser.nickname;
                            console.log(result[i].webUser.nickname);
                            if (result[i].taskType == 1) {
                                result[i].borderColor = "zz";
                            } else if (result[i].taskType == 2) {
                                result[i].borderColor = "ss";
                            } else {
                                result[i].borderColor = "sz";
                            }
                        }
                        fn(result);
                    }

                    console.log("任务列表");
                    console.log(that.postList);
                });
        },
        changeResultGrade(val) {
            console.log("年纪" + val.name);
            this.postData.classNo = val.name;
        },
        // 区域
        onAddressChange(val) {
            // alert(val)
            var arr = [];
            console.log(value2name(this.myarea, ChinaAddressV4Data));
            this.postData.area = value2name(this.myarea, ChinaAddressV4Data)
                .split(" ")
                .join(",");
        },
        // changeResultGrade(val) {
        //     // 年级
        //     this.postData.classNo = val;
        // },
        changeResultKM(val) {
            // 科目
            this.postData.category = val.name;
        },
        changeResult(val) {
            console.log(val.value);
            console.log(val.id);
        }
    }
};
</script>

<style scoped>
#mission {
    background: #f5f5f5;
    /* padding-bottom: 60px; */
    padding-bottom: 0;
    height: 100%;
}

.topBox {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #cecece;
    background: #fff;
}

.line {
    width: 1px;
    height: 28px;
    background: #cecece;
    display: inline-block;
}

.topBox .eachBtn {
    display: flex;
    padding-left: 6px;
    padding-right: 6px;
    flex-direction: row;
    height: 40px;
}

.topBox .eachBtn i {
    /* padding-left: 6px; */
    color: #3375c5;
}

.topBox .eachBtn.shortOne {
    /* padding-left: 28px;
  padding-right: 22px; */
}

.topBox .eachBtn.lastItem {
    background: #3375c5;
    color: #fff;
    font-weight: bold;
    height: 40px;
    min-width: 75px;
    /* text-align: right; */
    justify-content: center;
}

.topBox .eachBtn.lastItem i {
    color: #fff;
}

#resultPeoples {
    background: #f5f5f5;
}

.eachPeople {
    padding: 11px;
    /*padding-bottom: 0;*/
    /*margin-top: 10px;*/
    margin-bottom: 10px;
}

.eachPeople.ss {
    border-bottom: 4px solid #2ea200;
}

.eachPeople.zz {
    border-bottom: 4px solid #3375c5;
}

.eachPeople.sz {
    border-bottom: 4px solid #feab29;
}

.reacResult .right .button {
    font-size: 14px;
    padding: 1px 7px 1px 12px;
    border-radius: 5px;
    margin-bottom: 8px;
}

.reacResult .right .button.searchSS {
    color: #2ea200;
    border: 1px solid #2ea200;
}

.reacResult .right .button.searchZZ {
    color: #3375c5;
    border: 1px solid #3375c5;
}

.reacResult .right .button.searchSZ {
    color: #feab29;
    border: 1px solid #feab29;
}

.eachPeople .otherMsg {
    padding: 18px 0 16px 0;
    color: #999999;
    font-size: 12px;
}

.eachPeople .submitBtn {
    width: 60px;
    height: 21px;
    background: #3375c5;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    border: none;
}

#resultPeoples.reacResult .details {
    display: block;
    color: #707070;
}

#resultPeoples.reacResult .hang {
    width: 100%;
    text-align: left;
    margin-bottom: 7px;
}

#resultPeoples.reacResult span.eachItem {
    width: 33.333%;
    display: inline-block;
}

#resultPeoples.reacResult span.eachItem.add {
    width: 66%;
}

.smalltitle {
    color: #242424;
    font-size: 14px;
    padding: 10px 16px;
}

.weui-cell {
    /* padding: 10px 16px; */
    height: 44px;
}

.popBtnBox,
.vux-popup-dialog {
    background: #fff;
    z-index: 9999999999999999999999;
}

.popBtnBox .weui-btn {
    width: 100% !important;
    margin-bottom: 13px;
}

#mission .priceBox {
    padding: 10px 16px;
    /*background: #f5f5f5;*/
    border-bottom: 1px solid #d9d9d9;
}

#mission .priceBox span.title {
    font-size: 14px;
    color: #242424;
}

#mission .vux-x-textarea.weui-cell {
    padding: 0 15px;
    font-size: 14px;
    color: #242424;
}

#mission .priceBox input {
    width: 80px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
}

#mission .vux-cell-box.areaBox {
    padding: 0px;
    border-bottom: 1px solid #d9d9d9;
}

/* 000000000000000000000000000000000000000000 */
#mission .title {
    padding: 11px;
    border-bottom: 1px solid #cecece;
    font-size: 12px;
    color: #3375c5;
}

#mission .content {
    padding: 27px 11px 60px 11px;
    flex-wrap: wrap;
}

#mission .content .item.active {
    border: 1px solid #3375c5;
    color: #fff;
    background: #3375c5;
    /*margin-right: 15px;*/
    font-size: 14px;
}

#mission .content .item {
    width: 95px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #848484;
    color: #868686;
    /*margin-right: 15px;*/
    background: #fff;
    margin-bottom: 10px;
}

#mission .long_btn {
    margin-top: 10px;
    margin-bottom: 10px;
}

#mission.workAgeBox .vux-label {
    color: #242424;
    font-size: 14px;
}

#mission .workAgeBox {
    padding: 15px;
    flex-direction: row;
}

#mission .workAgeBox input {
    /* max-width: 100px;
   */
    width: 45%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 5px;
    text-align: center;
}

#mission .cancelResultBtn {
    background: #fff !important;
    border: 1px solid #999999;
    color: #707070 !important;
    margin-right: 10px;
    /* margin-top: 0; */
}

.weui-btn:after {
    border: none;
}

.shaixuanBox .bigtitle {
    background: #fff;
    text-align: center;
    padding: 20px 0;
}
</style>
