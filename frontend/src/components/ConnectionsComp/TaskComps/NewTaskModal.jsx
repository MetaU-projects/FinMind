import "./TaskComps.css"

export default function NewTaskModal({ setAddTask, onSubmit }) {
    const onClose = () => {
        setAddTask(false);
    }
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <span onClick={onClose} className="close-task">&times;</span>
                <div className="new-task-title">
                    <h2 >Create New Task</h2>
                    <p>Add a new task to track progess with this connection</p>
                </div>
                <form onSubmit={onSubmit} className="task-form">
                    <input type="text" name="title" placeholder="Task title" required />
                    <textarea name="desscription" placeholder="Description" />

                    <select name="priority" className="new-task-priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button type="submit" className="submit-task" >Create Task</button>
                </form>
            </div>
        </div>
    )
}