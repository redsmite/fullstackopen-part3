import phoneService from "../phoneService";

const Persons = ({phonebook,setPhonebook,filteredPhonebook}) => {
    const handleDelete = (id,name) =>{
        if(window.confirm(`Delete user ${name}?`)){
            phoneService
                .destroy(id)
                .then(returned=>
                    setPhonebook(phonebook.filter(n=>n.id!=id)))
        }else{
            console.log(`User ${name} not deleted`)
        }
    }
    return (
        <>
            <h1>Numbers</h1>
            {filteredPhonebook.map(phone => 
             <p key={phone.id}>{phone.name} {phone.number} <button onClick={()=>handleDelete(phone.id, phone.name)}>Delete</button></p>
            )}
        </>
    )
}

export default Persons;