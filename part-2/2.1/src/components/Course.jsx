import { Header } from '../App';

const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);

    // const total = parts.reduce((s, p) => {
    //     console.log('what is happening', s, p)
    //     // return someMagicHere 
    //   })

    return (
      <p><b>Number of exercises {total}</b></p>
    )
}

const Course = ({ course }) => {

    // console.log(course);

    const parts = course.parts;

    return (
        <div>
            <Header text={course.name} />
            {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
            <Total parts={parts} />
        </div>
    )
  }
  
export default Course