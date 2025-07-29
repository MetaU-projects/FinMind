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
                        <h4>Classification</h4>
                        <p>{user.classification}</p>
                    </div>
                    <div className="profile-sub">
                        <h4>Education</h4>
                        <p>{user.school}</p>
                    </div>
                </div>
                <div className="profile-sub">
                    <h4>Interests</h4>
                    <p>{user.interest}</p>
                </div>
                <div className="profile-sub">
                    <h4>Available</h4>
                    <p>{user.preference}</p>
                </div>
                <button className="btn" onClick={() => handleResponse(user.id)}>Send Request to Connect</button>
            </div>
        </div>
    )
}