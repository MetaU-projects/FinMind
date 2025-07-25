import { useState } from "react";
import "./TaskComps.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { taskStatus } from "../../../utils/status";
import { updateTask } from "../../../services/taskService";
import ErrorModal from "../../ErrorModal/ErrorModal";

export default function TaskCard({ task, onStatusChange }) {
    const [action, setAction] = useState(false);
    const [error, setError] = useState("")

    const handleTaskAction = async (value) => {
        let taskAction;
        switch(value){
            case "todo":
                taskAction = taskStatus.TODO;
                break;
            case "inprogress":
                taskAction = taskStatus.INPROGRESS;
                break;
            case "complete":
                taskAction = taskStatus.COMPLETE;
                break;
        }
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
                        <option value="todo">todo</option>
                        <option value="inprogress">in progress</option>
                        <option value="complete">complete</option>
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