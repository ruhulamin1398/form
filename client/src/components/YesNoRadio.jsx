import { useState } from 'react';

const YesNoRadio = ({ name, value, title,  handleChange }) => {


  return (
    <div className="flex items-center mb-4">
      <label className="text-white mr-4 cursor-pointer flex items-center">
        <input
          type="radio"
          name={name}
          value="yes" 
          onChange={(e) => handleChange(e, name, "yes", title, "radio")}
          className="mr-2 cursor-pointer"
        />
        <span className="ml-1">כן</span> {/* Level text */}
      
      </label>
      <label className="text-white cursor-pointer flex items-center">
        <input
          type="radio"
          name={name}
          value="no" 
          onChange={(e) => handleChange(e, name, "no", title, "radio")}
          
          className="mr-2 cursor-pointer"
        />
        <span className="ml-1">לא</span> {/* Level text */}
        
      </label>
    </div>
  );
};

export default YesNoRadio;
