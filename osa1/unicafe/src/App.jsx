import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  </>
)

const Statistics = ({ good, neutral, bad, avgCount, total }) => (
  <div>
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="avg" value={avgCount/total}/>
        <StatisticLine text="positive" value={100*good/total}/>
      </tbody>
    </table>
  </div>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avgCount, setAvgCount] = useState(0)

  const renderStats = (good, neutral, bad, avgCount, total) => {
    if (total == 0) {
      return <p>No feedback given</p>
    } else {
      return <Statistics good={good} neutral={neutral} bad={bad} avgCount={avgCount} total={total}/>
    }
  }

  const handleGood = () => {
    setAvgCount(avgCount+1)
    const newGood = good + 1
    setGood(newGood)
    setTotal(newGood + neutral + bad)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(good + newNeutral + bad)
  }

  const handleBad = () => {
    setAvgCount(avgCount-1)
    const newBad = bad + 1
    setBad(newBad)
    setTotal(good + neutral + newBad)
  }

  const avg = (avgCountt, totall)  => {
    if (total >= 1) {
      return avgCountt/totall
    } else return 0
  }

  const percentage = (goodd, totall)  => {
    if (total >= 1) {
      return 100*goodd/totall
    } else return 0
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <h1>statistics</h1>
      {renderStats(good, neutral, bad, avgCount, total)}
    </div>
  )
}

export default App