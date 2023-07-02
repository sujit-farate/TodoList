import { DeleteOutline, DeleteOutlined } from '@mui/icons-material'
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todo(){

    const getData=()=>{
        let localvalue= JSON.parse(localStorage.getItem("todo"))
        if(localvalue){
            return localvalue
        }
        return []
               
            }


const[todo,setTodo]=useState()
const[updateToPrint,setUpdateToPrint]=useState("")
    const[data,setData]=useState(getData())
    const[editTodo,setEditTodo]=useState(false)

   


   const addTodo =()=>{
setData([...data,todo])

    setTodo("")
    }

    const handleTodo =(e)=>{
        setTodo(e.target.value);
     }

     const deleteTodo=(index)=>{
        // console.log("index",index)
       const filterArray= data.filter((item,ind)=>{
            return ind!=index
        })
        
        setData(filterArray)
     }

     const updateTodo=(value,index)=>{
        setEditTodo(true)
        setUpdateToPrint(index)
     }

     useEffect(()=>{
localStorage.setItem("todo",JSON.stringify(data))
     },[data])
  return (<>
    <div>Todo</div>
    <TextField placeholder='enter todo..' size='small' value={todo} onChange={handleTodo}/>
    <Button onClick={addTodo}>submit</Button>
    <List>{data.map((item,index)=>{
        return(<>
        <ListItem key={index}>
            <ListItemText >{item}</ListItemText>
            {editTodo?<input type='text' value={updateToPrint}/>:null}
            <Button variant="contained" onClick={()=>updateTodo(item,index)}>Update Todo</Button>
            <DeleteIcon onClick={()=>deleteTodo(index)}/>
        </ListItem>
        
        </>)
    })}</List>
    </>
  )
}

