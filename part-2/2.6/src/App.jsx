import { useState } from 'react'

const addElement = (element, list, callBack) => {
  if (element.name != '' && element.phone != '') {

    if (personExists(element.name, element.phone, list)) {
      console.log('Contact already exists');
      alert('Contact already exists');
    }else{
      element = { ...element, id: list.length + 1 };
      callBack(list => [...list, element]);
    }
  
  }else{
    console.log('Please fill every fields');
  }
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const debug = (element) => {
  console.log('debug: ', element);
};

const Display = ({ text }) => <div>{text}</div>

const personExists = (name, phone, persons) => {
  return persons.some(person => person.name === name) && persons.some(person => person.phone === phone);
};


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const handleNameChange = event => {
    setNewContact({ ...newContact, name: event.target.value });
  };

  const handlePhoneChange = event => {
    setNewContact({ ...newContact, phone: event.target.value });
  };

  const handleNameFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText)
    );
    setFilteredPersons(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter by : <input onKeyUp={handleNameFilter} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          Name : <input onKeyUp={handleNameChange} />
        </div>
        <div>
          Phone : <input onKeyUp={handlePhoneChange} />
        </div>
        <div>
          <Button onClick={() => addElement(newContact, persons, setPersons)} text="Add" />
          <Button onClick={() => debug(newContact)} text="Debug" />
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Display text={filteredPersons.map(person => (
          <p key={person.id}>{person.name}, {person.phone}</p>
        ))} />
      </div>
    </div>
  )
}

export default App