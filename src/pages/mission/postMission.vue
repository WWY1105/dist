<template>
<div id="postMission">
    <!--顶部tab栏-->
    <div class="flexSpace topTab bgW">
        <p class="tabItem" v-for="item in tabItem" :class="item.isActive?'active':''" @click="chooseTab(item.id)" :key="item.id">{{item.text}}</p>
    </div>
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
        <div class="eachArea">
            <!--出版方式-->
            <radioPicker :radiosArr="radiosArr" :title="publish_title" v-on:getRadioValue="getPublicWay"></radioPicker>
            <!--价格区间-->
            <sliderPopupPicker :gradesArr="slidePriceArr" :leftText="leftText3" v-on:changeResult="changeResultPrice"></sliderPopupPicker>

            <!--找书商找作者（招标书商人数）-->
            <group v-if="postData.taskType=='1'?false:true">
                <!--年级选择器start-->
                <popup-picker :title="leftText6" @on-change='booksellerGrade' v-model="bookseller" :data="booksellerArr" class="gradePicker"></popup-picker>
                <!--年级选择器end-->
            </group>
        </div>
        <div class="eachArea">
            <!--协作方式-->
            <slidePicker :sliderArr="coordination" :leftText="leftText4" v-on:changeResult="changeResultWay"></slidePicker>
            <!--协作区域-->
            <x-address :gradesArr="addressData" :title="leftText5" v-model="myarea" :list="addressData" class="areaBox" @on-hide="onAddressChange"></x-address>
        </div>
        <!--报名截至日期-->
        <div class="eachArea">
            <datetimePicker title="报名截至日期" v-model="date" class="datetimePicker" v-on:dateChange='dateChange'></datetimePicker>
        </div>
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
    <div class="btnBox  bgW">
        <button class="long_btn" @click="postMission">发布任务</button>
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
            date: '',
            sliderSubjectArr: [],
            sliderClassArr: [],
            // 顶部tab
            tabItem: [{
                    id: 0,
                    isActive: true,
                    text: '找作者'
                },
                {
                    id: 1,
                    isActive: false,
                    text: '找书商'
                }, {
                    id: 2,
                    isActive: false,
                    text: '找书商找作者'
                }
            ],
            // 顶部tab--end
            // 组件传入
            // 传入slidePicker的数据
            gradesArr: [],
            leftText1: '年级',
            rightText1: '不限',
            subjectArr: [],
            priceArr: [],
            slidePriceArr: [],
            slidePriceArr2: [],
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
            postUserType:''
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

        this.getUser(this.$store.state.uid);
        this.postData.taskType = '1';
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
                that.postUserType=res.data.data.type;
            })
        },
        //出版方式：独资合资
        getPublicWay(val) {
            console.log(val)
            if (this.userData.type == 'author' && this.postData.taskType == '1') {
                AlertModule.show({
                    title: "抱歉，作者找作者只能选择独资方式"
                })
                for (var i in this.radiosArr) {
                    this.radiosArr[i].selected = false
                }
                this.radiosArr[0].selected = true
            } else {
                this.postData.priceType = val
            }
        },
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
        dateChange(value) {
            console.log(value)
            this.postData.deadline = value
        },
        chooseTab(id) {
            var that = this;
            that.postData = {};
            for (var i in this.tabItem) {
                this.tabItem[i].isActive = false;
            }
            this.tabItem[id].isActive = true;
            if (id == 2) {
                this.seezzss = true
            } else if (id == 0) {
                for (var i in this.radiosArr) {
                    this.radiosArr[i].selected = false
                }
                this.radiosArr[0].selected = true
            } else {
                this.seezzss = false
            }
            // 出版方式，顶部tab
            this.postData.taskType = ++id;
            // console.log(this.postData.taskType)

        },

        // 发布任务
        postMission() {
            var that = this;
            if (!that.postData.priceType) {
                that.postData.priceType = 1;
            }
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
            that.postData.uid = this.$store.state.uid;
            for (var i in that.postData) {
                that.postData[i] = that.postData[i].toString()
            }

            console.log(that.postData)

            if (that.postData.taskType == '1') {
                var dataArr = [that.postData.classNo, that.postData.category, that.postData.taskType, that.postData.priceType, that.postData.priceRange, that.postData.deadline, that.postData.coordination, that.postData.area, that.postData.introduction];
                var nameArr = ['年级', "科目", '出版方式', '出资方式', '价格区间', '截止日期', '协作方式', '写作区域', '简述']

            } else {
                var dataArr = [that.postData.classNo, that.postData.category, that.postData.taskType, that.postData.priceType, that.postData.priceRange, that.postData.busniessCount, that.postData.deadline, that.postData.coordination, that.postData.area, that.postData.introduction];
                var nameArr = ['年级', "科目", '出版方式', '出资方式', '价格区间', '书商数量', '截止日期', '协作方式', '写作区域', '简述']

            }
            if (that.isEmpty(dataArr, nameArr).length != 0) {
                AlertModule.show({
                    title: "请填写：" + that.isEmpty(dataArr, nameArr).join(',')
                })
            } else {
                if (that.priceType == '1' && that.postData.busniessCount != 1) {
                    AlertModule.show({
                        title: "抱歉，独资方式只能选择一名书商"
                    })
                } else {
                    /***
                     * taskType (string): 出版方式(1-找作者,2-找书商,3-找作者和书商) 
                     * postUserType;author;business
                     */
                    if(that.taskType=='2'){
                        that.postData.authorId=that.$store.state.uid;
                    }
                  

                    that.$http('post', that.$store.state.baseUrl + 'api/Task', that.postData).then(function (res) {
                        console.log(res.data)
                        if (res.data.code == '00') {
                            AlertModule.show({
                                title: '操作成功！',
                                onHide() {
                                    that.$router.go(-1)
                                }
                            })
                        } else {
                            AlertModule.show({
                                title: res.data.msg
                            })
                            that.$router.push({
                                path: '/mission'
                            })
                        }
                    })
                }
            }

        }
    }
}
</script>

<style>
body,
html,
#postMission {
    background: #fff;
    height: 100%;
}

#postMission .topTab .tabItem.active {
    color: #3375C5;
    border-bottom: 3px solid #3375C5;
}

#postMission .topTab .tabItem {
    padding: 0 5px;
}

#postMission .topTab {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    border-bottom: 1px solid #CECECE;
    font-size: 15px;
    color: #636363;
}

#postMission .content {
    padding: 15px 11px;
}

#postMission .priceBox {
    padding: 10px 16px;
    background: #f5f5f5;
}

#postMission .areaBox .weui-cell {
    padding: 12px 15px;
    background: #f5f5f5;
}

#postMission .priceBox span.title {
    font-size: 14px;
    color: #242424
}

#postMission .vux-x-textarea.weui-cell {

    padding: 0 15px;
    font-size: 14px;
    color: #242424;
}

#postMission .priceBox input {
    width: 80px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
}

#postMission .content .eachArea {
    border: 1px solid #CECECE;
    border-radius: 5px;
    margin-bottom: 8px;
}

#postMission .content .weui-cells,
#postMission .content .sexBox {
    background: #F5F5F5 !important;
}

#postMission .content .datetimePicker {
    background: #F5F5F5;
    height: 44px;
    color: #242424;
    font-size: 14px;
}

#postMission .weui-cells:before {
    display: none;
}

#postMission .vux-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
}

#postMission .eachArea .weui-cells__title {
    background: #F5F5F5;
    height: 44px;
    color: #242424;
    font-size: 14px;
    margin: 0;
    line-height: 44px;
}

#postMission .weui-textarea {
    background: #F5F5F5;
}

#postMission .long_btn {
    width: 90%;
    margin-top: 10px;
    margin-bottom: 35px;
}

#postMission .booksellerBox {
    border-top: 1px solid #D9D9D9;
}
</style>
