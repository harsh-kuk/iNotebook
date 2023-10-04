import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext  from '../context/notes/noteContext';


const AddNote = (props) => {
    const context= useContext(noteContext);
    const {addNote}= context;
    const[note,setNote]=useState({title:"", description:"",tags:""})
    const handleclick=(e)=>{
        e.preventDefault();
      addNote(note.title, note.description,note.tags);
      setNote({title:"", description:"",tags:""})
    props.showAlert("Added Sucessfully","success")

    }
    const onchange=(e)=>{
setNote({...note,[e.target.name]:e.target.value})
    }
  return ( 
    <div className='container my-3'>
        <h2>Add a note</h2>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title'value={note.title} aria-describedby="emailHelp" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="Description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description}onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tags" name='tags' value={note.tags} onChange={onchange}/>
  </div>
  
  <button disabled={note.title.length<4 || note.description.length<5}type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
</form>
    </div>


  
)
}
export default AddNote;
