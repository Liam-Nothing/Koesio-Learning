import { useState } from 'react'


const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

const Header = ({ text }) => <h1>{text}</h1>

// Content Component
const Content = ({ datas }) => {
  return (
    <div>
      {/* {datas.map(button => <Button onSmash={() => setRight(right + 1)} text={button.label} />)} */}
      <Button onSmash={() => setGood(good + 1)} text={datas[0].label} />
      <Button onSmash={() => setNeutral(neutral + 1)} text={datas[1].label} />
      <Button onSmash={() => setBad(bad + 1)} text={datas[2].label} />
    </div>
  )
}

// Each individual Part within the Content
const Part = ({ datas }) => {  
  return (
    <>
      {datas.map(button => 
        <tr>
          <td>{button.label}</td>
          <td>{button.value}</td>
        </tr>
      )}
    </>
  );
}


const Total = ({ datas }) => {
  const total = datas.reduce((sum, data) => sum + data.value, 0);
  return (
    <tr>
      <td>Total</td>
      <td>{total}</td>
    </tr>
  )
}

const Average = ({ datas }) => {
  const totalFeedback = datas.reduce((sum, data) => sum + data.value, 0);
  const averageScore = ((datas[0].value * 1 + datas[1].value * 0 + datas[2].value * -1) / totalFeedback).toFixed(2);
  return (
    <tr>
      <td>Average Score</td>
      <td>{averageScore}</td>
    </tr>
  )
}

const Positive = ({ datas }) => {
  const total = datas.reduce((sum, data) => sum + data.value, 0);
  const percentage = ((datas[0].value / total) * 100).toFixed(2); 
  return (
    <tr>
      <td>Positive</td>
      <td>{percentage} %</td>
    </tr>
  )
}

const Statistics = ({ datas }) => {
  if (datas[0].value === 0 && datas[1].value === 0 && datas[2].value === 0) {
    return (
      <div>
        <Header text="statistics" />
        <p>No feedback given</p>
      </div>
    )
  }else{
    return (
      <div>
        <Header text="statistics" />
        <table>
          <Part datas={datas} />
          <Total datas={datas} />
          <Average datas={datas} />
          <Positive datas={datas} />
        </table>
      </div>
    )
  }
}

const Buttons_header = ({ datas, setGood, setNeutral, setBad }) => {

  return (
    <div>
      <Header text="give feedback" />
      <Button onSmash={() => setGood(datas[0].value + 1)} text={datas[0].label} />
      <Button onSmash={() => setNeutral(datas[1].value + 1)} text={datas[1].label} />
      <Button onSmash={() => setBad(datas[2].value + 1)} text={datas[2].label} />
    </div>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = [
    {
      label: "good",
      value: good
    },
    {
      label: "neutral",
      value: neutral
    },
    {
      label: "bad",
      value: bad
    },
  ]

  return (
    <div>
      <Buttons_header datas={data} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics datas={data} />
    </div>
  )
}

export default App;
