import { motion } from "framer-motion";
// import { useGetVideosQuery } from "../../../redux/features/gallery/galleryApi";
import SectionHead from "../../../utilits/SectionHead";
import ImageSilder from "./ImageSilder/ImageSilder";
import { Link } from "react-router-dom";
import { useGetLatestImagesQuery } from "../../../redux/features/gallery/galleryApi";
import { baseUrl } from "../../../redux/api/baseApi";
import { useGetServicesQuery } from "../../../redux/features/services/serviceApi";

const Gallary = () => {
  // const { data: videos } = useGetVideosQuery();
  const { data: services } = useGetServicesQuery();

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, x: -100 }, // Start off-screen
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Slide into view
  };
  const containerVariants2 = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Slide into view
  };

    // Define animation variants
  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      id="gallery"
      className="lg:py-20 py-12 px-5 md:w-[90%] mx-auto"
    >
      <div className="flex items-center justify-center">
        <SectionHead
          alDesign="items-center justify-center text-center"
          centerDesign="items-center flex justify-center text-center"
          subTitle="OUR LAND PROJECTS"
          title="Shaping the Future of Real Estate"
          shortInfo="Explore our premium land projects designed for residential, commercial, and investment purposes—combining prime locations, sustainable planning, and long-term value to meet your aspirations."
        />
      </div>

      <div className="mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-full">
            {services?.data
              ?.filter((service) => service.isActive === true)
              .slice(0, 4)
              .map((service, index) => (
                <motion.div
                  key={service.id}
                  custom={index % 2 === 0 ? "left" : "right"}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={variants}
                  className=""
                >
                  <div className="group border border-[#244436]/20 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <Link
                      to={`/service/${service._id}`}
                      className="block relative"
                    >
                      {/* Image Container */}
                      <div className="relative w-full lg:h-[300px] md:h-[300px] h-[250px] overflow-hidden rounded-t-lg">
                        <img
                          src={baseUrl + service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#244436]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-[#262626] group-hover:text-[#244436] transition-colors duration-300 line-clamp-1">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-[#262626]/70 group-hover:text-[#262626]/90 text-sm line-clamp-4">
                          {service.details}
                        </p>

                        {/* Read More Button */}
                        <div className="mt-4">
                          <button className="relative px-4 py-2 border border-[#244436]/20 text-[#244436] rounded overflow-hidden group">
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                              Read More
                            </span>
                            <div className="absolute inset-0 bg-orange-500 rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="mt-12 flex flex-col justify-center items-center">
            <Link
              to="/products"
              className="relative flex items-center origin-right gap-2 py-4 px-6 bg-[#244436] rounded-full text-white font-rajdhani overflow-hidden group"
            >
              <span className="relative z-10 tracking-widest lg:text-base text-sm">
                View All LAND PROJECTS
              </span>
              <div className="absolute inset-0 w-full h-full bg-orange-500 rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
            </Link>
            {/* <p className="mt-4 font-semibold text-[#262626]/60 mb-6">
              Need a Custom Socks Plan?
              <Link
                to="/contact"
                className="text-[#e46565] cursor-pointer ml-[2px] duration-300"
              >
                Contact Us
              </Link>
            </p> */}
          </div>
        </div>
    </div>
  );
};

export default Gallary;
