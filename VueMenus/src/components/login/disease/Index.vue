<template>
  <div  id="chronicDisease"  class="chronicDisease">
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div>
      <div class="userPredictedHead">设置妈妈慢性病史</div>
      <div class="userPredictedText">孕期妈妈因为怀孕期间身体更加敏感</div>
      <div class="userPredictedText">长期的饮食习惯、作息和环境压力更容易导致妊娠</div>
      <div class="userPredictedText">糖尿病、妊娠高血压以及缺铁性贫血等症状</div>
      <div class="userPredictedText">尤其已经存在病史的妈妈</div>
      <ul id="userDiseaseStatus" class="chronicDiseaseOptions">
        <li @click="whichDiease(index)" v-for="(item,index) in diseaseList" :class="item.isClick" v-html="item['c_name']"></li>
      </ul>
      <button @click="nextBtn" id="chronicDiseaseNext" :class="chronicDiseasenext+' '+initClass">下一步</button>
      <button @click="drumpBtn" id="chronicDiseaseDrump" class="chronicDiseasedrump">跳过</button>
    </div>
  </div>
</template>

<script>
    import {setSession,goHistoryBc,clearPiker} from '../../../common/js/commonAler'
export default {
  data() {
    return {
        diseaseList:[],
        hisBack:"返回",
        chronicDiseasenext:"chronicDiseasenext",
        initClass:"disBtn"
    }
  },
  beforeCreate(){
      setSession(this)
      clearPiker()
      let _this = this;
      axios.get('customization/disease', {
          "_token": procreateStatus["_token"]
      })
          .then(function (data) {
              _this.$nextTick(() => {
                  _this.diseaseList = data.data.disease.map((val,index)=>{
                      val[val.name] = 0;
                      val.isClick = "";
                      return val//
                  })
              })
              // _this.$store.state.alertDiv(data.data.message[0])
              // _this.$router.push('disease')
          })
          .catch(function (error) {
              _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
          })
  },
  created() {

  },
    methods:{
        historyBack:function () {
            goHistoryBc(this)
        },
        whichDiease:function (index) {
            let start = 0;
            let lens = this.diseaseList.length;
            this.diseaseList = this.diseaseList.map((val,ind)=>{
              if(ind == index){
                  if(val.isClick == "checkedLi"){
                      val[val.name] = 0;
                      val.isClick = "";
                      return val;
                  }else{
                      val[val.name] = 1;
                      val.isClick = "checkedLi";
                      return val;
                  }


            }else{
                return val;
            }
           })
            this.diseaseList.map((value,index)=>{
                start += value[value.name];
            if(index == (lens-1)){
                if(start>=1){
                    this.initClass = "ableBtn"
                }else{
                    this.initClass = "disBtn"
                }
            }
        })
        },
        nextBtn:function(){
            let isClick = 0 ;
            let isHasOnly = false;
            let _this = this;
            let reqData = {"_token": procreateStatus["_token"]};
            if( _this.initClass == "disBtn")return;
            this.diseaseList.map((val,index)=>{
                isClick += val[val.name];
                if(val[val.name] == 1){
                    if(val.diabetes == 1){
                        isHasOnly = true
                        reqData[val.name] = 1
                    }else{
                        reqData[val.name] = 1
                    }
                 }else{
                  reqData[val.name] = 0
                }
            })
            axios.post('customization/disease', reqData)
                .then(function (data) {
                    _this.$store.state.alertDiv(data.data.message[0])
                    if(isHasOnly){
                        _this.$router.push('loginSuccess')
                    }else{
                        _this.$router.push('allergy')
                    }

                })
                .catch(function (error) {
                    _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                })
        },
        drumpBtn:function(){
            this.$router.push('allergy')
        },
    },
  components: {
    // 'v-header': header
  }
}

</script>
