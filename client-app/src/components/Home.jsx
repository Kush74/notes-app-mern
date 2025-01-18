import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'moment'

const apiUrl = import.meta.env.VITE_API_URL;
export const Home = () => {
  const [notes, setNotes] = useState([]);

  // const notes = []

  useEffect(() => {
    console.log({apiUrl});
    
    axios.get(`${apiUrl}/api/note/get-all`).then((res) => {
      
      const data = res.data.notes
      setNotes(data);
      // console.log(data);
    })

  },[])

  const handleDeleteTask = (note) => {
    console.log("selected note",note);
    
    axios.delete(`${apiUrl}/api/note/${note._id}`,).then((res) => {
      const index = notes.findIndex(n => n._id == note._id)
      if(index && index != -1){
        notes.splice(index,1);
        setNotes([...notes]);
      }
    }).catch(err => {
      alert("unable to delete the note!!")
    })
  }

  

  return (
    <div className='my-10 max-w-xl flex flex-1 flex-col  drop-shadow-lg bg-white rounded-lg relative'>
      <h2 className='text-3xl font-bold px-4 py-3 text-gray-700'>Notes Home</h2>́
      <div className='overflow-y-auto px-2 flex flex-col w-full gap-3 max-h-[740px]'>
          {notes.map(note => {
            return <div key={note._id} className='flex rounded-lg border-solid border-neutral-400 border-2 py-1 px-3 mx-4 gap-2 items-center hover:bg-slate-100'>
              <div className='flex-1 flex flex-col'>
                <div className='text-lg text-gray-800'>{note.title}</div>
                <div className='text-gray-300 text-sm italic'>Created on { Moment(note.updatedAt).format('MMM Do YYYY')}</div>
              </div>
              <button className='btn-primary text-sm'>Edit</button>
              <button className='btn-warn text-sm' onClick={() => handleDeleteTask(note)}>Delete</button>
            </div>

          })}
         
      </div>
      
      </div>
  )
}
