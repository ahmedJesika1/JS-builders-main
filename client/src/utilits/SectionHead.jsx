/* eslint-disable react/prop-types */
const SectionHead = ({ subTitle, alDesign, status }) => {
  return (
    <div className={`flex items-center justify-center ${alDesign}`}>
      <p className="text-[#244436] uppercase text-2xl md:text-3xl xl:text-4xl font-semibold">
        {subTitle}
        {status && <p className="text-xl">({status})</p>}
      </p>
    </div>
  );
};

export default SectionHead;
