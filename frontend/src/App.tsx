import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {

  const[allFiles, setAllFiles] = useState<FileList | null |[] >(null)
  const [error,setError]= useState(false)
  const data: any[]=[]  

  const changeFileInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
    let files = event.target.files;
    setAllFiles(files)
  }
 
  const uploadMultipleFiles = async (e:any)=>{
    e.preventDefault()
    let form= new FormData(e.currentTarget)
    let mainFiles= allFiles!
    for(let i=0; i<mainFiles.length!; i++){
      form.append('files', mainFiles[i])
    }

    for(let i=0; i<mainFiles.length;i++){
      if(mainFiles[i].type !="application/pdf"){
       
         data.push(mainFiles[i])
      }
    }
    console.log(data)

    if(data.length<=0){
      setError((prev)=>prev=false)
      const poster= await axios.post('http://localhost:3000/addFiles', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
     console.log(poster.data())
    }
    else{
      setError((prev)=>prev=true)
      console.log('error found')
    }
  }



  return (

      <form className='app'encType='multipart/form-data' onSubmit={uploadMultipleFiles}>
        <h2>
          {" "}
          Using the <i>axiois</i> to upload multiple files on NodeJS server.{" "}
        </h2>
        <input type="file" multiple accept='.pdf' onChange={(event)=> changeFileInput(event)} onClick={()=>setError(false)}/>
        {error ==true && <p>Error found. please insert a pdf file</p>}
        <button>
          Send Multiple Files to the Server
        </button>
      </form>

  )
}

export default App
