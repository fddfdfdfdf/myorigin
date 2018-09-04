<template>
   <div class="pregnancy">
      <v-header :titleData="titleData"></v-header>
      <div :class="style.motherMenuDt">
         <ul v-for="(item,ind) in bodyMemuLists">
            <li :class="style.menuDtTitle"><span  :style="'background:'+colorLists[ind]" ></span><span v-html="item.menu"></span><span v-html="item.time"></span><span v-html="item.alertComt"></span></li>
            <li :class="style.menuDtComt">
               <div :class="style.rightStyle" v-for="ite in item.menuLists">
                  <div>
                     <span v-html="ite.comt"></span>
                     <img  :src="ite.url"/>
                     <span v-html="ite.num"></span>
                  </div>
                  <div v-html="ite.dt"></div>
               </div>
               <div :class="style.leftStyle">
                  <div v-show="item.menuLists.length ==1" :style="'border:.02rem solid '+colorLists[ind]" :class="style.circle">
                  </div>
                  <div v-show="item.menuLists.length >1"  :style="':.02rem solid '+colorLists[ind]" :class="index%2==0?style.circle:style.verticalLine" v-for="(ites,index) in item.menuLists">
                  </div>
                  <div v-show="item.menuLists.length%2 != 0 && item.menuLists.length !=1"  :style="'border:.02rem solid '+colorLists[ind]" :class="style.verticalLine">
                  </div>
                  <div v-show="item.menuLists.length%2 != 0 && item.menuLists.length !=1" :style="'border:.02rem solid '+colorLists[ind]" :class="style.circle">
                  </div>
                  <div v-show="item.menuLists.length%2 == 0 " :style="'border:.02rem solid '+colorLists[ind]" :class="style.circle">
                  </div>
                  <div v-show="item.menuLists.length%4 == 0 && item.menuLists.length !=1" :style="'border:.02rem solid '+colorLists[ind]" :class="style.verticalLine">
                  </div>
                  <div v-show="item.menuLists.length%4 == 0 && item.menuLists.length !=1" :style="'border:.02rem solid '+colorLists[ind]" :class="style.circle">
                  </div>
               </div>
            </li>
         </ul>
      </div>
      <v-menu></v-menu>
      <v-footer :titleData="titleData"></v-footer>
   </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import header from '../../../common/Head/Head'
import footer from '../../../common/fonter/footer'
import menuTool from '../../../common/menuTool/menuTool'
import Style from '../../Index/index.less'

export default {
  data() {
      return {
          style:Style,
          titleData:{
              status:true,
              dtSync:"",
              dtTime:"",
          },
          colorLists:["#FFB064","#C094FF","#EC574A","#94BCFF","#E153C7","#FFB064"],
          bodyMemuLists:[]
      }
  },
    beforeCreate(){
        let currentStatus = this.$store.state.status;
        let currentError = this.$store.state.error;
        let errorDiv = this.$store.state.alertDiv;
        if(!currentStatus && currentStatus<0){
            errorDiv(currentError)
            return false;
        }
        if(currentStatus == 1){
            this.$router.push('pregnancyMother')
        }
    },
  created() {
      let _this = this;
      let baseUrl = axios.default.baseUrl;
      axios.post('customization/menu/pregnancy', {
          "_token": procreateStatus["_token"],
          status:0
      })
          .then(function (data) {
              _this.$nextTick(()=>{
                  let timeArr = ["5:30-9:30","9:30-11:30","11:30-14:00","14:30-17:00","17:30-20:00","20:00-22:00"];
                  let menuList = [];
                  let newData = data.data.diet.detail;
                  let start = 0;
                  _this.titleData.dtSync = data.data.diet.energy_supply+"千卡";
                  _this.titleData.dtTime = "孕"+data.data.weeks+"周";
              for(let i in newData){
                      menuList[start]= {};
                      menuList[start]["time"] = timeArr[i];
                      menuList[start]["menu"] = newData[i][0]["scene"];
                      if(start==1){
                          menuList[start]["alertComt"] = "建议早餐饭后要补充叶酸哦～"
                      }else if(start==4){
                          menuList[start]["alertComt"] = "建议晚间补钙，吸收更好"
                      }else{
                          menuList[start]["alertComt"] = ""
                      }
                      menuList[start]["menuLists"] = [];
                      for(let j=0,lens=newData[i].length;j<lens;j++){
                          menuList[start]["menuLists"].push({
                              comt:newData[i][j]["name"],
                              dt:newData[i][j]["weight"]+"克",
                              num:"× "+newData[i][j]["s_id"]+" "+newData[i][j]["iconv_scale"],//
                              url:baseUrl+"images/tableWare/"+newData[i][j]["iconv"]+".png"
                          })
                      }
                      start++;
                 }
                  _this.bodyMemuLists = menuList;
              })
          })
          .catch(function (error) {
              if(error.response.status == 402 ){
                  _this.$router.push("resetMenu")
              }else if(error.response.status == 500){
                  _this.$router.push("")
              }else{
                  _this.$store.state.alertDiv(error.response ? error.response.data.message[0] : "")
              }
          })
  },
  components: {
    'v-header': header,
    'v-footer':  footer,
    'v-menu'  :  menuTool
  }
}

</script>
