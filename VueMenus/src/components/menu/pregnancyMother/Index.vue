<template>
  <div class="pregnancy" ref="leftRight">
    <v-header :titleData="titleData"></v-header>
    <div :class="style.motherBtn">
      <div><router-link to="pregnancyMother">妈妈餐单</router-link></div>
      <div><router-link to="body">宝宝餐单</router-link></div>
    </div>
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
             <div v-show="item.menuLists.length >1"  :style="'border:.02rem solid '+colorLists[ind]" :class="index%2==0?style.circle:style.verticalLine" v-for="(ites,index) in item.menuLists">
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
    import Style from '../../Index/index.less'
    import menuTool from '../../../common/menuTool/menuTool'
    export default {
        data() {
            return {
                style:Style,
                titleData:{
                    status:false,
                    dtSync:"",
                    dtTime:"",
                },
                colorLists:["#FFB064","#C094FF","#EC574A","#94BCFF","#E153C7","#FFB064","#C094FF","#EC574A","#94BCFF",],
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
            if(currentStatus == 0){
                this.$router.push('pregnancy')
            }
        },
        created() {
            let _this = this;
            let baseUrl = axios.default.baseUrl;
            let timeArr = ["5:30-9:30","9:30-11:30","11:30-14:00","14:30-17:00","17:30-20:00","20:00-22:00"];
            let menuDetail = this.$store.state.menuDt;
            console.log("mother")
            if(!menuDetail){
                axios.post('customization/menu/lactation', {
                    "_token": procreateStatus["_token"]
                })
                    .then(function (data) {
                        _this.$store.dispatch("menuDt",data.data)
                        _this.titleData.dtSync = data.data.diet["energy_supply"]+"千卡"
                        _this.titleData.dtTime = "出生"+data.data.days+"天"
                        console.log(data.data)
                        _this.$nextTick(()=>{
                            let menuList = [];
                            let newData = data.data.diet.detail;
                            let start = 0;
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
                                    num:"× "+newData[i][j]["s_id"]+" "+newData[i][j]["iconv_scale"],
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
            }else{
                let menuList = [];
                let newData = menuDetail.diet.detail;
                let start = 0;//--
                _this.titleData.dtSync = menuDetail.diet["energy_supply"]+"千卡"
                _this.titleData.dtTime = "出生"+menuDetail.days+"天"
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
                            num:"× "+newData[i][j]["s_id"]+" "+newData[i][j]["iconv_scale"],
                            url:baseUrl+"images/tableWare/"+newData[i][j]["iconv"]+".png"
                        })
                    }
                    start++;
                }
                _this.bodyMemuLists = menuList;
            }

        },
        mounted(){
            function addEvent(element,e,fn) {
                if(window.addEventListener) {
                    element.addEventListener(e,fn,false);
                }else {
                    element.attachEvent("on"+e,fn);
                }
            }
            function judge(obj) {
                var startx;//让startx在touch事件函数里是全局性变量。
                var starty;
                var endy;
                var endx;
                function cons() {   //独立封装这个事件可以保证执行顺序，从而能够访问得到应该访问的数据。
                    if (((startx - endx)>0) && (Math.abs(starty- endy)<3)) {  //判断左右移动程序
                        obj.$router.push("body")
                    } else {
                        obj.$router.push("pregnancyMother")
                    }
                }
                addEvent(obj.$refs.leftRight,'touchstart', function (e) {
                    var touch = e.changedTouches;
                    startx = touch[0].clientX;
                    starty = touch[0].clientY;
                })
                addEvent(obj.$refs.leftRight,'touchend', function (e) {
                    var touch = e.changedTouches;
                    endx = touch[0].clientX;
                    endy = touch[0].clientY;
                    cons();  //startx endx 的数据收集应该放在touchend事件后执行，而不是放在touchstart事件里执行，这样才能访问到touchstart和touchend这2个事件产生的startx和endx数据。另外startx和endx在_touch事件函数里是全局性的，所以在此函数中都可以访问得到，所以只需要注意事件执行的先后顺序即可。
                })
            }

            judge(this);
        },
        components: {
            'v-header': header,
            'v-footer':  footer,
            'v-menu'  :  menuTool
        }
    }

</script>
