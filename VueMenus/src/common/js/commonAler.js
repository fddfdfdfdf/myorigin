(function  commonAlert() {
    let commonContain =  document.createElement("div");
    commonContain.setAttribute("id","commonAlert");
    commonContain.setAttribute("class",  "loginCaptcha");
    commonContain.style.display="none"
    let commonDt =  document.createElement("div");
    commonDt.setAttribute("id","commonAlertDt");
    let commonDiv =  document.createElement("div");
    commonDiv.appendChild(commonDt);
    commonContain.appendChild(commonDiv);
    let commonDivBg =  document.createElement("div");
    commonDivBg.setAttribute("class",  "commonBg");
    commonDivBg.setAttribute("id",  "commonBg");
    commonDivBg.style.display="none"
    let eleBody =  document.body;
    eleBody.appendChild(commonContain);
    eleBody.appendChild(commonDivBg);
})()

function alertError(error) {
    var eleDiv = document.getElementById("commonAlert");
    var eleDivDt = document.getElementById("commonAlertDt");
    var commBg = document.getElementById("commonBg");
        eleDiv.style.display = "table";
        commBg.style.display = "block";
        eleDivDt.innerHTML = error
        setTimeout(function () {
             eleDiv.style.display = "none";
             commBg.style.display = "none";
             eleDivDt.innerHTML = "";
         },1000)
}



function goHistory(th) {
     let sessionStatus = sessionStorage.getItem("oldUrl")?sessionStorage.getItem("oldUrl"):false;
}

function goHistoryBc(th) {
   th.$router.go(-1)
}

function setSession(th) {
    if(th.$store.state.isLogin){
        sessionStorage.setItem("oldUrl",window.location.href);
    }else{
        th.$router.push("login")
    }
}
function clearSession() {
    sessionStorage.removeItem("oldUrl")
}
function clearPiker() {
    if(procreateStatus.pinkers){
        for(let i in procreateStatus.pinkers){
            if(procreateStatus.pinkers[i])procreateStatus.pinkers[i].hide();//
            procreateStatus.pinkers[i]=null;
        }
    }
}
export {
    alertError,
    goHistory,
    setSession,
    clearSession,
    goHistoryBc,
    clearPiker
}

