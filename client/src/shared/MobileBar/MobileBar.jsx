/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

import "./MobileBar.css";
const MobileBar = ({ navItems, setIsOpen, isOpen }) => {
  const toggleBar = () => setIsOpen(false);

  return (
    <>
      {/* Animated Sidebar */}
      <div className="fixed h-screen top-0 left-0 z-[999] bg-[#244436] lg:w-1/3 md:w-2/3 w-full border-l border-[#A6C291]">
        <div
          className="absolute group right-8 top-8 bg-[#fff] text-[#244436] border border-[#A68F7F]/40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          onClick={toggleBar}
        >
          <p className="text-2xl group-hover:rotate-45 duration-300">
            <HiXMark />
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 xl:mt-60 lg:mt-60 md:mt-60 mt-40">
          {navItems?.map((navItem) => (
            <div key={navItem.label}>
              <Link to={navItem.href}>
                <li
                  onClick={toggleBar}
                  data-text={navItem.label}
                  className="md:text-4xl text-2xl font-semibold list-none uppercase animated_click"
                >
                  {navItem.label}
                </li>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileBar;
