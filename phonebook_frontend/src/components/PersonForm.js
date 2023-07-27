import { useState } from 'react';


const PersonForm = ( { tryAddPerson }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  //generic text entry field update function - takes the update state function
  //as a parameter and returns an event handler function
  const handleFieldEntry = (updateField) => 
    (event) => {updateField(event.target.value);};

  const handleAddClick = (event) => {
    event.preventDefault();
    
    if(tryAddPerson(newName, newNumber)) {
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <form onSubmit={handleAddClick}>
      <div>
        name: <input value={newName} onChange={handleFieldEntry(setNewName)}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleFieldEntry(setNewNumber)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;


// In an intermediate stage of this project (through final commit on 7/7/23
// the phonebook entries were sorted alphabetically, new entries were inserted
// so to maintain the sort, and checking for duplicate entries leveraged the
// alphabetical sort to run more efficiently. In later exercises, the project
// adds writes to the server; at this point in Full Stack Open we have not
// gotten to back-end server coding, so maintaining alphabetical sort would
// have to be done entirely on the front-end. While doing this would arguably
// still be more efficient, it strikes me as overcomplicating front-end code
// with what feels like back-end logic. 

// After removing the sorting, it made sense to move the addPerson function
// back to App.js and pass that function to the PersonForm component. I wanted
// to keep the code that maintained alphabetical sort commented out but present
// in this file for demonstrative purposes, but after moving addPerson it would
// become too complicated to read easily if they were both in the same place.
// Accordingly, commented out below is the code for the PersonForm component
// with alphabetical sort.

/*
const PersonForm = ( { persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  //generic text entry field update function - takes the update state function
  //as a parameter and returns an event handler function
  const handleFieldEntry = (updateField) => 
    (event) => {updateField(event.target.value);};

  //Function that adds an entry to phonebook 
  //while maintaining alphabetical sort of names
  const addPerson = (sortedPeople) => {

    if(sortedPeople.length === 0) return [ { name: newName, number: newNumber } ];

    const mid = Math.ceil(sortedPeople.length / 2);

    if(sortedPeople[mid-1].name.toLowerCase() < newName.toLowerCase()) {
      return sortedPeople.slice(0,mid).concat(addPerson(sortedPeople.slice(mid)));
    } else {
      return addPerson(sortedPeople.slice(0,mid-1)).concat(sortedPeople.slice(mid-1));
    }
  };

  const validateNameEntry = (begin, end) => {
    if(begin === end) return false; 
      // return 

    const mid = Math.floor((begin + end) / 2);

    if(persons[mid].name.toLowerCase() === newName.toLowerCase()) {
      //Two options, depending on whether the app should reject matching names
      //or matching name&number pairs

      return true; //Rejects matching names
      //return persons[mid].number === newNumber; //Rejects matching name&number pairs

    } else if (persons[mid].name.toLowerCase() < newName.toLowerCase()) {
      return validateNameEntry(mid+1, end);
    } else { return validateNameEntry(begin, mid); }
  };

  const handleAddClick = (event) => {
    event.preventDefault();
    
    if(validateNameEntry(0, persons.length))
    {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(addPerson(persons));
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <form onSubmit={handleAddClick}>
      <div>
        name: <input value={newName} onChange={handleFieldEntry(setNewName)}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleFieldEntry(setNewNumber)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
*/