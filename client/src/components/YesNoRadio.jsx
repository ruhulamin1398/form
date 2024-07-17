import { useState } from 'react';

const YesNoRadio = ({ name, value, handleChange }) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    handleChange(option, name);
  };

  return (
    <div className="flex items-center mb-4">
      <label className="text-white mr-4 cursor-pointer flex items-center">
        <input
          type="radio"
          name={name}
          value="yes"
          checked={selectedOption === 'yes'}
          onChange={() => handleOptionChange('yes')}
          className="mr-2 cursor-pointer"
        />
        <span className="ml-1">כן</span> {/* Level text */}
      
      </label>
      <label className="text-white cursor-pointer flex items-center">
        <input
          type="radio"
          name={name}
          value="no"
          checked={selectedOption === 'no'}
          onChange={() => handleOptionChange('no')}
          className="mr-2 cursor-pointer "
        />
        <span className="ml-1">לא</span> {/* Level text */}
        
      </label>
    </div>
  );
};

export default YesNoRadio;
