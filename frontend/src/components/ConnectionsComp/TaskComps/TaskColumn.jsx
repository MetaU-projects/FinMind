import TaskCard from "./TaskCard";
import "./TaskComps.css";

export default function TaskColumn(){
    return (
        <div className="col-container">
            <h3 className="col-title"> Todo(s) </h3>
            <div className="col-cards">
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>
        </div>
    )
    
}