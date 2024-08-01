import React, { useRef, useState, useContext } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Modal from 'react-modal';
import Loader from './Loader';


import { TransactionContext } from "../context/TransactionContext";


const SignaturePopup = () => {

  const { handleChangeSignature, signatureType, setSignatureType } = useContext(TransactionContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgURL, setImgURL] = useState("")

  const [isLoading, setIsLoading] = useState(false);
  const sigCanvas = useRef(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveSignature = () => {

    closeModal();
    setSignatureType(1)

    setIsLoading(true)
    const serverUrl = "https://server-form.ruhul.info/signature";

    const localUrl = "http://localhost:5000/signature";
    const SubmitUrl = localUrl;



    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    fetch(SubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: dataURL }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setImgURL(data.imageURL)

        const imagepath = data.filePath;
        console.log("image url ", imagepath)



        handleChangeSignature("sign", imagepath, " חתימה&nbsp;וחותמת&nbsp;החברה")

     
        setIsLoading(false)
      })
      .catch(error => {
        setSignatureType(0)
        setIsLoading(false)
        console.error('Error:', error);
      });


  };

  return (
    <div  >

      <div className="mx-auto">

        {isLoading ? (
          <div className='w-[90px] h-[100px] md:w-[140px] md:h-[150px] overflow-hidden'>

            <Loader />
          </div>
        ) : (
          imgURL && (signatureType == 1) ? (
            <div className='w-[90px] h-[100px] md:w-[140px] md:h-[150px] overflow-hidden'>

              <img
                className=" pl-2 text-left mb-4 w-[90px] h-[100px] md:w-[140px] md:h-[150px] object-contain bg-white"
                src={imgURL}
                alt=""
              />
            </div>

          ) : ((signatureType == 2) ? (<div className='w-[90px] h-[100px] md:w-[140px] md:h-[150px] overflow-hidden'>
          </div>) : null)
        )}




      </div>



      <div
        onClick={openModal}
        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer    text-center w-[90px] md:w-[140px] mx-2 text-[8px]  md:text-base "
      >
       חתימה - דיגיטלית
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="חתימה - דיגיטלית"
        className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-75"
      >
        <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ className: 'signatureCanvas w-full h-64 border border-gray-300' }}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            >
              cancel
            </button>

            {/* <button
              onClick={clearSignature}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            >
              Clear
            </button> */}
            <button
              onClick={saveSignature}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignaturePopup;
