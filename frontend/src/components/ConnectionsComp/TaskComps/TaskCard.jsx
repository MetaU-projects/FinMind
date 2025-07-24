import "./TaskComps.css";

export default function TaskCard(){
    return (
        <div className="task-container">
            <h4 className="task-title">Presentation slides</h4>
            <p className="task-description">Create slides for next week's stakeholder meeting</p>
            <div className="task-status">
                <span className="status">in-progress</span>
                <span className="status">completed</span>
            </div>
        </div>
    )
}