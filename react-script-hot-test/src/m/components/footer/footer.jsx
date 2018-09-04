import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import './footer.css';

export default class PublicFooter extends Component{
  constructor(){
    super();
    this.state = {

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
  }

  render(){
    return(
        <div className="footer">
          <div>
              <NavLink to="/" exact className=""><div><i className="fa fa-home fa-fw"></i><div className="m_name">首页</div></div></NavLink>
              <NavLink to="/shoplist"><div><i className="fa fa-list fa-fw"></i><div className="m_name">分类</div></div></NavLink>
              <NavLink to="/search" ><div><i className="fa fa-safari fa-fw"></i><div className="m_name">发现</div></div></NavLink>
              <NavLink to="/shopcart"><div><i className="fa fa-shopping-cart fa-fw"></i><div className="m_name">购物车</div><div className="cart_num">20</div></div></NavLink>
              <NavLink to="/center"><div><i className="fa fa-user-o fa-fw"></i><div className="m_name">我的</div></div></NavLink>
          </div>
        </div>
    );
  }
}