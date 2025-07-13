import { FaUserPlus } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import './MentorCard.css';

export default function MentorCard({ mentor, onConnect }) {
    return (
        <div className='card'>
            <div className="card-content">
                <div className="tooltip">
                    <img
                        src={`https://randomuser.me/api/portraits/women/${mentor.id + 20}.jpg`}
                        alt={mentor.name + "profile"}
                        className="profile-img"
                    />
                    <span className="tooltiptext"><strong>Available:</strong> {mentor.availability}</span>
                </div>

                <div className="card-name">
                    <h3>{mentor.name}</h3>
                    <p>{mentor.classification} {mentor.major}</p>
                </div>
            </div>
            <p className="card-bio">{mentor.bio}</p>
            <div className="card-skills">
                {mentor.description.split(', ').map(skill => (
                    <span key={skill} className="card-skill-tag">{skill}</span>
                ))}
            </div>
            <button className="btn" onClick={onConnect}><FaUserPlus className="connect-icon" />Connect</button>
        </div>
    )
}