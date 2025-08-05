import { useEffect, useState } from 'react';
import { createTask } from '../../../services/taskService';
import { taskPriority } from '../../../utils/status';

export default function EditTaskModal({ isOpen, onClose, task, onSubmit }) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState(task?.priority || "");

    useEffect(() => {
        if(task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setPriority(task.priority);
        }
    }, [task])

    const handleSave = async (e) => {
        e.preventDefault();
        onSubmit({
            taskId: task.id,
            title,
            description,
            priority
        });
        onClose();
    }

    

    if(!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <span onClick={onClose} className="close-task">&times;</span>
                <div className="new-task-title">
                    <h2>Edit Task</h2>
                    <p>Make necessary changes and keep going!</p>
                </div>
                <form className="task-form">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

                    <select value={priority} onChange={(e) => setPriority(e.target.value)} className="new-task-priority">
                        <option value={taskPriority.LOW}>Low</option>
                        <option value={taskPriority.MEDIUM}>Medium</option>
                        <option value={taskPriority.HIGH}>High</option>
                    </select>

                    <button onClick={handleSave} className="submit-task">Save</button>
                </form>
            </div>
        </div>
    )
}