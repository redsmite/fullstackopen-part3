import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import phoneService from './phoneService'

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newPhonebook, setnewPhonebook] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhone => setPhonebook(initialPhone))
  }, [])

  const filteredPhoneBook = searchTerm === '' 
    ? phonebook 
    : phonebook.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification notification={notification} />

      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <PersonForm 
        phonebook={phonebook} 
        setPhonebook={setPhonebook} 
        newPhonebook={newPhonebook} 
        setnewPhonebook={setnewPhonebook}
        setNotification={setNotification}
      />  

      <Persons 
        phonebook={phonebook}
        setPhonebook={setPhonebook}
        filteredPhonebook={filteredPhoneBook}
      />
    </div>
  )
}

export default App