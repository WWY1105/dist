<template>
<div id="taskOrientation">
    <!--顶部tab栏-->
    <!-- <div class="flexSpace topTab bgW">
        <p class="tabItem" v-for="item in tabItem" :class="item.isActive?'active':''" @click="chooseTab(item.id)" :key="item.id">{{item.text}}</p>
    </div>-->
    <!--顶部tab栏END-->
    <div class="content bgW">
        <!--选项内容-->
        <div class="eachArea">
            <!--年级选择-->
            <!-- <input type="text" :placeholder="$refs.picker1&&$refs.picker1.getNameValues()"> -->
            <sliderPopupPicker :gradesArr="sliderClassArr" :leftText="leftText1" v-on:changeResult="changeResultGrade"></sliderPopupPicker>
            <!--科目选择器-->
            <sliderPopupPicker :gradesArr="sliderSubjectArr" :leftText="leftText2" v-on:changeResult="changeResultKM"></sliderPopupPicker>
        </div>
        <!-- <div class="eachArea"> -->
        <!--出版方式-->
        <!-- <radioPicker :radiosArr="radiosArr" :title="publish_title" v-on:getRadioValue="getPublicWay"></radioPicker> -->
        <!--价格区间-->
        <!-- <sliderPopupPicker :gradesArr="slidePriceArr" :leftText="leftText3" v-on:changeResult="changeResultPrice"></sliderPopupPicker> -->
        <!--找书商找作者（招标书商人数）-->
        <!-- <group v-if="postData.taskType=='1'?false:true">-->
        <!-- 年级选择器start -->
        <!-- <popup-picker :title="leftText6" @on-change='booksellerGrade' v-model="bookseller" :data="booksellerArr" class="gradePicker"></popup-picker> -->
        <!--年级选择器end-->
        <!-- </group> -->
        <!-- </div> -->
        <div class="eachArea">
            <!--协作方式-->
            <slidePicker :sliderArr="coordination" :leftText="leftText4" v-on:changeResult="changeResultWay"></slidePicker>
            <!--协作区域-->
            <x-address :gradesArr="addressData" :title="leftText5" v-model="myarea" :list="addressData" class="areaBox" @on-hide="onAddressChange"></x-address>
        </div>
        <!--报名截至日期-->
        <!-- <div class="eachArea">
            <datetimePicker title="报名截至日期" v-model="date" class="datetimePicker" v-on:dateChange='dateChange'></datetimePicker>
      </div>-->
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
        <!--选项内容END-->
    </div>
    <div class="btnBox bgW">
        <button class="long_btn" @click="taskOrientation">发布任务</button>
    </div>
</div>
</template>

<script>
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

export default {
    data() {
        return {
            bookseller: [],
            // 根据顶部tab某些部件不显示

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
            date: '',
            sliderSubjectArr: [],
            sliderClassArr: [],
            // 顶部tab
            // tabItem: [{
            //         id: 0,
            //         isActive: true,
            //         text: '找作者'
            //     },
            //     {
            //         id: 1,
            //         isActive: false,
            //         text: '找书商'
            //     }, {
            //         id: 2,
            //         isActive: false,
            //         text: '找书商找作者'
            //     }
            // ],
            // 顶部tab--end
            // 组件传入
            // 传入slidePicker的数据
            gradesArr: [],
            leftText1: '年级',
            rightText1: '不限',
            subjectArr: [],
            priceArr: [],
            slidePriceArr: [],
            coordination: [
                ['不限', '作者拜访', '书商拜访', '远程协作']
            ],

            leftText2: '科目',
            leftText3: '价格区间',
            leftText4: '协作方式',
            leftText5: '协作区域',
            leftText6: '招标书商人数',

            booksellerArr: [
                // ['1','2','3','4','5']
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
            writerId: this.$route.query.writerId
        }
    },
    components: {
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
        this.getPriceArr()
        // 获取传入的作者id,获取被邀请人身份
        this.getUser(this.$route.query.writerId);
        // this.postData.taskType = '1';
        // 招商人数
        var arr = [];
        for (var i = 1; i <= 1000; i++) {
            arr.push(i)
        };
        this.booksellerArr.push(arr)
    },
    methods: {

        ...common,
        // 区域
        onAddressChange(val) {
            this.postData.area = value2name(this.myarea, ChinaAddressV4Data).split(' ').join(",");
        },
        // 招标书商人数
        booksellerGrade(val) {
            // 如果选择了独资，书商只能选一个
            if (this.radiosArr[0].selected == true && val[0] != 1) {
                AlertModule.show({
                    title: "抱歉，独资方式只能选择一名书商"
                })
            } else {
                this.postData.busniessCount = val.join('')
            }

        },
        getUser(uid) {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/WebUser/' + uid).then(function (res) {
                that.userData = res.data.data;
                if (that.userData.type == 'author') {
                    // 被邀请人是作者
                    that.postData.taskType = '1'
                } else {
                    // 被邀请人是书商
                    that.postData.taskType = '2'
                }
            })
        },
        //出版方式：独资合资
        // getPublicWay(val) {
        //     console.log(val)
        //     if (this.userData.type == 'author' && this.postData.taskType == '1') {
        //         AlertModule.show({
        //             title: "抱歉，作者找作者只能选择独资方式"
        //         })
        //         for (var i in this.radiosArr) {
        //             this.radiosArr[i].selected = false
        //         }
        //         this.radiosArr[0].selected = true
        //     }else{
        //         this.postData.priceType=val
        //     }
        // },
        // 协作方式
        changeResultWay(val) {
            console.log(val)
            this.postData.coordination = val[0];
        },

        // 年级
        changeResultGrade(value) {
            var that = this;
            that.postData.classNo = value.name;

        },
        // 科目
        changeResultKM(value) {
            this.postData.category = value.name;
            console.log(this.postData.category)
        },

        // 发布任务
        taskOrientation() {
            var that = this;
            // 独资
            that.postData.priceType = 1;
            // 书商人数
            that.postData.busniessCount = 1;
            if (!that.postData.classNo) {
                that.postData.classNo = '';
            }
            if (!that.postData.category) {
                that.postData.category = '';
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
            that.postData.uid = this.$store.state.uid;
            // ========
            // that.postData.priceRange= '';
            that.postData.deadline = '2199-01-01';

            for (var i in that.postData) {
                that.postData[i] = that.postData[i].toString()
            }
            console.log(that.postData)

            var dataArr = [that.postData.classNo, that.postData.category, that.postData.taskType, that.postData.priceType, that.postData.coordination, that.postData.area, that.postData.introduction];
            var nameArr = ['年级', "科目", '出版方式', '出资方式', '协作方式', '写作区域', '简述']

            if (that.isEmpty(dataArr, nameArr).length != 0) {
                AlertModule.show({
                    title: "请填写：" + that.isEmpty(dataArr, nameArr).join(',')
                })
            }else{
                
            that.$http('post', that.$store.state.baseUrl + 'api/Task', that.postData).then(function (res) {
                console.log(res.data)
                var taskId = res.data.data.id
                if (res.data.code == '00') {
                    //    任务发布成功，将此作者报名此任务
                    var postData = {
                        taskId:taskId,
                        uid: that.writerId
                    }
                    that.$http('post', that.$store.state.baseUrl + 'api/Task/Apply', postData).then(function (res) {
                        if (res.data.code != '00') {
                            AlertModule.show({
                                title: res.data.msg,
                            })
                        } else {
                            // 选择此作者
                            var postData = {
                                id: res.data.data.id,
                                status: "2"
                            };
                            that.$http("post",
                                    that.$store.state.baseUrl + "api/Task/Apply/Select",
                                    postData
                                )
                                .then(function (res) {
                                    if (res.data.code != "00") {
                                        AlertModule.show({
                                            title: res.data.msg
                                        })
                                    } else {
                                        var arr = []
                                        console.log(that.writerId)
                                        // 选择作者成功
                                        that.$router.push({
                                            path: "/replyDetails",
                                            query: {
                                                isNew: true,
                                                taskId: taskId,
                                                chooseWriterId: arr.push(that.writerId),
                                                sendSuccess: false
                                            }
                                        })
                                    }
                                });
                        }

                    })
                }
            })

            }

        }
    }}
</script>

<style scoped>
body,
html,
#taskOrientation {
    background: #fff;
    height: 100%;
}

#taskOrientation .topTab .tabItem.active {
    color: #3375c5;
    border-bottom: 3px solid #3375c5;
}

#taskOrientation .topTab .tabItem {
    padding: 0 5px;
}

#taskOrientation .topTab {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    border-bottom: 1px solid #cecece;
    font-size: 15px;
    color: #636363;
}

#taskOrientation .content {
    padding: 15px 11px;
}

#taskOrientation .priceBox {
    padding: 10px 16px;
    background: #f5f5f5;
}

#taskOrientation .areaBox .weui-cell {
    padding: 12px 15px;
    background: #f5f5f5;
}

#taskOrientation .priceBox span.title {
    font-size: 14px;
    color: #242424;
}

#taskOrientation .vux-x-textarea.weui-cell {
    padding: 0 15px;
    font-size: 14px;
    color: #242424;
}

#taskOrientation .priceBox input {
    width: 80px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
}

#taskOrientation .content .eachArea {
    border: 1px solid #cecece;
    border-radius: 5px;
    margin-bottom: 8px;
}

#taskOrientation .content .weui-cells,
#taskOrientation .content .sexBox {
    background: #f5f5f5 !important;
}

#taskOrientation .content .datetimePicker {
    background: #f5f5f5;
    height: 44px;
    color: #242424;
    font-size: 14px;
}

#taskOrientation .weui-cells:before {
    display: none;
}

#taskOrientation .vux-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
}

#taskOrientation .eachArea .weui-cells__title {
    background: #f5f5f5;
    height: 44px;
    color: #242424;
    font-size: 14px;
    margin: 0;
    line-height: 44px;
}

#taskOrientation .weui-textarea {
    background: #f5f5f5;
}

#taskOrientation .long_btn {
    width: 90%;
    margin-top: 10px;
    margin-bottom: 35px;
}

#taskOrientation .booksellerBox {
    border-top: 1px solid #d9d9d9;
}
</style>
