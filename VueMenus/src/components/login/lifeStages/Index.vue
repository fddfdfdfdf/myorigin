<template>
  <div id="lifeStatus" class="lifeStatus">
    <div>
      <div class="lifeStatusHead">请先选择人生阶段</div>
      <div  class="lifePregnant" @click="lifeStatusChecked(1)">
        <img v-if="isFirstClick" id="pregnant" :src="((baseUrl)=>baseUrl+'images/appmenu/pregnant.png')(baseUrl)" alt="">
        <img v-if="!isFirstClick"  :src="((baseUrl)=>baseUrl+'images/appmenu/pregnantCheched.png')(baseUrl)" alt="">
        <div class="pregnantTitle">怀孕</div>
        <div class="pregnantText">如果宝宝没出生请选择“怀孕”</div>
      </div>
      <div class="lifePregnant" @click="lifeStatusChecked(2)">
        <img v-if="isSecondClick" id="millk" :src="((baseUrl)=>baseUrl+'images/appmenu/millk.png')(baseUrl)"  alt="">
        <img  v-if="!isSecondClick" :src="((baseUrl)=>baseUrl+'images/appmenu/millkChecked.png')(baseUrl)"  alt="">
        <div class="pregnantTitle">哺乳</div>
        <div class="pregnantText">如果宝宝已出生请选择“哺乳”</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setSession,clearPiker} from '../../../common/js/commonAler'
  export default {
  data() {
    return {
        baseUrl:axios.default.baseUrl,
        isFirstClick:true,
        isSecondClick:true,
        isCheckedTrue:false,
    }
  },
  beforeCreate(){
      setSession(this)
      clearPiker()
  },
  created() {

  },
 methods:{
     lifeStatusChecked:function (status){
           var _this = this;
           var _isCheckedTrue = this.isCheckedTrue;
           if(_isCheckedTrue)return;
           this.isCheckedTrue =  true;
           if(status == 1){
                   this.isFirstClick = false;
                   this.isSecondClick = true;
                   axios.post('customization/stage', {
                       "_token": procreateStatus["_token"],
                       "stage":1
                   })
                       .then(function (data) {
                           _this.$router.push('expectedDate');
                           _this.$store.dispatch('isChannel', 1)
                           _this.isCheckedTrue =  false;
                           _this.$store.state.alertDiv(data.data.message[0])
                       })
                       .catch(function (error) {
                           _this.isCheckedTrue =  false;
                           _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                       })
           }else{
               this.isSecondClick = false;
               this.isFirstClick = true;
               axios.post('customization/stage', {
                   "_token": procreateStatus["_token"],
                   "stage":2
               })
                   .then(function (data) {
                       _this.$router.push('productionInfor');
                       _this.$store.dispatch('isChannel', 2);
                       _this.isCheckedTrue =  false;
                       // _this.$store.state.alertDiv(data.data.message[0])
                   })
                   .catch(function (error) {
                       _this.isCheckedTrue =  false;
                       _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                   })
           }
      }
 },
  components: {
    // 'v-header': header
  }
}
</script>
