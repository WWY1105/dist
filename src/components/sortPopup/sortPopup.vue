<template>
    <!--排序条件弹窗-->
    <div v-transfer-dom class="bgW" id="sortPopup">
        <popup v-model="pxIsShow" style="background-color:#fff;" class="sortBox bgW">
            <div style="background-color:#fff;height:auto;margin:0 auto;border-radius:5px;">
                <group>
                    <cell  v-for="item,index in sortOptions" :class="index==0?'sortCell active':'sortCell'" :title="item.title" :value="item.value" :key="index" @click.native="choostItem(index)">
                        <div>
                            <x-icon class="mainColor" type="ios-arrow-thin-up" stroke-width="18" size="30"></x-icon>
                        </div>
                    </cell>
                </group>
                <div style="padding:13px 10px;" class="popBtnBox">
                    <x-button @click.native="saveOrder" class="popBtn saveBtn">保存并退出</x-button>
                    <x-button class="popBtn backBtn" @click.native="backSave">恢复默认排序</x-button>
                </div>

            </div>
        </popup>
    </div>
</template>

<script>
import { Popup, TransferDom, Range, XSwitch, Cell, XButton, Radio, Checker, CheckerItem, Flexbox, FlexboxItem, CheckIcon, Group, GroupTitle } from 'vux'
export default {
   
    data() {
        return {
            stringValue: '',
            seexCheckType: '',//性别选中值
            rangValue: 17,
            data2: 0,
            order:''
           
        }
    },
    props:['pxIsShow','sortOptions'],
    // props: {
    //     pxIsShow: {
    //         type: Boolean
    //     },
    //     sortOptions:{
    //         type:Array
    //     }
    // },
    directives: {
        TransferDom
    },
    components: {
        Range,
        Popup,
        XSwitch,
        Cell,
        XButton,
        Radio,
        Checker,
        CheckerItem,
        Flexbox,
        FlexboxItem,
        CheckIcon,
        GroupTitle,
        Group
    },
    methods: {
        // 保存排序
        saveOrder(){
            // this.pxIsShow=!this.pxIsShow;
            if(this.order==''){
                this.order=this.sortOptions[0].value
            }
            this.$emit('getPxIsShow',false)
            this.$emit('getOrderType',this.order||this.sortOptions[0].value)
        },
        // 点击每一个排序
        choostItem(i) {
            // this.order=this.sortOptions[i].value
            // this.sortOptions.unshift(this.sortOptions[i]);
            // this.sortOptions.splice(++i, 1);


            // ============================
            this.sortOptions.push(this.sortOptions[0]);
            this.sortOptions.splice(0, 1);
            this.order=this.sortOptions[0].value

        },
        // 恢复默认
        backSave(){
            this.$emit('getPxIsShow',false)
            this.$emit('getOrderType','')
        }
    }
}
</script>

<style>
#sortPopup .sortBox {
    padding: 15px 0;
}

#sortPopup .weui-cells:before {
    height: 0 !important;
    border: none;
}
.sortCell.active{
    color: #3375C5;
    font-weight: bolder;
}
</style>
