const Part = ( props ) => {
    
    return (
        <p key={props.i}>{props.name} {props.exercises}</p>
    )
}

export default Part;