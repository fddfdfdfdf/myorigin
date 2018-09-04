<template>
     <div>
          <div v-show="titleData.status" :class="style.pregRule">
               <div>
                    <div>所有配餐方案基于您的个性化设置，结合以下专著的研究成果，由“孕小二”为您私人订制生成</div>
                    <div :class="style.pregRuleDt">【1】中国营养学会、中国居民膳食指南，北京、人民出版社，2014</div>
                    <div :class="style.pregRuleDt">【2】中国营养学会科学全书，葛可佑，北京，人民出版社， 2004</div>
                    <div :class="style.pregRuleBt">该服务由“孕小二”提供</div>
               </div>
          </div>
          <div v-show="!titleData.status" :class="style.pregRule">
               <div>
                    <div>所有配餐方案基于您的个性化设置，结合以下专著的研究成果，由“孕小二”为您私人订制生成</div>
                    <div :class="style.pregRuleDt">【1】中国营养学会、中国居民膳食指南，北京、人民出版社，2014</div>
                    <div :class="style.pregRuleDt">【2】中国营养学会科学全书，葛可佑，北京，人民出版社，2004</div>
                    <div :class="style.pregRuleBts">
                         <img :src="((baseUrl)=>baseUrl+'images/appmenu/appHead.png')(baseUrl)" alt="">
                         <div>以上服务均有孕小二提供，更多孕期、哺乳期、宝宝 餐单采购建议烹饪方法等请在孕小二app查询</div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
  import Style from "./Footer.less"
  export default{
      data(){
          return{
              style:Style,
              baseUrl:axios.default.baseUrl
          }
      },
      props:['titleData']
  }
</script>
