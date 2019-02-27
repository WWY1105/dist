<template>
    <div>
        <group>
             <!--年级选择器start-->
             <!-- <span>{{$refs.picker3&&$refs.picker3.getNameValues()}}</span> -->
            <popup-picker :title="leftText" @on-change='change' ref="picker3"  :data="gradesArr"  :placeholder="rightText"  class="gradePicker"></popup-picker>
            <!--年级选择器end-->
        </group>
        
    </div>
</template>

<script>
import {  Group,Picker ,PopupPicker} from 'vux'
export default {
    name:'slidePicker',
    data(){
        return {
            pickerIsShow:false,
            chooseResult:[],
            rightText:'不限'
        }
    },
    props:['gradesArr','leftText','id'],
    components:{
        Picker,
         Group,
         PopupPicker
    },
    mounted(){
        console.log('传入的数组')
         console.log(this.gradesArr)
    },
    methods:{
         // pop
        changeValue(value) {
             this.pickerIsShow=!this.pickerIsShow;
        },
        change(value) {
             console.log('value'+value)
             var  name=this.$refs.picker3.getNameValues(value);
             var  value=value[0];

             this.rightText=name;
              console.log('右边的文字name'+this.rightText)

              console.log('value'+value)
            this.$emit('changeResult',{
                name:name,
                value:value
            })
        }
       
        // pop
    }
}
</script>

<style scoped>
p.chooseHang {
    padding: 9px 16px 9px 15px;
    height: 44px;
}

p.chooseHang .leftText {
    color: #242424;
    font-size: 14px;
}

p.chooseHang .rightText {
    color: #3375C5;
    font-size: 14px;
}

p.chooseHang .rightText svg {
    margin-left: 12px;
}
.gradePicker{
    /*z-index:999999999;*/
}


</style>
