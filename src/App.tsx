import { useState } from 'react'
import axios from 'axios';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

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
      <form onSubmit={handleSubmit} className='w-[400px] h-20 bg-red-500'>
        <Input type="file" name="files" onChange={e=> setFiles(e.target.files)} />
        <Button type="submit" variant={'outline'}>Enviar</Button>
      </form>
    </>
  )
}

export default App
