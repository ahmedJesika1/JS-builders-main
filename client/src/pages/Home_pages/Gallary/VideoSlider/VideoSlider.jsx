/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { baseUrl } from "../../../../redux/api/baseApi";

import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

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

const VideoSlider = ({ videos }) => {
  const extractYouTubeId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const settings = {
    dots: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    infinite: videos?.data?.length > 2, // Disable infinite scrolling if images are less than 3
    speed: 500,
    slidesToShow: Math.min(2, videos?.data?.length), // Ensure slidesToShow does not exceed available images
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, videos?.data?.length),
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

  return (
    <div className="rounded">
      {videos?.data?.length > 0 ? (
        <Slider {...settings}>
          {videos?.data
            ?.filter((video) => video.isActive === true)
            .map((video) => {
              const videoId = extractYouTubeId(video.url); // Extract YouTube video ID
              return (
                <div
                  key={video._id}
                  className="px-2 rounded overflow-hidden w-full"
                >
                  <div className="border relative group rounded cursor-pointer w-full">
                    <div className="relative lg:h-[300px] md:h-[300px] h-[280px]  w-full bg-[#262626] rounded overflow-hidden">
                      {videoId ? (
                        <iframe
                          className="h-full w-full object-cover rounded duration-300"
                          title={`Video player for ${video._id}`}
                          src={`https://www.youtube.com/embed/${videoId}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video
                          className="h-full w-full object-cover rounded duration-300"
                          src={baseUrl + video.url}
                          controls
                          aria-label="Video player"
                        ></video>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-4">
          There are no videos, please add video.
        </div>
      )}
    </div>
  );
};

export default VideoSlider;
