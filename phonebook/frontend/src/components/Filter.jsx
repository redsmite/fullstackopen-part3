const Filter = ({ searchTerm, setSearchTerm }) => {
    
  const handleFilterInputChange = (event) => {
    setSearchTerm(event.target.value)
  }
    return (
        <div>
            filter shown with <input value={searchTerm} onChange={handleFilterInputChange} />
        </div>
    )
}

export default Filter;