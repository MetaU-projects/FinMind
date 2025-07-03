import { RxAvatar } from "react-icons/rx";
import './MentorCard.css';

export default function MentorCard({ mentor, onConnect }) {
    return (
        <div className='card'>
            <div className='card-left'>
                <div className="card-icon">
                    <RxAvatar className="avatar" />
                    <h4>{mentor.classification}</h4>
                </div>
                <div className="mentor-detail">
                    <div className="top">
                        <h3>{mentor.name}</h3>
                        <div className="skill-tags">
                            {mentor.description.split(', ').map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <p>{mentor.bio}</p>
                </div>
            </div>

            <div className="card-right">
                <p>{mentor.major}</p>
                <button className="connect-btn" onClick={onConnect}>Connect</button>
            </div>
        </div>
    )
}