import { Router, Route, IndexRoute ,Link } from 'react-router'
import React, {Component} from "react";
import { hashHistory } from 'react-router'

const  Home = (location,cb) => {
    require.ensure([], require => {
        cb(null, require('../Components/home').default);//reat-router3 必须加default
    }, 'home');
}
const  Index = (location,cb) => {
    require.ensure([], require => {
        cb(null, require('../Components/index').default);//reat-router3 必须加default
    }, 'index');
}

const NotFound = (location,cb) => {
    require.ensure([], require => {
        cb(null, require('../Components/error').default);//reat-router3 必须加default
    }, 'error');
}


// import  Index from '../Components/index';
// import  Home from '../Components/home';
class App extends Component {
    render() {
        return (
            <div>
                <Link to="/index">INDEX</Link><br/>
                <Link to="/home">HOME</Link>
                {this.props.children}
            </div>
        );
    }
}
export default class Routes extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Index}/>
                    <Route path='/index' getComponent={Index}/>
                    <Route path='/home' getComponent ={Home}/>
                    <Route path='*' getComponent={NotFound}/>
                </Route>
            </Router>
        )
    }
}
