export default function Recommended ({ recommend }) {
    console.log(recommend);
    return (
        <div className="side-container">
            <h2 className="side-header">Mentor Recommendations</h2>
            <ul className="side-list">
                {recommend.length!==0 ? (recommend.map((mentor) => (
                    <li key={mentor.id} className="side-item">
                        <div>
                            <h5>{mentor.name}</h5>
                            <p>Ranked: {mentor.score.toFixed(2)}</p>
                        </div>
                    </li>
                ))) : (
                    <div>Looking for recommnedations for you</div>
                )}
            </ul>
        </div>
    )
}