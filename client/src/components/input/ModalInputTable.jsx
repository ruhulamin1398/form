import React, { useState } from 'react';
import Modal from './Modal';
import Toast from '../Toast';

const ModalInputTable = ({ name, type, value, title, handleChange, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);


    const handleInputChange = (e) => {
        const newValue = e.target.value;
        console.log("new value :", newValue);

        setInputValue(newValue);

        handleChange(e,index)
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <input
                index={index}
                dir="rtl"
                type={type} // Display as text for the button appearance
                value={inputValue}
                onChange={handleChange}
                onKeyUp={handleChange}
                onClick={() => setIsModalOpen(true)}
                readOnly
                className="form-input my-2 w-full rounded-sm p-2 bg-transparent text-white text-[7px] white-glassmorphism text-right border border-[#413d3ddb] border-[0.1px] text-wrap blog md:hidden "
            />
            <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
                <input
                    index={index}
                    dir="rtl"
                    type="text"
                    name={name}
                    title={title}
                    value={inputValue}
                    onChange={handleInputChange}
                    autoFocus="true"
                    className="form-input w-full p-2 pl-0 border border-gray-300 rounded text-black"
                />
            </Modal>


        </>
    );
};

export default ModalInputTable;































