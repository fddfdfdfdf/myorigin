import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import './alert.css';
import {fetchPosts,showComfirm,hideComfirm} from '@/store/home/action';
export default class Alert extends Component{
  constructor(props){
    super(props)
  }
  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  isOk(status){
      let {dispatch} = this.props;
      if(status){
         dispatch(showComfirm("click"))
      }else{
          dispatch(hideComfirm())
      }
  }
  render(){
    let {commonComfirm} = this.props;
    return (
      <div className="commonAlert" style={{display:commonComfirm.show?"table":"none"}}>
        <div>
          <div>
              {commonComfirm.text}
          </div>
          <div>
            <div onClick={this.isOk.bind(this,true)}>true</div><div onClick={this.isOk.bind(this,false)}>quit</div>
          </div>
        </div>
      </div>
    );
  }
}