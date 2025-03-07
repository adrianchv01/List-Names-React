import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { id: 1,
  //     name: 'Arto Hellas',
  //     number: 914213123
  //   }
  // ]) 
  const [ persons, setPersons ] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('response completada')
        setPersons(response.data);
      })
  }, [])
  console.log('render', persons.length, ' notes')


  const handleNewName = e => setNewName(e.target.value);
  const handleNewNumber = e => setNewNumber(e.target.value);

  const addNewName = (event) =>{
    //AL parecer si no pongo este codigo al agregar un codigo, desaparece de la
    //lista esto debido a que el comportamiento del formulario es enviarse
    event.preventDefault();
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number:newNumber
    }
    setPersons(persons.concat(nameObject))
    alert(`${newName} is already added`)
    setNewName('')
    setNewNumber('')
  }
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter names={persons} newName={newName}/>
      <form onSubmit={addNewName}>
        
        <div>
          name: <input value={newName} onChange={handleNewName}/>
          <br />
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((per) => 
          <li key={per.id}>Name: {per.name} <br /> Number: {per.number}</li>
        )}
      </ul>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App