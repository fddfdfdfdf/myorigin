<template>
  <div  id="macerate"  class="macerate">
    <div>
      <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
      <div class="userPredictedHead">设置易敏食材</div>
      <div class="userPredictedText">如果不存在不可抗拒的过敏食材</div>
      <div class="userPredictedText">建议妈妈要全面补充营养</div>
      <div class="userPredictedText">不要因个人喜好而偏食哦</div>
      <ul id="userMacerate" class="chronicDiseaseOptions">
        <li @click="whichDiease(index)" v-for="(item,index) in diseaseList" :class="item.isClick" v-html="item['c_name']"></li>
      </ul>
      <button @click="nextBtn" id="macerateNext"  :class="chronicDiseasenext+' '+initClass">下一步</button>
      <button @click="drumpBtn" id="macerateDrump" class="chronicDiseasedrump">跳过</button>
    </div>
  </div>
</template>

<script>
    import {setSession,goHistoryBc,clearPiker} from '../../../common/js/commonAler'
    export default {
        data() {
            return {
                diseaseList:[],
                chronicDiseasenext:"chronicDiseasenext",
                hisBack:"返回",
                initClass:"disBtn"//
            }
        },
        beforeCreate(){
            setSession(this)
            clearPiker();
            let _this = this;
            axios.get('customization/allergy', {
                "_token": procreateStatus["_token"]
            })
                .then(function (data) {
                    _this.$nextTick(() => {
                        _this.diseaseList = data.data.allergy.map((val,index)=>{
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
                let _this = this;
                let reqData = {"_token": procreateStatus["_token"]};
                if( _this.initClass == "disBtn")return;
                this.diseaseList.map((val,index)=>{
                   if(val[val.name] == 1){
                        reqData[val.name] = 1
                    }else{
                        reqData[val.name] = 0
                    }
            })
                axios.post('customization/allergy', reqData)
                    .then(function (data) {
                         // _this.$store.state.alertDiv(data.data.message[0])
                         _this.$router.push('diet')
                    })
                    .catch(function (error) {
                        _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                    })
            },
            drumpBtn:function(){
                this.$router.push('diet')
            },
        },
        components: {
            // 'v-header': header
        }
    }

</script>
