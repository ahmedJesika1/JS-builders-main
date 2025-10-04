/* eslint-disable react/prop-types */
import { useState } from "react";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

import { baseUrl } from "../../../../redux/api/baseApi";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
import { useGetLatestImagesQuery } from "../../../../redux/features/gallery/galleryApi";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute group overflow-hidden top-1/2 lg:left-[-15px] left-[-15px] transform -translate-y-1/2 z-10 lg:w-[40px] lg:h-[40px] w-[40px] h-[40px] border border-[#fff] bg-[#244436] duration-300 rounded-full flex  items-center justify-center group"
    style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
  >
    <HiOutlineArrowLongLeft className="lg:text-2xl md:text-xl text-[#fff] z-[60] duration-300" />
    <div className="absolute z-[99] inset-0 w-full h-full bg-gradient-to-r from-transparent to-[#65E09D] rounded-full origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute group overflow-hidden top-1/2 lg:right-[-15px] right-[-15px] transform -translate-y-1/2 z-10 lg:w-[40px] lg:h-[40px] w-[40px] h-[40px] border border-[#fff] bg-[#244436] duration-300 rounded-full flex  items-center justify-center group"
    style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
  >
    <HiOutlineArrowLongRight className="lg:text-2xl md:text-xl text-[#fff] relative z-[99] duration-300" />
    <div className="absolute z-[99] inset-0 w-full h-full bg-gradient-to-r from-transparent to-[#65E09D] rounded-full origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
  </button>
);

const ImageSlider = () => {
  const { data: galleries } = useGetLatestImagesQuery();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("slide gallery image", galleries);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const settings = {
    dots: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    infinite: galleries?.data?.image?.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = galleries?.data?.map((item) => ({
    src: baseUrl + item.image,
  }));

  return (
    <div className="rounded">
      <>
        <Slider {...settings}>
          {galleries?.data
            ?.filter((gallery) => gallery.isActive === true)
            .map((gallery, index) => (
              <div
                key={index}
                className="px-2 rounded overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <div className="relative group rounded overflow-hidden flex justify-start">
                  <img
                    className="lg:h-[280px] md:h-[300px] h-[280px] bg-[#262626] w-full rounded hover:scale-105 duration-300 flex justify-center"
                    src={baseUrl + gallery.image}
                    alt=""
                  />
                </div>
              </div>
            ))}
        </Slider>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={currentIndex}
        />
      </>
    </div>
  );
};

export default ImageSlider;
