import {
    RECEIVE_CAROUSEL_DATA,
    REQUEST_CAROUSEL_DATA,
    RECEIVE_IMG_DATA,
    REQUEST_IMG_DATA
} from '../Action/Index'


const initData = {
    isFeching:false,
    isFeched:false,
    data:{}
}


function postCarouselData(state = initData,action = {}){
  switch (action.type){
      case REQUEST_CAROUSEL_DATA:
          return Object.assign({},{
              isFeching:true,
              isFeched:false,
          });
      case RECEIVE_CAROUSEL_DATA:
          return Object.assign({},{
              isFeching:false,
              isFeched:true,
              data:action.data
          });
      default :
          return state
  }
}

function postImgData(state = {},action = {}){

    switch (action.type){
        case REQUEST_IMG_DATA:
            return Object.assign({},{
                isFeching:true,
                isFeched:false,
                data:state.data?state.data:null
            });
        case RECEIVE_IMG_DATA:
            let datas = null;
              datas = action.data
            if(!state.data){
               datas = action.data
            }else{
                datas = state.data
            }
            if(state.data){
                action.data.data.map((val,index) => {
                    datas.data.push(val)
                })
            }

            return Object.assign({},{
                isFeching:false,
                isFeched:true,
                data:datas
            });
        default :
            return state
    }
}




export default {
    postCarouselData,
    postImgData
}