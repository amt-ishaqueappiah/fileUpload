import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {

  const[allFiles, setAllFiles] = useState<FileList | null>(null)

  
  const changeFileInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
    let files = event.target.files;
    setAllFiles(files)
  }
  
  const uploadMultipleFiles = async (e:any)=>{
    e.preventDefault()
    console.log(allFiles)
    let form= new FormData(e.currentTarget)
    let mainFiles= allFiles!
    form.append('name', 'sdjksdjks')
    console.log(20, mainFiles)
    for(let i=0; i<mainFiles.length!; i++){
      console.log(22,mainFiles[i])
      form.append('files', mainFiles[i])
      console.log(24, form)
    }
    
    const poster= await axios.post('http://localhost:3000/addFiles', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(poster.data)
  }

  return (

      <form className='app'encType='multipart/form-data' onSubmit={uploadMultipleFiles}>
        <h2>
          {" "}
          Using the <i>axiois</i> to upload multiple files on NodeJS server.{" "}
        </h2>
        <input type="file" multiple onChange={(event)=> changeFileInput(event)} />
        <button>
          Send Multiple Files to the Server
        </button>
      </form>

  )
}

export default App
