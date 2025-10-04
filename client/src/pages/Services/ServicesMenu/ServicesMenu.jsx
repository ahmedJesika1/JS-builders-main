import { SlMenu } from "react-icons/sl";
import { useGetServicesByPaginationQuery } from "../../../redux/features/services/serviceApi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ServicesMenu = () => {
  const { data: services } = useGetServicesByPaginationQuery("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleLinkHidden = () => {
    setIsOpen(false);
  };

  const slideInVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        className="w-[40px] h-[40px] z-[99] relative border border-[#244436] text-[#244436] text-xl flex items-center justify-center mt-[-35px]"
      >
        <SlMenu />
      </div>
      <div className="overflow-hidden ">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={slideInVariants}
              className="mt-4 flex flex-col gap-3 bg-[#fff] py-8 md:px-8 px-4 border border-[#244436] shadow rounded md:ml-[-2px]"
            >
              <h2 className="text-lg font-semibold pb-2">Services</h2>
              {services?.data?.result?.map((service) => (
                <div key={service._id}>
                  <Link
                    to={`/service/${service._id}`}
                    onClick={handleLinkHidden}
                  >
                    <div className="bg-[#244436] px-4 py-2 inline-flex rounded-r relative group overflow-hidden cursor-pointer">
                      <span className="group-hover:text-[#fff] z-10 duration-300 text-[#262626]/60">
                        {service.title}
                      </span>
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-[#28c56f] rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesMenu;
