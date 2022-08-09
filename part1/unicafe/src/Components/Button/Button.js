import React, { useState } from 'react';

const Button = (props) => {

    return (
        <div>
            <button onClick={props.onClick} >{props.text}</button>
        </div>
    )
}

export default Button;