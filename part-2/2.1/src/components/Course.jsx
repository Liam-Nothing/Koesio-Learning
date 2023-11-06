import { Header } from '../App';

const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
}

const Course = ({ course }) => {

    console.log(course);

    const parts = course.parts;

    return (
        <div>
            <Header text={course.name} />
            {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
        </div>
    )
  }
  
export default Course