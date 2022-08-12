import React from 'react'

function Filter(props) {

    const handleChange = (e) => {
        props.setFilter(e.target.value);
    }

    return (
        <div>
            {props.label} <input onChange={handleChange} value={props.filter} />
        </div>
    );
}

export default Filter;
