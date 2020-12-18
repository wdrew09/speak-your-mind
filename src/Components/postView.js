import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

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

    return (
        <div>
            Posts
            {postsList.map((post) => (
                <div key={post._id}>
                    <div>{post.title}</div>
                    <div>{post.content}</div>
                    <br/>
                    <br/>
                </div>
            ))}
            End Posts
        </div>
    )
}

export default PostView