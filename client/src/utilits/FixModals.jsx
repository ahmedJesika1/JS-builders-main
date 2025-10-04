/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { BsBoxArrowInDownRight } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

const FixModals = ({ about, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = () => {
    // Save the current scroll position
    setScrollPosition(window.scrollY);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      // Lock the body and apply the saved scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      // Unlock the body and restore the scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      // Scroll back to the saved position
      window.scrollTo(0, scrollPosition);
    }
  }, [isModalOpen, scrollPosition]);

  return (
    <>
      <button
        className="text-[#244436] group-hover:text-[white] flex items-center gap-1"
        onClick={openModal}
      >
        <BsBoxArrowInDownRight /> more
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:px-0 md:px-0 px-8">
          <div className="bg-white lg:mt-[12vh] rounded-lg px-8 py-8 relative xl:w-[50%] lg:w-[65%] md:w-[80%] w-full lg:h-[70vh] md:h-[60vh] h-[60vh] overflow-y-scroll">
            <button
              className="absolute top-8 right-5 w-[30px] h-[30px] border border-[#244436] text-[#244436] hover:bg-[#244436] hover:text-[#fff] duration-300 cursor-pointer text-xl flex items-center justify-center rounded"
              onClick={closeModal}
            >
              <HiXMark />
            </button>
            <div>
              <div className={`flex flex-col gap-4`}>
                <div className="flex items-end">
                  <p className="w-[30px] h-[2px] bg-[#244436]"></p>
                  <p className="text-base font-semibold text-[#244436]">
                    About Us
                  </p>
                </div>
                {type === "about" && (
                  <h2 className="text-2xl font-semibold">{about.title}</h2>
                )}
                {type === "mission" && (
                  <h2 className="text-2xl font-semibold">Mission</h2>
                )}
                {type === "vision" && (
                  <h2 className="text-2xl font-semibold">Vision</h2>
                )}
                {type === "value" && (
                  <h2 className="text-2xl font-semibold">Value</h2>
                )}
              </div>

              {type === "about" && (
                <div className="py-4 mt-4">
                  <p className="leading-relaxed">{about.details}</p>
                </div>
              )}
              {type === "mission" && (
                <div className="py-4 mt-4">
                  <p className="leading-relaxed">{about.mission}</p>
                </div>
              )}
              {type === "vision" && (
                <div className="py-4 mt-4">
                  <p className="leading-relaxed">{about.vision}</p>
                </div>
              )}
              {type === "value" && (
                <div className="py-4 mt-4">
                  <p className="leading-relaxed">{about.value}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FixModals;
