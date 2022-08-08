import Part from "./Part/Part";

const Content = ( props ) => {
    
    return (
        <div>
            <Part part={props.parts[0]} excercise={props.excercises[0]} />
            <Part part={props.parts[1]} excercise={props.excercises[1]} />
            <Part part={props.parts[2]} excercise={props.excercises[2]} />
        </div>
    )
}

export default Content;