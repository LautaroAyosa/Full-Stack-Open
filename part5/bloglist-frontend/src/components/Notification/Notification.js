import React from 'react';

const Notification = (props) => {
    if (props.message === null) return null;
    else if (props.message.includes("Error!")) {
        return <div className='error'>{props.message}</div> 
    }
    return <div className='success'>{props.message}</div>
}

export default Notification