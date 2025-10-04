import { motion } from "framer-motion";
import { FaFacebookF } from "react-icons/fa";

import { FaYoutube } from "react-icons/fa";

import { FaLinkedinIn } from "react-icons/fa";

const SocialIcon = () => {
  // Animation variants for each icon
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Stagger effect
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  // Animation for labels
  const labelVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex items-center gap-3">
      {[
        {
          icon: <FaFacebookF />,
          bgColor: "#0866FF",
          label: "Facebook",
        },

        {
          icon: <FaYoutube />,
          bgColor: "#FF0033",
          label: "YouTube",
        },
        {
          icon: <FaLinkedinIn />,
          bgColor: "#0C61BF",
          label: "Linkedin",
        },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-2 group duration-500"
          custom={index} // Pass index for stagger animation
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <a
            href={item.link}
            target="_blank"
            className={`px-2 py-2 text-[#fff] rounded cursor-pointer duration-500`}
            style={{ backgroundColor: item.bgColor }}
          >
            {item.icon}
          </a>
          {/* Label with hover animation */}
          <motion.p
            className="px-2 py-1 text-[#fff] rounded hidden group-hover:block"
            style={{ backgroundColor: item.bgColor }}
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {item.label}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialIcon;
