import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import API from '@/uploadRqApi/api';
import { saveFormData, saveImg, clearData } from '@/store/home/action';
import { clearSelected } from '@/store/production/action';
import PublicHeader from '@/components/header/header';
import PublicAlert from '@/components/alert/alert';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import PublicFooter from '@/components/footer/footer';
import PublicCarousel from '@/components/carousel/Carousel';

import './home.css';

class Home extends Component {

  constructor(props){
   super(props);

  }
  addEle(obj,str){
        var regex =new RegExp('<script.*?>(.*?)<\/script>','ig');
        var result ;
        var strs = "";
        var ele = document.createElement("script");
        ele.type="text/javascript";
        if(regex.test(str)){
            result = str.replace(regex,"`$1`").split("`");
            for(let i = 0 ,lens = result.length; i < lens ; i++){
                if(i % 2 != 0 ){
                    strs += result[i]+";";
                }
            }
            ele.innerHTML = strs;
            obj.innerHTML= str.replace(regex,"");
            obj.appendChild(ele);
        }else{
            obj.innerHTML= str;
        }
        }
  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

  componentDidMount(){
     this.addEle(this.refs.tt,"<style>#dd{color:red}</style><script type='text/javascript'><\/script><div id='dd'>fdsfdsfds</div><script></script></div>")
  }

  shouldComponentUpdate(nextProps, nextState) {
      return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount(){

  }


  render() {
    return (
      <div className="home-container">
          <PublicHeader title='首页' record />
          <PublicCarousel timer={2000}
                          imgArr= {
                              [
                               {
                                   type:"webp",
                                   url:"http://localhost/images/1.jpg",
                                   name:"1",
                               },
                                  {
                                      type:"webp",
                                      url:"http://localhost/images/2.jpg",
                                      name:"2",
                                  },
                                  {
                                      type:"webp",
                                      url:"http://localhost/images/3.jpg",
                                      name:"3",
                                  },
                               ]
                           }
          />
          <div ref="tt"></div>
          <Link to={{ pathname: '/production', search: '?sort=name', state: { price:16} }} >fdsfs</Link>
          <PublicFooter/>
      </div>
    );
  }
}

export default connect(state => ({
  formData: state.formData,
  proData: state.proData,
}), {
  saveFormData, 
  saveImg,
  clearData,
  clearSelected,
})(Home);
