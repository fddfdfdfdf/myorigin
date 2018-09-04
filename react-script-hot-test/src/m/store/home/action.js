import * as home from './action-type';
import ajax from '../../common/asyncAjax'

// 保存表单数据
export const saveFormData = (value, datatype) => {
  return {
    type: home.SAVEFORMDATA,
    value,
    datatype,
  }
}

// 保存图片地址
export const saveImg = path => {
  return {
    type: home.SAVEIMG,
    path,
  }
}

// 保存图片地址
export const clearData = () => {
  return {
    type: home.CLEARDATA,
  }
}

//登录
export const loginEdStatus = (json) => {
    return {
        type: home.LOGINED,
        dd:json
    }
}

export const fetchPosts = () => {
    return dispatch => {
        dispatch(loginEdStatus(null))
        return ajax.ajax({
            url:"http://localhost:9000/api/activity/list",
            type:"post",
            dataType:"json"
        })
            .then(json => dispatch(loginEdStatus(json)))
    }
}

//公共弹层
export const showComfirm = (text) => {
    return {
        type: home.SHOWCOMFRIM ,
        text:text
    }
}
export const hideComfirm = () => {
    return {
        type: home.HIDECOMFRIM ,
        text:""
    }
}







