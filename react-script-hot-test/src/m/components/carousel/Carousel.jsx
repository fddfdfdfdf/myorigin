import React, { Component } from 'react';

import './carousel.css';

export default class Carousel extends Component {
    constructor (props){
        super(props);
        this.isStart = "";
        this.opStart = "";
        this.iNow = 0,
        this.state={
            timer:this.props.timer,
            imgArr:this.props.imgArr,
            lens:this.props.imgArr.length
        };
    }
    updateCurrentID(iNow,imgLens,domImgs,domBtns){
        let opcitySpeed = 0;
        let currentId = iNow;
        let _this = this;
        if(!domImgs){
            clearInterval(_this.isStart)
            clearInterval(_this.opStart)
            _this.updateImg()
            return false;
        }
        domImgs.childNodes[currentId].style.display = "none";
        if(currentId==imgLens-1){
            _this.iNow = 0;
            domImgs.childNodes[0].style.opacity = opcitySpeed;
            domBtns.childNodes[currentId].setAttribute("class","");
            domBtns.childNodes[0].setAttribute("class","carousel_active")
        }else{
            _this.iNow = currentId+1;
            domImgs.childNodes[currentId+1].style.opacity = opcitySpeed;
            domBtns.childNodes[currentId].setAttribute("class","");
            domBtns.childNodes[currentId+1].setAttribute("class","carousel_active")
        }
       _this.opStart = setInterval(function(){
           opcitySpeed += .05;
           if(currentId==imgLens-1){
               domImgs.childNodes[0].style.opacity= opcitySpeed
               domImgs.childNodes[0].style.display = ""
           }else{
               domImgs.childNodes[currentId+1].style.display = ""
               domImgs.childNodes[currentId+1].style.opacity =   opcitySpeed
           }
           if(opcitySpeed>1){
               clearInterval(_this.opStart)
               if(currentId==imgLens-1){
                   domImgs.childNodes[0].style.opacity= 1
               }else{
                   domImgs.childNodes[currentId+1].style.opacity =   1
               }
           }

        },30);
    }
    updateImg(){
        let _this = this;
        let timers = this.state.timer;
        _this.isStart=setInterval(()=>{
            clearInterval(_this.opStart)
            _this.updateCurrentID(_this.iNow,_this.state.lens,_this.refs.carouselImgs,_this.refs.carouselBtns)
        },timers);
    }
    showCurrentImg(index,lens,domImgs,domBtns){
        for(let i=0;i<lens;i++){
          if(i === index){
              domBtns.childNodes[i].setAttribute("class","carousel_active")
              domImgs.childNodes[i].style.display = "";
          }else{
              domBtns.childNodes[i].setAttribute("class","");
              domImgs.childNodes[i].style.display = "none";
          }
        }
    }
    componentDidMount(){
        this.updateImg()
    }
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = ()=>{
            return;
        };
    }
    switchImg(index){
        clearInterval(this.isStart)
        clearInterval(this.opStart)
        this.showCurrentImg(index,this.state.lens,this.refs.carouselImgs,this.refs.carouselBtns)
        this.iNow = index;
        let _this = this;
        setTimeout(()=>{
            clearInterval(this.isStart)
            clearInterval(this.opStart)
            _this.updateImg()
        },500)
    }
    render(){
           let currentId = this.iNow;
            return (
                <div className="carousel">
                    <div ref="carouselImgs" className="carousel_imgs">
                        {
                            this.props.imgArr.map((val,index)=>{
                                if(index == currentId){
                                    return <a key={index.toString()}  style={{opcity:1}} href=""><img src={val.url} alt={index.toString()} /></a>
                                }else{
                                    return  <a  key={index.toString()} href="" style={{display:'none'}}><img src={val.url} alt={index.toString()}/></a>
                                }
                            })
                        }
                    </div>
                    <ul ref="carouselBtns" className="carousel_btns">
                        {
                            this.props.imgArr.map((val,index)=>{
                                if(index == currentId){
                                    return <li  key={index.toString()} onMouseOver={this.switchImg.bind(this,index)} onClick={this.switchImg.bind(this,index)} className="carousel_active"></li>
                                }else{
                                    return <li  key={index.toString()} onMouseOver={this.switchImg.bind(this,index)} onClick={this.switchImg.bind(this,index)}></li>
                                }
                            })
                        }
                    </ul>
                </div>
            );
        }
    }





