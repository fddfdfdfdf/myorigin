import React, { Component } from 'react';
import {loginEdStatus} from '@/store/home/action';
import CommonConnects from '@/common/commonConnect';
import { is, fromJS } from 'immutable';
import './helpcenter.css';

 class HelpCenter extends Component {
  constructor(props){
      super(props);
      this.state = {
          dd:"fdsf"
      }
  }

  componentWillMount(){
      loginEdStatus(this.props.dispatch)
  }

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render(){
      console.log(this.props.loginStatus)
    return (
      <div>
          {
              this.props.loginStatus?<div>logined</div>:<div>nologin</div>
          }
      </div>
    )
  }
}
export default CommonConnects({
    id:"fds",
    url:"fds",
    component:HelpCenter
})