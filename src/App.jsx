import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import { v4 } from 'uuid';

function App() {

  const [taskList, setTaskList] = useState(() => JSON.parse(localStorage.getItem("tasks") || '[]'))
  const [selectedTaskList, setSelectedTaskList] = useState(0)
  const [editingHeading, setEditingHeading] = useState(null)

  useEffect(() => {
    // everytime tasklist is updated, we save it
    localStorage.setItem("tasks", JSON.stringify(taskList))
  }, [taskList])

  useEffect(() => {
    if (taskList.length == 0)
      setTaskList([
    { "heading": "This is a Task list", "id": "10becb9f-8d25-4fa6-a9cc-7e1659fa17bc", "list": [{ "id": "96b2c212-9316-43eb-9c60-76541a9adcd3", "text": "This is a task", "done": false }, { "id": "cceb6464-f7bf-41e0-b796-94ab39286492", "text": "double click me to edit", "done": false }] },
    { "heading": "to create new tasks,", "id": "d645f15b-a1ae-4086-ad57-80d6a72f5e96", "list": [{ "id": "20ae731f-10b2-4da6-87af-3608ed255b9b", "text": "add your tasks here", "done": false }] },
    { "heading": "Use the button below ", "id": "4e223c4a-8cf5-4613-afbb-96ba38441754", "list": [{ "id": "e0d650c5-f146-4e0a-a786-2f3dff0c624b", "text": "add your tasks here", "done": false }]},
    { "heading":"Double click to edit","id":"8ee7fd8c-684e-4fea-a455-067e7ef0455e","list":[{"id":"e812a322-7d9e-4cc6-9ce5-da9babad494b","text":"hehe","done":false}]}]);
  })


  const createTaskList = () => {
    setTaskList([{ "heading": "Task", "id": v4(), "list": [] }, ...taskList])
  }

  const updateTaskList = (updatedTask) => {
    setTaskList(prev => {
      const updated = [...prev];
      updated[selectedTaskList] = updatedTask;
      return updated;
    })
  }

  const updateTaskListHeading = (newHeading) => {
    setTaskList(prev => {
      let updated = [...prev];
      if (updated[selectedTaskList]) {
        updated[selectedTaskList] = { ...updated[selectedTaskList], heading: newHeading };
      }
      return updated;
    })
    setEditingHeading(null)
  }

  function TaskListElem({ data, index }) {

    const [newTaskListName, setNewTaskListName] = useState("");

    const isEditing = editingHeading === index

    const handleDoubleClick = () => {
      setEditingHeading(index)
      setNewTaskListName(data.heading);
    }

    const deleteTaskList = (index) => {
      let updatedList = [];
      for (let i = 0; i < taskList.length; i++) {
        let e = taskList[i];
        if (i !== index) {
          updatedList.push(e);
        }
      }
      setTaskList(updatedList);
    }

    const handleSubmit = (e, useE = true) => {
      if (useE)
        updateTaskListHeading(e.target.value)
      else
        updateTaskListHeading(newTaskListName)
    }

    return (
      <div
        className={`taskListItem ${index === selectedTaskList ? 'selected' : ''}`}
        onClick={() => setSelectedTaskList(index)}
      >
        {isEditing ? (
          <input
            type="text"
            defaultValue={data.heading}
            onBlur={handleSubmit}
            autoFocus
            className="editingHeading"
            onChange={(e) => setNewTaskListName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleSubmit({}, false)
            }}
          />
        ) : (
          <>
            <div onDoubleClick={handleDoubleClick}>{data.heading}</div>
            <span onClick={() => deleteTaskList(index)} className="material-symbols-outlined">
              delete
            </span>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div className='sideBar'>
        <div className='list'>
          {
            taskList.map((e, i) => <TaskListElem key={i} data={e} index={i}></TaskListElem>)
          }
        </div>

        <div className='listButtons'>
          <button className='createListButton' onClick={createTaskList}> Create New List</button>
        </div>
      </div>

      <TaskList
        task={taskList[selectedTaskList]}
        onUpdateTask={updateTaskList}
      ></TaskList>
    </>
  )
}

export default App
