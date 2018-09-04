import React,{Component} from "react";
import {connect} from "react-redux";
import { is, fromJS} from 'immutable';
import Alert from '@/components/alert/alert';
export default function CommonConnects(components){
    let seting = {
            id: '', //应用唯一id表示
            url: '', //请求地址
            data: {}, //发送给服务器的数据,
            component: components.component
      };
    class CommonConnect extends Component {
            static defaultProps = {seting};
            constructor(props,context) {
                super(props,context);
                this.state = {
                    ...seting
                }
            }
            componentDidMount() {//获取数据

            }
            componentWillReceiveProps(nextProps) {

            }
            shouldComponentUpdate(nextProps, nextState) {
                return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
            }
            render() {
                let {commonComfirm} = this.props;
                return (
                      <div>
                          <Alert {...this.props}/>
                          <this.props.seting.component {...this.props}/>
                      </div>
                    )
            }
        }
    function mapStateToProps(state) {
        const {formData, proData,loginStatus,commonComfirm} = state;
        return {
            formData,
            proData,
            loginStatus,
            commonComfirm
        }
    }
    return connect(mapStateToProps)(CommonConnect)
}