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

    const getStatusColor = (status) => {
        switch (status) {
            case taskStatus.TODO:
                return "bg-blue-500";
            case taskStatus.INPROGRESS:
                return "bg-yellow-500";
            case taskStatus.COMPLETE:
                return "bg-green-500";
            default:
                return "bg-gray-400";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "HIGH":
                return "bg-red-500";
            case "MEDIUM":
                return "bg-orange-500";
            case "LOW":
                return "bg-green-500";
            default:
                return "bg-gray-400";
        }
    };


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
                    <span className={`status ${getStatusColor(task.status)}`}>{task.status}</span>
                    <span className={`priority ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                </div>
            </div>
        </div>
    )
}