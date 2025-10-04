import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { baseUrl } from "../../../redux/api/baseApi";
import { useGetImagesQuery } from "../../../redux/features/gallery/galleryApi";

const GalleryImages = () => {
  const { data: imagesItems } = useGetImagesQuery("");

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Flatten all images from all galleries/events for Lightbox
  const slides =
    imagesItems?.data?.flatMap(
      (gallery) =>
        gallery.event?.flatMap(
          (item) => item.image?.map((img) => ({ src: baseUrl + img })) || []
        ) || []
    ) || [];

  const handleImageClick = (imgSrc) => {
    const index = slides.findIndex((slide) => slide.src === imgSrc);
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {imagesItems?.data?.map((gallery) =>
          gallery.event?.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Event Title & Details */}
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-[#244436] mb-2">
                  {item.eventTitle}
                </h2>
                <p className="text-[#262626]/80 text-sm">{item.eventDetails}</p>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 gap-2 p-2">
                {item.image?.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="cursor-pointer overflow-hidden rounded"
                  >
                    <img
                      src={baseUrl + img}
                      alt={img}
                      className="w-full h-80 object-cover transform hover:scale-105 transition duration-300"
                      onClick={() => handleImageClick(baseUrl + img)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lightbox */}
      {slides.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={currentIndex}
        />
      )}
    </>
  );
};

export default GalleryImages;
