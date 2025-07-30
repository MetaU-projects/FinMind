import { useState } from 'react';
import "./TaskComps.css"
import { createTask } from '../../../services/taskService';
import { taskPriority } from '../../../utils/status';

export default function NewTaskModal({ setAddTask, connection, onCountUpdate, updateColumn}) {
    const [ title, setTitle] = useState("");
    const [ description, setDescription] = useState("");
    const [ priority, setPriority] = useState("");
    const onClose = () => {
        setAddTask(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await createTask(connection.id, title, description, priority )
        onClose();
        updateColumn();
        onCountUpdate?.();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <span onClick={onClose} className="close-task">&times;</span>
                <div className="new-task-title">
                    <h2 >Create New Task</h2>
                    <p>Add a new task to track progess with this connection</p>
                </div>
                <form onSubmit={handleSubmit} className="task-form">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

                    <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="new-task-priority">
                        <option value={taskPriority.LOW}>Low</option>
                        <option value={taskPriority.MEDIUM}>Medium</option>
                        <option value={taskPriority.HIGH}>High</option>
                    </select>

                    <button type="submit" className="submit-task" >Create Task</button>
                </form>
            </div>
        </div>
    )
}