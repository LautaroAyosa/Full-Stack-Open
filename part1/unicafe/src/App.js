import React from 'react'
import ReactDOM from 'react-dom'

import Total from "./Components/Total/Total";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content"


const App = () => {
  const course = 'Half Stack application development'
  const excercises = [10, 7, 14]
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']

  return (
    // <div>
    //   <h1>{course}</h1>
    //   <p>
    //     {part1} {exercises1}
    //   </p>
    //   <p>
    //     {part2} {exercises2}
    //   </p>
    //   <p>
    //     {part3} {exercises3}
    //   </p>
    //   <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    // </div>
    <div>
      <Header course={course} />
      <Content parts={parts} excercises={excercises} />
      <Total excercises={excercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App