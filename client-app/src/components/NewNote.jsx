import axios from 'axios';
import React, { useState } from 'react'

export const NewNote = () => {
  const [noteForm, setFormData] = useState({
    title: '',
    description: ''
  })

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    // Error Validation

    axios.post(`${apiUrl}/api/note/`,noteForm).then(res => {
      alert('Note Submitted succesfully')
    }).catch(err => {
      alert("Failed to save your note.")
    })
  } 

  return (
    <form onSubmit={onFormSubmit} className='max-w-xl flex-1 mt-8 mb-auto mx-auto bg-white p-6 rounded shadow'>
      <div className='mb-4'>
        <label htmlFor="title" className='block text-gray-700 font-bold mb-2'>
          Title
        </label>
        <input 
        type='text'
        name='title'
        id='title'
        placeholder='Note title'
        value={noteForm.title}
        onChange={handleChange}
        className='border rounded w-full py-2 px-3 text-gray-700'
        required />
      </div>

      <div className='mb-4'>
        <label htmlFor="description" className='block text-gray-700 font-bold mb-2'>
          Description
        </label>
        <textarea 
        name="description" 
        id="description"
        placeholder='Note description'
        value={noteForm.description}
        onChange={handleChange}
        className='border rounded w-full py-2 px-3 text-gray-700'
        rows='5'
        required
        ></textarea>
      </div>

      <div className="mb-4 flex flex-row-reverse w-full">
        <button type='submit' className='btn-primary text-sm'>Create Note</button>
      </div>
    </form>
  )
}
