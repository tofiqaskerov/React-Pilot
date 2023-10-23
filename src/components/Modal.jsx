import React from 'react';

const Modal = ({ isOpen, closeModal, len, status,wkt, handleLenChange, handleStatusChange, handleSubmit,handleWktChange }) => {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({ len, status,wkt }); 
  }
  return (
    <div className={isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden'}>
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-1/2 p-6 rounded shadow-lg z-50">
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div>
            <label className="block mb-2">Len:</label>
            <input
              type="text"
              value={len}
              onChange={handleLenChange}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Wkt:</label>
            <input
              type="text"
              value={wkt}
              onChange={handleWktChange}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Status:</label>
            <input
              type="text"
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Submit</button>
            <button type="button" onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
