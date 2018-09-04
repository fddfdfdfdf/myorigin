import * as home from './action-type';
let defaultState = {
  login:"10", //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '', //图片地址
}
// 首页表单数据
export const formData = (state = defaultState , action = {}) => {
  switch(action.type){
    case home.SAVEFORMDATA:
      return {...state, ...{[action.datatype]: action.value}};
    case home.SAVEIMG:
      return {...state, ...{imgpath: action.path}};
    case home.CLEARDATA:
      return {...state, ...defaultState};
    default:
      return state;
  }
}

export const loginStatus = (state = {} , action = {}) => {
    switch(action.type){
        case home.LOGINED:
            state.login = true;
            return {...state,...action};
        default:
            state.login = false;
            return state;
    }
}



export const commonComfirm =  (state = {show:false,text:""} , action = {}) => {
    switch(action.type){
        case home.SHOWCOMFRIM:
            return {show:true,text:action.text};
        case home.HIDECOMFRIM:
            return {show:false,text:action.text};
        default:
            return state;
    }
}


