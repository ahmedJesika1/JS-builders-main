import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGetServicesQuery } from "../../redux/features/services/serviceApi";
import SectionHead from "../../utilits/SectionHead";
import { baseUrl } from "../../redux/api/baseApi";

const LandPage = () => {
  const { data: services } = useGetServicesQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // ✅ Filter only active land services
  const activeLands =
    services?.data?.filter(
      (service) =>
        service.isActive &&
        (service.type?.toLowerCase() === "land" ||
          service.category?.toLowerCase() === "land")
    ) || [];

  // ✅ Sort by status (running → upcoming → delivered)
  const statusOrder = ["running", "upcoming", "delivered"];
  const sortedServices = activeLands.sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  // ✅ Group services by status
  const groupedServices = {
    running: sortedServices.filter((s) => s.status === "running"),
    upcoming: sortedServices.filter((s) => s.status === "upcoming"),
    delivered: sortedServices.filter((s) => s.status === "delivered"),
  };

  const statusTitles = {
    running: {
      title: "Running Land Projects",
      description:
        "These land projects are currently in progress and actively being developed.",
    },
    upcoming: {
      title: "Upcoming Land Projects",
      description: "Land projects that are planned and will start soon.",
    },
    delivered: {
      title: "Delivered Land Projects",
      description: "Land projects that have been completed successfully.",
    },
  };

  return (
    <div className="bg-[#f2f6f7]/20 mb-16 mt-16">
      <div className="px-5 md:w-[90%] mx-auto">
        <div className="flex items-center justify-center">
          <SectionHead subTitle="OUR LAND / PROJECTS" />
        </div>

        {statusOrder.map((status) => {
          const services = groupedServices[status];
          if (!services.length) return null;

          return (
            <div key={status} className="mt-16">
              {/* Section Title */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#244436]">
                  {statusTitles[status].title}
                </h2>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map((service, index) => (
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
                        {/* Image */}
                        <div className="relative w-full lg:h-[250px] md:h-[250px] h-[250px] overflow-hidden rounded-t-lg">
                          <img
                            src={baseUrl + service?.images?.[0]}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#244436]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold text-[#262626] group-hover:text-[#244436] transition-colors duration-300 line-clamp-1">
                            {service.title}
                          </h3>
                          {service?.location && (
                            <div className="mt-2 text-[#244436]/80 flex items-center ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600 drop-shadow-sm px-0"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                              </svg>
                              <div>{service?.location}</div>
                            </div>
                          )}
                          <p className="mt-2 text-[#262626]/70 group-hover:text-[#262626]/90 text-sm line-clamp-4 flex-grow">
                            {service.details}
                          </p>

                          {/* Featured Items */}
                          <div className="flex flex-wrap gap-4 mt-3">
                            {service?.featuredItems?.map((fi, fiIndex) => {
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

                          {/* Read More */}
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

              {(status === "running" || status === "upcoming") && (
                <p className="mt-4 font-semibold text-[#262626]/60">
                  Need a Custom Plan?
                  <Link
                    to="/contact"
                    className="text-[#e46565] cursor-pointer ml-[2px] duration-300"
                  >
                    Contact Us
                  </Link>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandPage;
