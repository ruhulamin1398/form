import React, { useState } from 'react';
import Modal from './Modal';
import Toast from '../Toast';

const ModalInput = ({ placeholder, name, InputType, type, value, title, handleChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isToast, setIsToast] = useState(false);

  const showToast = () => {
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 3000);
  };

  const extractNumbers = (str) => {
    return str.replace(/\D/g, ''); // Remove all non-numeric characters
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log("new value :", newValue);

    if (InputType === 'number') {
      const isNumber = /^\d*$/.test(newValue);
      if (!isNumber) {
        setInputValue(extractNumbers(inputValue + ''));
        showToast();
        return;
      }
    }

    setInputValue(newValue);
    handleChange(e, name, newValue, title, InputType);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <input
        placeholder={placeholder}
        type={type} // Display as text for the button appearance
        value={inputValue}
        InputType= {InputType}
        onClick={() => setIsModalOpen(true)}
        readOnly
        className="form-input my-2 w-full rounded-sm p-2 bg-transparent text-white text-[7px] white-glassmorphism text-right border border-[#413d3ddb] border-[0.1px] text-wrap mTable"
      />
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <input
          placeholder={placeholder}
          type="text"
          name={name}
          title={title}
          value={inputValue}
          InputType= {InputType}
          onChange={handleInputChange}
          className="form-input w-full p-2 pl-0 border border-gray-300 rounded text-black"
        />
      </Modal>

      {isToast && (
        <Toast textTitle="Please enter numbers only" />
      )}
    </>
  );
};

export default ModalInput;







































// import { useState } from "react";


// import Modal from './Modal'; 
// const ModalInput = ({ placeholder, name, type, value, title, handleChange }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [inputValue, setInputValue] = useState(value);
  
//     const handleInputChange = (e) => {
//       setInputValue(e.target.value);
//       handleChange(e, name, e.target.value, title, type);
//     };
  
//     const handleModalClose = () => {
//       setIsModalOpen(false);
//     };
  
//     return (
//       <>
//         <input
//           placeholder={placeholder}
//           type={type}// Display as text for the button appearance
//           value={inputValue}
//           onClick={() => setIsModalOpen(true)}
//           readOnly
//           className="form-input my-2 w-full rounded-sm p-2 bg-transparent text-white   text-[7px] white-glassmorphism text-right  border border-[#413d3ddb] border-[0.1px] text-wrap mTable"
//         />
//         <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
//           <input
//             placeholder={placeholder}
//             type={type}
//             name={name}
//             title={title}
//             value={inputValue}
//             onChange={handleInputChange}
//             className="form-input w-full p-2 pl-0 border border-gray-300 rounded  text-black "
//           />
//         </Modal>
//       </>
//     );
//   };

//   export default ModalInput