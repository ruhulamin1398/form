import React, { useState } from 'react';
import Toast from '../Toast'; // Adjust the import path as needed

const Input = ({ placeholder, name, type, value, title, handleChange, className, InputType }) => {


    
    const [inputValue, setInputValue] = useState("");
    const [isToast, setIsToast] = useState(false);

    const showToast = () => {
        console.log("input")
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

    return (
        <>
            <input
                placeholder={placeholder}
                InputType={InputType}
                type={type}
                name={name}
                title={title}
                value={inputValue}
                  dir="rtl"
                
      onChange={(e) => handleInputChange(e, name, inputValue, title, type)}
      onKeyUp={(e) => handleInputChange(e, name, inputValue, title, type)}
      
                className={"form-input my-2 w-full rounded-sm p-2 bg-transparent text-white text-sm white-glassmorphism text-right border border-[#413d3ddb] border-[0.1px]"}
            
            />
            {isToast && (
                <Toast textTitle="נא להכניס מספרים בלבד" />
            )}
        </>
    );
};

export default Input;
