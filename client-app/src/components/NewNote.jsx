import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
export const NewNote = () => {
  const [noteForm, setFormData] = useState({
    title: '',
    description: ''
  })

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if(!noteForm.title) {
      newErrors .title = "Title is required";
    }

    if(!noteForm.description) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
   
    
    // Error Validation
    const validationErrors = validate();
    console.log(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      axios.post(`${apiUrl}/api/note/`,noteForm).then(res => {
        navigate('/');
      }).catch(err => {
        alert("Failed to save your note.")
      })
    } else {
      setErrors(validationErrors);
    }

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
         />

        { errors.title && <p className='text-red-600 text-sm border-2 border-red-600 rounded mt-1'>{errors.title}</p>}
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
        
        ></textarea>
        { errors.description && <p className='text-red-600 text-sm border-2 border-red-600 rounded'>{errors.description}</p>}
      </div>

      <div className="mb-4 flex flex-row-reverse w-full">
        <button type='submit' className='btn-primary text-sm' >Create Note</button>
      </div>
    </form>
  )
}
