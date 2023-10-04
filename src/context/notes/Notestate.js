import { useState } from "react";
import NoteContext from "./noteContext";

const Notestate=(props)=>{
const host="http://localhost:5000"
const notesinitial=[]
const [notes,setNotes]=useState(notesinitial)

// get all notes
// eslint-disable-next-line
const getNotes=async()=>{
    // TODO API CALL
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjkxMzEzNjkwfQ.220Ds2ArTGWsXq2yTmXDfSYflayRg0DCZ87ctlRBDI8",
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkY2M5OTRhMjRjMWI0MzRmOWY2ZDUwIn0sImlhdCI6MTY5MjIxMTA2MX0.VhLXe_EdqWLoed9rF_K_MKEfpWRiPKHA1RTeK5Avr90",
        "auth-token": localStorage.getItem('token'),
        } 
      });
      const json =await response.json()
      console.log(json)
      setNotes(json)
    }


// Add a Note
const addNote=async (title,description,tags)=>{
// TODO API CALL
// API call

const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkY2M5OTRhMjRjMWI0MzRmOWY2ZDUwIn0sImlhdCI6MTY5MjIxMTA2MX0.VhLXe_EdqWLoed9rF_K_MKEfpWRiPKHA1RTeK5Avr90",
      // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjkxMzEzNjkwfQ.220Ds2ArTGWsXq2yTmXDfSYflayRg0DCZ87ctlRBDI8",
      "auth-token": localStorage.getItem('token'),
    },
    body: JSON.stringify({title,description,tags}), 
    
  });
const note =await response.json()

setNotes(notes.concat(note))
}
// Delete a Note
const deleteNote=async (id)=>{
    // TODO API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjkxNDA3NjQyfQ.nfCYj9RbJlRJTDNzHlqhBdWY8WrytpgoWUXOAecwCKo",
        "auth-token": localStorage.getItem('token'),
      },
    });
    // eslint-disable-next-line
    const json= response.json();  
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
}

// edit a Note
const editNote= async (id,title,description,tags)=>{
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjkxNDA1MjYzfQ.Kz5JWCl-01fRaOP3vJbhnVcS3JcFvurk7Zz9PgI0DBM",
        "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tags}), 
      });
      // eslint-disable-next-line
      const json= response.json();
let newNote=JSON.parse(JSON.stringify(notes))
    // logic to edit in client
for (let index=0;index< notes.length;index++)    {
    const element=notes[index];
    if(element._id===id){
      newNote[index].title=title;
      newNote[index].description=description;
      newNote[index].tags=tags;
      break;
    }
}  
console.log(notes);
setNotes(newNote);
}
return(
<NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
    {props.children}
</NoteContext.Provider>
)
}
export default Notestate;
