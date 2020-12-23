import React from 'react'

const MessagePage = props => {
    return (
        <div style={{marginLeft: '15%', fontSize: '20px'}}>
            {props.message}
        </div>
    )
}

export default MessagePage