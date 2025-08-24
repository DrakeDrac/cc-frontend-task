import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='sideBar'>
        <div className='list'>
        </div>
        <div className='listButtons'>
        </div>
      </div>
      <TaskList task={{"heading":"moj", "list":[{"text": "okok"},{"text": "mojmojS"}]}}></TaskList>
    </>
  )
}

export default App
