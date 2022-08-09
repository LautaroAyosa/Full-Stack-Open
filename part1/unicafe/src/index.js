import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad;

  function addGood () {
    setGood(good + 1);
  }
  function addNeutral () {
    setNeutral(neutral + 1);
  }
  function addBad () {
    setBad(bad + 1);
  }

  function average () {
    if ( all === 0 ) {
      return "Waiting for input...";
    } else {
      return (good - bad) / all
    }

  }
  function positive () {
    if ( all === 0 ) {
      return "Waiting for input...";
    } else {
      let positive = good / all * 100;
      return Math.round(positive) + "%"
    }
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
      <div>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {good + neutral + bad}</p>
        <p>Average: {average()}</p>
        <p>Positive: {positive()}</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)