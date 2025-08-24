function Task({data}){
    return(
        <div><input type="checkbox"/>{data.text}</div>
    )
}

export default function taskList({task}) {
    return (
        <div className='taskList'>
            <h2><input type="checkbox"/>{task.heading}</h2>
            <hr></hr>
            {
                task.list.map((e,i)=><Task key={i} data={e}></Task>)
            }
        </div>
    )
}