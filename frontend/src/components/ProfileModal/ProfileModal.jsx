import { AiTwotoneCalendar } from "react-icons/ai"; 
import { AiFillTag } from "react-icons/ai"; 
import { FaGraduationCap } from "react-icons/fa"; 
import "./ProfileModal.css"

export default function ProfileModal({ setPickMentor, user, onResponse, sendMentorId }) {
    const handleResponse = (userId) => {
        sendMentorId(userId);
        onResponse();
    }
    const onClose = () => {
        setPickMentor(null);
    }
    return (
        <div className="profile-overlay">
            <div className="profile-container">
                <span onClick={onClose} className="close-task">&times;</span>
                <div className="profile-top">
                    <h2>{user.name}</h2>
                    <h3>{user.classification} {user.major}</h3>
                </div>
                <div className="profile-sub">
                    <h4>About</h4>
                    <p>{user.bio}</p>
                </div>
                <div className="profile-class">
                    <div className="profile-sub">
                        <h4><AiFillTag />Classification</h4>
                        <p>{user.classification}</p>
                    </div>
                    <div className="profile-sub">
                        <h4><FaGraduationCap />Education</h4>
                        <p>{user.school}</p>
                    </div>
                </div>
                <div className="profile-sub">
                    <h4>Skills/Interests</h4>
                    <div className="interest-tags">
                        {Array.isArray(user.interest) && user.interest.map(skill => (
                            <span key={skill.interest.id}>{skill.interest.name}</span>
                        ))}
                    </div>
                </div>
                <div className="profile-sub">
                    <h4><AiTwotoneCalendar />Available</h4>
                    <div className="avail-tags">
                    {Array.isArray(user.preference) && user.preference.map(avail => (
                        <p key={user.preference.id}><strong>{avail.day}</strong>: {avail.startTime} - {avail.endTime}</p>
                    ))}
                    </div>
                </div>
                <button className="btn flex-end" onClick={() => handleResponse(user.id)}>Send Request to Connect</button>
            </div>
        </div>
    )
}