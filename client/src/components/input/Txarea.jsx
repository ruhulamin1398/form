import React, { useState } from 'react';

const Txarea = ({ name, value, handleChange }) => {

    const handleInputChange = (e)=>{
        let val = e.target.value;
        handleChange(e, name, val, "title", "textarea")
    }



    return (
        <>

            <textarea
                name={name}
                value={value}
                onChange={(e)=>handleInputChange(e)}

                className=" form-input my-2 w-full rounded-sm p-2 bg-transparent text-white text-sm white-glassmorphism text-right border border-[#413d3ddb] border-[0.1px]    "

            ></textarea>

        </>
    );
};

export default Txarea;
