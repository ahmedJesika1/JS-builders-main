/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { useGetBannersQuery } from "../redux/features/banner/bannerApi";
import { baseUrl } from "../redux/api/baseApi";

const PagesHead = ({ title, subTitle }) => {
  const { data: banners } = useGetBannersQuery("");

  // Extract the image from banners based on the type
  const headImage = banners?.data?.find(
    (banner) => banner.type === "HEAD" && banner.isActive === true
  )?.image;


  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${baseUrl + headImage})`,
      }}
    >
      <div className="absolute inset-0 bg-[#262626]/80 bg-opacity-50"></div>
      <div className="container relative flex flex-col text-[#fff] top-12">
        <h2 className="text-4xl ">{title}</h2>
        <div className="flex items-center gap-2 pt-2 text-sm">
          <Link
            to="/"
            className="hover:text-[#244436] duration-300 cursor-pointer"
          >
            Home
          </Link>
          <p>/</p>
          <p>{subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PagesHead;
