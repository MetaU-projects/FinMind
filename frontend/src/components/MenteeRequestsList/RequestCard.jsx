import { RxAvatar } from "react-icons/rx";

export default function RequestCard({ mentee, onAccept, onReject }) {
    return (
        <div className='card'>
            <div className='card-left'>
                <div className="card-icon">
                    <RxAvatar className="avatar" />
                    <h4>{mentee.classification}</h4>
                </div>
                <div className="mentor-detail">
                    <div className="top">
                        <h3>{mentee.name}</h3>
                        <div className="skill-tags">
                            {mentee.description.split(', ').map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <p>{mentee.bio}</p>
                </div>
            </div>

            <div className="card-right">
                <p>{mentee.major}</p>
                <button className="connect-btn" onClick={onAccept}>Accept</button>
                <button className="connect-btn" onClick={onReject}>Decline</button>
            </div>
        </div>
    )
}