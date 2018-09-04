<template>
  <div class="pregnancy" ref="leftRightBody">
    <v-header :titleData="titleData"></v-header>
    <div :class="style.bodyBtn">
       <div><router-link to="pregnancyMother">妈妈餐单</router-link></div>
       <div><router-link to="body">宝宝餐单</router-link></div>
    </div>
    <ul :class="style.bodyMemuList">
       <li :class="style.bodyMemuListDt" v-for="(item,index) in bodyMemuLists">
           <div :style="'background:'+colorLists[index.toString()%5]"></div>
           <div v-html="item.time"></div>
           <div v-html="item.menu"></div>
           <div v-html="item.ml"></div>
       </li>
    </ul>
    <v-footer :titleData="titleData"></v-footer>
  </div>
</template>

<script type="text/javascript">
    import axios from 'axios'
    import header from '../../../common/Head/Head'
    import footer from '../../../common/fonter/footer'
    import Style from '../../Index/index.less'
    export default {
        data() {
            return {
                style:Style,
                titleData:{
                    status:false,
                    dtSync:"",
                    dtTime:"",
                },
                colorLists:["#FFB064","#C094FF","#EC574A","#94BCFF","#E153C7"],
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
            let menuDetail = this.$store.state.menuDt;
            console.log("body")
            if(!menuDetail){
               axios.post('customization/menu/lactation', {
                   "_token": procreateStatus["_token"]
               })
                   .then(function (data) {
                       _this.titleData.dtTime = "出生"+data.data.days+"天"
                       _this.$store.dispatch("menuDt",data.data)
                       let bodyMenu = data.data.childDiet.detail;
                       let currentMenu = [];
                       let milkAll = [];
                       let mildAllSort = [];
                       for(let i=0,lens = bodyMenu.length;i<lens;i++){
                           if(bodyMenu[i]["unit"] == "ml"){
                               milkAll.push(bodyMenu[i]["amount_min"])
                               milkAll.push(bodyMenu[i]["amount_max"])
                           }
                           currentMenu.push({
                               time:bodyMenu[i]["feed_name"],
                               menu:bodyMenu[i]["name"],
                               ml:bodyMenu[i]["amount_min"]+"～"+bodyMenu[i]["amount_max"]+bodyMenu[i]["unit"]
                           })
                       }
                       mildAllSort =  milkAll.sort((a,b)=>{a-b})
                       _this.titleData.dtSync = mildAllSort[0]+"～"+mildAllSort[mildAllSort.length-1]+"ml"

                       _this.bodyMemuLists = currentMenu;
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
               let currentMenu = [];
               let bodyMenu = menuDetail.childDiet.detail;
                _this.titleData.dtTime = "出生"+menuDetail.days+"天"
                let milkAll = [];
                let mildAllSort = [];
                for(let i=0,lens = bodyMenu.length;i<lens;i++){
                   if(bodyMenu[i]["unit"] == "ml"){
                       milkAll.push(bodyMenu[i]["amount_min"])
                       milkAll.push(bodyMenu[i]["amount_max"])
                   }
                   currentMenu.push({
                       time:bodyMenu[i]["feed_name"],
                       menu:bodyMenu[i]["name"],
                       ml:bodyMenu[i]["amount_min"]+"～"+bodyMenu[i]["amount_max"]+bodyMenu[i]["unit"]
                   })
               }
                mildAllSort =  milkAll.sort((a,b)=>{a-b})
                _this.titleData.dtSync = mildAllSort[0]+"～"+mildAllSort[mildAllSort.length-1]+"ml"
               this.bodyMemuLists = currentMenu;
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
                addEvent(obj.$refs.leftRightBody,'touchstart', function (e) {
                    var touch = e.changedTouches;
                    startx = touch[0].clientX;
                    starty = touch[0].clientY;
                })
                addEvent(obj.$refs.leftRightBody,'touchend', function (e) {
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
            'v-footer':  footer
        }
    }

</script>
