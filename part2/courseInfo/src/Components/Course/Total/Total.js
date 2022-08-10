const Total = ( props ) => {
    const total = props.course.parts.reduce((p, c) => p + c.exercises, 0);
    
    return (
        <strong>Total of {total} exercises</strong>
    )
}

export default Total;