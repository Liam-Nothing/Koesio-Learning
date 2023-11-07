import { useState } from 'react'

const addElement = (element, list, callBack) => {
  if (element.name != '') {
    callBack(list => [...list, element]);
  }else{
    console.log('Please enter a name');
  }
};
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const debug = (element) => {
  console.log('debug: ', element);
};
const Display = ({ text }) => <div>{text}</div>

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => event.preventDefault()}> 
        <div>
          name: <input onKeyUp={(event) => setNewName({name: event.target.value})} />
        </div>
        <div>
          <Button onClick={() => addElement(newName, persons, setPersons)} text="Add" />
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Display text={persons.map(person => <p key={person.name} >{person.name}</p>)} />
      </div>
    </div>
  )
}

export default App