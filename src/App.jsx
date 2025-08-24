import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import {v4} from 'uuid';

function App() {

  const [taskList, setTaskList] = useState(()=>JSON.parse(localStorage.getItem("tasks") || '[]'))

  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(taskList))
  }, [taskList])
  

  const createTaskList = () => {
    setTaskList([{"heading":"Task", "id":v4(),"list":[]},...taskList])
  }

  function TaskListElem ({data}){
    return(
      <div>{data.heading}</div>
    )
  }

  return (
    <>
      <div className='sideBar'>
        <div className='list'>
          {
                taskList.map((e,i)=><TaskListElem key={i} data={e}></TaskListElem>)
          }
        </div>
        <div className='listButtons'>
          <button className='createListButton' onClick={createTaskList}> Create List</button>
        </div>
      </div>
      <TaskList task={taskList[0] || {"heading":"moja", "list":[{"text": "okok", "done": false},{"text": "mojmojS","done": true}]}}></TaskList>
    </>
  )
}

export default App
