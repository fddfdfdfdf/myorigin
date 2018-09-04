import React, {Component, PropTypes} from 'react';
import '../../Style/Carousel'


let startX;
let clearId = '';
let clearInerId = '';
let isDely = true ;
let isFirst = true;
let isStart = false;
class Carousel extends Component {
    constructor(props){
        super(props)
        let allLens = this.props.data.length;
        let btnData = [];
        for(var i= 0; i<allLens-2; i++){
            if(i == 0){
                btnData.push('banner_btn_active')
            }else{
                btnData.push('')
            }
        }
        this.state = {
            allWidth:allLens*100,
            detailWidth :100/allLens,
            lens:allLens-2,
            left:-100,
            delay:2000,
            interTime:100,
            removeDis:5,
            btnData:btnData,
            current:0
        }
    }
    Carousel(status){let{interTime,delay,removeDis}=this.state
        let _this=this;let startNum=0;if(status=='left'){startNum=1;}else{startNum=-1;}
        if(status=='init'){clearId=setInterval(()=>{let{left,lens,current}=_this.state
            if(Math.abs(left%100)){isDely=true}
            _this.setState({btnData:currentBtn(current,lens)})
            if(Math.abs(left%100)==0&&isDely){if(isFirst){isFirst=false;clearInerId=setInterval(()=>{carouselInterval(removeDis,startNum);isDely=false;isFirst=true;_this.setState({current:current*1+1})
                if(Math.abs(left/100)==lens){_this.setState({current:0,btnData:currentBtn(0,lens)})}
                if(Math.abs(left/100)==lens+1){_this.setState({left:-100,current:1})}
                clearInterval(clearInerId)},delay)}else{return;}}else{carouselInterval(removeDis,startNum);}},interTime)}else{let{current,lens,left}=_this.state
            if(startNum>0&&current==0){_this.setState({current:lens,left:-lens*startNum*100,btnData:currentBtn(lens-1,lens)})}else if(startNum<0&&current==lens-1){_this.setState({current:0,left:-100,btnData:currentBtn(0,lens)})}else{if(startNum<0){_this.setState({current:current*1-startNum,left:-(current*1+2)*100,btnData:currentBtn(current*1+1,lens)})}else{if(current==lens){_this.setState({current:current-1-startNum,left:-(current*1-1)*100,btnData:currentBtn(current*1-2,lens)})}else{_this.setState({current:current-startNum,left:-current*100,btnData:currentBtn(current*1-1,lens)})}}}}
        function carouselInterval(rvm,startN){if(isStart){isStart=false
            return}
            let{left}=_this.state
            _this.setState({left:left*1+rvm*startN})}
        function currentBtn(current,len){let newBtns=[];for(var i=0;i<len;i++){if(i==current){newBtns.push('banner_btn_active')}else{newBtns.push('')}}
            return newBtns}
    }
    touchStart(event) {
        isStart = true
        startX = event.changedTouches[0].pageX;
    }
    touchEnd(event) {
        event.preventDefault();
        const endX = event.changedTouches[0].pageX;
        clearInterval(clearId)
        if (endX - startX > 20) {
            this.Carousel('left')
        } else if (startX - endX > 20) {
            this.Carousel('right')
        }
       let {delay} =  this.state
        setTimeout(()=>{
            this.Carousel('init')
        },delay)
    }
    componentDidMount() {
        this.isFirst = true
        if(this.isFirst){
            this.Carousel('init')
        }
    }
    componentWillUnmount() {
        this.isFirst = false
    }
    render(){
        let {data} = this.props;
        let {allWidth,detailWidth,left,btnData} = this.state
        return (
            <div className="banner_lists"
                 onTouchStart={this.touchStart.bind(this)}
                 onTouchEnd={(event) => this.touchEnd(event, 0)}
            >
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