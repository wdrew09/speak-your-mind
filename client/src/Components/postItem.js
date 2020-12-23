import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartBroken, faHeart } from '@fortawesome/free-solid-svg-icons'

import { Card, Button } from 'react-bootstrap';

const PostItem = props => {
    const {
        postId,
        title,
        content,
        author,
        likes,
        dislikes,
        userLikes,
        userDislikes,
        userId,
        token
    } = props

    const [initialLikes, setInitialLikes] = useState()
    const [initialDislikes, setInitialDislikes] = useState()
    const [liked, setLiked] = useState([])
    const [disliked, setDisliked] = useState([])

    //Initialized state with prop values
    useEffect(() => {
        setLiked(userLikes)
        setDisliked(userDislikes)
        setInitialLikes(userLikes)
        setInitialDislikes(userDislikes)
    }, [userLikes, userDislikes])

    //When a user presses like button
    const likePost = () => {
        axiosInstance.patch('/posts/like/' + postId, {
            userId: userId,
            token: token,
            postId: postId
        })
        if (liked.indexOf(postId) > -1) {
            let newArray = liked.filter(val => val !== postId)
            setLiked(newArray)
        } else {
            setLiked([...liked, postId])
        }
    }

    //When a user presses dislike button
    const dislikePost = () => {
        axiosInstance.patch('/posts/dislike/' + postId, {
            userId: userId,
            token: token,
            postId: postId
        })
        if (disliked.indexOf(postId) > -1) {
            let newArray = disliked.filter(val => val !== postId)
            setDisliked(newArray)
        } else {
            setDisliked([...disliked, postId])
        }
    }

    //Determining if user has liked a post to figure out the color
    const isLiked = () => {
        if (liked.indexOf(postId) > -1) {
            return 'red'
        }
        return 'gray'
    }

    //Determining if user has disliked a post to figure out the color
    const isDisliked = () => {
        if (disliked.indexOf(postId) > -1) {
            return 'red'
        }
        return 'gray'
    }

    //Finding the total likes a post has
    const likeCount = () => {
        if (initialLikes && liked) {
            if (initialLikes.indexOf(postId) > -1 && liked.indexOf(postId) < 0) {
                return likes - 1
            } else if (initialLikes.indexOf(postId) < 0 && liked.indexOf(postId) > -1) {
                return likes + 1
            } else {
                return likes
            }
        }
    }

    //Finding the total dislikes a post has
    const dislikeCount = () => {
        if (initialDislikes && disliked) {
            if (initialDislikes.indexOf(postId) > -1 && disliked.indexOf(postId) < 0) {
                return dislikes - 1
            } else if (initialDislikes.indexOf(postId) < 0 && disliked.indexOf(postId) > -1) {
                return dislikes + 1
            } else {
                return dislikes
            }
        }
    }

    return (
        <div>
            <Card>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
                <Card.Text style={{ marginLeft: '15px' }}>
                    <button onClick={() => likePost()} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}><FontAwesomeIcon icon={faHeart} color={isLiked()} /></button>
                    {likeCount()}
                    <button onClick={() => dislikePost()} style={{ backgroundColor: 'transparent', border: 'none', marginLeft: '10px', outline: 'none' }}><FontAwesomeIcon icon={faHeartBroken} color={isDisliked()} /></button>
                    {dislikeCount()}
                </Card.Text>
                <footer className="blockquote-footer" style={{ padding: '10px' }}>
                    <span>{author}</span>
                </footer>
            </Card>
        </div>
    )
}

export default PostItem