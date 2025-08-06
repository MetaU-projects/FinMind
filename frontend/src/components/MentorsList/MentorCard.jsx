import { FaUserPlus } from "react-icons/fa";
import './MentorCard.css';

export default function MentorCard({ mentor, onConnect, onSelect, loadingMentor }) {
    return (
        <div>
            <div className='card'>
                <div className="card-content">
                    <div className="tooltip">
                        <img
                            src={`https://randomuser.me/api/portraits/women/${mentor.id + 20}.jpg`}
                            alt={mentor.name + "profile"}
                            className="profile-img"
                        />
                        <span className="tooltiptext"><strong>Available:</strong><p>{mentor.school}</p>
                            {Array.isArray(mentor.preference) && mentor.preference.map(avail => (
                                <div key={mentor.preference.id}>{avail.day}: {avail.startTime} - {avail.endTime}</div>
                            ))}
                        </span>
                    </div>
                    <div className="card-name">
                        <h3>{mentor.name}</h3>
                        <p>{mentor.classification} {mentor.major}</p>
                    </div>
                </div>

                <p className="card-bio" onClick={() => onSelect(mentor)}>{mentor.bio}</p>
                <div className="card-skills">
                    {Array.isArray(mentor.interest) && mentor.interest.map(skill => (
                        <span key={skill.id}>{skill.interest.name}</span>
                    ))}
                </div>
                <button className="btn" onClick={onConnect} disabled={loadingMentor === mentor.id}><FaUserPlus className="connect-icon" />
                {loadingMentor === mentor.id ? "Connecting..." : "Connect"}
                </button>
            </div>
        </div>
    )
}