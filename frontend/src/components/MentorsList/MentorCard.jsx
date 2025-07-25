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
                        <span className="tooltiptext p-3"><strong>Attends: </strong>
                            {mentor.school}
                        </span>
                    </div>
                </div>
                <div className="card-name">
                    <h3>{mentor.name}</h3>
                    <p>{mentor.classification} {mentor.major}</p>
                </div>
            </div>
            <p className="card-bio">{mentor.bio}</p>
            <div className="card-skills">
                {mentor.interest.map(skill => (
                    <span key={skill.id}>{skill.interest.name}</span>
                ))}
            </div>
            <button className="btn" onClick={onConnect}><FaUserPlus className="connect-icon" /> Connect</button>
        </div>
    )
}