import phoneService from "../phoneService"

const PersonForm = ({ phonebook, newPhonebook, setnewPhonebook, setPhonebook, setNotification }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const personExists = phonebook.some(person => person.name === newPhonebook.name)

    const newObject = {
      name: newPhonebook.name,
      number: newPhonebook.number,
    }

    if (personExists) {
      if (window.confirm(`${newPhonebook.name} is already added to phonebook, replace the old number with the new one?`)) {
        const userUpdate = phonebook.find(n => n.name === newPhonebook.name)
        const userUpdateId = userUpdate.id 

        phoneService
          .update(userUpdateId, newObject)
          .then(returnedObject => {
            setPhonebook(phonebook.map(phone => phone.id === userUpdateId ? returnedObject : phone))
            setnewPhonebook({ name: '', number: '' })
            setNotification({ text: `Updated ${newObject.name}`, isError: false })
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(error => {
            // Displays Mongoose validation error returned from backend
            setNotification({ 
              text: error.response?.data?.error || `Information of ${newObject.name} was already removed from server`, 
              isError: true 
            })
            setTimeout(() => setNotification(null), 5000)
          })
      }
      return
    }

    phoneService
      .create(newObject)
      .then(returnedObject => {
        setPhonebook(phonebook.concat(returnedObject))
        setnewPhonebook({ name: '', number: '' })
        setNotification({ text: `Added ${newObject.name}`, isError: false })
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(error => {
        // Catches Mongoose validation errors for 3.19 & 3.20 (min length, regex format)
        setNotification({ 
          text: error.response?.data?.error || 'Failed to add contact', 
          isError: true 
        })
        setTimeout(() => setNotification(null), 5000)
      })
  }

  const handleNameInputChange = (event) => {
    setnewPhonebook({
      ...newPhonebook,
      name: event.target.value,
    })
  }

  const handleNumberInputChange = (event) => {
    setnewPhonebook({
      ...newPhonebook,
      number: event.target.value,
    })
  }

  return (
    <>
      <h1>add a new</h1>
      <form onSubmit={handleSubmit}>
        <div>name <input value={newPhonebook.name || ''} onChange={handleNameInputChange}/></div>
        <div>number <input value={newPhonebook.number || ''} onChange={handleNumberInputChange}/></div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default PersonForm;