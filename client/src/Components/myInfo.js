import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

const MyInfo = props => {
    const [user, setUser] = useState()

    useEffect(() => {
        axiosInstance.post('account/info', {
            userId: props.userId
        })
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log(response.data.user)
                    setUser(response.data.user)
                } else {
                    console.log('error retrieving user info')
                }
            })
    }, [])


    return (
        <div>
            my info
        </div>
    )
}

export default MyInfo