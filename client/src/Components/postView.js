import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

import { Dropdown } from 'react-bootstrap';

// import styles from 

const PostView = props => {
    const [postsList, setPostsList] = useState([])

    useEffect(() => {
        axiosInstance.get('posts/')
            .then(response => {
                if (response.data.length > 0) {
                    setPostsList(response.data)
                } else {
                    console.log('error retrieving posts')
                    // setAuthorized(false)
                }
            });
    }, [])

    const postFilter = (filterType) => {
        let unfilteredList = postsList
        if (filterType == 'popular') {  
            unfilteredList.sort((a, b) => (a.likes > b.likes))
        } else if (filterType == 'contraversal') {
            unfilteredList.sort((a, b) => (a.dislikes > b.dislikes))
        } else if (filterType == 'oldest') {
            unfilteredList.sort((a, b) => (a.date > b.date))
        } else if (filterType == 'newest') {
            unfilteredList.sort((a, b) => (a.date < b.date))
        }
    }

    const likePost = (postId) => {
        console.log(props.token)
        axiosInstance.patch('/posts/like/' + postId, {
            userId: props.userId,
            token: props.token
        }).then(response => {
            console.log(response)
        })

    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
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
                    <button onClick={() => likePost(post._id)}>Like</button>
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