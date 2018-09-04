import React, {Component, PropTypes} from 'react';

import "../../Style/loading"

class Loading extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="loading">
               数据加载中...
            </div>
        )
    }
}
export default Loading