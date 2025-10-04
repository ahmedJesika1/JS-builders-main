import { baseUrl } from "../../../redux/api/baseApi";
import { useGetVideosQuery } from "../../../redux/features/gallery/galleryApi";

const GalleryVideos = () => {
  const { data: videoItems } = useGetVideosQuery("");
 

  const extractYouTubeId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
      {videoItems?.data
        ?.filter((video) => video.isActive === true)
        .map((video) => {
          const videoId = extractYouTubeId(video.url);
          return (
            <div key={video._id} className="px-2 rounded overflow-hidden">
              <div className="border relative group rounded cursor-pointer">
                <div className="relative lg:h-[400px] md:h-[300px] h-[280px]  w-full bg-[#262626] rounded overflow-hidden">
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
    </div>
  );
};

export default GalleryVideos;
