<template>
  <div>
    <div @click="historyBack" class="historyBack"><div v-html="hisBack"></div></div>
    <div style="display: table" class="bodyInfor" id="bodyInfor">
      <div class="bodyContain">
        <div class="bodyInforHead">设置宝宝信息</div>
        <div class="bodyInforHeadInfor">
          <div>宝宝从出生开始，每日需要摄取的母乳量</div>
          <div>以及什么时间开始添加辅食</div>
          <div>添加辅食的测敏方法都是有规律的哦</div>
        </div>
        <div class="bodyName bodyDtInfor">
          <div>宝宝名字</div>
          <input :class="classNameNm"  placeholder="请输入宝宝昵称" @keydown="isHasName" @keyup="isHasName" v-model="bodyName" id="bodyDtName"  class="kbtn" />
        </div>
        <div class="bodyBirthdy bodyDtInfor" @click="showCheckedStatus('gender')">
          <div>宝宝性别</div>
          <div  v-html="gender" :class="classNameGender"></div>
        </div>
        <div class="bodyBirthdy bodyDtInfor" @click="showCheckedStatus('weight')">
          <div>宝宝体重</div>
          <div  v-html="weight" :class="classNameWeight"></div>
        </div>
        <button id="bodyInforNext" @click="nextBtn" :class="isNext">下一步</button>
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
                isShowChecked:false,
                isShowGenderChecked:false,
                hisBack:"返回",
                classNameGender:'expectedDate',
                classNameWeight:'expectedDate',
                classNameNm:'',
                bodyName:"",
                gender:"请选择",
                weight:"请选择",
        }
        },
        beforeCreate(){
            setSession(this)
            clearPiker();
        },
        created() {

        },
        methods:{
            historyBack:function () {
                goHistoryBc(this)
            },
            isHasName:function () {
                if(this['bodyName'] !="" && this['weight'] != "请选择" && this['gender'] != "请选择"){
                    this.isNext = "";
                }else{
                    this.isNext = "disable";
                }
                this.classNameNm  = "expecteds";
                this.bodyName = this.bodyName.length>20?this.bodyName.substr(0,20):this.bodyName
            },
            showCheckedStatus:function(status){
                let _this = this;
                clearPiker();//fds
                switch (status){
                    case "gender":
                        this.$store.state.picterObj({
                            cols : [{
                                options:["男","女"]
                            }],
                            title:"请选择宝宝性别",
                            setValues:[_this.gender=="请选择"?"":_this.gender],
                            onOkClick: function (values) {
                                var age = values
                                _this.gender = age[0]
                                _this.classNameGender = 'expected';
                                if(_this['bodyName'] !="" && _this['weight'] != "请选择" && _this['gender'] != "请选择"){
                                    _this.isNext = "";
                                }else{
                                    _this.isNext = "disable";
                                }
                            }
                        },"badyInforGender")
                        procreateStatus.pinkers["badyInforGender"].show();
                        break;
                    case "weight":
                         this.$store.state.picterObj({cols : [{
                                options:(()=>{
                                    let arr = [];
                                    for(let i=2;i<30;i++){
                                        arr.push(i)
                                    }
                                    return arr;
                                })()
                            }],
                            title:"请选择宝宝体重 (kg)",
                            setValues:[_this.weight=="请选择"?"":_this.weight],
                            onOkClick: function (values) {
                                var age = values;
                                _this.weight = age[0]+"kg"
                                _this.classNameWeight = 'expected';
                                if(_this['bodyName'] !="" && _this['weight'] != "请选择" && _this['gender'] != "请选择"){
                                    _this.isNext = "";
                                }else{
                                    _this.isNext = "disable";
                                }
                            }
                        },"badyInforWeight")
                        procreateStatus.pinkers["badyInforWeight"].show();
                        break;
                }
            },
            nextBtn:function () {
                let  _this = this;
                if(this.isNext == 'disable')return;
                axios.post('customization/baby', {
                    "_token": procreateStatus["_token"],
                    "name":_this.bodyName,
                    "gender":_this.gender=="男"?1:0,
                    "weight":_this.weight.replace(/kg$/,"")
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
