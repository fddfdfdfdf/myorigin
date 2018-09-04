<template>
  <div :class="style.overTime">
          <div>
               <div :class="style.overTimeHead">您的餐单定制服务已结束</div>
               <div :class="style.overTimeHeadSub">可以重新设置身份开始定制哦～</div>
               <button @click="goLifeStatus">开始</button>
               <div :class="style.overTimeDt">
                 <div>
                   您的更多营养建议、采购建议、宝宝餐单、烹饪方式和食材查询请下载孕小二APP查询
                 </div>
                 </div>
          </div>
    </div>
</template>

<script type="text/javascript">
import header from '../../../common/Head/Head'
import axios from 'axios'
import Style from '../../Index/index.less'

export default {
  data() {
    return {
        style:Style
    }
  },
  created() {

  },
    methods:{
        goLifeStatus:function () {
           window.location.href =  axios.default.baseUrl +"customization/welcome#/lifeStages"
        }
    },
  components: {
    'v-header': header
  }
}

</script>
