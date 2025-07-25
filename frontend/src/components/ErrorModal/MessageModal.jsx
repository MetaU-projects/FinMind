import "./ErrorModal.css"

export default function MessageModal({ message, setMessage }) {
    const handleClose = () => {
        setMessage("");
    }

    return (
        <div className="err-overlay">
            {message.suggestions.length === 0 ? (
                <div className="err-container">
                    <h2 className="err-title">Error!</h2>
                    <p className="err-message">{message.message}</p>
                    <button onClick={handleClose} className="err-close">Close</button>
                </div>
            ) : (
                <div className="error-container">
                    <h2 className="err-title">Your are free! Schedule with</h2>
                    <p className="err-message">{message.suggestions[0].name} 
                        from 
                        {message.suggestions[0].suggestTime[0]} to {message.suggestions[0].suggestTime[1]}</p>
                    <button onClick={handleClose} className="err-close">Close</button>
                </div>
            )
            }
        </div>
    )
}