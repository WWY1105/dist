<template>
    <div class="cellVav">
        <cell is-link  :class="noBorder" @click.native="gotoSeePage" >
            <!-- <span  class="flexSpace"> -->
                <!-- <div class="left flexSpace"> -->
                    <i slot="icon" :class="'iconfont '+icon"></i>
                    <span  slot="title" style="vertical-align:middle;">{{leftTitle}}</span>
                <!-- </div> -->
                <badge slot='value' style="float:right" :text="num" v-if="num==0?false:true"></badge>      
        </cell>
    </div>
</template>

<script>
import { Cell, Badge } from 'vux'

export default {
    props: ['leftTitle', 'num', 'icon','noBorder','link','writerId','uid'],
    components: {
        Cell,
        Badge
    },
    methods:{
        gotoSeePage(){
           
           if(this.leftTitle=='关注公众号'){
               this.$emit('tofellow','https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4NTczOTE4NQ==#wechat_redirect')
           }
            this.$router.push({
                path:this.link,
                query:{
                    'writerId':this.writerId,
                    'uid':this.uid
                },
                meta:{
                    keepActive:false
                }
            })
        }
    }
}

</script>

<style scoped>
 .vux-label {
    width: 100%!important;
    align-items: center;
}
#mineIndex   .vux-label{
    width: 100%!important;
}
.cellVav .weui-cell {
    border-bottom: 1px solid #D9D9D9;
    padding-left: 0;
    color: #333333;
    font-size: 15px;
}
 .cellVav  .noBorder{
      border-bottom: none!important;
  }

.cellVav .weui-cell .iconfont {
    color: #7f7f7f;
    font-size: 15px;
    margin-right: 16px;
}

.cellVav .left {
    flex-direction: row;
}

.cellVav .vux-cell-primary {
    position: relative;
}

.cellVav .vux-badge-single {
    /* position: absolute;
    right: 10%; */
}
</style>
