import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops,menuLink }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}> <a href={menuLink}>  {title} </a></li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);


  const menuItems = {
     
    // "Call for more information +123456": "#donations",
  };
  const menuArray = Object.entries(menuItems);



  return (
    <nav className="w-full flex justify-center   items-center p-4 white-glassmorphism border-radius-none">
      <div className="  justify-center items-center">
       <a href="#">  <img src={logo} alt="logo" className=" center cursor-pointer" width="250px" /></a>
      </div>
    
      
    </nav>
  );
};

export default Navbar;
