import TaskCard from "./TaskCard";
import "./TaskComps.css";

export default function TaskColumn({ value, taskList }) {
    return (
        <div className="col-container">
            <h3 className="col-title"> {value}(s) : {taskList.length} </h3>
            <div className="col-cards">
                {taskList.map(task => (
                    <TaskCard task={task} />
                ))}
            </div>
        </div>
    )

}