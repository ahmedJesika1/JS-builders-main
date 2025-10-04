// /* eslint-disable react-hooks/rules-of-hooks */
// import { useState } from "react";
// import { baseUrl } from "../../../redux/api/baseApi";
// import { useGetTeamsQuery } from "../../../redux/features/team/teamApi";
// import SectionHead from "../../../utilits/SectionHead";
// import "./Team.css";
// import { FaUser } from "react-icons/fa";

// const Team = () => {
//   const { data: teams, isLoading } = useGetTeamsQuery("");
//   const [selectedTeam, setSelectedTeam] = useState(null);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-center">
//         <SectionHead
//           alDesign="item-center justify-center text-center"
//           centerDesign="item-center flex justify-center text-center"
//           subTitle="OUR TEAM"
//           title="Our Awesome Team"
//           shortInfo="Bibendum at varius vel pharetra vel turpis. Nisl condimentum id venenatis a condimentum vitae sapien
// pellentesque habitant. Urna cursus eget nunc scelerisque viverra mauris."
//         />
//       </div>

//       <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-12">
//         {teams?.data?.map((team) => (
//           <div key={team.id}>
//             <div className="relative group duration-300 cursor-pointer">
//               <div className="border rounded-t overflow-hidden h-[400px]">
//                 <img
//                   className="h-full w-full rounded-t group-hover:scale-110 duration-300 object-cover"
//                   src={baseUrl + team.image}
//                   alt=""
//                 />
//               </div>
//               <div className="absolute bg-[#fff] bottom-[0%] left-[50%] translate-x-[-50%] translate-y-[0%] group-hover:translate-y-[-20%] duration-300 w-[80%] side_border">
//                 <div className="text-center py-4">
//                   <h2 className="text-xl font-semibold group-hover:text-[#244436] duration-300">
//                     {team.name}
//                   </h2>
//                   <p className="text-sm text-[#262626]/60">
//                     {team.designation}
//                   </p>
//                 </div>
//                 <div className="bottom-0 absolute right-0 w-[25px] h-[25px] bg-[#244436] group-hover:bg-[#262626] duration-300 text-[#fff] flex items-center justify-center">
//                   <p className="text-sm">
//                     <FaUser />
//                   </p>
//                 </div>
//                 <div
//                   className="right-[0px] top-[12px] group-hover:top-[-25px] absolute duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
//                   onClick={() => setSelectedTeam(team)}
//                 >
//                   <p className="text-sm inline-flex bg-[#244436] text-[#fff] px-4 py-[2px]">
//                     MORE INFO
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedTeam && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
//             <button
//               className="absolute top-2 right-2 text-xl font-bold"
//               onClick={() => setSelectedTeam(null)}
//             >
//               &times;
//             </button>
//             <img
//               src={baseUrl + selectedTeam.image}
//               alt={selectedTeam.name}
//               className="w-full object-cover rounded-md"
//             />
//             <div className="mt-2 overflow-y-auto">
//               <h2 className="text-2xl font-semibold mt-4">
//                 {selectedTeam.name}
//               </h2>
//               <p className="text-sm text-gray-600">
//                 {selectedTeam.designation}
//               </p>
//               <p className="mt-2 text-gray-700">
//                 {selectedTeam.details || "No additional information available."}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Team;

import { useState, useEffect } from "react";
import { baseUrl } from "../../../redux/api/baseApi";
import { useGetTeamsQuery } from "../../../redux/features/team/teamApi";
import SectionHead from "../../../utilits/SectionHead";
import "./Team.css";
import { FaUser } from "react-icons/fa";

const Team = () => {
  const { data: teams, isLoading } = useGetTeamsQuery("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    if (selectedTeam) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedTeam]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <SectionHead
          alDesign="item-center justify-center text-center"
          centerDesign="item-center flex justify-center text-center"
          subTitle="OUR TEAM"
          title="Expertise, Innovation, and Dedication in Every Stitch"
          shortInfo="Our team of industry experts, designers, and production specialists is committed to driving sustainable growth and delivering impactful sock solutions for clients across various markets."
        />
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-12">
        {teams?.data?.map((team) => (
          <div key={team.id}>
            <div className="relative group duration-300 cursor-pointer">
              <div className="border rounded-t overflow-hidden h-[400px]">
                <img
                  className="h-full w-full rounded-t group-hover:scale-110 duration-300 object-cover"
                  src={baseUrl + team.image}
                  alt=""
                />
              </div>
              <div className="absolute bg-[#fff] bottom-[0%] left-[50%] translate-x-[-50%] translate-y-[0%] group-hover:translate-y-[-20%] duration-300 w-[80%] side_border">
                <div className="text-center py-4">
                  <h2 className="text-xl font-semibold group-hover:text-[#244436] duration-300">
                    {team.name}
                  </h2>
                  <p className="text-sm text-[#262626]/60">
                    {team.designation}
                  </p>
                </div>
                <div className="bottom-0 absolute right-0 w-[25px] h-[25px] bg-[#244436] group-hover:bg-[#262626] duration-300 text-[#fff] flex items-center justify-center">
                  <p className="text-sm">
                    <FaUser />
                  </p>
                </div>
                <div
                  className="right-[0px] top-[12px] group-hover:top-[-25px] absolute duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => setSelectedTeam(team)}
                >
                  <p className="text-sm inline-flex bg-[#244436] text-[#fff] px-4 py-[2px]">
                    MORE INFO
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setSelectedTeam(null)}
            >
              &times;
            </button>
            <div className="">
              <img
                src={baseUrl + selectedTeam.image}
                alt={selectedTeam.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="mt-2 overflow-y-auto">
              <h2 className="text-2xl font-semibold mt-4">
                {selectedTeam.name}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedTeam.designation}
              </p>
              <p className="mt-2 text-gray-700">
                {selectedTeam.details || "No additional information available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
