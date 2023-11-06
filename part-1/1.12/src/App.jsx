import { useState } from 'react'

const Display = ({ text }) => <div>{text}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Header = ({ text }) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  
  const random = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(random)

  const initialPoints = Array(anecdotes.length).fill(0);
  initialPoints[3] = 5;
  // console.log(initialPoints);
  const [points, setPoints] = useState(initialPoints);
  // console.log(points);

  return (
    <>
      <div>
        <Header text="Anecdote of the day" />
        <Display text={anecdotes[selected]} />
        <Button onClick={() => setSelected(random)} text="Random sentence" />
        <Button onClick={() => {
          var copy = [...points];
          copy[selected] = copy[selected] ? copy[selected] + 1 : 1;
          setPoints(copy);
          // console.log(points);
        }} text="Vote" />
        <Display text={`has ${points[selected] ? points[selected] : 0} vote(s)`} />
      </div>
      <div>
        <Header text="Anecdote with most votes" />
        <Display text={anecdotes[points.indexOf(Math.max(...points))]} />
        <Display text={`has ${Math.max(...points)} vote(s)`} />
      </div>
    </>
  )
}

export default App