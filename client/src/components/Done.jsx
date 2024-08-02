import React from 'react';

const Done = () => (
  <div className="flex justify-center items-center py-3">
    <div className="rounded-full h-16 w-16 flex items-center justify-center border-2 border-green-500">
      <svg
        className="w-8 h-8 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
  </div>
);

export default Done;
