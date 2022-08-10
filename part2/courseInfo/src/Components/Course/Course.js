import React from 'react';

import Header from './Header/Header';
import Content from './Content/Content';
import Total from './Total/Total';

const Course = ( props ) => {
    
    return (
        <div>
            {props.courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header course={course} />
                        <Content course={course} />
                        <Total course={course} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course;