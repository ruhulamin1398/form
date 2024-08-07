import React, { useState } from 'react'; 

const InputTable = ({ placeholder, name, type, value, title, className, handleChange }) => {
 
  
 

    return (
        <>
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                title={title}
                value={value}
                dir="rtl"
                onChange={handleChange}
                className={"form-input my-2 w-full rounded-sm p-2 bg-transparent text-white text-sm white-glassmorphism text-right border border-[#413d3ddb] border-[0.1px]  hidden md:block"}
            />
            
        </>
    );
};

export default InputTable;
