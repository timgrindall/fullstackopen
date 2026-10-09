import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {

  let emPadding = 0.2
  let emPadRight = 0.75

  let text = props.text
  let value = props.value
  
  let symbol = null
  if (props.symbol != null) symbol = props.symbol

  return (
    <tr>
      <td style={{padding: emPadding + "em", paddingRight: emPadRight + "em"}}>{text}:</td>
      <td style={{padding: emPadding + "em"}}>{value}{symbol}</td>
    </tr>
  )
}

const Statistics = (props) => {

  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  
  let allCount = good + neutral + bad
  console.log("allCount: " + allCount)

  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={allCount} />
          <StatisticLine text="Average" value={(good+(bad * -1))/3} />
          <StatisticLine text="Positive" value={good/allCount*100} symbol="%" />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sendGood = () => {
    // console.log('good rating added')
    setGood(good + 1)
  }

  const sendNeutral = () => {
    // console.log('neutral rating added')
    setNeutral(neutral + 1)
  }

  const sendBad = () => {
    // console.log('bad rating added')
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={sendGood} text="good"/>
      <Button onClick={sendNeutral} text="neutral"/>
      <Button onClick={sendBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App