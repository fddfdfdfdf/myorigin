import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/common/asyncComponent';


const home = asyncComponent(() => import(/* webpackChunkName: "home" */ "@/pages/home/home"));
const record = asyncComponent(() => import(/* webpackChunkName: "record" */ "@/pages/record/record"));
const helpcenter = asyncComponent(() => import(/* webpackChunkName: "helpcenter" */ "@/pages/helpcenter/helpcenter"));
const production = asyncComponent(() => import(/* webpackChunkName: "production" */ "@/pages/production/production"));
const balance = asyncComponent(() => import(/* webpackChunkName: "balance" */ "@/pages/balance/balance"));
const error = asyncComponent(() => import(/* webpackChunkName: "error" */ "@/common/error"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/record" component={record} />
          <Route path="/helpcenter" component={helpcenter} />
          <Route path="/production" component={production} />
          <Route path="/balance" component={balance} />
          <Route path="/404" component={error} />
          <Redirect from='*' to='/404' />
        </Switch>
      </HashRouter>
    )
  }
}
