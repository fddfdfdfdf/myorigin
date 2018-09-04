import React,{Component} from "react";

export default class Error extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.location)//fds
    }
    render() {
        return (
            <div>
                <div>error</div>
            </div>
        );
    }
}

