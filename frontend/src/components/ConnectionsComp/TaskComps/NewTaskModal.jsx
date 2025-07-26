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
    const handlePriority = (value) => {
        switch(value){
            case 'LOW':
                setPriority(taskPriority.LOW)
                return;
            case 'MEDIUM':
                setPriority(taskPriority.MEDIUM);
                return;
            case 'HIGH':
                setPriority(taskPriority.HIGH);
                return;
        }
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

                    <select value={priority} onChange={(e)=>handlePriority(e.target.value)} className="new-task-priority">
                        <option value='LOW'>Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>

                    <button type="submit" className="submit-task" >Create Task</button>
                </form>
            </div>
        </div>
    )
}