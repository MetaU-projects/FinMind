import { FaUserPlus } from "react-icons/fa";
import './MentorCard.css';

export default function MentorCard({ mentor, onConnect, onSelect, loadingMentor }) {
    return (
        <div>
            <div className='card group'>
                <div className="card-content">
                    <div className="tooltip group relative">
                        <span className="tooltiptext absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-10 min-w-[220px] bg-[#e1e1e1] dark:bg-[#5b6ea0] text-black dark:text-white rounded-xl shadow-lg px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#e1e1e1] dark:border-t-[#5b6ea0]"></div>
                            <strong className="block mb-2 text-[#3D52A0] dark:text-white text-base">Available:</strong>
                            <p className="mb-2 text-xs font-medium">{mentor.school}</p>
                            {Array.isArray(mentor.preference) && mentor.preference.length > 0 ? (
                                mentor.preference.map((avail, idx) => (
                                    <div key={idx} className="text-xs mb-1">
                                        <span className="font-semibold">{avail.day}:</span> {avail.startTime} - {avail.endTime}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-gray-500">No availability info</div>
                            )}
                        </span>
                        <img
                            src={`https://randomuser.me/api/portraits/women/${mentor.id + 20}.jpg`}
                            alt={mentor.name + " profile"}
                            className="profile-img border-2 border-[#3D52A0] group-hover:border-[#5b6ea0] transition"
                        />
                    </div>
                    <div className="card-name">
                        <h3 className="text-[#3D52A0] dark:text-white">{mentor.name}</h3>
                        <p className="capitalize">{mentor.classification} {mentor.major}</p>
                    </div>
                </div>

                <p className="card-bio hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition" onClick={() => onSelect(mentor)}>
                    {mentor.bio}
                </p>
                <div className="card-skills">
                    {Array.isArray(mentor.interest) && mentor.interest.map(skill => (
                        <span key={skill.id} className="bg-[#e1e1e1] dark:bg-[#5b6ea0] text-[#3D52A0] dark:text-white border border-[#3D52A0] dark:border-[#5b6ea0] px-2 py-0.5 rounded-full font-medium">
                            {skill.interest.name}
                        </span>
                    ))}
                </div>
                <button
                    className="btn shadow hover:shadow-md transition"
                    onClick={onConnect}
                    disabled={loadingMentor === mentor.id}
                >
                    <FaUserPlus className="connect-icon" />
                    {loadingMentor === mentor.id ? "Connecting..." : "Connect"}
                </button>
            </div>
        </div>
    )
}