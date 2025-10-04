import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetBannersQuery } from "../../../redux/features/banner/bannerApi";
import { baseUrl } from "../../../redux/api/baseApi";

const Banner = () => {
  const { data: banners } = useGetBannersQuery("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only active MAIN banners
  const activeBanners =
    banners?.data?.filter(
      (banner) => banner.type === "MAIN" && banner.isActive
    ) || [];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (!activeBanners.length) return null; // No banner to show

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Image Slider */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {activeBanners?.map((banner, idx) => (
          <div
            key={banner._id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={baseUrl + banner?.image}
              alt={banner?.title || `Banner ${idx + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-2xl bg-black/30 p-6 rounded-md"
          >
            <p className="text-orange-500 text-sm mb-2">
              {activeBanners[currentIndex]?.subtitle ||
                "🏠 Where Dreams are Deeded!"}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {activeBanners[currentIndex]?.title} <br />
              <span className="text-orange-500">
                {activeBanners[currentIndex]?.highlight}
              </span>
            </h1>
            <p className="text-sm md:text-base">
              {activeBanners[currentIndex]?.details}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-orange-500 transition-colors z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-orange-500 transition-colors z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
};

export default Banner;
