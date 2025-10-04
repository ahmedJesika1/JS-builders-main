/* eslint-disable react/prop-types */

import { baseUrl } from "../redux/api/baseApi";

const NewsModel = ({ isOpen, onClose, event }) => {
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
          className="w-full h-auto rounded mb-4"
        />
        <h2 className="lg:text-xl text-base font-bold">{event.title}</h2>
        <p className="mt-2 text-gray-600 text-justify">{event.details}</p>
      </div>
    </div>
  );
};

export default NewsModel;
