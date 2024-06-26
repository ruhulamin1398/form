import React from 'react';

const Tooltip = () => {
  return (
    
      <div className="relative group ml-[20px] z-50">
        <h4 className="text-right   mt-5 pb-2 w-full font-bold text-white">
          <div className="rtl-text text-nowrap 
            ">
            
            <span className="bg-gray-800 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center ml-2 cursor-pointer">
              ?
            </span>
            
             </div>
        </h4>
        <div dir="rtl" className="absolute right-full top-0 ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 w-[250px] z-50">
        קוד האינטרנט אשר מוטבע על כרטיס החבר הארגוני        </div>
      </div>

);
};

export default Tooltip;
