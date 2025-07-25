import { FaUserPlus } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import './MentorCard.css';

export default function MentorCard({ mentor, onConnect }) {
    return (
        <div className='card'>
            <div className='card-content'>
            <div className="card-content">
                <div className="tooltip">
                    <img
                        src={`https://randomuser.me/api/portraits/women/${mentor.id + 20}.jpg`}
                        alt={mentor.name + "profile"}
                        className="profile-img"
                    />
                    <span className="tooltiptext"><strong>Available</strong>
                        {mentor.preference.map(avail => (
                            <li key={avail.id}>{avail.day}: {avail.startTime} - {avail.endTime}</li>
                        ))}
                    </span> 
                </div>
                <div className="card-name">
                    <h3>{mentor.name}</h3>
                    <p>{mentor.classification} {mentor.major}</p>
                    <p>{mentor.classification}</p>
                    <span className="tooltiptext"><strong>Available:</strong> {mentor.availability}</span>
                </div>
            </div>
            <p className="card-bio">{mentor.bio}</p>
            <div className="card-skills">
                {mentor.interest.map(skill => (
                    <span key={skill}>{skill.interest.name}</span>
                ))}
            </div>
            <button className="btn" onClick={onConnect}><FaUserPlus className="connect-icon" /> Connect</button>
        </div >
    )
}