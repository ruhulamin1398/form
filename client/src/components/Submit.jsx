import React, { useState, useContext, useEffect } from "react";



import { TransactionContext } from "../context/TransactionContext";
import { FaDownload } from "react-icons/fa6";
import LoaderBig from "./LoaderBig";
import { Done } from ".";
import Error from "./Error";

import { activeHost } from "../utils/constant";

import { IoIosArrowRoundBack } from "react-icons/io";
import Toast from "./Toast";
const Submit = () => {


  const { submnissionStage, setSubmnissionStage, dPDFLink, formData, setIsSubmit,  setIsComplete, submitStatus, setSubmitStatus } = useContext(TransactionContext);

  const [isChecked, setIsChecked] = useState(false);


  const [isToast, setIsToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");


  const [isDone, setIsDone] = useState(0);
  const [isLoading, setIsLoading] = useState(0);


  const showToast = () => {




    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 3000); // Hide the toast after 3 seconds
  };





  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    console.log(isChecked)
  };

  const FinalSubmit= async() =>{
    console.log("called FinalSubmit")

    if(!isChecked){
      setToastTitle("Checkbox is required")


          console.log("checkbox Toast")
          showToast();
          return ;
    }

    try {
      setIsLoading(1)
   

      const response = await fetch(activeHost + '/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setIsDone(1)
     
      setSubmnissionStage (3)

    } catch (error) {
      console.error('Error:', error);
 
  
      setSubmnissionStage (3)

      // Handle error (e.g., show an error message)
    }

    setIsLoading(0)
 



  }


  const SubmitAgain = () => {
    window.location.reload();

  }
  const TryAgain = () => {
    setIsSubmit(false)
    setIsComplete(false)
    setSubmitStatus(0)
    setSubmnissionStage(1)
  }

  useEffect(() => {
    return () => {
      setIsLoading(0); // Reset loading state on unmount
    };
  }, []);
  return (

<>
{submnissionStage ==2 ? 
    <div className={`flex  justify-center items-center   px-[10px] overflow-x-hidden w-full max-w-screen-lg mx-auto mt-[30px] md:mt-[100px]  `}>
      <hr  className="text-white"/>
      <div className="flex mf:flex-row-reverse flex-col items-end justify-between md:p-0     px-md-4">
        <div className="flex flex-col flex-1 items-center justify-start mf:mt-0    ">

          <div className="p-5  w-full flex flex-col justify-start items-center  w-full ">



          {
  isLoading? <LoaderBig/> :
<>
              {/* {(submitStatus == 2) ? <Error /> : (


                <>

                  <button
                    type="button"
                    className="text-white mt-2 rounded-full cursor-pointer flex items-center space-x-2 mb-[20px] md:mb-[50px]"
                    onClick={TryAgain}
                  >
                    <IoIosArrowRoundBack size={52} />
                    <div>Modify Response</div>
                  </button>


                  <Done />
                </>
              )}
    */}

            {submitStatus == 2 ? <>
              <div className="p-4   text-white text-2xl">
                Something Went Wrong !!!!
              </div>

              <button
                type="button"
                onClick={TryAgain}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer   "
              >
                Try Again
              </button>
            </> : (<>



              <div className=" p-4 mb-4 text-white">
                Your Form is SuccessFully Recorded.
              </div>



              <div className=" py-0">

                <a href={dPDFLink} target="_blank" rel="noopener noreferrer">
                  <button
                    type="button"
                    className="text-white mt-2 rounded-full cursor-pointer text-center flex flex-col items-center justify-center p-4"
                  >
                    <FaDownload size="64" />
                    <div className=" py-4 text-sm"> Click Here <br/>To Download Response</div>
                  </button>
                </a>


              </div>





              <label className="flex items-center space-x-2 mt-4 px-2  md:px-10">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#3d4f7c] border-gray-300 rounded focus:ring-[#3d4f7c]"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="text-white pl-4">
                  I have reviewed the form data, and everything looks correct. I agree to submit the data.
                </span>
              </label>


              <button
                type="button"
                onClick={FinalSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer mt-6    "
              >
                Submit
              </button>

            </>)}
            </>}


          </div>

        </div>
      </div>

    </div>

:""} 


      {
        isToast ?
          <Toast
            textTitle={toastTitle}

          /> : null
      }
</>

  );
};

export default Submit;
