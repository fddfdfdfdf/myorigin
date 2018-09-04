import React, {Component, PropTypes} from 'react';

import '../../Style/head'

class Header  extends Component {
    constructor(){
        super();
    }
    render(){
        let status = this.props.status;
        switch (status){
            case ('home'):
                return (
                    <div className="header">
                        <div className="header_contain">
                             <div className="header_left">
                                 <div className="head_img"></div>
                             </div>
                             <div className="header_center">
                                 <div className="head_img"></div>
                                 <input placeholder="请输入您要搜索的商品" type="text"/>
                             </div>
                             <div className="header_right">
                                 <div className="head_img head_img_right0"></div>
                                 <div className="head_img head_img_right1"></div>
                             </div>
                        </div>
                    </div>
                )
                break;
        }
    }
}
export default Header