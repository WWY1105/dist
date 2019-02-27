<template>
    <div class="cellVav">
        <cell is-link  :class="noBorder" @click.native="gotoSeePage" >
            <span slot="title" class="flexSpace">
                <div class="left flexCenter">
                    <i slot="icon" :class="'iconfont '+icon"></i>
                    <span style="vertical-align:middle;">{{leftTitle}}</span>
                </div>
                <badge :text="num" v-if="num==0?false:true"></badge>
            </span>
        </cell>
    </div>
</template>

<script>
import { Cell, Badge } from 'vux'

export default {
    props: ['leftTitle', 'num', 'icon','noBorder','link','writerId'],
    components: {
        Cell,
        Badge
    },
    methods:{
        gotoSeePage(){
            this.$router.push({
                path:this.link,
                query:{
                    'writerId':this.writerId
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
.cellVav .vux-label {
    width: 100%!important;
    align-items: center;
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
    position: absolute;
    right: 10%;
}
</style>
