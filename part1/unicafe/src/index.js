import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  let all = props.good + props.neutral + props.bad

  function average () {
    if ( all === 0 ) {
      return "Waiting for input...";
    } else {
      return (props.good - props.bad) / all
    }

  }
  function positive () {
    if ( all === 0 ) {
      return "Waiting for input...";
    } else {
      let positive = props.good / all * 100;
      return Math.round(positive) + "%"
    }
  }

  if (all === 0 ) {
    return "No feedback given";
  } else {
    return (
      <div>
          <p>Good: {props.good}</p>
          <p>Neutral: {props.neutral}</p>
          <p>Bad: {props.bad}</p>
          <p>All: {all}</p>
          <p>Average: {average()}</p>
          <p>Positive: {positive()}</p>
        </div>
    )
  }
}  


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function addGood () {
    setGood(good + 1);
  }
  function addNeutral () {
    setNeutral(neutral + 1);
  }
  function addBad () {
    setBad(bad + 1);
  }

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <div>
          <button onClick={addGood} >Good</button>
          <button onClick={addNeutral} >Neutral</button>
          <button onClick={addBad} >Bad</button>
        </div>
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)