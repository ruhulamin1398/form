import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, handleClose, children }) => {


  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center    ">
 


        <div className=" p-4 pb-[60px] rounded-md  relative  blue-glassmorphism border-black  ">

          {children}

          <button onClick={handleClose}

            className=" border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointe absolute bottom-2 left-2 p-2 rounded-md text-white  "
          >
            Done
          </button>


 
          </div>


    </div>
  );
};

export default Modal;
