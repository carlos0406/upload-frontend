import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [files,setFiles] = useState<FileList | null >({} as FileList)
  const handleSubmit = async (e:SubmitEvent) =>{
    e.preventDefault();
    if(files && files.length>0){
      const file = files[0]
      const response = await axios.post("http://localhost:3000/upload",{
        contentType:file.type,
        name:file.name
      })
      if(response.data?.url){
        const responsePut= await axios.put(response.data?.url,file,{
          headers:{
            'Content-Type':file.type
          }
        })
        console.log(responsePut)
      }
    }
    // console.log(files)
  }
  return (
    <>
      {/**@ts-ignore */}
      <form onSubmit={handleSubmit}>
        <input type="file" name="files" onChange={e=> setFiles(e.target.files)} />
        <button type="submit">enviar arquivos</button>
      </form>
    </>
  )
}

export default App
