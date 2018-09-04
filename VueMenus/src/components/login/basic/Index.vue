<template>
  <div>
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div  id="userAgeHW"  class="userAgeHW">
      <div>
        <div class="userPredictedHead">设置年龄、身高和孕前体重</div>
        <div class="userPredictedText">不同年龄的孕妈妈根据怀孕前体重的不同</div>
        <div class="userPredictedText">孕期增重的标准会有所不同</div>
        <div class="userPredictedText">每日所需的食物能量也随之发生细微变化</div>
        <div @click="checkedClick('age')" class="setPredicted firstSetPredicted">
          <div>年龄</div>
          <div v-html="age" :class="classNameAge"></div>
        </div>
        <div @click="checkedClick('height')" class="setPredicted">
          <div>身高</div>
          <div v-html="height" :class="classNameHeight"></div>
        </div>
        <div @click="checkedClick('weight')" class="setPredicted">
          <div>孕前体重</div>
          <div v-html="weight" :class="classNameWeight"></div>
        </div>
        <button @click="nextBtn" id="userHW" :class="btnBg">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import {setSession,goHistoryBc,clearPiker} from '../../../common/js/commonAler'
export default {
  data() {
    return {
        classNameAge:'expectedDate',
        classNameHeight:'expectedDate',
        classNameWeight:'expectedDate',
        hisBack:"返回",
        age: '请选择',
        height:'请选择',
        weight:'请选择',
        comtDtAge:"",
        picker1:null,
        picker2:null,
        picker2:null,
        currenAge:"",
        currentHeight:"",
        currentWeight:"",
        currentEle:"",
        btnBg:"predicted" //pregnantChecked
    }
  },

  created() {

  },
    beforeCreate(){
        setSession(this)
        clearPiker();
    },
  methods:{
      historyBack:function () {
          goHistoryBc(this)
      },
     checkedClick:function(state){
         let initMouth = [];
         let initHeight = [];
         let initWeight = [];
         let _this = this;
         for(var i = 19; i <=60  ; i++) {
             initMouth.push(i);
         }
         for(var i = 120; i <=210  ; i++) {
             initHeight.push(i);
         }
         for(var i = 30; i <=120  ; i++) {
             initWeight.push(i);
         }
         clearPiker();
         switch (state){
             case "age":
                 console.log('d')
               this.$store.state.picterObj({
                     cols : [{
                         options:initMouth
                     }],
                     title:"请选择年龄",
                     setValues:[_this.age=="请选择"?"":_this.age],
                     onOkClick: function (values) {
                         var age = values
                         _this.age = age[0];
                         _this.classNameAge = 'expected';
                         if(_this.age!="请选择"&& _this.height!="请选择"&& _this.weight!="请选择"){
                             _this.btnBg = "pregnantChecked"
                         }
                     }
                 },"basicAge")
                 procreateStatus.pinkers["basicAge"].show();
                 break;
             case "height":
                 this.$store.state.picterObj({
                     cols : [{
                         options:initHeight
                     }],
                     title:"请选择身高 (cm)",
                     setValues:[_this.height=="请选择"?"":_this.height],
                     onOkClick: function (values) {
                         var age = values
                         _this.height = age[0]+"cm";
                         _this.classNameHeight = 'expected';
                         if(_this.age!="请选择"&& _this.height!="请选择"&& _this.weight!="请选择"){
                             _this.btnBg = "pregnantChecked"
                         }
                     }
                 },"basicHeight")
                 procreateStatus.pinkers["basicHeight"].show();
                 break;
             case "weight":
                  this.$store.state.picterObj({
                     cols : [{
                         options:initWeight
                     }],
                     title:"请选择孕前体重 (kg)",
                      setValues:[_this.weight=="请选择"?"":_this.weight],
                     onOkClick: function (values) {
                         var age = values
                         _this.weight = age[0]+"kg";
                         _this.classNameWeight = 'expected';
                         if(_this.age!="请选择"&& _this.height!="请选择"&& _this.weight!="请选择"){
                             _this.btnBg = "pregnantChecked"
                         }
                     }
                 },"basicWeight")
                  procreateStatus.pinkers["basicWeight"].show();
                 break;
         }
     },
     nextBtn:function(){
          if(this.btnBg != 'pregnantChecked'){
              this.$store.state.alertDiv = "请设置您的信息"
              return;
          }
          let _this = this;
          axios.post('customization/basic', {
              "_token": procreateStatus["_token"],
              "age":_this.age,
              "height":_this.height.replace(/cm$/g,''),
              "weight":_this.weight.replace(/kg$/g,'')
          })
              .then(function (data) {
                  // _this.$store.state.alertDiv(data.data.message[0])
                  _this.$router.push('disease')
              })
              .catch(function (error) {
                  _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
              })
     }
  },
  components: {
    // 'v-header': header
  }
}

</script>
