import { baseUrl } from "../../../redux/api/baseApi";
import { useGetAboutQuery } from "../../../redux/features/about/aboutApi";
import SectionHead from "../../../utilits/SectionHead";

import mission from "../../../assets/image/mission.png";
import vision from "../../../assets/image/vission.png";
import value from "../../../assets/image/value.png";
import FixModals from "../../../utilits/FixModals";


import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const About = () => {
  const { data } = useGetAboutQuery("");

  // Separate animation controls for each section
  const missionControls = useAnimation();
  const visionControls = useAnimation();
  const valueControls = useAnimation();
  const imageControls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      missionControls.start("visible");
      visionControls.start("visible");
      valueControls.start("visible");
      imageControls.start("visible");
    } else {
      missionControls.start("hidden");
      visionControls.start("hidden");
      valueControls.start("hidden");
      imageControls.start("hidden");
    }
  }, [missionControls, visionControls, valueControls, inView, imageControls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3, // Staggered animation for each item
        ease: "easeOut", // Smooth transition
        duration: 0.8, // Duration for the animation
      },
    }),
  };

  const cardVariant2 = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Staggered animation for each item
        ease: "easeOut", // Smooth transition
        duration: 0.8, // Duration for the animation
      },
    }),
  };
  

  return (
    <div
      id="about"
      className="xl:py-32 lg:py-32 md:py-24 py-20 mx-auto overflow-hidden px-5 md:w-[90%]"
    >
      {data?.data?.slice(0, 1).map((about, index) => (
        <div key={about._id} className="w-full">
          <div className="flex flex-col xl:flex-row gap-12 2xl:gap-4">
            {/* Image */}
            <motion.div
              ref={ref}
              initial="hidden"
              variants={cardVariant2}
              animate={imageControls}
              custom={index}
              className="lg:w-2/5 w-full"
            >
              <img
                src={baseUrl + about?.image}
                alt={about.title}
                className="rounded-xl shadow-lg"
              />
            </motion.div>

            {/* Content */}
            <div className="xl:w-3/5 w-full">
              <h2 className="text-[#244436] uppercase text-2xl md:text-3xl xl:text-4xl font-semibold">
                ABOUT US
              </h2>
              {/* Short Description */}
              <div className="mt-4 text-[#262626]/80 space-y-3">
                <p>{about.details.slice(0, 240)}</p>
                <p className="relative">
                  {about.details.slice(240, 419) || "Let's Talk about Company"}
                  <FixModals type="about" about={about} />
                </p>
              </div>

              {/* Mission / Vision / Value Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Mission */}
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={missionControls}
                  variants={cardVariants}
                  custom={index}
                  className="group relative bg-[#4F6F5E]/20 rounded-xl p-6 flex flex-col items-start hover:bg-[#244436] transition-all duration-500 cursor-pointer"
                >
                  <img src={mission} alt="mission" className="w-20 mb-4" />
                  <h4 className="font-semibold text-[#244436] group-hover:text-white mb-2">
                    Mission
                  </h4>
                  <p className="text-[#262626]/80 group-hover:text-white">
                    {about.mission.slice(0, 250)}
                  </p>
                  {about.mission.length > 250 && (
                    <FixModals type="mission" about={about} />
                  )}
                </motion.div>

                {/* Vision */}
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={visionControls}
                  variants={cardVariants}
                  custom={index + 1}
                  className="group relative bg-[#DDEBB0]/20 rounded-xl p-6 flex flex-col items-start hover:bg-[#244436] transition-all duration-500 cursor-pointer"
                >
                  <img src={vision} alt="vision" className="w-20 mb-4" />
                  <h4 className="font-semibold text-[#244436] group-hover:text-white mb-2">
                    Vision
                  </h4>
                  <p className="text-[#262626]/80 group-hover:text-white">
                    {about.vision.slice(0, 250)}
                  </p>
                  {about.vision.length > 250 && (
                    <FixModals type="vision" about={about} />
                  )}
                </motion.div>

                {/* Value */}
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={valueControls}
                  variants={cardVariants}
                  custom={index + 2}
                  className="group relative bg-[#A6C291]/20 rounded-xl p-6 flex flex-col items-start hover:bg-[#244436] transition-all duration-500 cursor-pointer"
                >
                  <img src={value} alt="value" className="w-20 mb-4" />
                  <h4 className="font-semibold text-[#244436] group-hover:text-white mb-2">
                    Value
                  </h4>
                  <p className="text-[#262626]/80 group-hover:text-white">
                    {about.value.slice(0, 250)}
                  </p>
                  {about.value.length > 250 && (
                    <FixModals type="value" about={about} />
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
