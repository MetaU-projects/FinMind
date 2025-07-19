import "./ErrorModal.css"
export default function ErrorModal({ error, setError }) {
    const handleClose = () => {
        setError("");
    }
    return (
        <div className="err-overlay">
            <div className="err-container">
                <h2 className="err-title">Try Again!</h2>
                <p className="err-message">{error}</p>
                <button onClick={handleClose} className="err-close">Close</button>
            </div>
        </div>
    )
}