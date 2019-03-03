<template>
<div id="myFallow">
    <router-link :to="{path:'/writerDetail',query:{'writerId':item.id}}" v-for="item,index in writerList">
        <writers :imgurl="item.imgurl"
        :shortName="item.nickname"></writers>
    </router-link>
</div>
</template>

<script>
import writers from '@/components/writer/writer'
export default {
    components: {
        writers
    },
    data() {
        return {
            currentPage: '1',
            writerList: []
        }
    },
    mounted(){
        this.getFellowList()
    },
    methods: {
        //  获取我的关注列表
        // getFellowList() {
        //     var that = this;
        //     var baseUrl = that.$store.state.baseUrl;
        //     that
        //         .$http("get", baseUrl + "api/Circle/MyFollow/Page", {
        //             uid: that.$store.state.uid,
        //             currentPage: that.currentPage
        //         })
        //         .then(function (res) {
        //             if (res.data.code == '00') {
        //                 that.writerList = res.data.data
        //             } else {
        //                 AlertModule.show({
        //                     title: res.data.msg
        //                 });
        //             }
        //         });
        // }
         getFellowList() {
            var that = this;
            var baseUrl = that.$store.state.baseUrl;
            that
                .$http("get", baseUrl + "api/UserFollowing/List", {
                    uid: that.$store.state.uid
                })
                .then(function (res) {
                    if (res.data.code == '00') {
                        var result=res.data.data;
                        var resultArr=[];
                        for(var i in result){
                            resultArr.push(result[i].followingUser)
                        }
                        console.log(resultArr)
                        that.writerList = resultArr;
                    } else {
                        AlertModule.show({
                            title: res.data.msg
                        });
                    }
                });
        }
    }
}
</script>

<style scoped>
#myFallow .reacResult {
    margin-top: 0;
}
</style>
