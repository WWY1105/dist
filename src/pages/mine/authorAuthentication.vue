<template>
<div id="authorAuthentication" class="bgW">
    <div class="titleBox flexSpace">
        <span class="leftText">写作年限</span>
        <!-- <input type="text" v-model="year"> -->
        <sliderPopupPicker :gradesArr="yearsArr" :rightText="rightText"  v-on:changeResult="changeResultGrade"></sliderPopupPicker>
    </div>
    <div class="eachArea">
        <span class="titleBox leftText">写作成果</span>
        <group>
            <x-textarea style="background: #F5F5F5" v-model="value1"></x-textarea>
        </group>
    </div>
    <div class="eachArea">
        <span class="titleBox leftText">写作经历</span>
        <group>
            <x-textarea style="background: #F5F5F5" v-model="value2"></x-textarea>
        </group>
    </div>
    <div class="eachArea">
        <span class="titleBox leftText">写过的发行的书商名单</span>
        <group>
            <x-textarea style="background: #F5F5F5" v-model="value3"></x-textarea>
        </group>
    </div>
    <div class="eachArea">
        <span class="titleBox leftText">作者资质签发机构</span>
        <group>
            <x-textarea style="background: #F5F5F5" v-model="value4"></x-textarea>
        </group>
    </div>
    <div class="eachArea">
        <span class="titleBox leftText">作者资质验证资料</span>
        <div class="imgBox flexSpace">
            <div class="eachBox" @click.stop="frontImg">
                <img :src="frontUrl" alt="" v-if="frontUrl==''?false:true">
                <img src="../../assets/img/sfz@3x.png" alt="" v-if="frontUrl==''?true:false">
                <input v-if="isios" type="file" name="img" accept="image/*" id="upload_file1" mutiple="mutiple" class="add" @change="chooseImageFront">
                <input v-if="!isios" type="file" name="img" accept="image/*" id="upload_file1" capture="camera" mutiple="mutiple" class="add" @change="chooseImageFront">

                <!-- <img src="../../assets/img/sfz@3x.png" alt=""> -->
                <p class="text">资料上传</p>
            </div>
            <div class="eachBox" @click.stop="backImg">
                <img :src="backUrl" alt="" v-if="backUrl==''?false:true">
                <img src="../../assets/img/sfz@3x.png" alt="" v-if="backUrl==''?true:false">
                <input v-if="isios" type="file" name="img" accept="image/*" id="upload_file2" mutiple="mutiple" class="add" @change="chooseImageBack">
                <input v-if="!isios" type="file" name="img" accept="image/*" id="upload_file2" capture="camera" mutiple="mutiple" class="add" @change="chooseImageBack">

                <!-- <img src="../../assets/img/sfz@3x.png" alt=""> -->
                <p class="text">其它材料（可选）</p>
            </div>
        </div>
    </div>
    <button class="long_btn submit_btn" @click="submitData">提交</button>
</div>
</template>

<script>
import {
    XTextarea,
    Group,
    AlertModule
} from "vux";
import axios from 'axios'
import sliderPopupPicker from '@/components/sliderPopupPicker'
export default {
    data() {
        return {
            year: '',
            yearsArr: [],
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            uid: this.$store.state.uid,
            isios: false,
            frontUrl: '',
            backUrl: '',
            rightText:''
        }
    },
    components: {
        XTextarea,
        Group,
        AlertModule,
        sliderPopupPicker
    },
    mounted() {
        //获取浏览器的userAgent,并转化为小写
        var ua = navigator.userAgent.toLowerCase();
        //判断是否是苹果手机，是则是true
        var isIos = ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1;
        if (isIos) {
            this.isios = true;
        } else {
            this.isios = false;
        }
        var arr = []
        for (let i = 0; i <= 100; i++) {
            arr.push(i)
        }
        this.yearsArr.push(arr)
    },
    methods: {
        frontImg() {
            var file = document.getElementById("upload_file1");
            file.click()
        },
        backImg() {
            var file1 = document.getElementById("upload_file2");
            file1.click()
        },
        changeResultEdu(val) {
            this.degree = val.value
            this.rightText = val.value
        },
        //   选择正面
        chooseImageFront() {
            var that = this;
            var baseUrl = "https://nian.im/works/"
            var file = document.getElementById("upload_file1").files[0];
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
                    // that.imgArr.push(res.data.data)
                    var showUrl = 'http://nian.im/storage/' + res.data.data
                    that.frontUrl = showUrl
                    // console.log(that.imgArr)  
                }
            })
        },

        // 选择反面
        chooseImageBack() {
            var that = this;
            var baseUrl = "https://nian.im/works/"
            var file = document.getElementById("upload_file2").files[0];
            var formdata1 = new FormData(); // 创建form对象
            formdata1.append('img', file); // 通过append向form对象添加数据,可以通过append继续添加数据
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }; //添加请求头

            axios.post(baseUrl + 'file/img', formdata1, config).then(function (res) {
                if (res.data.code != '00') {
                    AlertModule.show({
                        title: res.data.msg
                    })
                } else {
                    // that.imgArr.push(res.data.data)
                    var showUrl = 'http://nian.im/storage/' + res.data.data
                    that.backUrl = showUrl
                    // console.log(that.imgArr)  
                }
            })
        },
        changeResultGrade(val) {
             console.log(val)
             this.rightText=val.value;
            this.year = val.value;
        },
        submitData() {
            var that = this;
            var data = {
                achievement: that.value1,
                books: that.value3,
                experience: that.value2,
                material: that.frontUrl,
                org: that.value4,
                workAge: that.year
            }
            var flag=true;
            for(var i in data){
                if(!Boolean(data[i])){
                     AlertModule.show({
                        title:"请填写全部信息"
                    })
                    flag=false
                    break;
                }
                continue;
            }
            if(flag){
            data.othersMaterial=that.backUrl;
            data.uid= that.$store.state.uid
            var baseUrl = this.$store.state.baseUrl;
            that.$http('post', baseUrl + 'api/WebUser/Certificate/Author', data).then(function (res) {
                if (res.data.code == '00') {
                    AlertModule.show({
                        title: '保存成功！',
                        onHide(){
                             that.$router.go(-1)
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
    }
};
</script>

<style scoped>
#authorAuthentication {
    height: 100%;
    padding-top: 14px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 1093px;
}

#authorAuthentication .leftText {
    color: #858585;
    font-size: 13px;
}

#authorAuthentication .titleBox {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;

}

#authorAuthentication .titleBox input {
    height: 100%;
    border: none;
    text-align: right;
    color: #3375C5;
    font-size: 13px;
}

#authorAuthentication .eachArea .titleBox {
    border: none;
}

#authorAuthentication .vux-x-textarea.weui-cell {
    padding: 0;
    border-radius: 5px;
}

#authorAuthentication .imgBox {
    /* margin-top: 20px; */
    text-align: center;
    color: #C2C3C3;
    font-size: 12px;
}

#authorAuthentication .imgBox img {
    width: 92px;
    height: 63px;
    margin-bottom: 12px;
}

#authorAuthentication .submit_btn {
    margin-top: 45px;
}

#authorAuthentication .weui-cells:before {
    border: none
}
#authorAuthentication .imgBox input{
    display: none;
}
</style>
