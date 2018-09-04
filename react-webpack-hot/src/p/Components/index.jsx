import React, {Component} from "react";

export default class Index extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.location)//fds
    }
    render() {
        return (
            <div>
                <div>Index</div>
            </div>
        );
    }
}