import { useGetServicesByPaginationQuery, useGetSingleServicesQuery } from "../../../redux/features/services/serviceApi";
import { MdLocalPhone } from "react-icons/md";
import ServiceContact from "../ServiceContact/ServiceContact";
import { useParams } from "react-router-dom";

const ServiceSideBar = () => {
  const id = useParams();

  const { data: service } = useGetSingleServicesQuery(id);


  return (
    <div>
      {/* <div className="bg-[#F5FDF8] rounded border-l-2 border-[#244436]  py-4">
        <h2 className="text-xl px-4 font-semibold text-[#244436]">services</h2>

        <div className="mt-8 flex flex-col gap-2">
          {services?.data?.result?.map((service) => (
            <div key={service._id}>
              <Link to={`/service/${service._id}`}>
                <div className="bg-[#244436] w-full px-4 py-2 inline-flex rounded-r relative group overflow-hidden cursor-pointer ">
                  <span className="group-hover:text-[#fff] z-10 duration-300 text-gray-300">
                    {service.title}
                  </span>

                  <div className="absolute  inset-0 w-full h-full bg-gradient-to-r from-transparent to-[#28c56f]   rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}

      <div className="bg-[#F5FDF8] rounded flex items-center gap-4 px-4 py-2">
        <div className="px-2 py-2 rounded bg-[#244436] text-xl font-semibold text-[#fff]">
          <MdLocalPhone />
        </div>
        <div>
          <p>Contact Us</p>
          <p className="text-[#262626]/80"></p>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-[#F5FDF8]  px-4 py-2">
          <h2 className="text-xl font-semibold text-[#262626]/80">
            Get Quotation
          </h2>
        </div>

        <div className="mt-4">
          <ServiceContact productID={service?.data?.productID}/>
        </div>
      </div>
    </div>
  );
};

export default ServiceSideBar;
