    import FastClick from './fastclick.js';
// ((doc, win) => {
//   const docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = () => {
//       let clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       clientWidth>=768? docEl.style.fontSize = '100px':docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
//   //当dom加载完成时，或者 屏幕垂直、水平方向有改变进行html的根元素计算
// })(document, window);

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


const system = (() => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  let system;
  if (isAndroid) {
    system = 'Android'
  } else if (isIOS) {
    system = 'IOS'
  }
  return system
})()
const target = process.env.NODE_ENV !== 'production' ? '' : 'http://cangdu.org'; //目标网站
const _ajax = function (options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        var params = (function (data){
            var arr = [];
            if(JSON.stringify(data) == "{}"){
                return '';
            }
            for (var name in data) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
            arr.push(("v=" + Math.random()).replace(".",""));
            return arr.join("&");
        })(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(JSON.parse(xhr.responseText));
                } else {
                    options.fail && options.fail(status);
                }
            }
        }
    }
const fetch = function(url,methos,param){
        return new Promise(function(resolve, reject){
            _ajax({
                url: url,
                type: methos,
                data:param,
                dataType:'json',
                success: function(data){
                    resolve(data);
                },
                error: function(error){
                    reject(error)
                }
            });
        });
    };
export {
  target,
  system,
  fetch
}