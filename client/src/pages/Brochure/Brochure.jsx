import { useEffect, useState } from "react";
import { baseUrl } from "../../redux/api/baseApi";
import { useGetBrochuresQuery } from "../../redux/features/brochure/brochureApi";
import { useGetClientsQuery } from "../../redux/features/team copy/clientApi";
import { useGetTeamsQuery } from "../../redux/features/team/teamApi";

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="h-24 bg-gray-300 rounded mb-4"></div>
      <div className="h-24 bg-gray-300 rounded mb-4"></div>
    </div>
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 mt-6">
      <div className="h-[250px] bg-gray-300 rounded"></div>
      <div className="h-[250px] bg-gray-300 rounded"></div>
      <div className="h-[250px] bg-gray-300 rounded"></div>
    </div>
    <div className="h-[400px] bg-gray-300 rounded mt-6"></div>
  </div>
);

export const Brochure = () => {
  const { data: brochures, isLoading: isBrochureLoading } =
    useGetBrochuresQuery("");
  const { data: teams, isLoading: isTeamLoading } = useGetTeamsQuery("");
  const { data: clients, isLoading: isClientLoading } = useGetClientsQuery("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isBrochureLoading || isTeamLoading || isClientLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="px-5 md:w-[90%] mx-auto py-10 md:py-20">
      {/* ✅ Brochure Section */}
      <section className="mt-20 md:mt-28 ">
        {brochures?.data?.map((brochure) => (
          <div
            key={brochure._id}
            className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {/* ✅ Image */}
            <div className="w-full md:col-span-1">
              <img
                src={baseUrl + brochure?.image}
                alt={brochure.title}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>

            {/* ✅ Content */}
            <div className="w-full md:col-span-2">
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#244436] mb-4 uppercase">
                {brochure?.title}
              </h2>
              <p className="text-gray-700 text-justify">
                {brochure?.description}
              </p>
              <p className="mt-4 text-gray-600 text-justify">
                {brochure?.successStory}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ✅ Team Section */}
      <section className="mt-12">
        <h2 className=" font-bold uppercase text-[#244436] mb-6 text-2xl md:text-3xl xl:text-4xl text-center">
          Our Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teams?.data?.map((member) => (
            <div key={member._id} className="bg-white rounded-lg shadow p-4">
              <div className="relative w-full lg:h-[300px] md:h-[300px] h-[250px] overflow-hidden rounded-t-lg">
                <img
                  src={baseUrl + member.image}
                  alt={member.name}
                  className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#244436]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
              </div>
              <h3 className="text-lg font-semibold mt-4 ">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.designation}</p>
              <p className="text-gray-700 mt-2">{member.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Client Section */}
      <section className="mt-12">
        <h2 className=" font-semibold text-[#244436] mb-6 text-2xl md:text-3xl xl:text-4xl text-center uppercase">
          Our Clients
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clients?.data?.map((client) => (
            <div key={client._id} className="bg-white rounded-lg shadow p-4">
              <div className="relative w-full lg:h-[300px] md:h-[300px] h-[250px] overflow-hidden rounded-t-lg">
                <img
                  src={baseUrl + client.image}
                  alt={client.name}
                  className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#244436]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
              </div>
              <h3 className="text-lg font-semibold mt-4">{client.name}</h3>
              <p className="text-sm text-gray-600">{client.designation}</p>
              <p className="text-gray-700 mt-2">{client.details}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
