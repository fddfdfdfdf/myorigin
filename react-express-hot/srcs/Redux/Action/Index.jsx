import { fetch } from  '../../Config/Config.js';//引入默认配置

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        fetch(`https://www.reddit.com/r/${subreddit}.json` ,'get',{})
            .then(data =>
                dispatch(receivePosts(subreddit, data))
            ).catch(err =>{
                console.log(err)
            });
    }
}



export function fetchPostsIfNeeded(subreddit) {
    return dispatch => {
       return dispatch(fetchPosts(subreddit))
    }
}