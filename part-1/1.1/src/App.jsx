import React from 'react';

// Header Component
const Header = ({ course }) => {
  return (
    <h1>{course.name_test}</h1>
  )
}

// Content Component
const Content = ({ parts }) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />

      {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

// Each individual Part within the Content
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

// Total Component
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    name_test: 'Test',
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
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
