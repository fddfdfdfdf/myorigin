<template>
<div :class="style.pageHead">
     <div @click="goSet" :class="style.prenageBtn">
         更改设置
     </div>
     <!--<div v-show="titleData.status" :class="style.prenageEd">-->
          <!--<div :class="style.prenageMenu">孕期餐单</div>-->
          <!--<div :class="style.prenageMenuTitle">营养餐单</div>-->
          <!--<div :class="style.prenageDymic">-->
               <!--<span>遵循中国权威数据标准定制</span>-->
               <!--<span @click="showDt" :class="style.dt">!</span>-->
               <!--<div :class="style.dtLine"></div>-->
               <!--<div v-show="isShow" :class="style.alertDt">-->
                    <!--<div :class="style.triangleup"></div>-->
                    <!--<div :class="style.triangleCt">-->
                         <!--<div :class="style.alertDtHead">所有配餐方案基于您的个性化设置，结合以下专著的研究成果，由“孕小二”为您私人订制生成</div>-->
                         <!--<div :class="style.alertDtCt">【1】中国营养学会、中国居民膳食指南，北京、人民出版社，2014</div>-->
                         <!--<div :class="style.alertDtCt">【2】中国营养学会科学全书，葛可佑，北京，人民出版社，2004</div>-->
                    <!--</div>-->
               <!--</div>-->
          <!--</div>-->
     <!--</div>-->
     <div v-show="titleData.status">
          <div :class="style.prenageMenu">孕期餐单</div>
          <div :class="style.prenageMenuTitle" v-html="titleData.dtSync"></div>
          <div :class="style.prenageDymic">
               <span v-html="titleData.dtTime"></span>
               <div :class="style.dtLine"></div>
          </div>
          <div :class="style.prenageRule">
               <div>Tips:</div>
               <div>除了本餐单食物的供给，您今天还需额外补充维生素C25.33mg、维生素B1 0.53mg、锌 0.39mg</div>
               <div>根据新版《孕期妇女膳食指南》，您需再补充叶酸0.4mg/天</div>
          </div>
     </div>
     <div v-show="!titleData.status">
          <div :class="style.prenageMenu">哺乳期餐单</div>
          <div :class="style.prenageMenuTitle" v-html="titleData.dtSync"></div>
          <div :class="style.prenageDymic">
               <span v-html="titleData.dtTime"></span>
               <div :class="style.dtLine"></div>
          </div>
          <div :class="style.prenageRule">
               <div>Tips:</div>
               <div>除了本餐单食物的供给，您今天还需额外补充维生素C25.33mg、维生素B1 0.53mg、锌 0.39mg</div>
               <div>根据新版《孕期妇女膳食指南》，您需再补充叶酸0.4mg/天</div>
          </div>
     </div>
 </div>
</template>

<script>
  import Style from "./Head.less"
  export default{
      data(){
          return{
              style:Style,
              isShow:false
          }
      },
      methods:{
          showDt:function () {
              this.isShow = !this.isShow;
          },
          goSet:function () {
             window.location.href =  axios.default.baseUrl +"customization/welcome#/lifestages"
          }
      },
      created(){

      },
      props:['titleData']
  }
</script>
