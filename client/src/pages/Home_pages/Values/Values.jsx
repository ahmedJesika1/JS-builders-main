import { useGetValuesQuery } from "../../../redux/features/values/ValuesApi";
import Chart from "../../../utilits/Chart";
import SectionHead from "../../../utilits/SectionHead";

const Values = () => {
  const { data } = useGetValuesQuery("");
  const sectionInfo = data?.data[0];

  return (
    <div className="py-20 2xl:px-80 xl:px-28 lg:px-20 md:px-12 px-8">
      <div className="flex items-center justify-center">
        <SectionHead
          alDesign="item-center justify-center text-center"
          centerDesign="item-center flex justify-center text-center"
          subTitle="Our Impact"
          title={sectionInfo?.title || ""}
          shortInfo={sectionInfo?.details || ""}
        ></SectionHead>
      </div>

      <div className="relative">
        <Chart chartData={data} />
        <div className="absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center">
          <h2 className="lg:text-xl md:text-xl text-base font-semibold">
            2024
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Values;
