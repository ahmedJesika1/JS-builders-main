import { useParams } from "react-router-dom";
import { useGetSingleServicesQuery } from "../../../redux/features/services/serviceApi";

import TabTitle from "../../../utilits/TabTitle";
import { baseUrl } from "../../../redux/api/baseApi";
import ServiceContact from "../ServiceContact/ServiceContact";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdLocalPhone,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useRef } from "react";

const getYoutubeId = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // short link e.g. youtu.be/ID
    if (parsed.hostname.includes("youtu.be"))
      return parsed.pathname.split("/").pop();
    // standard link e.g. youtube.com/watch?v=ID
    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("www.youtube.com")
    ) {
      const v = new URLSearchParams(parsed.search).get("v");
      if (v) return v;
      // embed urls
      const parts = parsed.pathname.split("/");
      const embedIndex = parts.indexOf("embed");
      if (embedIndex >= 0 && parts[embedIndex + 1])
        return parts[embedIndex + 1];
    }
    // fallback
    const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  } catch {
    // not a full URL, try regex fallback
    const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }
};

const ServiceDetails = () => {
  const id = useParams();

  const { data: service, isLoading } = useGetSingleServicesQuery(id);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
console.log("service ", service?.data?.productID)
const productId = service?.data?.productID;
  const youtubeId = getYoutubeId(service?.data?.youtubeLink);

  useEffect(() => {
    if (service?.data) {
      if (service.data.images?.length > 0) {
        setSelectedMedia({
          type: "image",
          src: baseUrl + service.data.images[0],
        });
      } else if (youtubeId) {
        setSelectedMedia({ type: "youtube", src: youtubeId });
      }
    }
  }, [service, youtubeId]);

  const scrollRef = useRef(null);

  const scrollThumbnails = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  console.log(service);
  

  return (
    <div>
      <TabTitle title={service?.data?.title || "Loading..."}></TabTitle>

      <div>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-[300px] bg-gray-200 rounded"></div>
            <div className="py-4 px-2">
              <div className="h-6 bg-gray-200 w-1/2 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
              <div className="h-4 bg-gray-200 w-4/5 rounded"></div>
            </div>
          </div>
        ) : (
          <div>
            {/* 🔹 Top Display (Selected Media) */}
            {selectedMedia && (
              <>
                <div className="h-[250px] md:h-[400px] lg:h-[500px] w-full overflow-hidden mb-4 rounded-lg">
                  {selectedMedia?.type === "image" && (
                    <img
                      src={selectedMedia.src}
                      alt={service?.data?.title || "Service Image"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}

                  {selectedMedia?.type === "youtube" && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedMedia.src}`}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  )}
                </div>
              </>
            )}

            {/* 🔹 Thumbnails */}
            <div className="relative flex items-center mb-4 scrollbar-hide">
              {/* Left Scroll Button */}
              <button
                onClick={() => scrollThumbnails("left")}
                className="absolute left-0 z-10 bg-white/80 p-1 rounded-full shadow-md"
              >
                <MdArrowBackIos />
              </button>

              {/* Thumbnails Container */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto !scrollbar-hide px-10 py-2 w-full"
              >
                {service?.data?.images?.map((img, index) => (
                  <div
                    key={index}
                    className="h-[80px] w-[80px] flex-shrink-0 cursor-pointer border rounded overflow-hidden"
                    onClick={() =>
                      setSelectedMedia({ type: "image", src: baseUrl + img })
                    }
                  >
                    <img
                      src={baseUrl + img}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {youtubeId && (
                  <div
                    className="h-[80px] w-[80px] flex-shrink-0 cursor-pointer border rounded overflow-hidden"
                    onClick={() =>
                      setSelectedMedia({ type: "youtube", src: youtubeId })
                    }
                  >
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
                      alt="YouTube Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Right Scroll Button */}
              <button
                onClick={() => scrollThumbnails("right")}
                className="absolute right-0 z-10 bg-white/80 p-1 rounded-full shadow-md"
              >
                <MdArrowForwardIos />
              </button>
            </div>

            {/* 🔹 Content */}
            <div className="p-4">
              <h2 className="text-xl lg:text-2xl font-semibold text-[#262626]/90">
                {service?.data?.title}
              </h2>
              {service?.data?.location && (
                <div className="mt-2 text-[#244436]/80 flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 drop-shadow-sm px-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <div>{service?.data?.location}</div>
                </div>
              )}
              <p className="mt-2 text-[#262626]/70 ">
                {service?.data?.details}
              </p>

              {/* featured */}
              <div className="flex flex-wrap gap-4 mt-3">
                {service?.data?.featuredItems?.map((fi, fiIndex) => {
                  const feat = fi?.item || fi;
                  const qty = Number(fi?.quantity);
                  const key =
                    feat?._id || fi?._id || `${service._id}-${fiIndex}`;

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
                        <span className="text-[10px] text-gray-500">{qty}</span>
                        <span className="text-[10px] text-gray-800">
                          {feat?.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* amenities */}
              <div className="mt-2">
                <span className="font-medium text-xl text-[#244436]/80">
                  Amenities
                </span>
                :
                <div className="flex flex-wrap gap-3 mt-2">
                  {service?.data?.amenities?.map((amenity) => (
                    <div
                      key={amenity._id}
                      className="flex flex-col items-center gap-1 rounded-md px-3 py-2 text-sm shadow-sm"
                    >
                      <img
                        src={baseUrl + amenity.image}
                        alt={amenity.label}
                        className="w-6 h-6 object-cover rounded-md"
                      />
                      <span className="text-[#262626] text-[10px] text-center">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Mobile Contact Section */}
      <div className="flex flex-col xl:hidden lg:hidden">
        <div className="bg-[#F5FDF8] mt-8 rounded flex items-center gap-4 px-4 py-2">
          <div className="px-2 py-2 rounded bg-[#244436] text-xl font-semibold text-[#fff]">
            <MdLocalPhone />
          </div>
          <div>
            <p>Contact Us</p>
            <p className="text-[#262626]/80">+8801846670394</p>
          </div>
        </div>

        <div className="mt-4">
          <ServiceContact productID={productId}/>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
