<template>
  <div id="setSuccess" class="setSuccess">
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div>
      <div class="setSuccessTitle">孕小二已收到您的定制信息</div>
      <div class="setSuccessTitle">    孕期餐单正在生成中...</div>
      <img :src="((baseUrl)=>baseUrl+'images/appmenu/cake.png')(baseUrl)"  alt="">
      <button @click="setSuccess" id="setSuccessBtn" class="setSuccessBtn">点击查看已生成餐单</button>
    </div>
  </div>
</template>

<script>
    import {clearSession,goHistoryBc,clearPiker} from '../../../common/js/commonAler'
export default {
  data() {
    return {
        baseUrl:axios.default.baseUrl,
        hisBack:"返回",
    }
  },
  created() {
      clearSession()
      clearPiker()
  },
    methods:{
        historyBack:function () {
            goHistoryBc(this)
        },
        setSuccess:function () {
           window.location.href =  this.baseUrl +"customization/menu/pregnancy"
        }
    },
  components: {
    // 'v-header': header
  }
}

</script>
