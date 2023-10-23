import React from 'react'

const Button = ({title, fileUpload}) => {
  return (
    <>
         <input type="file" id="file-input" name="file-input" className='hidden' onChange={fileUpload}   />
        <label 
       id="file-input-label" 
       htmlFor="file-input" 
       className='text-xl cursor-pointer border border-gray-300 bg-cyan-200 py-2 px-4 
       rounded-md hover:outline-none hover:bg-cyan-400 transition hover:text-white'
        >{title}</label>
    </>
  )
}

export default Button