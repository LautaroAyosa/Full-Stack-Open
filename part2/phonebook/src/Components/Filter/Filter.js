import React from 'react';

const Filter = (props) => {

    return (
        <div>{props.label} <input onChange={props.handleFilterChange} value={props.filter} /></div>
    )
}

export default Filter;