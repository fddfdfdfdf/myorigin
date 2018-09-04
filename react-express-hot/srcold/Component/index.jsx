import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CarouselData ,ImgLists} from '../Redux/Action/Index'

import Footer from './common/Footer'
import Header from './common/Header'
import Carousel from './common/Carousel'
import Loading from './common/Loading'
import SubBar from './common/SubBar'

import '../Style/home'


class AsyncApp extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {dispatch} = this.props
        dispatch(CarouselData('/shop/banner','get',{}))
        dispatch(ImgLists('/shop/imgLists','get',{}))
        let footer = this.refs.footer
        let _this = this
        this.state =  {
            scropTop:0
        }
        function callback(){
            let top = footer.getBoundingClientRect().top;
            let windowHeight = window.screen.height;

            if(top && Math.floor(top)<= windowHeight){
                _this.setState({
                    scropTop:_this.getScrollTop()
                })
                document.body.scrollTop != 0? document.body.scrollTop = _this.getScrollTop(): document.documentElement.scrollTop = _this.getScrollTop();
                dispatch(ImgLists('/shop/imgLists','get',{}))
            }
            // console.log(top+'----'+windowHeight)
        }
        window.addEventListener("scroll",()=>{
            callback()
        },false);
    }
    componentDidUpdate(){
        let {scropTop} = this.state
        // if(document.documentElement&&document.documentElement.scrollTop)
        // {
        //     document.documentElement.scrollTop = scropTop;
        // }else{
            document.body.scrollTop != 0? document.body.scrollTop = scropTop: document.documentElement.scrollTop = scropTop;
        // }

    }
   getScrollTop() {
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
            scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let {postCarouselData,postImgData} = this.props
        return (
            <div className="home">
                <Header status = 'home'/>
                {
                    !postCarouselData.isFeching && !postCarouselData.isFeched &&  <Loading/>
                }
                {
                    !postCarouselData.isFeching && postCarouselData.isFeched &&
                    <div className='sub'>
                        <Carousel interval={100} number={4} boxStyle="content" interval={4000}  data={postCarouselData.data.data}/>
                        <SubBar htmlData={postCarouselData.data.subData}/>
                    </div>
                }
                <ul className="imgList">
                    {
                        !postImgData.isFeching && postImgData.isFeched && (
                            postImgData.data.data.map((val,key)=>{
                                return <li key={key}><img src={val.url} alt=""/></li>
                            })
                        )
                    }
                    }
                </ul>
                <Footer />
                <div ref="footer"></div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    let  {isFeching,isFeched,postCarouselData,postImgData} = state
    return {
        isFeching,
        isFeched,
        postCarouselData,
        postImgData
    }
}

export default connect(mapStateToProps)(AsyncApp)