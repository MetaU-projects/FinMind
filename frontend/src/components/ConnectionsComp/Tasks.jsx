import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from 'react';
import NewTaskModal from "./TaskComps/NewTaskModal";
import TaskColumn from "./TaskComps/TaskColumn";
import { getTasks, updateTask } from "../../services/taskService";
import { taskStatus } from "../../utils/status";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function Tasks({ connection, onCountUpdate }) {
    const [addTask, setAddTask] = useState(false);
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [complete, setComplete] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTasks(connection.id);
                setTodo(data.filter(item => item.status === taskStatus.TODO));
                setInProgress(data.filter(item => item.status === taskStatus.INPROGRESS));
                setComplete(data.filter(item => item.status === taskStatus.COMPLETE));
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, [connection.id]);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const updatedTask = await updateTask(taskId, newStatus);
            setTodo(prev => prev.filter(task => task.id !== taskId));
            setInProgress(prev => prev.filter(task => task.id !== taskId));
            setComplete(prev => prev.filter(task => task.id !== taskId));

            switch(newStatus){
                case taskStatus.TODO:
                    setTodo(prev => [updatedTask, ...prev]);
                    break;
                case taskStatus.INPROGRESS:
                    setInProgress(prev => [updatedTask, ...prev]);
                    break;
                case taskStatus.COMPLETE:
                    setComplete(prev => [updatedTask, ...prev]);
                    break;
            }
            onCountUpdate?.();
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            {error && <ErrorModal error={error} setError={setError} />}

            <div className="task-top">
                <div className="task-text">
                    <h2>Tasks</h2>
                    <p>Manage tasks and goals for this connection</p>
                </div>
                <button onClick={() => setAddTask(true)} className="add-task"><AiOutlinePlus />New Task</button>
            </div>

            <div className="task-cards">
                <TaskColumn value="ToDo" taskList={todo} handleStatusChange={handleStatusChange} />
                <TaskColumn value="In Progress" taskList={inProgress} handleStatusChange={handleStatusChange} />
                <TaskColumn value="Completed" taskList={complete} handleStatusChange={handleStatusChange} />
            </div>
            {addTask &&
                <NewTaskModal
                    connection={connection}
                    setAddTask={setAddTask}
                    onCountUpdate={onCountUpdate}
                />
            }
        </div>
    )
}