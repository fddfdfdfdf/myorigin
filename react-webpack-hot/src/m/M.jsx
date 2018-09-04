import React, { Component } from 'react';//react
import ReactDOM from 'react-dom';//react-dom
// import { Router, Route, Link, Switch } from 'react-router';
import {createStore, applyMiddleware,compose} from "redux";
import thunkMiddleware from "redux-thunk";
// import createHistory from 'history/createMemoryHistory';
import {  routerReducer, routerMiddleware } from 'react-router-redux'
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {fromJS} from 'Immutable';//immutable
// console.log(createStore);
// console.log(createHistory);
// console.log(thunkMiddleware);//fds
// console.log(routerMiddleware);
class App extends Component {
    render() {
        let dd="fdfsd";
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to='/' replace>Home</Link></li>
                    <li><Link to="/about" replace>About</Link></li>
                    <li><Link to={{ pathname: '/inbox/dd/fdsf',
                        search: `?sort=${dd}`,
                        hash: '#the-hash',
                        state: {
                            fromDashboard: true,
                            dd:"fdssd"
                        }
                    }} replace>
                        index</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

const About = () => (
    <div>
        <h3>About</h3>
    </div>
)

const Home = () => (
    <div>
        <h3>Home</h3>
    </div>
)



class MessageContain extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}


const Message = ({ match }) => (
    <div>
        <h3>new messages</h3>
        <h3>{JSON.stringify(match.params)}</h3>
    </div>
)

class MessageIndex extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.location)//fds
    }
    render() {
        return (
            <div>
                <div>MessageIndex</div>
            </div>
        );
    }
}


const Inbox = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <MessageContain>
            <Route exact path={`${match.url}/`} component={Home} />
            <Route path={`${match.url}/dd/:ff`} component={MessageIndex}/>
            <Route path={`${match.url}/messages/:id?`} component={Message}/>
        </MessageContain>
    </div>
)
let divEle = document.createElement('div');
divEle.setAttribute('class','mobile_contain')
ReactDOM.render(
    (<HashRouter>
        <App>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/inbox" component={Inbox} />
        </App>
    </HashRouter>),
    document.body.appendChild(divEle)
);

