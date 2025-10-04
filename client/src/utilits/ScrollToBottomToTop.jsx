import ScrollToTop from "react-scroll-up";
import { BsArrow90DegUp } from "react-icons/bs";

const ScrollToBottomToTop = () => {
  return (
    <div className="relative z-50">
      <ScrollToTop showUnder={160}>
        <p className="bg-[#244436] hover:bg-[#41ee8f] duration-300 cursor-pointer p-3 text-xl rounded  text-[#fff]">
          <BsArrow90DegUp />
        </p>
      </ScrollToTop>
    </div>
  );
};

export default ScrollToBottomToTop;
