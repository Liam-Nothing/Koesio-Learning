import { useState, useEffect } from 'react'
import axios from 'axios'
// import Note from './components/Note'
// import noteService from './services/notes'
import personsService from './services/phonebook'

const addElement = (element, list, callBack) => {
  if (element.name != '' && element.number != '') {

    if (personExists(element.name, element.number, list)) {
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

const personExists = (name, number, persons) => {
  return persons.some(person => person.name === name) && persons.some(person => person.number === number);
};



const addPerson = (element, list, callBack) => {
  if (element.name != '' && element.number != '') {

    if (personExists(element.name, element.number, list)) {
      console.log('Contact already exists');
      alert('Contact already exists');
    }else{
      element = { ...element, id: list.length + 1 };
    
      personsService
        .create(element)
        .then(returnedContacts => {
          // setNotes(notes.concat(returnedContacts))
          // setNewNote('')

          // console.log(initialContacts);
          // callBack(returnedContacts);
  
          // Update the display
          callBack();
        })
      }
  
  }else{
    console.log('Please fill every fields');
  }
};







const App = () => {
  // const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(false)

  // useEffect(() => {
  //   personsService
  //     .getAll()
  //     .then(initialContacts => {
  //       setPersons(initialContacts)
  //     })
  // }, [])

  // const toggleImportanceOf = id => {
  //   const url = `http://localhost:3001/notes/${id}`
  //   const note = notes.find(n => n.id === id)
  //   const changedNote = { ...note, important: !note.important }
  
  //   noteService
  //     .update(id, changedNote)
  //     .then(returnedNote => {
  //       setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  //     })
  //     .catch(error => {
  //       alert(
  //         `the note '${note.content}' was already deleted from server`
  //         )
  //       setNotes(notes.filter(n => n.id !== id))
  //     })
  // }

  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() > 0.5,
  //   }
  
  //   noteService
  //     .create(noteObject)
  //     .then(returnedNote => {
  //       setNotes(notes.concat(returnedNote))
  //       setNewNote('')
  //     })
  // }

  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  // const notesToShow = showAll
  //   ? notes
  //   : notes.filter(note => note.important)

  // return (
  //   <div>
  //     <h1>Notes</h1>
  //     <div>
  //       <button onClick={() => setShowAll(!showAll)}>
  //         show {showAll ? 'important' : 'all' }
  //       </button>
  //     </div>      
  //     <ul>
  //       {notesToShow.map(note => 
  //         <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
  //       )}
  //     </ul>
  //     <form onSubmit={addNote}>
  //     <input
  //         value={newNote}
  //         onChange={handleNoteChange}
  //       />
  //       <button type="submit">save</button>
  //     </form> 
  //   </div>
  // )







  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  const handleNameChange = event => {
    setNewContact({ ...newContact, name: event.target.value });
  };

  const handlePhoneChange = event => {
    setNewContact({ ...newContact, number: event.target.value });
  };

  const handleNameFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText)
    );
    setFilteredPersons(filtered);
  };

  const updateDisplay = () => {
    personsService
      .getAll()
      .then(initialContacts => {
        // console.log(initialContacts);
        setPersons(initialContacts);
        // Update the display
        setFilteredPersons(initialContacts);
      });
  };

  const DeleteContact = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
      personsService
      .deleteContact(id)
      .then(returnedNote => {
        updateDisplay();
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
          )
        setNotes(notes.filter(n => n.id !== id))
      })
    }
  };
  
  useEffect(() => {
    updateDisplay();
  }, []);

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
          <Button onClick={() => addPerson(newContact, persons, updateDisplay)} text="Add" />
          <Button onClick={() => debug(newContact)} text="Debug - 1" />
          <Button onClick={() => debug(persons)} text="Debug - 2" />
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Display text={filteredPersons.map(person => (
          <p key={person.id}>{person.name}, {person.number} <button onClick={() => DeleteContact(person.id, person.name)}>Delete</button></p>
        ))} />
      </div>
    </div>
  )
}

export default App