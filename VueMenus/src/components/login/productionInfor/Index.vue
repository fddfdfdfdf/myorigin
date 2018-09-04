<template>
  <div class="procreateInforc">
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div id="procreateInfor"  class="procreateInfor">
      <div class="bodyContain">
        <div class="bodyInforHead">设置生育信息</div>
        <div class="bodyInforHeadInfor">
          <div>目前我们只提供产后五年哺乳期的</div>
          <div>妈妈营养餐单和宝宝营养餐单定制哦～</div>
        </div>
        <div class="bodyName bodyDtInfor" @click="dd('date')">
          <div>出生日期</div>
          <div  v-html="dateDt" :class="classNameDate"></div>
        </div>
        <div class="bodyBirthdy bodyDtInfor" @click="dd('type')">
          <div>出生方式</div>
          <div v-html="type" :class="classNameType" ></div>
        </div>
        <button id="procreateNext" @click="nextBtn" :class="isNext">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>

    import {setSession,goHistoryBc,clearPiker} from '../../../common/js/commonAler'
    export default {
        data() {
            return {
                isNext:"disable",
                hisBack:"返回",
                isShowChecked:false,
                classNameDate:'expectedDate',
                classNameType:'expectedDate',
                type:"请选择",
                dateDt:"请选择",
                day4:"",
                comt:"",
                comtDt:"",
                bodyWeight:'',
                btnBg:'predicted'
        }
        },
        beforeCreate(){
            setSession(this)
            clearPiker()
        },

        created() {

        },
        methods:{
            historyBack:function () {
                goHistoryBc(this)
            },
            dd:function (state) {
                let _this = this;
                clearPiker();
                switch (state){
                    case "date":
                        let today = new Date();
                        let year = [];
                        let month = [];
                        let days = [];
                        let initMouth = [];
                        for(var i = 1; i <=12  ; i++) {
                            initMouth.push(i + "月");
                        }
                        for(var i = 0; i < 5; i++){
                            year.push( today.getFullYear()-i+"年");
                        }
                        for(var i =1 ; i <=today.getMonth()+1  ; i++) {
                            month.push(i + "月");
                        }
                        for(var i = 1; i <= today.getDate() ; i++){
                            days.push(i+"日");
                        }
                        this.$store.state.picterObj({
                            cols : [{
                                options: year
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
                                _this.classNameDate = 'expected';
                                _this.dateDt  = dtYear + "-" + (dtMouth*1<10? ("0"+dtMouth):dtMouth)+ "-" +(dtDay*1<10? ("0"+dtDay):dtDay) ;
                                if(_this.dateDt !="请选择" && _this.type !="请选择"){
                                    _this.isNext = "";
                                }else{
                                    _this.isNext = "disable";
                                }

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
                                if(i != 2){
                                    var year = years.substring(0, years.length -1);
                                    var months = mouthss.substring(0, mouthss.length -1);

                                    months =  months==""?value.substring(0, value.length -1):months
                                    if(year == "" || month == "" )
                                        return
                                    var curDate = new Date();//
                                    var curYear = new Date();
                                    var day = [];
                                    curDate.setYear(year)
                                    curDate.setMonth(months);
                                    curDate.setDate(0);
                                    if(year == curYear.getFullYear()){

                                        this.setOptions(1, month);
                                        if(months == (curYear.getMonth()+1)){

                                            this.setOptions(2, days);
                                        }else{
                                            for(var i = 1; i <= curDate.getDate() ; i++){
                                                day.push(i+"日");
                                            }
                                            this.setOptions(2, day);
                                        }
                                    }else{
                                        var year = years.substring(0, years.length -1);
                                        var months = mouthss.substring(0, mouthss.length -1);
                                        var daydd = this.getValue(2);
                                        if(getLastYearYestdy[1] == months){
                                            this.setOptions(1, initMouth);
                                            for(var i = 1; i <= curDate.getDate() ; i++){
                                                day.push(i+"日");
                                            }
                                            if(daydd.substring(0, daydd -1)>getLastYearYestdy[2]){
                                                this.setOptions(2, day);
                                            }else{
                                                this.setOptions(2, day,getLastYearYestdy[2]+"日");
                                            }
                                        }else if(getLastYearYestdy[1]< months){
                                            this.setOptions(1, initMouth);
                                            for(var i = 1; i <= curDate.getDate() ; i++){
                                                day.push(i+"日");
                                            }
                                            this.setOptions(2, day);
                                        }else{
                                            this.setOptions(1, initMouth,getLastYearYestdy[1]+"月");
                                            for(var i = 1; i <= curDate.getDate() ; i++){
                                                day.push(i+"日");
                                            }
                                            this.setOptions(2, day,getLastYearYestdy[2]+"日");
                                        }

                                    }

                                }else{
                                    var dtDays =  getLastYearYestdy(new Date());
                                    var curDate = new Date();
                                    var mouth = [];
                                    var days = [];
                                    if(this.getValue(0).replace(/[\u4e00-\u9fa5]+/g,'')!=curDate.getFullYear()){
                                        curDate.setYear(this.getValue(0).replace(/[\u4e00-\u9fa5]+/g,''));
                                        curDate.setMonth(this.getValue(1).replace(/[\u4e00-\u9fa5]+/g,''));curDate.setDate(0);
                                        for(var t=1;t<=curDate.getDate();t++){days.push(t+"日");};
                                        for(var t=1;t<=12;t++){mouth.push(t+"月");}
                                        if(this.getValue(2).replace(/[\u4e00-\u9fa5]+/g,'')*1>=dtDays[2]){
                                            this.setOptions(1,mouth);
                                            this.setOptions(2,days);
                                        }else{
                                            this.setOptions(1,mouth,dtDays[1]+"月");
                                            this.setOptions(2,days,dtDays[2]+"日");}
                                    }else{
                                        return false;
                                    }
                                }

                            }
                        },"productionInforDate")
                        procreateStatus.pinkers["productionInforDate"].show();
                        break;
                    case "type":
                       this.$store.state.picterObj({
                            cols : [{
                                options: ["顺产","剖腹产"]
                            }],
                            // title:"请选择人员的userId",
                           setValues:[_this.type=="请选择"?"":_this.type],
                            onOkClick: function (values) {
                                var dtYear = values[0];
                                _this.type = dtYear;
                                _this.btnBg = 'pregnantChecked';
                                _this.classNameType = 'expected';
                                if(_this.dateDt !="请选择" && _this.type !="请选择"){
                                    _this.isNext = "";
                                }else{
                                    _this.isNext = "disable";
                                }
                            }
                        },"productionInforType")
                        procreateStatus.pinkers["productionInforType"].show();
                        break;
                }
            },
            nextBtn:function () {
                let _this = this;
                if(this.isNext == 'disable')return;
                axios.post('customization/birth', {
                    "_token": procreateStatus["_token"],
                    "date":_this.dateDt,
                    "way":(function(way){if(way=="顺产"){return 0}else{return 1}})(_this.type)
                })
                    .then(function (data) {
                       // _this.$store.state.alertDiv(data.data.message[0])
                        _this.$router.push('postpartumInfor')
                    })
                    .catch(function (error) {
                        _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
                    })
            }
        },
        watch:{
        },
        components: {
            // 'v-header': header
        }
    }

</script>
