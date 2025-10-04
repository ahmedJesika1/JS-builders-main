import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../../../redux/api/baseApi";
import { useGetServicesQuery } from "../../../redux/features/services/serviceApi";
import SectionHead from "../../../utilits/SectionHead";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Apartments = () => {
  const { data: services } = useGetServicesQuery();
  const location = useLocation();
  const showViewAllButton = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Animation Variants
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

  // ✅ Filter: Only active & running apartments (exclude land/others)
  const runningApartments =
    services?.data?.filter(
      (s) =>
        s.isActive &&
        s.status === "running" &&
        (s.type?.toLowerCase() === "apartment" ||
          s.category?.toLowerCase() === "apartment")
    ) || [];

  return (
    <div className="bg-[#f2f6f7]/20 mx-auto overflow-hidden">
      <div className="px-5 md:w-[90%] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center">
          <SectionHead
            alDesign="items-center justify-center text-center"
            centerDesign="items-center flex justify-center text-center"
            subTitle="OUR FLAT/APARTMENTS"
            status="Running"
            title="Premium Apartment Solutions for Every Step"
            shortInfo="We specialize in providing high-quality, comfortable, and modern apartments for all needs—combining innovation, style, and sustainability to enhance your living experience."
          />
        </div>

        {/* Apartments Grid */}
        <div className="mt-12">
          {runningApartments?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {runningApartments
                .slice(0, 4)
                .map((service, index) => (
                  <motion.div
                    key={service._id}
                    custom={index % 2 === 0 ? "left" : "right"}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={variants}
                  >
                    <div className="group border border-[#244436]/20 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
                      <Link
                        to={`/service/${service._id}`}
                        className="block relative flex flex-col h-full"
                      >
                        {/* 🏙️ Image */}
                        <div className="relative w-full h-[250px] overflow-hidden rounded-t-lg">
                          <img
                            src={baseUrl + service?.images?.[0]}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#244436]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
                        </div>

                        {/* 🏘️ Content */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold text-[#262626] group-hover:text-[#244436] transition-colors duration-300 line-clamp-1">
                            {service.title}
                          </h3>

                          {/* 📍 Location */}
                          {service?.location && (
                            <div className="mt-2 text-[#244436]/80 flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600 drop-shadow-sm"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                              </svg>
                              <div>{service.location}</div>
                            </div>
                          )}

                          {/* 📝 Details */}
                          <p className="mt-2 text-[#262626]/70 group-hover:text-[#262626]/90 text-sm line-clamp-4 flex-grow">
                            {service.details}
                          </p>

                          {/* 🧩 Featured Items */}
                          <div className="flex items-center justify-between flex-wrap gap-1 mt-3">
                            {service?.featuredItems?.slice(0, 3).map((fi, fiIndex) => {
                              const feat = fi?.item || fi;
                              const qty = Number(fi?.quantity);
                              const key =
                                feat?._id ||
                                fi?._id ||
                                `${service._id}-${fiIndex}`;

                              return (
                                <div
                                  key={key}
                                  className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-2 hover:shadow-md transition-shadow duration-200"
                                >
                                  {feat?.image && (
                                    <img
                                      src={baseUrl + feat.image}
                                      alt={feat?.label}
                                      className="w-6 h-6 object-cover rounded-md"
                                    />
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500">
                                      {qty}
                                    </span>
                                    <span className="text-[10px] text-gray-800">
                                      {feat?.label}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* 🔗 Read More */}
                          <div className="mt-4">
                            <button className="relative px-4 py-2 border border-[#244436]/20 text-[#244436] rounded overflow-hidden group w-full">
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
          ) : (
            // 🚫 No Apartments Found
            <div className="text-center py-10 text-[#244436]/70 font-semibold">
              No active apartment projects available right now.
            </div>
          )}

          {/* 🔘 View All Button */}
          {showViewAllButton && runningApartments.length > 0 && (
            <div className="mt-12 flex flex-col justify-center items-center">
              <Link
                to="/apartments"
                className="relative flex items-center origin-right gap-2 py-4 px-6 bg-[#244436] rounded-full text-white font-rajdhani overflow-hidden group"
              >
                <span className="relative z-10 tracking-widest lg:text-base text-sm">
                  View All APARTMENTS
                </span>
                <div className="absolute inset-0 w-full h-full bg-orange-500 rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apartments;
