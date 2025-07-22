import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from 'react';
import NewTaskModal from "./TaskComps/NewTaskModal";
import TaskColumn from "./TaskComps/TaskColumn";
import { getTasks } from "../../services/taskService";
import { taskStatus } from "../../utils/status";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function Tasks({ connection }) {
    const [addTask, setAddTask] = useState(false);
    const [todo, setTodo] = useState([]);
    const [inProgess, setInProgess] = useState([]);
    const [complete, setComplete] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTasks(connection.id);
                setTodo(data.filter(item => item.status === taskStatus.TODO));
                setInProgess(data.filter(item => item.status === taskStatus.INPROGRESS));
                setComplete(data.filter(item => item.status === taskStatus.COMPLETE));
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    });

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
                <TaskColumn value="ToDo" taskList={todo} />
                <TaskColumn value="In Progress" taskList={inProgess} />
                <TaskColumn value="Completed" taskList={complete} />
            </div>
            {addTask &&
                <NewTaskModal
                    connection={connection}
                    setAddTask={setAddTask}
                />
            }
        </div>
    )
}