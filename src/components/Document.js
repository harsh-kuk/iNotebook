import React, { useState } from 'react'

const Document = () => {
    const[file,setFile]=useState()
  const handleFile=(event)=>{
setFile(event.target.files[0])
    }
    const handleUpload=()=>{
        const formData=new FormData();
        formData.append('file',file)
        fetch('url',{
            method:"POST",
            body:formData
        }).then((response)=>response.json()).then((result)=>{
            console.log('success',result)
        })
        .catch(error=>{
            console.error('error',error)
        })
    }
  return (
    <div>
      <h2>Upload files</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name='file' onChange={handleFile}/>
        <button>Upload</button>
      </form>
    </div>
  )
}
export default Document
