import { useState } from "react";

const Filter = ({names, newName}) => {
    const [nameFilter , setNameFilter] = useState('')
    
    const handleNameFilter = e => setNameFilter(e.target.value)
    const filteredNames = names.filter((person) => {
        return person.name == nameFilter
      }
      );

    return(
        <div>
            {/* //EL value vendria a ser el valor inicial del estado osea seria '' */}
            Search names: <input value={nameFilter} onChange={handleNameFilter} placeholder="search ..."/>
            <div>
                {filteredNames.length>0 ? (
                    <ul>
                        {filteredNames.map((filtered) => 
                            (<li key={filtered.id}>
                                {filtered.name}
                            </li>
                        ))}
                    </ul>
                ):(
                    <p>No encontrado</p>
                )}
            </div>
        </div>
    )
}
export default Filter;