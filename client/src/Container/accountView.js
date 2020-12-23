import React, { useState } from 'react'
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import MyInfo from '../Components/myInfo'
import MyLikes from '../Components/myLikes'
import MyPosts from '../Components/myPosts'

import { ButtonGroup, Button } from 'react-bootstrap';

const AccountView = props => {
    const [pageType, setPageType] = useState('likes')

    const PageToRender = (props) => {
        if (props.pageType == "likes") {
            return (<MyLikes />)
        } else if (props.pageType == 'posts') {
            return (<MyPosts />)
        } else {
            return (<MyInfo />)
        }
    }

    return (
        <div>
            <ButtonGroup aria-label="Basic example" style={{marginLeft: '15%', marginBottom: '15px'}}>
                <Button variant="secondary" onClick={() => setPageType('likes')}>My Likes</Button>
                <Button variant="secondary" onClick={() => setPageType('posts')}>My Posts</Button>
                <Button variant="secondary" onClick={() => setPageType('account')}>My Info</Button>
            </ButtonGroup>
            <PageToRender pageType={pageType} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);
