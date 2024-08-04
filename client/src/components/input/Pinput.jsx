import React, { useState, useContext } from 'react';
import Toast from '../Toast';
 


const PInput = ({ placeholder, name, InputType ,type , value, title, handleChange }) => {

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




  const handleInputChange = (e, name, value, title, type) => {
    const newValue = e.target.value;
    console.log("new value :", newValue)

    if (InputType === 'number') {
      const isNumber = /^\d*$/.test(newValue);
      if (!isNumber) {
        setInputValue(extractNumbers(inputValue+''));
        
        showToast(); 
        return;
      }
    }
    

    setInputValue(newValue);
    handleChange(e, name, newValue, title, InputType);
  };

  return (
    <>
    <input
      placeholder={placeholder}
      InputType = {InputType}
      type="text"
      name={name}
      title={title}
      value={inputValue}
      onChange={(e) => handleInputChange(e, name, inputValue, title, type)}
      onKeyUp={(e) => handleInputChange(e, name, inputValue, title, type)}
      className=" form-input my-2 w-full rounded-sm p-2   bg-transparent text-white  text-sm white-glassmorphism text-right  border border-[#413d3ddb] border-[0.1px] pcTable  "
    />

    {
        isToast ?   
        <Toast
        textTitle="נא להכניס מספרים בלבד"
        
        />  : null
      }

</>


  );
};

export default PInput;
