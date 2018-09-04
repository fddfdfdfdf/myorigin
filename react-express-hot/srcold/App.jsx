import "babel-polyfill";
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import route from './Router/Route'; //路由配置
import configureStore from './Redux/Store/Store';
import './Config/Config.js';//引入默认配置

//引入初始化样式
import './Style/init.css';
import './Style/app';

// store.subscribe(() => { //监听state
//   //  console.log(store.getState())
// });
const store = configureStore()

let divEle = document.createElement('div');
    divEle.setAttribute('class','mobile_contain')
render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(divEle)
);

