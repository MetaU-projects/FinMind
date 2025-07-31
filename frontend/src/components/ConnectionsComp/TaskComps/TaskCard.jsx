import { useState } from "react";
import "./TaskComps.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { taskStatus } from "../../../utils/status";
import ErrorModal from "../../ErrorModal/ErrorModal";

export default function TaskCard({ task, onStatusChange }) {
    const [action, setAction] = useState(false);
    const [error, setError] = useState("")

    const handleTaskAction = async (value) => {
        setAction(false);
        onStatusChange(task.id, value)
    }

    return (
        <div>
            {error && (<ErrorModal setError={setError} error={error} />)}
            <div className="task-container relative">
                <div className="task-top-text">
                    <h4 className="task-title">{task.title}</h4>
                    <AiOutlineEllipsis className="task-actions" onClick={() => setAction(true)} />
                </div>
                {action &&
                    <select className="action-dropdown" onChange={(e) => handleTaskAction(e.target.value)}>
                        <option value="">Mark as</option>
                        <option value={taskStatus.TODO}>todo</option>
                        <option value={taskStatus.INPROGRESS}>in progress</option>
                        <option value={taskStatus.COMPLETE}>complete</option>
                    </select>
                }
                <p className="task-description">{task.description}</p>
                <div className="task-status">
                    <span className="status">{task.status}</span>
                    <span className="priority">{task.priority}</span>
                </div>
            </div>
        </div>
    )
}