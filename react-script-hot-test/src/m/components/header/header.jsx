import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './header.css';

export default class PublicHeader extends Component{
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
  }
 constructor(){
    super();
    this.state = {
        navState: false, //导航栏是否显示
        searchText:"请输入搜索商品",
        login:false
    };
 }

  
  // 切换左侧导航栏状态
  toggleNav = () => {
    this.setState({navState: !this.state.navState});
  }
  // css动画组件设置为目标组件
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
  }

  render(){
    return(
      <header className="header">
          <div>
               <div><NavLink to="/search"><i className="fa fa-list fa-fw"></i></NavLink></div>
              <div><i className="fa fa-search fa-fw"></i><input placeholder={this.state.searchText} type="text"/></div>
               <div><NavLink to="search">
                   {this.state.login&&<i className="fa fa-user-o fa-fw"></i>}
                   {!this.state.login&&<span>登录</span>}
                   </NavLink>
               </div>
          </div>
      </header>
    );
  }
}