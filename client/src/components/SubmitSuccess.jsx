import React, { useState, useContext, useEffect } from "react";

 
import { FaDownload } from "react-icons/fa6";
import LoaderBig from "./LoaderBig";
import { Done } from ".";
import Error from "./Error";

import { activeHost } from "../utils/constant";

import { IoIosArrowRoundBack } from "react-icons/io"; 

import { TransactionContext } from "../context/TransactionContext";
const SubmitSuccess = () => {
  

 

  const {   dPDFLink   } = useContext(TransactionContext);




 

 


  const SubmitAgain = () => {
    window.location.reload();

  }
  

 
  return (

<> 
    <div className={`flex  justify-center items-center pb-[10px] px-[10px] overflow-x-hidden w-full max-w-screen-lg mx-auto   `}>
      <div className="flex mf:flex-row-reverse flex-col items-end justify-between md:p-0 py-2 md:py-12 ">
        <div className="flex flex-col flex-1 items-center justify-start mf:mt-0 mt-2 md:mt-10">

          <div className="p-5  w-full flex flex-col justify-start items-center blue-glassmorphism w-full md:w-[500px] mx-10 md:mx-24">



     

                 


                <Done />
           




              <div className=" p-4 mb-4 text-white">
                Your Form is SuccessFully Submitted.
              </div>



              <div className=" py-6 md:py-12">

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




 


              <button
                type="button"
                onClick={SubmitAgain}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer mt-6    "
              >
                Submit Another
              </button>

             

          </div>

        </div>
      </div>

    </div>

 

 

      
</>

  );
};

export default SubmitSuccess;
