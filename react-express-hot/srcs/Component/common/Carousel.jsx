import React, {Component, PropTypes} from 'react';
import '../../Style/Carousel'



class Carousel extends Component {
    constructor(props){
        super(props)
        let allLens = this.props.data.length;
        let btnData = [];
        for(var i= 0; i<allLens-1; i++){
            if(i == 0){
                btnData.push('banner_btn_active')
            }else{
                btnData.push('')
            }
        }
        this.state = {
            allWidth:allLens*100,
            detailWidth :100/allLens,
            left:0,
            init:6,
            delay:2000,
            removeDis:5,
            btnData:btnData
        }
    }

   Carousel(init,isStart){
       //轮播的实现
       let {left,delay,removeDis,allWidth,btnData} = this.state
       let _this = this;
       setTimeout(function () {
           left = left*1 - removeDis
           _this.setState({
               left:left
           })
           if(-(left%100) == 0){
               if(-left == (allWidth-100)){
                   setTimeout(function () {
                       _this.setState({
                           left:0,
                           btnData:currentBtn(0,btnData.length)
                       })
                       setTimeout(function () {
                           _this.Carousel(init,true)
                       },delay)
                   },delay)
               }else{
                    if(-left == (allWidth-200)){
                        setTimeout(function () {
                            _this.Carousel(init,false)
                            // console.log(-(left/100)+1)
                            _this.setState({
                                btnData:currentBtn(0,btnData.length)
                            })
                        },delay)
                    }else{
                        setTimeout(function () {
                            _this.Carousel(init,false)
                            // console.log(-(left/100)+1)
                            _this.setState({
                                btnData:currentBtn(-(left/100)+1,btnData.length)
                            })
                        },delay)
                    }
               }
           }else{
               if(isStart){
                   _this.setState({
                       btnData:currentBtn(1,btnData.length)
                   })
               }
               _this.Carousel(init,false)
           }
       },init)
       function currentBtn(current,len) {
           let newBtns = [];
           for(var i= 0 ; i<len ; i++){
               if(i == current){
                   newBtns.push('banner_btn_active')
               }else{
                   newBtns.push('')
               }
           }
          return newBtns
       }
   }

    componentDidMount() {
        let {init,delay} = this.state
        let _this = this;
        this.isFirst = true;
        if(!this.isFirst)return;
        setTimeout(function () {
            _this.isFirst = true;
            _this.Carousel(init,true)
        },delay)
    }
    componentWillUnmount() {
        this.isFirst= false
    }
    render(){
        let {data} = this.props;
        let {allWidth,detailWidth,left,btnData} = this.state

        return (
            <div className="banner_lists">
                <div className="banner_list" style={{width:`${allWidth}%`,left:`${left}%`}}>
                    {
                        data.map(function (item,index) {
                            return <a key={index} href="" style={{width:detailWidth+'%'}}><img src={item.url} alt=""/></a>
                        })
                    }
                </div>
                <div className="banner_btns">
                    {
                        btnData.map(function (item,index) {
                            return <div key={index} className={`banner_btn ${item}`}></div>
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Carousel