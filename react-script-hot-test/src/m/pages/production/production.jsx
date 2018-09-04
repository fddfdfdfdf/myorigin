import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import {fetchPosts,showComfirm,hideComfirm} from '@/store/home/action';
import CommonConnects from '@/common/commonConnect';
import './production.css';

class Production extends Component{

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  commonAler(){
      let {dispatch,commonComfirm} = this.props;
      if(commonComfirm.show){
          dispatch(hideComfirm())
      }else{
          dispatch(showComfirm("show"))
      }
  }
  componentWillMount(){
      let {dispatch} = this.props;
      dispatch(fetchPosts())
  }

  render(){

    return (
      <div className="common-con-top">
          {this.props.loginStatus&&this.props.loginStatus.dd?<div onClick={this.commonAler.bind(this)}>logined</div>:<div>none</div>}
      </div>
    )
  }
}


export default CommonConnects({
    id:"",
    url:"",
    data:"",
    component:Production
})