/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import PagesHead from "../../utilits/PagesHead";
import TabTitle from "../../utilits/TabTitle";
import "./Contact.css";
import Logo from "../../../src/assets/logo/logo.png";

import { FaPhone } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useAddContactMutation } from "../../redux/features/contact/contactApi";
import toast from "react-hot-toast";
import BGImage from "../../../src/assets/contact/contact.jpg";

export const Contact = () => {
  const [addContact] = useAddContactMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addContact(data).unwrap();
      if (response) {
        toast.success("Your message has been sent successfully!", {
          position: "top-right",
          style: {
            background: "#244436",
            color: "#fff",
          },
        });
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        style: {
          background: "#F56565",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="">
      <TabTitle title={"Contact"} />
      <PagesHead title="Contact" subTitle="Contact" />
      <motion.div
        initial={{ y: 50, opacity: 0 }} // Start from below and hidden
        animate={{ y: 0, opacity: 1 }} // Move to the final position and fully visible
        transition={{ duration: 0.8, ease: "easeOut" }} // Control speed and easing
        className="grid xl:grid-cols-2 lg:grid-cols-2 gap-12 container"
      >
        <div
          style={{ backgroundImage: `url(${BGImage})` }}
          className="relative group overflow-hidden rounded lg:px-12 md:px-12 px-8 py-12 bg-cover bg-center text-white text-xl"
        >
          <div>
            <h2 className="text-2xl font-medium">Get in Touch</h2>
            <div className="border-b-4 border-[#244436] w-[30px] mt-1"></div>
          </div>
          <div className="mt-8 z-10 relative">
            <p>Numbers: 01707651645</p>
            <div className="flex items-center gap-2 mt-2">
              <p className="w-[22px] h-[22px] bg-[#244436] flex items-center justify-center text-[#fff] text-[12px] rounded">
                <FaPhone />
              </p>
              <p className="">
                Email: jesikaahmed14380@gmail.com
              </p>
            </div>
          </div>

          <div className="mt-8 z-10 relative">
            <p>
              🏠 Address: Dhaka, Bangladesh
            </p>
            <div className="flex items-center gap-2 mt-2">
              {/* <p className="w-[22px] h-[22px] bg-[#244436] flex items-center justify-center text-[#fff] text-[12px] rounded">
                <FaInfo />
              </p> */}
              <p className="text-[#262626]/60 group-hover:text-[#262626]">
                {/* info@ideatreebd.com */}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {/* <p className="w-[22px] h-[22px] bg-[#244436] flex items-center justify-center text-[#fff] text-[12px] rounded">
                <BiSupport />
              </p> */}
              <p className="text-[#262626]/60 group-hover:text-[#262626]">
                {/* support@ideatreebd.com */}
              </p>
            </div>
          </div>

          <div className="mt-8 z-10 relative">
            {/* <p>Business Hours:</p> */}
            {/* <div className="flex items-center gap-2 mt-2">
              <p className="text-[#262626]/60 group-hover:text-[#262626]">
                Saturday — Thursday 9am – 5pm
              </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <p className="text-[#262626]/60 group-hover:text-[#262626]">
                Friday — Closed
              </p>
            </div> */}
          </div>

          <div className="absolute inset-0 w-full h-full rounded transform scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </div>
        <div className="">
          <div>
            <div className="">
              <img
                src={Logo}
                className="h-20 w-40 bg-gray-200 p-2 rounded-lg"
                alt=""
              />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-medium mt-2">
                Send Us a Message
              </h2>
              <p className="mt-2 text-[#262626]/60">
                Enter your name, valid email address, and number to contact us
              </p>
            </div>
          </div>
          <div className="mt-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <input
                  {...register("name", { required: true })}
                  className="px-4 py-2 border rounded outline-none w-full"
                  type="text"
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-[red]">Name field is required</span>
                )}
              </div>
              <div>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  className="px-4 py-2 border rounded outline-none w-full"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-[red]">Email field is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-[red]">
                    Please enter a valid email (must contain @ and .com)
                  </span>
                )}
              </div>
              <div>
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{11}$/,
                  })}
                  className="px-2 py-2 border rounded outline-none w-full"
                  type="tel"
                  placeholder="Phone"
                />
                {errors.phone && errors.phone.type === "required" && (
                  <span className="text-[red]">Phone field is required</span>
                )}
                {errors.phone && errors.phone.type === "pattern" && (
                  <span className="text-[red]">
                    Phone number must be exactly 11 digits
                  </span>
                )}
              </div>

              <div>
                <textarea
                  {...register("message", { required: true })}
                  className="px-2 py-2 border rounded outline-none w-full"
                  placeholder="Your messages"
                  cols="30"
                  rows="6"
                ></textarea>
                {errors.message && (
                  <span className="text-[red]">Message field is required</span>
                )}
              </div>

              <div className="relative group w-full">
                <button
                  type="submit"
                  className="relative z-10 px-2 py-2 border bg-[#244436] rounded outline-none w-full text-[#fff] cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-orange-500 rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
