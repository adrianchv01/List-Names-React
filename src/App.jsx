import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = e => setNewName(e.target.value);

  const addNewName = (event) =>{
    event.preventDefault();
    const nameObject = {
      id: persons.length + 1,
      name: newName
  
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((per) => 
          <li key={per.id}>{per.name}</li>
        )}
      </ul>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App