import { AiOutlineClockCircle } from "react-icons/ai";
import { useState } from "react"
import "./ConnectionsComp.css"
import { MS_PER_SECOND } from "../../utils/constants";
import { createSession } from "../../services/mentorshipService";
import { formatUnixTimes } from "../../utils/formatUnixTime";
import { Role, sessionCancel } from "../../utils/status";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-hot-toast";

export default function Schedule({ connection, timeSuggestions, update, onCountUpdate }) {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [note, setNote] = useState("");
    const [canCancel, setCanCancel] = useState(true);
    const { user } = useUser();
    const role = user.role === Role.MENTEE ? 'mentor' : 'mentee';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const now = Math.floor(Date.now() / 1000);
        const startDate = new Date(`${date} ${startTime}`);
        const endDate = new Date(`${date} ${endTime}`)
        const startUnix = Math.floor(startDate.getTime() / MS_PER_SECOND);
        const endUnix = Math.floor(endDate.getTime() / MS_PER_SECOND);

        if (startUnix < now) {
            alert("‼️ You cannot schedule a session in the past.");
            return;
        }

        if (startUnix > endUnix) {
            alert("‼️ Start time cannot be greater than end time!");
            return;
        }

        try {
            await createSession({
                mentorshipId: connection.id,
                startTime: startUnix,
                endTime: endUnix,
                reason: note,
                cancelable: canCancel
            });
            toast.success("Session created successfully!");
            handleClear();
            update(connection);
            onCountUpdate?.();
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again!");
            }
        }
    }

    const handleClear = () => {
        setDate("");
        setStartTime("");
        setEndTime("");
        setNote("");
    }

    return (
        <div>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="schedule-container">
                    <h2 className="schedule-title">Schedule a meeting with {connection[role].name}</h2>
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
                    <div className="flex items-center justify-between">
                        <div className="schedule-btns2">
                            <h3>Cancellable?</h3>
                            <div className="cancellable">
                                {/* className="btn send-schedule" */}
                                <button onClick={() => setCanCancel(sessionCancel.YES)} type="button" className={`yes-no ${canCancel === sessionCancel.YES ? 'bg-[#3D52A0] text-white' : 'bg-gray-200 text-black'}`}>Yes</button>
                                <button onClick={() => setCanCancel(sessionCancel.NO)} type="button"  className={`yes-no ${canCancel === sessionCancel.NO ? 'bg-[#3D52A0] text-white' : 'bg-gray-200 text-black'}`}>No</button>
                            </div>
                        </div>
                        <div className="schedule-btns">
                            <button type="submit" className="btn send-schedule">Create Session</button>
                            <button type="button" onClick={handleClear} className="btn clear-schedule">Clear</button>
                        </div>
                    </div>
                </form>
                <div className="schedule-container">
                    <h2 className="schedule-title">Suggested Meeting Times</h2>
                    <p className="schedule-text">Calculated best times that match your availability</p>
                    {timeSuggestions.proposedSession.length > 0 ? (
                        timeSuggestions.proposedSession.map(session => (
                            <div className="session">
                                <div className="time">
                                    <AiOutlineClockCircle />
                                    <h3><strong>{formatUnixTimes(session[0], session[1])}</strong></h3>
                                </div>
                            </div>
                        ))) :
                        (timeSuggestions.resolvedSession.length !== 0 ? (
                            <div className="session">
                                <h3>Reschedule To meet with mentor</h3>
                                <div className="time">
                                    <AiOutlineClockCircle />
                                    <h3>Cancel</h3><h3><strong>{formatUnixTimes(timeSuggestions.resolvedSession.freedTime[0], timeSuggestions.resolvedSession.freedTime[1])}</strong></h3>
                                </div>
                                <h3>Rescheduling Option</h3>
                                <div className="session">
                                    <div className="time">
                                        <AiOutlineClockCircle />
                                        <h3><strong>{formatUnixTimes(timeSuggestions.resolvedSession.rescheduleTo[0], timeSuggestions.resolvedSession.rescheduleTo[1])}</strong></h3>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>Calculating best times to schedule a session for you</div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}