import { RxAvatar } from "react-icons/rx";

export default function RequestCard({ mentee, onAccept, onReject, onSelect }) {
    return (
        <div className='flex flex-col justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-200'>
            <div className="card-icon">
                <RxAvatar className="avatar" />
            </div>
            <div className="card-name">
                <h3>{mentee.name}</h3>
                <p>{mentee.classification}</p>
            </div>
            <p className="dark:text-gray-200 line-clamp-3" onClick={() => onSelect(mentee)}>{mentee.bio}</p>
            <div className="card-skills">
                {mentee.interest.map(skill => (
                    <span key={skill}>{skill.interest.name}</span>
                ))}
            </div>
            <p className="dark:text-gray-200">{mentee.major}</p>
            <div className="flex gap-2">
                <button className="btn w-1/2" onClick={onAccept}>Accept</button>
                <button className="btn w-1/2" onClick={onReject}>Decline</button>
            </div>
        </div>
    )
}