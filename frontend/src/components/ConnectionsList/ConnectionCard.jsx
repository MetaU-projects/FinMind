import { AiFillDelete } from "react-icons/ai"; 
import { RxAvatar } from "react-icons/rx";
import "./ConnectionCard.css"

export default function ConnectionCard({ person, endConnection }) {
    return (
        <div className="connection-card">
            <div className="connection-top">
                <RxAvatar className="avatar" />
                <div className="top-detail">
                    <h3>{person.name}</h3>
                    <p>{person.classification}</p>
                </div>
            </div>

            <p className="connection-bio">{person.bio}</p>

            <hr className="divider" />

            <div className="connection-actions">
                <button onClick={endConnection} className="end-btn"><AiFillDelete /></button>
            </div>
        </div>
    )
}