import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

import { Dropdown } from 'react-bootstrap';

// import styles from 

const PostView = props => {
    const [postsList, setPostsList] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const [dislikedPosts, setDislikedPosts] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        axiosInstance.get('posts/')
            .then(response => {
                if (response.data.length > 0) {
                    console.log(response.data)
                    setPostsList(response.data)
                } else {
                    console.log('error retrieving posts')
                }
            })
        getLikedAndDisliked()
    }, [])

    const getLikedAndDisliked = () => {
        axiosInstance.post('account/info', {
            userId: props.userId
        })
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    setLikedPosts(response.data.user.likedPosts)
                    setDislikedPosts(response.data.user.dislikedPosts)
                } else {
                    console.log('error retrieving user info')
                }
            })
    }

    const postFilter = (filterType) => {
        let unfilteredList = postsList
        console.log(filterType)
        if (filterType == 'popular') {
            console.log('pop')
            unfilteredList.sort((a, b) => { return (a.likes - b.likes) })
        } else if (filterType == 'contraversal') {
            unfilteredList.sort((a, b) => { return (a.dislikes - b.dislikes) })
        } else if (filterType == 'oldest') {
            unfilteredList.sort((a, b) => { return (new Date(a.date) - new Date(b.date)) })
        } else if (filterType == 'newest') {
            unfilteredList.sort((a, b) => { return (new Date(b.date) - new Date(a.date)) })
        }
        setPostsList(unfilteredList)
        setRender(!render)
    }

    const likePost = (postId) => {
        axiosInstance.patch('/posts/like/' + postId, {
            userId: props.userId,
            token: props.token,
            postId: postId
        }).then(() => {
            getLikedAndDisliked()
        })
    }

    const dislikePost = (postId) => {
        axiosInstance.patch('/posts/dislike/' + postId, {
            userId: props.userId,
            token: props.token,
            postId: postId
        }).then(() => {
            getLikedAndDisliked()
        })
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => postFilter('popular')}>Popular</Dropdown.Item>
                    <Dropdown.Item onClick={() => postFilter('contraversal')}>Contraversal</Dropdown.Item>
                    <Dropdown.Item onClick={() => postFilter('oldest')}>Oldest First</Dropdown.Item>
                    <Dropdown.Item onClick={() => postFilter('newest')}>Newest First</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            Posts
            {postsList.map((post) => (
                <div key={post._id}>
                    <div>{post.title}</div>
                    <div>{post.content}</div>
                    <div>{post._id}</div>
                    <div><button onClick={() => likePost(post._id)}>Like</button>{likedPosts.indexOf(post._id) > -1 && <div>I like this post</div>}</div>
                    <div><button onClick={() => dislikePost(post._id)}>Dislike</button>{dislikedPosts.indexOf(post._id) > -1 && <div>I dislike this post</div>}</div>
                    <br />
                    <br />
                </div>
            ))}
            End Posts
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        username: state.auth.username,
        token: state.auth.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);