
import "./Todos.css";
import Todo from "./Todo";
import { v4 as uuidv4 } from 'uuid';
import React, { useState,useRef,useEffect } from 'react';

function Todos(props)  {
       
    const [todos, setTodos] = useState([])
    const [isShown,setIsShown] = useState(true);
    const [uid,setUid] = useState();
    const nameRef = useRef();
    const key = "todo";

 useEffect(() => {
    
    const tabTodos = localStorage.getItem(key);
    const storedTodos = JSON.parse(tabTodos);
    if (storedTodos) setTodos(storedTodos);

}, []);

useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos))
}, [todos]);



const handleAdd = (e) => {
    
    const name=nameRef.current.value;
    if (name==='') return;
    
    const newTodos= prevTodos => { return [...prevTodos,{id:uuidv4(),value:name,complete:true}]};
    setTodos(newTodos);
    nameRef.current.value=null;

}


const handleDelete = (m) => {      
   const newTodos= todos.filter(todo => m.id!=todo.id);
   setTodos(newTodos); 
}

const handleUpdate = (m) => {
    nameRef.current.value=m.value;
    setUid(m.id);
    setIsShown(false);
        
}
const handleEdit = (m) => {
    const name=nameRef.current.value;
    if (name==='') return;
    const newTodos = todos.map(todo => {
        return todo.id === uid ? { ...todo, value:name } : todo;
      });
    
    setTodos(newTodos);

    nameRef.current.value=null;
    setIsShown(true);     
}

  return(
  <>
    {todos.map((todo)=> (
        <Todo key={todo.id} id={todo.id} value={todo.value} todo={todo} handleDelete={handleDelete} handleUpdate={handleUpdate}></Todo>
    ))
    }
    <input type="text" ref={nameRef} ></input><input type="button" value="add" onClick={handleAdd} style={{display: isShown ? 'block' : 'none'}}/>
    <input type="button" id="update" value="update" onClick={handleEdit} style={{display: isShown ? 'none' : 'block'}} />     
    
    <div>{todos.length} to dos left</div>    

  </>   
      
  )
}


export default Todos;
