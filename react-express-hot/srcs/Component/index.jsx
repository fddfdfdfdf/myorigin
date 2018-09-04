import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from '../Redux/Action/Index'
import { fetch } from  '../Config/Config.js';//引入默认配置

import Picker from './Picker'
import Posts from './Posts'
import Footer from './common/Footer'
import Header from './common/Header'
import Carousel from './common/Carousel'

import '../Style/home'


class AsyncApp extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
        this.state = {
            data:null
        }
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
        fetch('/shop/shopLists' ,'get',{})
            .then((data)=>{
                    this.setState({
                        data:data
                    })
                }
            ).catch(err =>{
            console.log(err)
        });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps
            dispatch(fetchPostsIfNeeded(selectedSubreddit))
        }
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(selectSubreddit(nextSubreddit))
    }

    handleRefreshClick(e) {
        e.preventDefault()
        const { dispatch, selectedSubreddit } = this.props
        dispatch(invalidateSubreddit(selectedSubreddit))
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
        return (
            <div className="home">
                <Header status = 'home'/>
                {/*<Carousel data={}/>*/}
                {
                    this.state.data && <Carousel data={this.state.data.data}/>
                }




                        <Picker value={selectedSubreddit}
                                onChange={this.handleChange}
                                options={[ 'reactjs', 'frontend' ]} />
                        <p>
                        {lastUpdated &&
                        <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                            {' '}
            </span>
                }
                    }
                    {!isFetching &&
                    <a href='#'
                       onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
                {isFetching && posts.length === 0 &&
                <div>loading</div>
                }
                {!isFetching && posts.length === 0 &&
                <div>Empty.</div>
                }
                {posts.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                </div>
                }
                <Footer />
            </div>
        )
        console.log(this.state)
    }
}
function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)