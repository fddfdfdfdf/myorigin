function ajaxOrigin(){var ajaxData={type:arguments[0].type.toUpperCase()||"GET",url:arguments[0].url||"",async:arguments[0].async||"false",data:arguments[0].data||null,setRequestHeader:arguments[0].setHeader||null,dataType:arguments[0].dataType||"text",contentType:arguments[0].contentType||"application/x-www-form-urlencoded",beforeSend:arguments[0].beforeSend||function(){},success:arguments[0].success||function(){},error:arguments[0].error||function(){}};ajaxData.beforeSend();try{var xhr=null;if(window.ActiveXObject){xhr=new window.ActiveXObject("Microsoft.XMLHTTP")}else{xhr=new window.XMLHttpRequest()}}catch(error){console.log(error)};xhr.responseType=ajaxData.dataType;try{var convertResult="";var datas=ajaxData.data;if(typeof datas==='object'){for(var c in datas){convertResult+=c+"="+datas[c]+"&"}convertResult=convertResult.substring(0,convertResult.length-1)}else{convertResult=datas};if(ajaxData.type=='GET'){xhr.open('GET',ajaxData.url+'?'+convertResult,ajaxData.async);xhr.setRequestHeader("Content-Type",ajaxData.contentType);if(ajaxData.setRequestHeader){for(var i in ajaxData.setRequestHeader){xhr.setRequestHeader(i,ajaxData.setRequestHeader[i])}};xhr.send()}else if(ajaxData.type=='POST'){xhr.open('POST',ajaxData.url,ajaxData.async);xhr.setRequestHeader("Content-Type",ajaxData.contentType);if(ajaxData.setRequestHeader){for(var i in ajaxData.setRequestHeader){xhr.setRequestHeader(i,ajaxData.setRequestHeader[i])}}xhr.send(convertResult)}}catch(error){console.log(error)};xhr.onreadystatechange=function(){if(xhr.readyState==4){try{if(xhr.status==200){ajaxData.success(xhr.response)}else{ajaxData.error(xhr.statusText)}}catch(error){console.log(error)}}}}
async function ajax(data){
    return 	 await new Promise(function(resolve, reject) {
        ajaxOrigin({
            ...data,
            success:function(msg){
                resolve(msg)
            },
            error:function(error){
                reject(error)
            }
        });
    });
}
export default {
    ajax
 }
