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

  const deletePerson = person => {
    const request = axios.delete(`http://localhost:3001/persons/${person.id}`)
    window.confirm(`Eliminar ${person.name}`)
    return request
    .then(
      () => {
        setPersons(persons.filter((p) => p.id !== person.id))
      }
    )
    .catch(error => {
      console.log('errror al actualizar')
    }
    )
  }

  const addNewName = (event) =>{
    //AL parecer si no pongo este codigo al agregar un codigo, desaparece de la
    //lista esto debido a que el comportamiento del formulario es enviarse
    const ids = persons.map(p => p.id);
    

    const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    console.log(newId);

    event.preventDefault();
    const nameObject = {
      id: newId.toString(),
      name: newName,
      number:newNumber
      
    }
    const request = axios.post('http://localhost:3001/persons', nameObject)
    request.then(response => {
      setPersons(persons.concat(nameObject))
      setNewName(' ')
      setNewNumber(' ')
    })

    toString(persons.id);
    console.log(request);
    
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
          <li key={per.id}>Name: {per.name} <br /> Number: {per.number} <button onClick={() => deletePerson(per)}>Delete</button></li>
        )}
      </ul>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App