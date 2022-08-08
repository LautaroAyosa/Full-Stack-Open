const Total = ( props ) => {
    let total = 0;
    function sum () {
        props.parts.forEach((part) => {
            total += part.exercises;
        })
        return total;
    }
    
    return (
        <p>{sum()}</p>
    )
}

export default Total;