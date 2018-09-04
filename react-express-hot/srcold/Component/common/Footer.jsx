import React, {Component, PropTypes} from 'react';

import "../../Style/footer"

class Footer extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="footer">
                Copyright © {time}个人娱乐版权所有
            </div>
        )
    }
}
export default Footer