import phoneService from "../phoneService"

const PersonForm = ({ phonebook, newPhonebook, setnewPhonebook, setPhonebook, notification, setNotification }) => {
    const handleSubmit = (event) =>{
        event.preventDefault()
        const personExists = phonebook.some(person => person.name === newPhonebook.name)

        const newObject = {
            name: newPhonebook.name,
            number: newPhonebook.number,
        }

        if (personExists){
            if(window.confirm(`${newPhonebook.name} is already added to phonebook, replace the old number with the new one?`)){
                const userUpdate = phonebook.find(n=>n.name===newPhonebook.name)
                const userUpdateId = userUpdate.id 
                phoneService
                    .update(userUpdateId, newObject)
                    .then(returnedOject=>
                        setPhonebook(phonebook.map(phone=>phone.id===userUpdateId?returnedOject:phone))
                    )
                setnewPhonebook({
                    name : '',
                    number : '',
                })
                setNotification(`Updated ${newObject.name}`)
                setTimeout(()=>{
                    setNotification(null)
                },5000)
                return
            }else{
                console.log('failed to add')
                return
            }
            
        }
        
        phoneService
            .create(newObject)
            .then(returnedOject=>
                setPhonebook(phonebook.concat(returnedOject))
            )
        setnewPhonebook({
            name : '',
            number : '',
        })
        
        setNotification(`Added ${newObject.name}`)
        setTimeout(()=>{
            setNotification(null)
        },5000)

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
            <div>name <input value={newPhonebook.name} onChange={handleNameInputChange}/></div>
            <div>number <input value={newPhonebook.number} onChange={handleNumberInputChange}/></div>
            <button type="submit">add</button>
            </form>
        </>
    )
}

export default PersonForm;