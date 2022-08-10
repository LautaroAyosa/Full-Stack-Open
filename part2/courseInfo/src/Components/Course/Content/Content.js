import Part from "./Part/Part";

const Content = ( props ) => {
    
    return (
        <div>
            {props.course.parts.map((part, i) => {
                return <Part key={i} name={part.name} exercises={part.exercises} />
            })}
        </div>
    )
}

export default Content;