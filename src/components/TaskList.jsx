import { useState } from "react"

function Task({data}){
    const [checked, setChecked]=useState(data.done);
    return(
        <div className="task"><input checked={checked} onChange={(e)=>{setChecked(e.currentTarget.checked)}} type="checkbox"/>{data.text}</div>
    )
}

export default function taskList({task}) {
    return (
        <div className='taskList'>
            <h2>
                <input type="checkbox"/>
                {task.heading}
            </h2>

            <hr/>
            {
                task.list.map((e,i)=><Task key={i} data={e}></Task>)
            }
        </div>
    )
}