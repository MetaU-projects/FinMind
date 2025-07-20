import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { useState } from "react"
import "./ConnectionsComp.css"

export default function Schedule() {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClear = () => {
        setDate("");
        setTime("");
        setNote("");
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit} className="schedule-container">
                <h2 className="schedule-title">Schedule a meeting with Olivia Spencer</h2>
                <p className="schedule-text">Choose a date and time for your one-hour meeting session</p>
                <div className="schedule-time">
                        <label className="input-title">Select Date</label>
                        <input type="date" value={date} className="schedule-input" onChange={(e) => setDate(e.target.value)} required />
                    </div>
                <div className="date-time">
                    <div className="schedule-time">
                        <label className="input-title">Start Time</label>
                        <input type="time" value={startTime} className="schedule-input" onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div className="schedule-time">
                        <label className="input-title">End Time</label>
                        <input type="time" value={endTime} className="schedule-input" onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                </div>

                <div className="notes">
                    <label className="input-title">Meeting Notes</label>
                    <textarea
                        placeholder="Add agenda, topics to discuss, or any special notes..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={4}
                        className="schedule-input"
                    ></textarea>
                </div>

                <div className="schedule-btns">
                    <button type="submit" className="btn send-schedule">Send Meeting Request</button>
                    <button type="button" onClick={handleClear} className="btn clear-schedule">Clear</button>
                </div>
            </form>
            <div className="schedule-container">
                <h2 className="schedule-title">Suggested Meeting Times</h2>
                <p className="schedule-text">Calculated best times that match your availability</p>
                <div className="session">
                    <div className="time">
                        <AiOutlineCalendar />
                        <h3><strong>Monday</strong></h3>
                    </div>
                    <div className="time">
                        <AiOutlineClockCircle />
                        <p>14:00 - 15:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}