<template>
  <div :class="style.pageContain">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">

import Style from './index.less'

export default {
  data() {
    return {
        style:Style
    }
  },
  created() {

  },
  components: {
    // 'v-header': header
  }
}

</script>
