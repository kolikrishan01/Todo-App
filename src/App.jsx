import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { CgSandClock } from "react-icons/cg";
import "./App.css"

const getDataFromLocalStorage = () =>{
  const todo = JSON.parse(localStorage.getItem("todos"));
  if(todo){
    return JSON.parse(localStorage.getItem("todos"));
  }else{
    return []
  }
}

const App = () => {
  // const [isCompleted, setIsCompleted] = useState(true);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState(getDataFromLocalStorage())
  const handleSubmit = () =>{
    if(task.trim() === "" || description.trim() === "") return
   const newVal = {
    task,
    description,
    id: data.length + 1,
    completed: false,
    date: new Date().toLocaleString()
   }
   
   setData([...data,newVal])
   
   setTask("");
   setDescription("")
  
  }
 useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(data));
 },[data])
  

const handleChekc = (id) =>{
  setData((prev)=>prev.map((elm)=> elm.id == id ? {...elm , completed:!elm.completed} : elm))
} 

  return (
  <div className=' w-full h-screen bg-zinc-200 overflow-y-scroll'>
    <div className=' w-full h-40 flex items-center justify-center text-5xl font-semibold text-black'>
      <h1>My Todos</h1>
    </div>
 <div className=' flex items-center justify-center  '>
 <div className='boxShadow bg-zinc-700 rounded-lg flex items-center justify-center flex-col gap-10 w-[800px] h-[100%] py-8'>
 <div>

  <form className='flex items-center justify-center gap-8 mb-10'>
      <input type="text"  placeholder="Add a task..." value={task} onChange={(e)=>setTask(e.target.value)} className=" w-[300px] h-12 pl-4 outline-none font-bold text-sm" />
      <input type="text"  placeholder="Add a desc..." value={description} onChange={(e)=>setDescription(e.target.value)}  className="w-[300px] h-12 pl-4 outline-none font-bold text-sm" />
      <span className=' w-12 h-12 flex items-center justify-center bg-green-700' onClick={handleSubmit}>
      <FaPlus color='white'/>
      </span>
    </form>
    {/* <button className={`btn ${isCompleted === true &&  "active"}`} onClick={()=>setIsCompleted(true)}>Task</button>
 <button  className={`btn ${isCompleted === false &&  "active"}`} onClick={()=>setIsCompleted(false)}>Completed</button> */}
    </div>
 
   {
    data.map((item)=>{
      return(
        
        <div className={`boxShadow rounded-lg w-[721px] flex items-center justify-between px-4 py-2 ${!item?.completed ? "bg-white" : "bg-slate-800"}`} key={item?.id}> 
  <div className='max-w-[500px]'>
  <h2 className=' text-3xl font-semibold text-green-700'>{item?.task}</h2>
    <p className={`${!item?.completed ? "text-black" : "text-white"}`}>{item?.description}</p>
    <p className={`${!item?.completed ? "text-black" : "text-white"} text-[12px] pt-2`}><i>{item?.date}</i></p>
   
  </div>
    <span className='flex items-center justify-center gap-4'>
    <span onClick={()=>setData((prev)=> prev.filter((val)=> val?.id !== item?.id))}>
    <MdDelete size="1.5em" color='#E74C3C' />
    </span>
  
   <span onClick={()=>handleChekc(item?.id)} className=' cursor-pointer '>
   {
    !item?.completed ? <span className=' text-green-700 text-[25px]'><CgSandClock /></span> : <span className=' text-green-700 text-[25px]'> <FaCheck /></span>
   }

   </span>
    </span>
    </div>

      )
    })
   }
  </div>
 </div>
 </div>
  )
}

export default App

