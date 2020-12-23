import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

import { Dropdown } from 'react-bootstrap';

import PostItem from './postItem';

const MyLikes = props => {
    const [postsList, setPostsList] = useState([])
    const [user, setUser] = useState()
    const [render, setRender] = useState(false)

    // Retrieving posts on page load
    useEffect(() => {
        axiosInstance.get('posts/')
            .then(response => {
                if (response.data.length > 0) {
                    let sorted = response.data.sort((a, b) => { return (new Date(b.date) - new Date(a.date)) })
                    setPostsList(sorted)
                } else {
                    props.setAlert('Error retrieving posts...', 'error')
                }
            })
        getUserInfo()
    }, [])

    //Getting data for user
    const getUserInfo = () => {
        axiosInstance.post('account/info', {
            userId: props.userId
        })
            .then(response => {
                if (response.data.success) {
                    setUser(response.data.user)
                } else {
                    props.setAlert('Error retrieving user data...', 'error')
                }
            })
    }

    //Filter logic
    const postFilter = (filterType) => {
        let unfilteredList = postsList
        if (filterType === 'popular') {
            unfilteredList.sort((a, b) => { return (b.likes - a.likes) })
        } else if (filterType === 'contraversal') {
            unfilteredList.sort((a, b) => { return (b.dislikes - a.dislikes) })
        } else if (filterType === 'oldest') {
            unfilteredList.sort((a, b) => { return (new Date(a.date) - new Date(b.date)) })
        } else if (filterType === 'newest') {
            unfilteredList.sort((a, b) => { return (new Date(b.date) - new Date(a.date)) })
        }
        setPostsList(unfilteredList)
        setRender(!render)
    }

    return (
        <div className="PostView">
            <Dropdown style={{ marginBottom: '20px' }}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => postFilter('popular')}>Popular</Dropdown.Item>
                    <Dropdown.Item onClick={() => postFilter('contraversal')}>Contraversal</Dropdown.Item>
                    <Dropdown.Item onClick={() => postFilter('oldest')}>Oldest First</Dropdown.Item>
                    <Dropdown.Item onClick={() => postFilter('newest')}>Newest First</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {(postsList && user) &&
                (postsList.map((post) => (
                    (user.likedPosts.indexOf(post._id) > -1 &&
                        <div key={post._id}>
                            <PostItem
                                title={post.title}
                                content={post.content}
                                author={post.username}
                                likes={post.likes}
                                dislikes={post.dislikes}
                                postId={post._id}
                                userLikes={user.likedPosts}
                                userDislikes={user.dislikedPosts}
                                userId={props.userId}
                                token={props.token}
                            />
                            <br />
                            <br />
                        </div>
                    )
                )))
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(MyLikes);