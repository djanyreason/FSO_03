import { useState, useEffect, useRef } from 'react';
import phonebookService from './services/entries';
import Entry from './components/Entry';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([  ]); 
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageTimeouts, setMessageTimeouts] = useState(0);
  const messTimRef = useRef(messageTimeouts);
  messTimRef.current = messageTimeouts;

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => setPersons(response));
  }, []);

  const handleMessage = (newMessage) => {
    setMessage(newMessage);
    setMessageTimeouts(messTimRef.current+1);
    setTimeout(() => { 
      if(messTimRef.current === 1) setMessage(null); 
      setMessageTimeouts(messTimRef.current-1);
    }, 3000);  
  };

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const tryAddPerson = (newName, newNumber) => {
    const checkSameName = persons.reduce(
        (check, person) => (
          person.name.toLowerCase() === newName.toLowerCase() ?
          check.concat(person) : check
        ),
    []);
    
    if(checkSameName.length > 0)
    {
      if(window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
        )) {
          phonebookService
            .update(checkSameName[0].id, {name: newName, number: newNumber})
            .then(response => {
              setPersons(persons.map(
               person => person.id === response.id ? response : person));
              handleMessage({
                color: 'green',
                content: `Updated number for ${newName}`
              });
            });
          return true;
        } else {
          return false;
        }
    } else {
      phonebookService
        .create({name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.concat(response));
          handleMessage({
            color: 'green',
            content: `Added ${newName}`
          });
        });
      return true;
    }
  };

  const removePerson = (entry) => {
    if(window.confirm(`Delete ${entry.name}?`)) {
      phonebookService
        .remove(entry.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== entry.id));
          handleMessage({
            color: 'green',
            content: `Removed ${entry.name}`
          });
        })
        .catch(error => {
          handleMessage({
            color: 'red',
            content: `Information of ${entry.name} has already been removed from server`
          });
          setPersons(persons.filter(person => person.id !== entry.id));
        });
    }
    return true;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterText={filter} updateFilter={updateFilter} />
      <h2>add a new</h2>
      <PersonForm tryAddPerson={tryAddPerson} />
      <h2>Numbers</h2>
      {persons.reduce((reduced, person) => (
        (person.name.toLowerCase().search(filter.toLowerCase()) < 0) ?
        reduced : reduced.concat(person))
        ,[]).map(person => <Entry key={person.name} person={person} remove={() => removePerson(person)} />)}
    </div>
  );
};

export default App;