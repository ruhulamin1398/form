import React, { useState, useContext } from "react";



import { TransactionContext } from "../context/TransactionContext";

import  LoaderBig  from "./LoaderBig";
import { Done } from ".";
import Error from "./Error";


const Submit = () => {
  const { handleChange, formData, signatureType, isSubmit, setIsSubmit , submitLoading, setSubmitLoading , isComplete, setIsComplete, submitStatus, setSubmitStatus} = useContext(TransactionContext);


const SubmitAgain = () =>{
  window.location.reload();

}
const TryAgain = () =>{
  setIsSubmit(false)
  setIsComplete(false)
  setSubmitStatus(0)
}

  return (



    <div className="flex  justify-center items-center pb-[10px] px-[10px] overflow-x-hidden w-full max-w-screen-lg mx-auto">
      <div className="flex mf:flex-row-reverse flex-col items-end justify-between md:p-0 py-2 md:py-12 px-md-4">
        <div className="flex flex-col flex-1 items-center justify-start mf:mt-0 mt-2 md:mt-10">

          <div className="p-5  w-full flex flex-col justify-start items-center blue-glassmorphism w-[200px] md:w-[500px]">

            {(submitStatus==2) ? <Error /> : (
              <Done />
            )}

            {/* <div className="h-[1px] w-full bg-gray-400 my-2" /> */}

            {submitStatus==2 ? <>
               <div className="p-4 m-4 text-white text-2xl">
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
              <div className=" p-4 m-4 text-white">
                Your Form is SuccessFully Submitted.
              </div>

              <button
                type="button" 
                onClick={SubmitAgain}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer   "
              >
                Submit Another
              </button>
              
              </>)}
            


          </div>

        </div>
      </div>

    </div>



  );
};

export default Submit;
