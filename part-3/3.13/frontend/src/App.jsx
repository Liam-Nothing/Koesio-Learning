import { useState, useEffect } from 'react'
import personsService from './services/phonebook'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const debug = (element) => {
    console.log('debug: ', element);
};

const Display = ({ text }) => <div>{text}</div>

const personExists = (name, number, persons) => {
    return persons.some(person => person.name === name) && persons.some(person => person.number === number);
};

const Notification = ({ message, status = "error" }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={status}>
            {message}
        </div>
    )
}

const addPerson = (element, list, callBack, setErrorMessage, setSuccessMessage) => {
    if (element.name != '' && element.number != '') {

        if (personExists(element.name, element.number, list)) {
            setErrorMessage(
                `Contact already exists`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } else if (
            (list.some(person => person.name === element.name)) &&
            !(list.some(person => person.number === element.number))
        ) {
            if (window.confirm("Update " + element.name + "?")) {

                // console.log(element);
                // const select_id = list.findIndex(person => person.name === element.name) + 1;

                // console.log(select_id);
                // console.log(list);

                // const elm_id = list[select_id].id;

                const elm_index = list.findIndex(person => person.name === element.name);
                const person_id = elm_index !== -1 ? list[elm_index].id : null;

                personsService
                    .update(person_id, element)
                    .then(() => {
                        callBack();
                    });
            }
        } else {
            element = { ...element, id: list.length + 1 };
            personsService
                .create(element)
                .then(returnedContacts => {
                    callBack();

                    setSuccessMessage(
                        `New contact added`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)

                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        // Display the error message from the backend
                        setErrorMessage(error.response.data.error);
                    } else {
                        setErrorMessage("An unknown error occurred");
                    }
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });

        }

    } else {

        setErrorMessage(
            `Please fill every fields`
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
};

const App = () => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)


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
                .then(() => {
                    updateDisplay();
                })
                .catch(error => {
                    setErrorMessage(
                        `Contact already deleted`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)

                    updateDisplay();
                })
        }
    };

    useEffect(() => {
        updateDisplay();
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <Notification message={successMessage} status='success' />
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
                    <Button onClick={() => addPerson(newContact, persons, updateDisplay, setErrorMessage, setSuccessMessage)} text="Add" />
                    {/* <Button onClick={() => debug(newContact)} text="Debug - 1" />
                    <Button onClick={() => debug(persons)} text="Debug - 2" /> */}
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