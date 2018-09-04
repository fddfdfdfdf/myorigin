import React, { Component } from 'react';//react
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
//引入自己包
import Store  from "./Stores/store";
import Routers from  "./Routers/routers"


let divEle = document.createElement('div');
let Stores = Store();
divEle.setAttribute('class','mobile_contain');

ReactDOM.render(
    <Provider store={Stores}>
        <Routers/>
    </Provider>,
    document.body.appendChild(divEle)
);