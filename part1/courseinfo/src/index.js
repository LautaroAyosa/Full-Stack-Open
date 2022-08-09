import React from 'react'
import ReactDOM from 'react-dom/client'

import Total from "./Components/Total/Total";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content"


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

export default App