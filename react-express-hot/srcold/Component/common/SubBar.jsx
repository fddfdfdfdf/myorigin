import React, {Component, PropTypes} from 'react';

import "../../Style/subBar"

class SubBar extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let { htmlData } = this.props
        return (
            <div className="subBaner" dangerouslySetInnerHTML={{__html:htmlData}}>

            </div>
        )
    }
}
export default SubBar