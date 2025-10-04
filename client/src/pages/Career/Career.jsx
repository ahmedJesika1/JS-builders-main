// import { useEffect, useState } from "react";
// import PagesHead from "../../utilits/PagesHead";
// import SectionHead from "../../utilits/SectionHead";
// import TabTitle from "../../utilits/TabTitle";
// import { useGetCareersQuery } from "../../redux/features/career/careerApi";
// import { FaEye } from "react-icons/fa"; // Import an icon for the modal trigger
// import { FaXmark } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const Career = () => {
//   const { data: jobs } = useGetCareersQuery("");
//   const [modalData, setModalData] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Disable body scroll when modal is open
//   useEffect(() => {
//     if (modalData) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }

//     // Cleanup function to remove class on unmount
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [modalData]);

//   return (
//     <div>
//       <TabTitle title={"Career"} />
//       <PagesHead title="Our Career" subTitle="Our Career" />
//       <div className="container">
//         <div className="flex items-center justify-center">
//           <SectionHead
//             alDesign="item-center justify-center text-center"
//             centerDesign="item-center flex justify-center text-center"
//             subTitle="OUR LATEST JOBS"
//             title="Make Work more Efficient"
//             shortInfo="Bibendum at varius vel pharetra vel turpis. Nisl condimentum id venenatis a condimentum vitae sapien
// pellentesque habitant. Urna cursus eget nunc scelerisque viverra mauris."
//           />
//         </div>

//         <div className="mt-20 flex flex-col gap-4">
//           {jobs?.data?.map((job) => (
//             <div key={job._id} className="group duration-300">
//               <div className="border px-6 py-4 rounded group-hover:border-[#244436] duration-300 cursor-pointer">
//                 <div className="mt-2 flex-1">
//                   <h2
//                     onClick={() => setModalData(job)}
//                     className="text-lg font-semibold text-[#262626]/80 group-hover:text-[#244436] duration-300"
//                   >
//                     {job.title}
//                   </h2>
//                   <div className="relative">
//                     <p
//                       onClick={() => setModalData(job)}
//                       className="py-1 text-[#262626]/60"
//                     >
//                       {job.details.slice(0, 300)}
//                     </p>
//                     {/* Eye Icon to open modal */}
//                     <button
//                       onClick={() => setModalData(job)}
//                       className="absolute right-0 bottom-0 text-[#244436] hover:text-[#3BA272] duration-300"
//                     >
//                       <FaEye size={16} />
//                     </button>
//                   </div>

//                   <div>
//                     <Link to={`/applied/${job._id}`}>
//                       <button className="text-[#262626]/70 group-hover:text-[#244436] duration-300 font-semibold">
//                         <span className="hover:text-[#3BA272] duration-300">
//                           Apply Now
//                         </span>
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal */}
//         {modalData && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
//             <div className="bg-white p-6 rounded-lg w-full max-w-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[90vh] overflow-y-auto">
//               <div className="relative">
//                 <h2 className="text-lg font-semibold text-[#262626]/80">
//                   {modalData.title}
//                 </h2>
//                 <button
//                   onClick={() => setModalData(null)}
//                   className="top-0 right-2 absolute bg-[#244436] hover:bg-[#3BA272] duration-300 text-[#fff] p-1 text-xl rounded-full"
//                 >
//                   <FaXmark />
//                 </button>
//               </div>
//               <p className="py-4 text-[#262626]/70 text-justify">
//                 {modalData.details}
//               </p>

//               <div>
//                 <Link to={`/applied/${modalData._id}`}>
//                   <h2 className="bg-[#244436] text-white px-4 py-2 rounded hover:bg-[#3BA272] duration-300 inline-flex cursor-pointer">
//                     Apply Now
//                   </h2>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Career;

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import PagesHead from "../../utilits/PagesHead";
import SectionHead from "../../utilits/SectionHead";
import TabTitle from "../../utilits/TabTitle";
import { useGetCareersQuery } from "../../redux/features/career/careerApi";
import { FaEye, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Career = () => {
  const { data: jobs } = useGetCareersQuery("");
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (modalData) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalData]);

  // Animation variants
  const jobVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "linear" },
    }),
  };

  return (
    <div>
      <TabTitle title={"Career"} />
      <PagesHead title="Our Career" subTitle="Our Career" />
      <div className="container">
        <div className="flex items-center justify-center">
          <SectionHead
            alDesign="item-center justify-center text-center"
            centerDesign="item-center flex justify-center text-center"
            subTitle="OUR LATEST JOBS"
            title="Make Work More Efficient"
            shortInfo="Enhancing productivity through thoughtful design and precision manufacturing. From concept to creation, we ensure every detail contributes to better performance and lasting quality."
          />
        </div>

        <div className="mt-20 flex flex-col gap-4">
          {jobs?.data?.map((job, index) => (
            <motion.div
              key={job._id}
              className="group duration-300"
              variants={jobVariants}
              initial="hidden"
              whileInView="visible" // Trigger animation when in view
              viewport={{ once: true, amount: 0.2 }} // Only animate once when 20% in view
              custom={index}
            >
              <div className="border px-6 py-4 rounded group-hover:border-[#244436] duration-300 cursor-pointer">
                <div className="mt-2 flex-1">
                  <h2
                    onClick={() => setModalData(job)}
                    className="text-lg font-semibold text-[#262626]/80 group-hover:text-[#244436] duration-300"
                  >
                    {job.title}
                  </h2>
                  <div className="relative">
                    <p
                      onClick={() => setModalData(job)}
                      className="py-1 text-[#262626]/60"
                    >
                      {job.details.slice(0, 300)}
                    </p>
                    <button
                      onClick={() => setModalData(job)}
                      className="absolute right-0 bottom-0 text-[#244436] hover:text-[#3BA272] duration-300"
                    >
                      <FaEye size={16} />
                    </button>
                  </div>

                  <div>
                    <Link to={`/applied/${job._id}`}>
                      <button className="text-[#262626]/70 group-hover:text-[#244436] duration-300 font-semibold">
                        <span className="hover:text-[#3BA272] duration-300">
                          Apply Now
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <h2 className="text-lg font-semibold text-[#262626]/80">
                  {modalData.title}
                </h2>
                <button
                  onClick={() => setModalData(null)}
                  className="top-0 right-2 absolute bg-[#244436] hover:bg-[#3BA272] duration-300 text-[#fff] p-1 text-xl rounded-full"
                >
                  <FaXmark />
                </button>
              </div>
              <p className="py-4 text-[#262626]/70 text-justify">
                {modalData.details}
              </p>

              <div>
                <Link to={`/applied/${modalData._id}`}>
                  <h2 className="bg-[#244436] text-white px-4 py-2 rounded hover:bg-[#3BA272] duration-300 inline-flex cursor-pointer">
                    Apply Now
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;
