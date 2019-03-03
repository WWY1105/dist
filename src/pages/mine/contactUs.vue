<template>
<div id="contactUs" class="flexCenter bgW">
    <div class="pic ">
        <img src="../../assets/img/Telephone@2x.png" class="topPic" alt="">
        <p> 书商热线：<a  class="mainText"  type="tel">400 800 2421</a> </p>
        <p> 作者热线：<a  class="mainText"  type="tel">400 800 2422</a> </p>
        <p> 投诉热线：<a  class="mainText"  type="tel">400 800 2423</a></p>
    </div>
    <div class="pic">
        <img src="../../assets/img/wx@2x.png" class="bottomPic" alt="">
        <p>微信客服：132 1421 4123</p>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
#contactUs {
    padding-top: 56px;
    height: 100%;
    width: 100%;
    align-items: center;
    text-align: center;
}

#contactUs .pic img {
    width: 90px;
    height: 90px;
}
#contactUs .pic p{
    line-height: 33px;
}
#contactUs .pic input{
    border: none;
    text-align: right;
    width: 81px;
}
#contactUs .pic input::placeholder{
    color:#263A7A;

}
#contactUs .pic .topPic {
    margin-bottom: 23px;
}

#contactUs .pic .bottomPic {
    margin-bottom: 33px;
    margin-top: 50px;
}
</style>
