import { useState, useEffect } from "react";
import { useGetDevelopmentQuery } from "../../../redux/features/development/developmentApi";
import { baseUrl } from "../../../redux/api/baseApi";
import SectionHead from "../../../utilits/SectionHead";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BsBoxArrowInDownRight } from "react-icons/bs";

const DevelopmentProcess = () => {
  const { data: developments } = useGetDevelopmentQuery();
  const { ref, inView } = useInView({ triggerOnce: true });
  const [selectedDevelopment, setSelectedDevelopment] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = (development) => {
    setScrollPosition(window.scrollY); // Save the current scroll position
    setSelectedDevelopment(development);
  };

  const closeModal = () => {
    setSelectedDevelopment(null);
  };

  useEffect(() => {
    if (selectedDevelopment) {
      // Lock the background at the current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      // Restore the background and scroll position when modal is closed
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }
  }, [selectedDevelopment, scrollPosition]);

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-[#CDF5DD]/20">
      <div className="container">
        <div className="flex items-center justify-center">
          <SectionHead
            alDesign="item-center justify-center text-center"
            centerDesign="item-center flex justify-center text-center"
            subTitle="HOW IT WORK"
            title="Data-Driven, Impact-Focused,
Future-Ready
"
            shortInfo="We combine industry expertise,
technology, and sustainability
to deliver strategic solutions,
ensuring measurable and lasting
impact."
          />
        </div>

        <div className="mt-12" ref={ref}>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 lg:gap-4 gap-3">
            {developments?.data?.map((development, index) => (
              <motion.div
                key={development._id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                custom={index}
              >
                <div className="bg-[#C1EBD4] relative group overflow-hidden lg:rounded-full rounded px-4 py-4 flex lg:flex-row md:flex-row flex-col justify-center items-center lg:text-start md:text-start text-center lg:items-center md:items-center lg:gap-6 md:gap-8 gap-3 cursor-pointer">
                  <div className="lg:w-1/5 md:w-1/5 z-10">
                    <div className="w-[80px] h-[80px] overflow-hidden p-2 lg:rounded-full rounded border group-hover:border-[#262626]/20 duration-300 bg-[#E6FAEE] object-cover flex items-center justify-center">
                      <img
                        className=""
                        src={baseUrl + development.image}
                        alt="BL Builders Ltd"
                      />
                    </div>
                  </div>
                  <div className="lg:w-2/3 z-10">
                    <h2 className="font-semibold line-clamp-1">
                      {development.title}
                    </h2>
                    <div className="flex relative">
                      <p className="text-[#262626]/60 group-hover:text-[#262626]/80 line-clamp-2">
                        {development.details}
                      </p>
                      {development.details.length > 40 && (
                        <button
                          onClick={() => openModal(development)}
                          className="text-[#262626] group-hover:text-[red] hover:underline text-[12px] absolute xl:left-0 lg:left-0 md:left-0 left-28 bottom-[-16px] flex items-center gap-1"
                        >
                          <BsBoxArrowInDownRight /> more
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-[#244436] xl:rounded-full lg:rounded-full rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedDevelopment && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-[30px] h-[30px] border rounded-full text-sm text-[#262626]/40 hover:bg-[#244436] hover:text-[#fff] duration-300 cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedDevelopment.title}
            </h2>
            <p className="text-gray-700 mb-4">{selectedDevelopment.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopmentProcess;
