<template>
<div id="index" class="bgW">
    <!--轮播图 -->
    <swiper auto class="swiper" height="120px" :list="swipperList" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    <!--轮播图 end-->

    <!--第一部分-->
    <div class=" container">
        <group class="eachPart bgG">
            <!--年级选择-->
            <sliderPopupPicker :gradesArr="sliderBigClassArr" :leftText="leftText1" v-on:changeResult="changeResultGrade"></sliderPopupPicker>
            <!--科目选择器-->
            <sliderPopupPicker :gradesArr="sliderSubjectArr" :leftText="leftText2" v-on:changeResult="changeResultKM"></sliderPopupPicker>

            <!-- <popup-picker class="" :title="title1" :data="list1" v-model="value1" placeholder="请选择" :display-format="format1"></popup-picker>
        <popup-picker class="" :title="title2" :data="list2" :value="value2" placeholder="请选择" @on-change="changeGrade" @on-hide="hide"></popup-picker> -->
        </group>
        <!--第一部分end-->
        <!--第二部分-->
        <group class="eachPart bgG">
            <!--出版方式-->
            <radioPicker :radiosArr="radiosArr" :title="publish_title" v-on:getRadioValue="getPublicWay"></radioPicker>
            <!--价格区间-->
            <sliderPopupPicker :gradesArr="slidePriceArr2" :leftText="leftText3" v-on:changeResult="changeResultPrice"></sliderPopupPicker>

        </group>
        <!--第二部分end-->
        <!--第三部分-->
        <group class="eachPart bgG">
            <!--协作方式-->
            <slidePicker :sliderArr="coordination" :leftText="leftText4" v-on:changeResult="changeResultWay"></slidePicker>
            <!--协作区域-->
            <x-address :gradesArr="addressData" v-model="myarea" :title="leftText5" :list="addressData" class="areaBox" @on-hide="onAddressChange"></x-address>

        </group>

        <!--3 end-->
        <button class="long_btn" @click="gotoSeeResult">搜索</button>

    </div>
    <appFooter :nowPath="nowPath"></appFooter>
</div>
</template>

<script>
import appFooter from '@/components/footer/appFooter'
import sliderPopupPicker from '@/components/sliderPopupPicker'
import radioPicker from '@/components/radioPicker'
import slidePicker from '@/components/slidePicker'
import common from '@/assets/js/common'
import {
    Swiper,
    GroupTitle,
    Group,
    SwiperItem,
    XButton,
    Divider,
    Checker,
    CheckerItem,
    Flexbox,
    FlexboxItem,
    XAddress,
    CheckIcon,
    ChinaAddressV4Data,
    Value2nameFilter as value2name
} from 'vux'
// import { CheckIcon } from 'vux'

// 轮播图数据  -end
export default {
    components: {
        radioPicker,
        slidePicker,
        Swiper,
        SwiperItem,
        GroupTitle,
        XButton,
        Divider,
        Checker,
        CheckerItem,
        Flexbox,
        FlexboxItem,
        CheckIcon,
        Group,
        appFooter,
        sliderPopupPicker,
        XAddress
    },
    mounted() {
        this.myarea=[];
        this.getCategory();
        this.getBigGrade();
        this.getPriceArr();
        // 获取lunbotu
        this.getSwipper();
        console.log('用户'+this.$store.state.uid)
    },
    methods: {
        ...common,
        // 轮播图
        getSwipper() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http("get", baseUrl + "api/Banner/List").then(function (res) {
                if (res.data.code == "00") {
                    var result = res.data.data;
                    for (var i in result) {
                        result[i].img = that.$store.state.imgUrl+result[i].bannerSrc;
                    }
                    that.swipperList = result
                }
            });
        },
        changeResultGrade(val){
            console.log('首页年纪'+val)
            this.postData.classNo=val.name;
        },
        // 区域
        onAddressChange(val) {
            var arr = [];
            console.log(value2name(this.myarea, ChinaAddressV4Data))
            this.postData.area = value2name(this.myarea, ChinaAddressV4Data).split(' ').join(",");
        },
        gotoSeeResult() {
            // alert(this.postData.priceType)
            if(this.postData.priceType==undefined){
                this.postData.priceType=0;
            }
            //"online"="远程协作";"author"="作者上门";"书商拜访"
            switch(this.postData.coordination){
                case undefined:
                this.postData.coordination='';
                break;
                case 'author':
                this.postData.coordination='作者上门';
                break;
                case 'online':
                this.postData.coordination='远程协作';
                break;
                case 'busniess':
                this.postData.coordination='书商拜访';
                break;
            }
            
           
            this.postData.order=''
           delete this.postData.category;

            console.log(this.postData)
            this.$router.push({
                path: '/searchResult',
                query: {
                    postData:JSON.stringify( this.postData)
                },
                meta:{
                      keepAlive: false
                }
            })
        },
        onSwiperItemIndexChange(index) {
            console.log('demo item change', index)
        },
        demo01_onIndexChange(index) {
            this.demo01_index = index
        },
        // 选则相关
        changeGrade(val) {
            this.tempVla = val[0] + '/';
        },

        hide: function () {
            this.tempvalue = this.tempvalue.concat(this.tempVla);
            // console.log(this.tempvalue)
            this.value2 = this.tempvalue;
        },
        format1: function (value, name) {
            return `${value[0]}/${value[1]}/${value[2]}`
        },
        toCheck(val) {
            console.log(val)
            if (val == 1) {
                this.checkFlag1 = true;
                this.checkFlag2 = false;
            } else {
                this.checkFlag2 = true;
                this.checkFlag1 = false;
            }
        }
    },
    data() {
        return {

            nowPath: '/index',
            demo01_index: 0,
            classNo: '',
            postData: {},
            category: '',
            subject:'',
            area: '',
            myarea: [],
            priceArr: [],
            // 左边标题
            title1: '年级',
            title2: '科目',
            title3: '价格区间',
            title4: '协作方式',
            title5: '协作区域',
            addressData: ChinaAddressV4Data,
            // 底部弹窗选项
            slidePriceArr: [],
            sliderSubjectArr: [],
            sliderBigClassArr: [],
            radioTitle: '选择性别',
            publish_title: '出版方式',
            slidePriceArr2: [],
            coordination: [
                ['不限', '作者拜访', '书商拜访', '远程协作']
            ],
            leftText2: '科目',
            leftText3: '价格区间',
            leftText4: '协作方式',
            leftText5: '协作区域',
            leftText1: '年级',
            rightText1: '不限',
            radiosArr: [
                {
                    value: 0,
                    text: '不限',
                    selected: true
                },{
                    value: 1,
                    text: '独资',
                    selected: false
                },
                {
                    value: 2,
                    text: '合资',
                    selected: false
                },
            ],
            // 出版方式选中的值
            checkType: '',
            checkFlag1: false,
            checkFlag2: false,
            swipperList: []

        }
    }
}
</script>

<style scoped>
#index {
    height: 100%;
}

.long_btn {
    width: 100%;
    margin-top: 20px;
}

.checkerBox {
    display: flex;
    justify-content: space-between;
}

.copyright {
    font-size: 12px;
    color: #ccc;
    text-align: center;
}

.text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
}

.text-scroll p {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
}

.black {
    background-color: #000;
}

.title {
    line-height: 100px;
    text-align: center;
    color: #fff;
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.vux-indicator.custom-bottom {
    bottom: 30px;
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    100% {
        opacity: 1;
        transform: none;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    100% {
        opacity: 1;
        transform: none;
    }
}

.swiper {
    margin-bottom: 20px;
}

.fadeInUp {
    animation-name: fadeInUp;
}

.swiper-demo-img img {
    width: 100%;
}

.container {
    padding: 0 10px;
}

.eachPart {
    border: 1px solid #CECECE;
    margin-bottom: 8px;
    border-radius: 5px;
}

.vux-flex-row {
    padding: 10px 15px;
}

.vux-cell-box,
.vux-flex-row {
    background: #F5F5F5;
}
</style>
