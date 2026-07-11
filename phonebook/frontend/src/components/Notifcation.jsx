const Notification = ({message}) => {
    const notificationStyle = {
        color : 'green',
        background : 'lightgray',
        border: '2px solid green',
        padding: '10px',
        fontSize: '30px',
    }

    if (message === null){
        return null
    }
    return(
        <p style={notificationStyle}>{message}</p>
    )
}

export default Notification