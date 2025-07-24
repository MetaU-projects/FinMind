import { AiOutlinePlus } from "react-icons/ai";
import { useState } from 'react';
import NewTaskModal from "./TaskComps/NewTaskModal";
import TaskColumn from "./TaskComps/TaskColumn";

export default function Tasks() {
    const [addTask, setAddTask] = useState(false);
    const handleTask = () => {
        //TODO handle backend logics
    }
    return (
        <div>
            <div className="task-top">
                <div className="task-text">
                    <h2>Tasks</h2>
                    <p>Manage tasks and goals for this connection</p>
                </div>
                <button onClick={() => setAddTask(true)} className="add-task"><AiOutlinePlus />New Task</button>
            </div>

            <div className="task-cards">
                <TaskColumn />
                <TaskColumn />
                <TaskColumn />
            </div>
            {addTask &&
                <NewTaskModal
                    setAddTask={setAddTask}
                    onSubmit={handleTask} />
            }
        </div>
    )
}