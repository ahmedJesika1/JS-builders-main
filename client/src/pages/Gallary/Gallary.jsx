import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PagesHead from "../../utilits/PagesHead";
import TabTitle from "../../utilits/TabTitle";
import GalleryImages from "./GalleryImages/GalleryImages";
import GalleryVideos from "./GalleryVideos/GalleryVideos";
import { useGetImagesQuery } from "../../redux/features/gallery/galleryApi";
import { BsBoxArrowInDownRight } from "react-icons/bs";

export const GalleryPage = () => {
  const { data: galleries } = useGetImagesQuery();

  const [activeTab, setActiveTab] = useState("images");
  const [showFullDescription, setShowFullDescription] = useState({});
  const [showFullDetails, setShowFullDetails] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TabTitle title={"Gallery"} />
      <PagesHead title="Our Gallery" subTitle="Our Gallery" />

      <div className="py-8 md:pb-16 pt-4  mx-auto overflow-hidden px-5 md:w-[90%] space-y-12">
        {/* {galleries?.data?.map((gallery) => {
          const description = gallery?.description || "gallery description";
          const truncatedDescription = description.slice(0, 200);
          const detail = gallery?.detail || "gallery description";
          const truncatedDetail = detail.slice(0, 200);

          return (
            <div key={gallery._id} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold text-[#244436]">
                    {gallery.title}
                  </h2>

                  <div className="cursor-pointer group mt-4">
                    <p className="leading-relaxed text-[#262626]/80">
                      {showFullDescription[gallery._id]
                        ? description
                        : truncatedDescription}
                    </p>
                    {description.length > 200 && (
                      <button
                        onClick={() =>
                          setShowFullDescription((prev) => ({
                            ...prev,
                            [gallery._id]: !prev[gallery._id],
                          }))
                        }
                        className="text-[#244436] group-hover:opacity-100 duration-300 mt-1"
                      >
                        {showFullDescription[gallery._id] ? (
                          <div className="flex items-center gap-1">
                            <BsBoxArrowInDownRight /> less
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <BsBoxArrowInDownRight /> more
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="cursor-pointer group mt-4">
                    <p className="leading-relaxed text-[#262626]/80">
                      {showFullDetails[gallery._id]
                        ? detail
                        : truncatedDetail}
                    </p>
                    {detail.length > 200 && (
                      <button
                        onClick={() =>
                          setShowFullDetails((prev) => ({
                            ...prev,
                            [gallery._id]: !prev[gallery._id],
                          }))
                        }
                        className="text-[#244436] group-hover:opacity-100 duration-300 mt-1"
                      >
                        {showFullDetails[gallery._id] ? (
                          <div className="flex items-center gap-1">
                            <BsBoxArrowInDownRight /> less
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <BsBoxArrowInDownRight /> more
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}

        {/* Tabs */}
        <div className="mt-12">
          <div className="xl:px-40 lg:px-40 md:px-30">
            <div className="relative bg-[#F5FDF8] border rounded-full w-full flex items-center">
              {["images", "videos"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-[50%] py-2 rounded-full relative z-10 ${
                    activeTab === tab ? "text-white" : "text-black"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {tab === "images" ? "Gallery Images" : "Videos"}
                </motion.button>
              ))}
              <motion.div
                layout
                className="absolute bg-[#244436] rounded-full h-full w-[50%]"
                style={{
                  left: activeTab === "images" ? "0%" : "50%",
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              ></motion.div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-16">
            {activeTab === "images" && (
              <motion.div
                key="images"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryImages galleries={galleries?.data} />
              </motion.div>
            )}

            {activeTab === "videos" && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryVideos galleries={galleries?.data} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
