import Lottie from "react-lottie";
import notFoundImage from "../../assets/animationImage/notfound.json";
import { Link } from "react-router-dom";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center xl:mt-60 lg:mt-40 mt-40 px-8">
        <div>
          <Lottie options={defaultOptions} />
        </div>
        <p className="mt-6 lg:text-xl text-lg text-center font-semibold">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-4 hover:text-[#244436] duration-300 cursor-pointer"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
