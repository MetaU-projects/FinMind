export default function Recommended ({ recommend }) {
    console.log("type something",recommend)
    return (
        <div className="pending-requests">
            <h2 className="pending-header">Mentor Recommendations</h2>
            <ul className="pending-list">
                {recommend.length!==0 ? (recommend.map((mentor) => (
                    <li key={mentor.id} className="pending-item">
                        <div>
                            <h5>{mentor.name}</h5>
                            <p>I think you might like this one</p>
                        </div>
                    </li>
                ))) : (
                    <div>We'll keep recommending mentors for you</div>
                )}
            </ul>
        </div>
    )
}