import { AiOutlineWechat } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import "./ConnectionsComp.css"
import { formatUnixTimes } from "../../utils/formatUnixTime";

export default function Meetings({ upComing, meetingHistory, connection }) {
    return (
        <div className="wrapper">
            <div className="upcoming">
                <div className="meeting-top">
                    <AiOutlineClockCircle className="upcoming-icon" />
                    <h2>Upcoming Meetings({upComing.length})</h2>
                </div>
                <p className="meeting-top-text">Scheduled meetings with this connection</p>
                {upComing.length === 0 ? (
                    <div className="meeting-empty">
                        <AiOutlineCalendar className="empty-icon" />
                        <h2>No upcoming meetings scheduled</h2>
                        <p>Use the Schedule tab to book a new meeting</p>
                    </div>
                ) : (
                    upComing.map(meeting => (
                        <div className="meeting-list">
                            <div className="meeting-details">
                                <AiOutlineClockCircle className="upcoming-icon" />
                                <div className="history-texts">
                                    <h3>{meeting.reason}</h3>
                                    <p>{formatUnixTimes(meeting.startTime, meeting.endTime)}</p>
                                </div>
                            </div>
                            <span className="upcoming-status">
                                <AiOutlineWechat />
                                <a href="mailto:recipient@email.com">Chat</a>
                            </span>
                        </div>
                    ))
                )
                }
            </div>
            <div className="history">
                <div className="meeting-top">
                    <AiOutlineCheckCircle className="history-icon" />
                    <h2>Meeting History({meetingHistory.length})</h2>
                </div>
                <p className="meeting-top-text">Previous meeting and sessions</p>
                {meetingHistory.length === 0 ? (
                    <div className="meeting-empty">
                        <AiOutlineHistory className="empty-icon" />
                        <h2>No meeting histroy</h2>
                        <p>Schedule more meeting and create memories</p>
                    </div>
                ) : (
                    meetingHistory.map(meeting => (
                        <div className="meeting-list">
                            <div className="meeting-details">
                                <AiOutlineCheckCircle className="history-icon" />
                                <div className="history-texts">
                                    <h3>{meeting.reason}</h3>
                                    <p>{formatUnixTimes(meeting.startTime, meeting.endTime)}</p>
                                </div>
                            </div>
                            <span className="history-status">completed</span>
                        </div>
                    ))
                )
                }
            </div>
            <div className="meeting-stats">
                <div className="meeting-top">
                    <h2>Meeting Statistics</h2>
                </div>
                <div className="stats-details">
                    <div className="stats">
                        <h3 className="stats-total">{meetingHistory.length + upComing.length}</h3>
                        <p>Total Meetings</p>
                    </div>
                    <div className="stats">
                        <h3 className="stats-completed">{meetingHistory.length}</h3>
                        <p>Completed</p>
                    </div>
                    <div className="stats">
                        <h3 className="stats-upcoming">{upComing.length}</h3>
                        <p>Upcoming</p>
                    </div>
                </div>
            </div>
        </div>
    )
}