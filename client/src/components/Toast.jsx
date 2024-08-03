// src/components/Toast.js
import React from 'react';
import ReactDOM from 'react-dom';

const Toast = ({ textTitle }) => {
  const toastElement = (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2">
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span>{textTitle}</span>
    </div>
  );

  return ReactDOM.createPortal(
    toastElement,
    document.body // This renders the toast into the body element
  );
};

export default Toast;
