import React from 'react';

const Notification = (props) => {


    return (
        <div>
            {props.message === "" ? "" :
                props.isError ? 
                <div className='error'>
                    {props.message}
                </div> 
                : 
                <div className='success'>
                    {props.message}
                </div>
            }
        </div>
        
    );
}

export default Notification