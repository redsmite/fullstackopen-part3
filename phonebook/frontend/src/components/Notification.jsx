const Notification = ({ notification }) => {
  if (notification === null || !notification) {
    return null
  }

  const isError = notification.isError
  const message = notification.text || notification

  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgray',
    border: `2px solid ${isError ? 'red' : 'green'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '20px',
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification