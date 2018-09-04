!function(n,e){var t=n.documentElement,i="orientationchange"in window?"orientationchange":"resize",d=function(){var n=t.clientWidth;n>768?t.style.fontSize="100px":t.style.fontSize=100*(n/750)+"px"};n.addEventListener&&(e.addEventListener(i,d,!1),n.addEventListener("DOMContentLoaded",d,!1))}(document,window)



//生成css
var str = '';
for(var i=320;i<=768;i++){
    var  j = (i+"").split('')[2]*1;
    if(  j!=1 && j!=3 &&  j!=6 && j!=7 && j!=8 && j!=9 ){
        str +='@media all and (width: '+i+'px){ html{font-size:'+(i*10/75)+'px}}'
    }
    if(i>=768){
        str +='@media all and (width: '+i+'px){ html{font-size:'+(i*10/75)+'px}}'
    }
}
console.log(str)


//ajax 请求
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = (function (data){
        var arr = [];
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
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }
}