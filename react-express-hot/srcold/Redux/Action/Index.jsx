import { fetch } from  '../../Config/Config.js';//引入默认配置

export const RECEIVE_CAROUSEL_DATA = 'RECEIVE_CAROUSEL_DATA'
export const REQUEST_CAROUSEL_DATA = 'REQUEST_CAROUSEL_DATA'
export const RECEIVE_IMG_DATA = 'RECEIVE_IMG_DATA'
export const REQUEST_IMG_DATA = 'REQUEST_IMG_DATA'

function requestImgData(){
    return {
        type:REQUEST_IMG_DATA
    }
}

function receiveImgData(data){
    return {
        type:RECEIVE_IMG_DATA,
        data
    }
}


function requestCarouselData(){
    return {
        type:REQUEST_CAROUSEL_DATA
    }
}

function receiveCarouselData(data){
    return {
        type:RECEIVE_CAROUSEL_DATA,
        data
    }
}

export let CarouselData = function (url,type,param) {
    return dispatch => {
        dispatch(requestCarouselData())
        fetch(url,type,param)
            .then(
                data =>{
                   dispatch(receiveCarouselData(data))
               }
            )
            .catch(error => {
                console.log(error)
            })
    }
}

export let ImgLists = function (url,type,param) {
    return dispatch => {
        dispatch(requestImgData())
        fetch(url,type,param)
            .then(
                data =>{
                    dispatch(receiveImgData(data))
                }
            )
            .catch(error => {
                console.log(error)
            })
    }
}
