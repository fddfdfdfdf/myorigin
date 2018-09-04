<template>
  <div id="userTaste"   class="userTaste">
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div>
      <div class="userPredictedHead" id="onlyTaste" v-html="title"></div>
      <div class="userPredictedText">孕期妈妈的味觉比普通人更加敏感</div>
      <div class="userPredictedText">孕吐成为很多妈妈烦恼的问题</div>
      <div class="userPredictedText">避免因食欲不振影响营养摄入的方法是</div>
      <div class="userPredictedText">适当调整烹饪手法</div>
      <ul id="userTastes" class="chronicDiseaseOptions">
        <li @click="whichDiease(index)" v-for="(item,index) in diseaseList" :class="item.isClick" v-html="item['c_name']"></li>
      </ul>
      <button @click="nextBtn" id="tasteNext" :class="chronicDiseasenext+' '+initClass">下一步</button>
      <button @click="drumpBtn" id="tasteDrump" class="chronicDiseasedrump">跳过</button>
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
                initClass:"disBtn",
                hisBack:"返回",
                title:(()=>{
                    if(this.$store.state.isChannel == 1){
                        return '设置孕期口味'
                     }else{
                        return '设置哺乳期口味'
                     }
            })(this)
            }
        },
        beforeCreate(){
            setSession(this)
            clearPiker()
            let _this = this;
            axios.get('customization/diet', {
                "_token": procreateStatus["_token"]
            })
                .then(function (data) {
                    _this.$nextTick(() => {
                        _this.diseaseList = data.data.diet.map((val,index)=>{
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
                axios.post('customization/diet', reqData)
                    .then(function (data) {
                        _this.$store.state.alertDiv(data.data.message[0])
                        _this.$router.push('loginSuccess')
                    })
                    .catch(function (error) {
                        _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                    })
            },
            drumpBtn:function(){
                this.$router.push('loginSuccess')
            },
        },
        components: {
            // 'v-header': header
        }
    }

</script>
