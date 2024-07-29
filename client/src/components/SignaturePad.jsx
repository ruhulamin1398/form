import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Modal from 'react-modal';
import Loader from './Loader';


const SignaturePopup = () => {
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

    setIsLoading(true)

    const localUrl = "http://localhost:5000/save-signature";
    const serverUrl = "https://server-form.ruhul.info/save-signature";
    const SubmitUrl = serverUrl;



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

        setIsLoading(false)
      })
      .catch(error => {

        setIsLoading(false)
        console.error('Error:', error);
      });


  };

  return (
    <div  >

<div>

{isLoading ? (
                <Loader />
            ) : (
              imgURL ? (
                    <img
                        className="text-left mb-4 w-[200px] h-[100px] md:w-[300px] md:h-[150px] object-contain bg-white"
                        src={imgURL}
                        alt=""
                    />

                ) : null
            )}

</div>



      <button
        onClick={openModal}
        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer    text-center w-[200px] md:w-[300px] "
      >
        Open Signature Pad
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Signature Pad"
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
