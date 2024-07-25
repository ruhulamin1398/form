import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, handleClose, children }) => {
  useEffect(() => {
    // Add event listener to handle clicks outside of the modal
    const handleClickOutside = (event) => {
      if (event.target.className.includes('modal-overlay')) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 pt-[50px] rounded-md shadow-md relative">
        <button onClick={handleClose} className="absolute top-2 right-2 p-2 text-gray-600">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
