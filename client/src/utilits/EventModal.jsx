/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime, MdDateRange } from "react-icons/md";
import { baseUrl } from "../redux/api/baseApi";
import { FaLink } from "react-icons/fa6";

const EventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 text-xl"
        >
          &times;
        </button>
        <img
          src={baseUrl + event.image}
          alt={event.title}
          className="rounded mb-4"
        />
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="mt-2 text-gray-600 text-justify">{event.details}</p>
        <div className="mt-4">
          {/* <div className="">
            <p><FaLink />
            <a href={event.link}>dhfgfhdfhdifhi</a>
            </p>
          </div> */}
          {event.link && (
            <a
              href={event.link}
              className="text-sm text-[#65E09D]/80 hover:text-[#65E09D] cursor-pointer"
            >
              <FaLink className="inline-block mr-1" />
              {event.link}
            </a>
          )}
          <p className="text-sm text-gray-500">
            <MdAccessTime className="inline-block mr-1" />
            {event.time}:00 AM
          </p>
          <p className="text-sm text-gray-500">
            <MdDateRange className="inline-block mr-1" />
            {event.date}
          </p>
          <p className="text-sm text-gray-500">
            <FaLocationDot className="inline-block mr-1" />
            {event.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

// const NewsModel = ({ isOpen, onClose, event }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
//       <div className="bg-white p-6 rounded-lg w-full max-w-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-700 text-xl"
//         >
//           &times;
//         </button>
//         <img
//           src={event.image}
//           alt={event.title}
//           className="w-full h-auto rounded mb-4"
//         />
//         <h2 className="text-xl font-bold">{event.title}</h2>
//         <p className="mt-2 text-gray-600">{event.details}</p>
//       </div>
//     </div>
//   );
// };

// export default NewsModel;
