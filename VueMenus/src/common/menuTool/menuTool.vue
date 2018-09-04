<template>
 <div :class="style.menuTool">
      <div :class="style.menuToolTitle">餐具标准</div>
      <img :src="((baseUrl)=>baseUrl+'images/tableWare/dishPopPlate@3x.png')(baseUrl)"  alt="">
      <img :src="((baseUrl)=>baseUrl+'images/tableWare/dishPopBowl@3x.png')(baseUrl)"  alt="">
      <img :src="((baseUrl)=>baseUrl+'images/tableWare/dishPopSubPlate@3x.png')(baseUrl)"  alt="">
      <img :src="((baseUrl)=>baseUrl+'images/tableWare/dishPopBreakfast@3x.png')(baseUrl)"  alt="">
 </div>
</template>

<script>
  import Style from "./menuTool.less"
  export default{
      data(){
          return{
              style:Style,
              baseUrl:axios.default.baseUrl
          }
      }
  }
</script>
