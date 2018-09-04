<template>
  <div>
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div id = "postpartumInfor" class="postpartumInfor">
      <div class="bodyContain">
        <div class="bodyInforHead">设置妈妈产后信息</div>
        <div class="bodyInforHeadInfor">
          <div>以下信息都会影响您的餐单建议</div>
          <div>更好的营养摄入，才能获得优质的母乳喂养哦</div>
        </div>
        <div class="bodyName bodyDtInfor" @click="showCheckedStatus('age')">
          <div>年龄</div>
          <div  v-html="age" :class="classNameDate"></div>
        </div>
        <div class="bodyBirthdy bodyDtInfor" @click="showCheckedStatus('height')">
          <div>身高</div>
          <div  v-html="height" :class="classNameHeight"></div>
        </div>
        <div class="bodyBirthdy bodyDtInfor" @click="showCheckedStatus('weight')">
          <div>当前体重</div>
          <div  v-html="weight" :class="classNameWeight"></div>
        </div>
        <button id="postpartumNext" @click="nextBtn" :class="isNext">下一步</button>
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
                isShowCheckedAge:false,
                isShowCheckedHeight:false,
                classNameDate:'expectedDate',
                classNameHeight:'expectedDate',
                classNameWeight:'expectedDate',
                day1:"",
                comtTitle:"",
                comtDt:"",
                age:"请选择",
                height:"请选择",
                weight:"请选择",
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
            showCheckedStatus:function(state){
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
                        this.$store.state.picterObj({
                            cols : [{
                                options:initMouth
                            }],
                            title:"请选择年龄",
                            setValues:[_this.age=="请选择"?"":_this.age],
                            onOkClick: function (values) {
                                var age = values
                                _this.age = age[0];
                                _this.classNameDate = 'expected';
                                if(_this.age!="请选择"&& _this.height!="请选择"&& _this.weight!="请选择"){
                                    _this.isNext = ""
                                }
                            }
                        },"postpartumInforAge")
                        procreateStatus.pinkers["postpartumInforAge"].show();
                        break;
                    case "height":
                      this.$store.state.picterObj({
                            cols : [{
                                options:initHeight
                            }],
                            title:"请选择身高 (cm)",
                            setValues:[_this.height=="请选择"?"":_this.height.replace(/cm/ig,"")],
                            onOkClick: function (values) {
                                var age = values
                                _this.height = age[0]+"cm";
                                _this.classNameHeight = 'expected';
                                if(_this.age!="请选择"&& _this.height!="请选择"&& _this.weight!="请选择"){
                                    _this.isNext = ""
                                }
                            }
                        },"postpartumInforHeight")
                        procreateStatus.pinkers["postpartumInforHeight"].show();
                        break;
                    case "weight":
                        this.$store.state.picterObj({
                            cols : [{
                                options:initWeight
                            }],
                            title:"请选择体重 (kg)",
                            setValues:[_this.weight=="请选择"?"":_this.weight.replace(/kg/ig,"")],
                            onOkClick: function (values) {
                                var age = values
                                _this.weight = age[0]+"kg";
                                _this.classNameWeight = 'expected';
                                if(_this.age!="请选择"&& _this.height!="请选择"&& _this.weight!="请选择"){
                                    _this.isNext = ""
                                }
                            }
                        },"postpartumInforWeight")
                        procreateStatus.pinkers["postpartumInforWeight"].show();
                        break;
                }
            },
            nextBtn:function () {
                let  _this = this;
                if(this.isNext == 'disable')return;
                axios.post('customization/basic', {
                    "_token": procreateStatus["_token"],
                    "age":_this.age,
                    "height":_this.height.replace(/cm$/g,''),
                    "weight":_this.weight.replace(/kg$/g,'')
                })
                    .then(function (data) {
                        //_this.$store.state.alertDiv(data.data.message[0])
                        _this.$router.push('badyInfor')
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
