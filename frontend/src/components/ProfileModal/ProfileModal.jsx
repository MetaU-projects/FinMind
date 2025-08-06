import { AiTwotoneCalendar } from "react-icons/ai"; 
import { AiFillTag } from "react-icons/ai"; 
import { FaGraduationCap } from "react-icons/fa"; 
import "./ProfileModal.css";

export default function ProfileModal({ setPickMentor, userInfo}) {
    const onClose = () => {
        setPickMentor(null);
    }
    return (
        <div className="profile-overlay">
            <div className="profile-container">
                <span onClick={onClose} className="close-task">&times;</span>
                <div className="profile-top">
                    <h2>{userInfo.name}</h2>
                    <h3>{userInfo.major}</h3>
                </div>
                <div className="profile-sub">
                    <h4>About</h4>
                    <p>{userInfo.bio}</p>
                </div>
                <div className="profile-class">
                    <div className="profile-sub">
                        <h4><AiFillTag />Classification</h4>
                        <p>{userInfo.classification}</p>
                    </div>
                    <div className="profile-sub">
                        <h4><FaGraduationCap />Education</h4>
                        <p>{userInfo.school}</p>
                    </div>
                </div>
                <div className="profile-sub">
                    <h4>Skills/Interests</h4>
                    <div className="interest-tags">
                        {Array.isArray(userInfo.interest) && userInfo.interest.map(skill => (
                            <span key={skill.interest.id}>{skill.interest.name}</span>
                        ))}
                    </div>
                </div>
                <div className="profile-sub">
                    <h4><AiTwotoneCalendar />Available</h4>
                    <div className="avail-tags">
                    {Array.isArray(userInfo.preference) && userInfo.preference.map(avail => (
                        <p key={userInfo.preference.id}><strong>{avail.day}</strong>: {avail.startTime} - {avail.endTime}</p>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}