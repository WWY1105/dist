<template>
<div id="commonProblem">
    <div class="eachProblem" v-for="item,index in problemList">
        <p class="title bgW">{{item.id}}、{{item.title}}?</p>
        <p class="content bgW">{{item.content}}</p>
    </div>
    <!-- <div class="eachProblem">
        <p class="title bgW">2、在线预订有什么好外?</p>
    </div>
    <div class="eachProblem">
        <p class="title bgW">3、如何取消订单?</p>
    </div>
    <div class="eachProblem">
        <p class="title bgW">4、如何评价商品?</p>
    </div>
    <div class="eachProblem">
        <p class="title bgW">5、什么时候可以下单?</p>
    </div>
    <div class="eachProblem">
        <p class="title bgW">6、如何查询订单状态?</p>
    </div>
    <div class="eachProblem">
        <p class="title bgW">7、如何查询我的订单是否取消成功?</p>
    </div>
    <div class="eachProblem">
        <p class="title bgW">8、没有点击取消订单，订单为何取消了?</p>
    </div> -->

</div>
</template>

<script>
export default {
    data() {
        return {
            problemList: []
        }
    },
    mounted() {
        this.getProblem()
    },
    methods: {
        getProblem() {
            var that = this;
            var baseUrl = this.$store.state.baseUrl;
            that.$http('get', baseUrl + 'api/CommonProblem/List', {}).then(function (res) {
                console.log("系统消息")
                that.problemList = res.data.data;
            })
        }
    }
}
</script>

<style scoped>
#commonProblem .eachProblem{
        margin-bottom: 5px;
}

#commonProblem .eachProblem .title {
    padding: 10px 13px;
    color: #000000;
    font-size: 14px;
}

#commonProblem .eachProblem .content {
    padding: 10px 13px;
    color: #999;
    font-size: 12px;
    padding-left: 31px;
}
</style>
