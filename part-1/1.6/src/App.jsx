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
     <div>
       {datas.map(button => <p>{button.label} : {button.value}</p>)}
    </div>
   )
}

const Total = ({ datas }) => {
  const total = datas.reduce((sum, data) => sum + data.value, 0);
  return (
    <p>Total : {total}</p>
  )
}

const Average = ({ datas }) => {
  const totalFeedback = datas.reduce((sum, data) => sum + data.value, 0);
  const averageScore = (datas[0].value * 1 + datas[1].value * 0 + datas[2].value * -1) / totalFeedback;
  return (
    <p>Average Score: {averageScore}</p>
  )
}

const Positive = ({ datas }) => {
  const total = datas.reduce((sum, data) => sum + data.value, 0);
  const percentage = (datas[0].value / total) * 100; 
  return (
    <p>Positive : {percentage} %</p>
  )
}

const Statistics = ({ datas }) => {
  return (
    <div>
      <Header text="statistics" />
      <Part datas={datas} />
      <Total datas={datas} />
      <Average datas={datas} />
      <Positive datas={datas} />
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
      <Header text="give feedback" />
      <Button onSmash={() => setGood(good + 1)} text={data[0].label} />
      <Button onSmash={() => setNeutral(neutral + 1)} text={data[1].label} />
      <Button onSmash={() => setBad(bad + 1)} text={data[2].label} />
      <Header datas={data} />
      <Statistics datas={data} />

      {/* <Header text="statistics" />
      <Part datas={data} />
      <Total datas={data} />
      <Average datas={data} />
      <Positive datas={data} /> */}
    </div>
  )
}

export default App;
