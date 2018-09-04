<template>
   <div class="expectedDateCt">
      <div  id="userPredicted" class="userPredicted">
         <div>
            <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
            <div class="userPredictedHead">设置预产期</div>
            <div class="userPredictedText">不同怀孕阶段，孕妇每日所需的能量和营养不一样哦</div>
            <div class="userPredictedText">准确的信息可以给你推荐精准的能量餐单</div>
            <div class="setPredicted">
               <div>预产期</div>
               <div :class="className" @click="dd" v-html="dateDt"></div>
             </div>
            <button @click="nextBtn" ref="example" id="predictedBtn" :class="btnBg">下一步</button>
         </div>
      </div>
   </div>
</template>
<script>
    import {setSession,goHistoryBc,clearPiker} from '../../../common/js/commonAler'
   export default {
          data() {
              return {
                  isShowChecked:false,
                  picker:null,
                  btnBg:'predicted',
                  dateDt:"请选择",
                  className:"expectedDate",
                  hisBack:"返回"
               }
          },
          beforeCreate(){
              setSession(this)
              clearPiker()
          },
          methods:{
              nextBtn:function () {
                  let _this = this;
                  if(this.btnBg != 'pregnantChecked')return;
                  axios.post('customization/dueDate', {
                      "_token": procreateStatus["_token"],
                      "date":_this.dateDt
                  })
                      .then(function (data) {
                          _this.$router.push('basic')
                      })
                      .catch(function (error) {
                          _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                      })
              },
              dd:function () {
                      let today = new Date();
                      let year = [];
                      let initYear = [];
                      let month = [];
                      let days = [];
                      let day = [];
                      let _this = this;
                      var date = new Date();
                      date.setDate(date.getDate()+280-1);
                      var distance = [date.getFullYear(),(date.getMonth()+1),date.getDate()]
                      let initMouth = [];
                      for(var i = 1; i <=12  ; i++) {
                          initMouth.push(i + "月");
                      }
                      for(var i = 0; i <2 ; i++){
                          initYear.push(i + today.getFullYear()+"年");
                      }
                      for(var i = today.getMonth()+1; i <=12  ; i++) {
                          month.push(i + "月");
                      }
                      for(var i = today.getDate(); i <= (new Date(today.getFullYear(),today.getMonth(),0)).getDate() ; i++){
                          days.push(i+"日");
                      }
                  clearPiker();
                  this.$store.state.picterObj({
                      cols : [{
                          options: initYear
                      },{
                          options: month
                      },{
                          options: days
                      },],
                      // title:"请选择人员的userId",
                      onOkClick: function (values) {
                          var dtYear = values[0].replace(/[\u4e00-\u9fa5]+/g,'');
                          var dtMouth = values[1].replace(/[\u4e00-\u9fa5]+/g,'');
                          var dtDay = values[2].replace(/[\u4e00-\u9fa5]+/g,'');
                          _this.btnBg = 'pregnantChecked';
                          _this.className = 'expected';
                          _this.dateDt  = dtYear + "-" + (dtMouth*1<10? ("0"+dtMouth):dtMouth)+ "-" +(dtDay*1<10? ("0"+dtDay):dtDay) ;
                      },
                      setValues:(function(data){
                          if(data == "请选择"){
                             return   [today.getFullYear()+"年", today.getMonth() + 1+"月", today.getDate()+"日"]
                          }else {
                              return  [data.split("-")[0] + "年", data.split("-")[1]*1 + "月", data.split("-")[2]*1 + "日"]
                          }
                          })(_this.dateDt),
                      onSelectItem : function (i, index, value) {
                          var years = this.getValue(0);
                          var mouthss = this.getValue(1);
                          var dayDt = this.getValue(2);
                          var disDay = "";
                          if(years == "" || mouthss == ""  || dayDt=="")
                              return
                          var year = years.substring(0, years.length -1);
                          var months = mouthss.substring(0, mouthss.length -1);
                          var dayDts = dayDt.substring(0, dayDt.length -1);
                          months =  months==""?value.substring(0, value.length -1):months
                          disDay = year+"-"+months+"-"+dayDts

                          var curDate = new Date();//
                          var curYear = new Date();
                          var day = [];
                          curDate.setYear(year)
                          curDate.setMonth(months);
                          curDate.setDate(0);//
                          if(year == curYear.getFullYear()){
                              if(months == "1"|| months == (curYear.getMonth()+1)){

                                  this.setOptions(2, days);
                              }else{
                                  for(var i = 1; i <= curDate.getDate() ; i++){
                                      day.push(i+"日");
                                  }
                                  this.setOptions(2, day);
                              }

                              this.setOptions(1, month)
                          }else{
                              if(months==distance[1]){
                                  if(dayDts<=distance[2]){
                                      this.setOptions(1, initMouth);
                                      for(var i = 1; i <= curDate.getDate() ; i++){
                                          day.push(i+"日");
                                      }
                                      this.setOptions(2, day);
                                  }else{
                                      this.setOptions(1, initMouth);
                                      for(var i = 1; i <= curDate.getDate() ; i++){
                                          day.push(i+"日");
                                      }
                                      this.setOptions(2, day,distance[2]+"日");
                                  }
                              }else if(months<distance[1]){
                                  this.setOptions(1, initMouth);
                                  for(var i = 1; i <= curDate.getDate() ; i++){
                                      day.push(i+"日");
                                  }
                                  this.setOptions(2, day);
                              }else{
                                  this.setOptions(1, initMouth,distance[1]+"月");
                                  for(var i = 1; i <= curDate.getDate() ; i++){
                                      day.push(i+"日");
                                  }
                                  this.setOptions(2, day,distance[2]+"日");
                              }

                          }
                      }
                  },"expectedDate")
                  procreateStatus.pinkers["expectedDate"].show();
              },
              historyBack:function () {
                  goHistoryBc(this)
              }
          },
          watch:{

          },
}
</script>
