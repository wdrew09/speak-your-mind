import React from 'react'
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

const AccountView = props => {
    return (
        <div>
            {props.username}
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
