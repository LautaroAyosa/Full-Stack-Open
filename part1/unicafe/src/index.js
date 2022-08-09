import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Button from './Components/Button/Button';
import Statistics from './Components/Statistics/Statistics';

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
        <Button text="Good" onClick={addGood} />
        <Button text="Neutral" onClick={addNeutral} />
        <Button text="Bad" onClick={addBad} />
      </div>
      <h1>Statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)