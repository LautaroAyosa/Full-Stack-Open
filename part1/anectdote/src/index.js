import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0))

  const max = Math.max(...points);
  const index = points.indexOf(max);
  console.log(index);

  function votes () {
    let pointsCopy = [ ...points ];
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  }

  function randomQuote () {
    let max = anecdotes.length;
    let nextValue = Math.floor(Math.random() * max)
    setSelected(nextValue);
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {props.anecdotes[selected]}
          <p>Has {points[selected]} votes</p>
        </div>
        <div>
          <button onClick={votes} >Vote</button>
          <button onClick={randomQuote} >Random Anecdote</button>
        </div>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>
          {props.anecdotes[index]}
          <p>Has {points[index]} votes</p>
        </div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)