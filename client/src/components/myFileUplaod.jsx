import React, { useState, useContext } from 'react';
import Loader from './Loader';

import { TransactionContext } from "../context/TransactionContext";

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageName, setImageName] = useState(''); // Added state for file name

    const { handleChange, signatureType, setSignatureType } = useContext(TransactionContext);

    const handleFileChangeImage = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        setImage(file);
        setImageName(file.name);

        try {
            setSignatureType(2)
            let formSubmitData = new FormData();
            formSubmitData.append('file', file); // Directly use the file instead of image

            const localUrl = "http://localhost:5000/image";
            const serverUrl = "https://server-form.ruhul.info/image";
            const SubmitUrl = localUrl;

            const response = await fetch(SubmitUrl, {
                method: 'POST',
                body: formSubmitData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setImageURL(data.imageURL);

            const value = data.filePath;
            handleChange(e, "sign", value, " חתימה&nbsp;וחותמת&nbsp;החברה", "file");

        } catch (error) {

            setSignatureType(0)
            console.error('Error:', error);
        }

        setIsLoading(false);
    };

    return (

        <div className="relative">
            {isLoading ? (
                <div className='w-[90px] h-[100px] md:w-[140px] md:h-[150px] overflow-hidden'>

                    <Loader />
                </div>
            ) : (
                imageName && (signatureType == 2) ? (
                    <div className='w-[90px] h-[100px] md:w-[140px] md:h-[150px] overflow-hidden'>
                        <img
                            className="text-left mb-4 w-[90px] h-[100px] md:w-[140px] md:h-[150px] object-contain"
                            src={imageURL}
                            alt=""
                        />
                    </div>
                ) : ((signatureType == 1) ? (<div className='w-[90px] h-[100px] md:w-[140px] md:h-[150px] overflow-hidden'>
                </div>) : null)
            )}

            <input
                type="file"
                className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
                id="fileInput"
                onChange={handleFileChangeImage}
            />
            <div className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer    text-center w-[90px] md:w-[140px] mx-2  text-[8px] md:text-base ">
                {
                    imageName ? (
                        <span className="text-white text-[8px] md:text-base  "> העלאת קובץ</span>
                    ) : (
                        <div className="text-white text-[8px] md:text-base"> העלאת קובץ  </div>
                    )
                }
            </div>
        </div>
    );
}

export default ImageUpload;
