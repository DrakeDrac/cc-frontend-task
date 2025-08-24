import { useState } from "react"
import { v4 } from "uuid";

function Task({ data, onChange, onUpdateText, onDeleteTask }) {
    const [checked, setChecked] = useState(data.done);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(data.text);

    const handleTaskChange = (e) => {
        let newChecked = e.currentTarget.checked;
        setChecked(newChecked);
        onChange(data.id, newChecked);
    }

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditText(data.text);
    }


    const handleSave = () => {
        if (editText != "") {
            onUpdateText(data.id, editText);
        }
        setIsEditing(false);
    }

    return (
        <div className="task">
            <input checked={checked} onChange={handleTaskChange} type="checkbox" />
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave}
                    autoFocus
                    className="editingTask"
                />
            ) : (
                <div className="taskText">
                    <div onDoubleClick={handleDoubleClick}>{data.text}</div>
                    <span onClick={() => onDeleteTask(data.id)} className="material-symbols-outlined">
                        delete
                    </span>
                </div>
            )}
        </div>
    )
}

export default function taskList({ task, onUpdateTask }) {
    const [newTaskText, setNewTaskText] = useState("");
    if (!task) return null;

    const addTask = () => {
        if (newTaskText == "") return;

        let newTask = {
            id: v4(),
            text: newTaskText,
            done: false
        };

        let updatedTask = {
            ...task,
            list: [...task.list, newTask]
        };

        onUpdateTask(updatedTask);
        setNewTaskText("");
    };

    const deleteTask = (id) => {
        console.log(id)
        let updatedTasks = [];
        for (let i = 0; i < task.list.length; i++)
            if (task.list[i].id != id)
                updatedTasks.push(task.list[i])
        task.list = updatedTasks;
        onUpdateTask(task);
    }

    const handleToggleTask = (id, newDone) => {
        let updatedList = [];
        for (let i = 0; i < task.list.length; i++) {
            let e = task.list[i];
            if (e.id == id) {
                updatedList.push({ ...e, done: newDone });
            } else {
                updatedList.push(e);
            }
        }
        let updatedTask = {
            ...task,
            list: updatedList
        };
        onUpdateTask(updatedTask);
    };

    const handleUpdateTaskText = (id, newText) => {
        let updatedList = [];
        for (let i = 0; i < task.list.length; i++) {
            let e = task.list[i];
            if (e.id == id) {
                updatedList.push({ ...e, text: newText });
            } else {
                updatedList.push(e);
            }
        }
        let updatedTask = {
            ...task,
            list: updatedList
        };
        onUpdateTask(updatedTask);
    };

    return (
        <div className='taskList'>
            <h2>
                {task?.heading}
            </h2>

            <hr />
            <div className="tasksContainer">
                {
                    task.list.map((e, i) => <Task key={e.id || i} data={e} onDeleteTask={deleteTask} onChange={handleToggleTask} onUpdateText={handleUpdateTaskText}></Task>)
                }
            </div>

            <div className="addTaskContainer">
                <input
                    type="text"
                    className="addTaskContainerText"
                    placeholder="Add a new task..."
                    value={newTaskText}
                    onKeyDown={(e) => {
                        console.log(e);
                        if(e.key=="Enter") addTask()
                        }}
                    onChange={(e) => setNewTaskText(e.target.value)}
                />
                <button className="addTaskContainerButton" onClick={addTask}>Add Task</button>
            </div>
        </div>
    )
}