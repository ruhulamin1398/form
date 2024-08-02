import React from 'react';

const Error = () => (
  <div className="flex justify-center items-center py-3">
    <div className="rounded-full h-16 w-16 flex items-center justify-center border-2 border-red-500">
      <svg
        className="w-8 h-8 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </div>
  </div>
);

export default Error;
