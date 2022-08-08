const Total = ( props ) => {
    let total = 0;
    function sum () {
        props.excercises.forEach((excercise) => {
            total += excercise;
        })
        return total;
    }
    
    return (
        <p>{sum()}</p>
    )
}

export default Total;