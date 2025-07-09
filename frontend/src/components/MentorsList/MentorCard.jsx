import { RxAvatar } from "react-icons/rx";
import './MentorCard.css';

export default function MentorCard({ mentor, onConnect }) {
    return (
        <div className='card'>
            <div className='card-left'>
                <div className="card-icon">
                    <div className="tooltip">
                        <RxAvatar className="avatar" />
                        <span className="tooltiptext"><strong>Available:</strong> {mentor.availability}</span>
                    </div>

                </div>
                <div className="mentor-detail">
                    <div className="top">
                        <div className="name-class">
                            <h3>{mentor.name}</h3>
                            <p>{mentor.classification}</p>
                        </div>
                        <div className="skill-tags">
                            {mentor.description.split(', ').map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <p className="mentor-bio">{mentor.bio}</p>
                </div>
            </div>

            <div className="card-right">
                <p>{mentor.major}</p>
                <button className="connect-btn" onClick={onConnect}>Connect</button>
            </div>
        </div>
    )
}