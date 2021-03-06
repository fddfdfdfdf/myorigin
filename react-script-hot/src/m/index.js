import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import FastClick from 'fastclick';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from '@/store/store';
import './style/base.css';
import './assets/css/font-awesome.min.css';
FastClick.attach(document.body);

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

