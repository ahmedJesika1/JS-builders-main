import { Link, Outlet, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceSideBar from "../pages/Services/ServiceSideBar/ServiceSideBar";

import ServicesMenu from "../pages/Services/ServicesMenu/ServicesMenu";
import { useGetBannersQuery } from "../redux/features/banner/bannerApi";
import { baseUrl } from "../redux/api/baseApi";
import { useGetSingleServicesQuery } from "../redux/features/services/serviceApi";

const DetailsLayout = () => {
  const { data: banners } = useGetBannersQuery("");
  const id = useParams();
  const { data: service } = useGetSingleServicesQuery(id);

  // Extract the image from banners based on the type
  const headImage = banners?.data?.find(
    (banner) => banner.type === "HEAD" && banner.isActive === true
  )?.image;

  // Framer Motion Variants for animations
  const sidebarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const outletVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };  

  return (
    <div>
      {/* <PagesHead title="OUR SERVICES sss" subTitle="OUR SERVICES vvvv" /> */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${baseUrl + headImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[#262626]/80 bg-opacity-50"></div>
        <div className="container relative flex flex-col text-[#fff] top-12">
          <h2 className="text-4xl ">Services Details</h2>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-sm capitalize">
            <Link
              to="/"
              className="hover:text-[#244436] duration-300 cursor-pointer"
            >
              Home
            </Link>
            <p>/</p>
            <p>{service?.data?.title}</p>
          </div>
        </div>
      </div>
      <div className="container flex gap-4 relative">
        {/* Sidebar Animation */}
        <motion.div
          className="w-1/3 lg:block hidden"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <ServiceSideBar />
        </motion.div>

        {/* Services Menu for smaller screens */}
        {/* <div className="lg:hidden absolute top-[80px] md:left-[58px] left-[40px]">
          <ServicesMenu />
        </div> */}

        {/* Outlet Animation */}
        <motion.div
          className="lg:w-3/4 w-full"
          variants={outletVariants}
          initial="hidden"
          animate="visible"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default DetailsLayout;
