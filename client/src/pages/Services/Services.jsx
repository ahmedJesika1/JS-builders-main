import { Link } from "react-router-dom";
import { baseUrl } from "../../redux/api/baseApi";
import { useGetServicesByPaginationQuery } from "../../redux/features/services/serviceApi";
import PagesHead from "../../utilits/PagesHead";
import TabTitle from "../../utilits/TabTitle";
import DevelopmentProcess from "../Home_pages/DevelopmentProcess/DevelopmentProcess";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Services = () => {
  const { data: services, isLoading } = useGetServicesByPaginationQuery("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Framer Motion variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2, // Staggered animation
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Placeholder skeleton loader
  const PlaceholderCard = () => (
    <div className="border border-[#244436]/20 p-2 rounded cursor-pointer animate-pulse">
      <div className="lg:h-[220px] md:h-[300px] w-full bg-gray-200 rounded"></div>
      <div className="mt-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="mt-2 h-3 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="py-4 mt-4">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <TabTitle title={"Services"}></TabTitle>
      <div>
        <PagesHead title="Our Services" subTitle="Our Services"></PagesHead>
      </div>
      <div className="container">
        <div>
          <p className="text-base font-medium text-[#244436] uppercase">
            Our Apartments
          </p>
          <h2 className="text-2xl font-medium mt-2 text-[#262626]/80">
            End-to-End Sock Manufacturing Solutions for Sustainable Growth
          </h2>
        </div>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 mt-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <PlaceholderCard key={index} />
              ))
            : services?.data?.result
                ?.filter((service) => service.isActive === true)
                .map((service, index) => (
                  <motion.div
                    key={service._id}
                    className="group"
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="border border-[#244436]/20 group-hover:border-[#244436] group-hover:shadow p-2 rounded cursor-pointer group">
                      <Link to={`/service/${service._id}`}>
                        <div className="lg:h-[220px] md:h-[300px] w-full rounded overflow-hidden relative">
                          <img
                            className="rounded h-full w-full object-cover group-hover:scale-105 duration-300 border border-[#262626]/10"
                            src={baseUrl + service.image}
                            alt=""
                          />
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-[#244436] rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                        </div>
                      </Link>
                      <div className="px-2 mt-4">
                        <Link to={`/service/${service._id}`}>
                          <h3 className="font-semibold group-hover:text-[#244436] duration-300 line-clamp-1">
                            {service.title}
                          </h3>
                          <p className="line-clamp-4 mt-2 text-[#262626]/60 group-hover:text-[#262626] duration-300">
                            {service.details}
                          </p>
                          <div className="py-4">
                            <Link to={`/service/${service._id}`}>
                              <button className="border relative group  border-[#244436]/20 text-[#244436] px-4 py-2 rounded">
                                <span className="group-hover:text-[#fff] relative z-10">
                                  Read More
                                </span>
                                <div className="absolute inset-0 w-full h-full bg-[#65e09d] rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                              </button>
                            </Link>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
        </div>
      </div>
      {/* <DevelopmentProcess /> */}
    </div>
  );
};

export default Services;
