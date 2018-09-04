<template>
  <div>
    <div ref="loginModule" id="loginModule" class="loginModule">
      <div>
          <div>
            <img :src="((url)=>{return url+'images/appmenu/appHead.png' })(baseUrl)" alt="">
            <div class="loginHead">
              <span>该服务需要手机登录并绑定您的手机号</span>
              <img :src="((baseUrl)=>baseUrl+'images/appmenu/quitRight.png')(baseUrl)" alt="取消按钮">
            </div>
            <div class="loginUserPhone">
              <input ref="userPhone" id="userPhone" type="text" placeholder="手机号">
            </div>
            <div class="loginUserMes">
              <input ref="mesCodeDt" id="mesCodeDt" type="text" placeholder="短信验证码">
              <span ref="userMesCode" id="userMesCode" class="userMesCode">获取验证码</span>
            </div>
            <div  class="loginBtn">
              <button :class="initBtn" ref="loginSubmit" id="loginSubmit">登录／注册</button>
            </div>
            <a href="http://api.silianmall.com/v2/article.6" class="loginRule">点击“登录/注册”表示已阅读并同意<span class="userRule">《用户协议》</span></a>
          </div>
        </div>
    </div>
    <div ref="loginCaptcha" id="loginCaptcha" class="loginCaptcha">
      <div>
        <div>
         <div class="captchaHead">请先输入图形验证码</div>
          <div ref="captchaDt" class="captchaCot" id="captchaDt"></div>
          <div class="captchaText"><input ref="captchaText" id="captchaText" type="text" placeholder="输入图形验证码"></div>
          <div class="loginBtns">
            <button ref="captchaTrue" id="captchaTrue" class="captchaTrue">确定</button>
            <button ref="captchaQuit" id="captchaQuit" class="captchaQuit">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from '../../../common/js/jquery'
  import {goHistory,clearPiker} from '../../../common/js/commonAler'
  import Style from './index.css'
  export default {
  data() {
    return {
        style:Style,
        initBtn:"disBtn",
        baseUrl:axios.default.baseUrl,//fds
    }
  },
  beforeCreate(){
      clearPiker()
      let loginStatus = getCookie("SnfdPk");
      if(loginStatus){
         if(JSON.parse(JSON.parse(loginStatus)).customization){
             window.location.href =  axios.default.baseUrl +"customization/menu/pregnancy"
         }else{
             goHistory(this);
         }
      }
      function getCookie(name)
      {
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg))
              return arr[2];
          else
              return null;
      }

  },
  mounted() {
          var commontText = this.$store.state.alertDiv;
          var userPhoneDom = this.$refs.userPhone;
          var captchaDtDom = this.$refs.captchaDt;
          var captchaTrueDom = this.$refs.captchaTrue;
          var loginModuleDom = this.$refs.loginModule;
          var loginCaptchaDom = this.$refs.loginCaptcha;
          var mesCodeDtDom = this.$refs.mesCodeDt;
          var captchaTextDom = this.$refs.captchaText;
          var captchaQuitDom = this.$refs.captchaQuit;
          var loginSubmitDom = this.$refs.loginSubmit;
          var userMesCodeDom = this.$refs.userMesCode;
          var endTime = "";
          var default_this = this;
          // if(procreateStatus['aeb929f2e0']){
          //     var userStatusDt = setSesstion("",false);
          //     var loginLens = 0;
          //     for( var tt in userStatusDt){
          //         loginLens ++;
          //     }
          //     goStatus(userStatusDt,loginLens)
          // }else{
          //     $(loginModuleDom).show()
          // }
          var isStartTime = false;
          var userStatus = {
              isLogin:false,
              isCaptcha:false
          }
          if(userStatus.isLogin){
              $(loginModuleDom).show()
          }
          //登录取消按钮
          $(loginModuleDom).children("div:eq(0)").children(".loginHead:eq(0)").children("img:eq(0)").click(function () {
              $(loginModuleDom).hide()
          })
          //验证手机号
          $(userPhoneDom).focus(function () {
              var userName = $(this).val()
              $(this).attr("class",'userTrue');
              if(/^手机号格式错误/ig.test(userName)){
                  $(this).val('');
                  $(this).attr("class",'userError');
                  return;
              }

              // if(/^(1[3-9]{1})\d{9}$/ig.test(userName) && !userStatus.isCaptcha){
              //     $(loginCaptchaDom).css('display','table');
              //     $(loginModuleDom).hide();
              // }
          })
          $(userPhoneDom).blur(function () {
              var userName = $(this).val();
              var that = this ;

              if(userName == ''){
                  return ;
              }
              if(!/^(1[3-9]{1})\d{9}$/ig.test(userName)){
                  $(this).attr("class",'userError').val('手机号格式错误');
                  setTimeout(function () {
                      $(that).attr("class",'').val('')
                  },1000)
              }
              if(userStatus.isCaptcha)return;
              if(/^(1[3-9]{1})\d{9}$/ig.test(userName)){
                  $(this).attr("class", 'userTrue')
                  $(captchaDtDom).children('img').remove();
                  $(captchaDtDom).append('<img  src="'+axios.default.baseUrl+'/validitPicture/' + Math.random() + '" alt="">')
                  $(captchaDtDom).show();
                  $(loginCaptchaDom).css('display','table');
                  $(loginModuleDom).hide();
              }
          })
          $(userPhoneDom).click(function () {
              $(captchaTextDom).val("")
              $(captchaDtDom).children('img').remove();
              $(captchaDtDom).append('<img  src="'+axios.default.baseUrl+'/validitPicture/' + Math.random() + '" alt="">')
          })
          $(captchaDtDom).click(function () {
              $(captchaTextDom).val("")
              $(captchaDtDom).children('img').remove();
              $(captchaDtDom).append('<img  src="'+axios.default.baseUrl+'/validitPicture/' + Math.random() + '" alt="">')
          })
          $(userPhoneDom).keyup(function () {
              var userPone = $(this).val();
              if(/^手机号格式错误/ig.test(userPone)){
                  $(this).val(userPone.replace(/^手机号格式错误/ig,''));
                  $(this).attr("class",'user_active');
                  return;
              }
              if(userPone.length<11){
              }
              if(userPone.length>=11){
                  var currentPone = userPone.slice(0,11)
                  $(this).val(currentPone);
                  if(!/^(1[3-9]{1})\d{9}$/ig.test(currentPone)){
                      $(this).attr("class",'userError').val('手机号格式错误');
                      var that = this;
                      setTimeout(function () {
                          userPone = $(that).val();
                          $(that).attr("class",'userTrue').val(userPone.replace(/^手机号格式错误/ig,''));
                      },1000)
                  }
              }

          })
          //验证图形验证码
          $(captchaTextDom).focus(function () {
              $(this).attr("class",'userTrue');
              if(/^图形验证码错误/ig.test($(this).val()) || /^请点击图片重新获取/ig.test($(this).val())){
                  $(this).val('');
                  $(this).attr("class",'userTrue');
                  return;
              }
          })
          $(captchaTextDom).click(function () {
              $(this).attr("class",'userTrue');
              if(/^图形验证码错误/ig.test($(this).val()) || /^请点击图片重新获取/ig.test($(this).val())){
                  $(this).val('');
                  $(this).attr("class",'userTrue');
                  return;
              }
          })
          $(captchaTextDom).blur(function () {
              var imgCode = $(this).val();
              var that = this;
              if(imgCode == "")return;
              if(imgCode.length==5){
                  //发送请求
              }else{
                  $(this).attr("class",'userError').val('图形验证码错误');
                  setTimeout(function () {
                      $(that).attr("class",'userAlert').val('请点击图片重新获取');
                      setTimeout(function () {
                          $(that).attr("class",'').val('');
                      },1000)
                  },1000)
              }
          })
          $(captchaTextDom).keyup(function () {
              var userPone = $(this).val();
              if(userPone.length<=5){
                  $(captchaTextDom).val(userPone);
              }else{
                  $(captchaTextDom).val( userPone.slice(0,4));
              }
          })
          //验证图形验证码按钮
          $(captchaTrueDom).click(function () {
              var imgCode =   $(captchaTextDom).val();
              var userPhone = $(userPhoneDom).val();
              procreateStatus.imgCode = imgCode;
              if(imgCode == "")return;
              //请求
              axios.post('customization/message',{
                  "_token": procreateStatus["_token"],
                  "u_captcha":$.trim(imgCode),
                  "u_phone":$.trim(userPhone)
               })
                  .then(function(data){
                       console.log(data)
                      // console.log(xhr);
                      userStatus.isCaptcha = true;
                      $(loginModuleDom).css('display','table')
                      $(mesCodeDtDom).val("");
                      $(loginCaptchaDom).hide();
                      isStartTime = true;
                      var start = 60;
                      endTime = setInterval(function () {
                          if (start * 1 == 0) {
                              isStartTime = false;
                              userStatus.isCaptcha = false;
                              clearInterval(endTime)
                              $(userMesCodeDom).html('获取验证码')
                          } else {
                              start--;
                              $(userMesCodeDom).html(start + "s")
                          }
                      }, 1000)
                      commontText(data?data.data.message[0]:"")
                  })
                  .catch(function(error){
                      isStartTime = false;
                      $(captchaTextDom).attr("class",'userError').val('图形验证码错误');
                      setTimeout(function () {
                          $(captchaTextDom).attr("class",'userAlert').val('请点击图片重新获取');
                          setTimeout(function () {
                              $(captchaTextDom).attr("class",'').val('');
                          },1000)
                      },1000)
                      // commontText(error.response?error.response.data.message[0]:"")
                  })
          })
          $(captchaQuitDom).click(function () {
              userStatus.isCaptcha = false;
              $(captchaTextDom).attr('class','').val('');
              $(loginModuleDom).css('display','table')
              $(loginCaptchaDom).hide()
          })
          //短信验证码
          $(userMesCodeDom).click(function () {
              var userPone = $(userPhoneDom).val();
              if(userPone == "") {
                  commontText("请输入您的手机号");
                  return ;
              }
              if (!/^(1[3-9]{1})\d{9}$/ig.test(userPone)) {
                  $(userPhoneDom).attr("class", 'userError').val('手机号格式错误');
                  setTimeout(function () {
                      $(userPhoneDom).attr("class", '').val('');
                  }, 1000)
                  return ;
              }
              if(!userStatus.isCaptcha && !isStartTime){
                  $(userPhoneDom).attr("class", 'userTrue')
                  $(captchaTextDom).val("");
                  $(captchaDtDom).children('img').remove();
                  $(captchaDtDom).append('<img  src="'+axios.default.baseUrl+'/validitPicture/' + Math.random() + '" alt="">')
                  $(captchaDtDom).show();
                  $(loginCaptchaDom).css('display','table');
                  $(loginModuleDom).hide();
              }
          })
          $(mesCodeDtDom).focus(function () {
              $(this).attr("class",'userTrue');
              if(/^短信验证码错误/ig.test($(this).val())){
                  $(this).val('');
                  $(this).attr("class",'userTrue');
                  return;
              }
              if(userStatus.isCaptcha && /^\d{4}$/ig.test($(this).val())){
                  default_this.initBtn = "ableBtn";
              }
          })
          $(mesCodeDtDom).click(function () {

              $(this).attr("class",'userTrue');
              if(/^短信验证码错误/ig.test($(this).val())){
                  $(this).val('');
                  $(this).attr("class",'userTrue');
                  return;
              }
              if(userStatus.isCaptcha && /^\d{4}$/ig.test($(this).val())){
                  default_this.initBtn = "ableBtn";
              }
          })
          $(mesCodeDtDom).blur(function () {
              var imgCode = $(this).val();
              if(/^\d{4}$/ig.test(imgCode)){
                  $(this).attr("class",'userTrue')
                  if(userStatus.isCaptcha){
                      default_this.initBtn = "ableBtn";
                  }
              }else if(imgCode == ''){
                  return false;
              }else{
                  $(this).attr("class",'userError').val('短信验证码错误');
                  var that = this;
                  setTimeout(function () {
                      $(that).attr("class",'').val('');
                  },1000)
              }
          })
          $(mesCodeDtDom).keyup(function () {
              var imgCode = $(this).val();
              if(/^短信验证码错误/ig.test(imgCode)){
                  $(this).val('');
                  $(this).attr("class",'userTrue');
                  return;
              }
              if(imgCode.length>=4){
                  var currentPone = imgCode.slice(0,4)
                  $(this).val(currentPone);
                  if(/^\d{4}$/ig.test(currentPone)){
                      if(userStatus.isCaptcha && /^\d{4}$/ig.test($(this).val())){
                          default_this.initBtn = "ableBtn";
                      }
                  }else{
                      $(this).attr("class",'userTrue').val('短信验证码错误');
                      var that = this;
                      setTimeout(function () {
                          $(that).attr("class",'userTrue').val('');
                      },1000)
                  }
              }
          })
          //提交
          $(loginSubmitDom).click(function () {
              var userPone = $(userPhoneDom).val();
              var messCode = $(mesCodeDtDom).val();
              var that = this;
              if(userPone == ''){
                  commontText('请输入您的手机号')
                  return ;
              }
              if(!/^(1[3-9]{1})\d{9}$/ig.test(userPone)){
                  $(this).attr("class",'userError').val('手机号格式错误');
                  setTimeout(function () {
                      $(that).attr("class",'').val('')
                  },1000)
                  return;
              }
              //验证码
              if(!userStatus.isCaptcha){
                  $(userMesCodeDom).click()
              }
              //提交信息
              if(userStatus.isCaptcha && $.trim(messCode).length==4) {
                  //提交
                  //请求
                  axios.post('customization/auth', {
                      "_token": procreateStatus["_token"],
                      "u_phone": userPone,
                      "u_message": messCode,
                      "deviceId" :SMSdk.getDeviceId()
                  })
                      .then(function (data) {
                              commontText("登录成功")
                              default_this.$store.dispatch('isLogin', true)
                          setCookie("SnfdPk",JSON.stringify(data.data))
                          function setCookie(name,value)
                          {
                              var exp = new Date();
                              exp.setTime(exp.getTime() + 1*24*60*60*1000);
                              document.cookie = name + "="+ JSON.stringify(value) + ";expires=" + exp.toGMTString();
                          }
                          if (data.data.customization) {
                              //去菜单页
                             window.location.href = axios.default.baseUrl +"customization/menu/pregnancy"
                          } else {
                              default_this.$router.push("lifestages")
                           }
                      })
                      .catch(function (error) {
                          commontText(error.response ? error.response.data.message[0] : "")
                      })
                  }
              })

  },
  components: {
    // 'v-header': header
  }
}

</script>
