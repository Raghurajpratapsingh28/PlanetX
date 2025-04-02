import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiLinkedin } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="bg-[#7B00FF] py-2 px-8 flex justify-between">
      <div className="flex gap-5">
        <div className="flex items-center gap-2">
          <FaPhoneAlt fill="white" />
          <span className="text-white text-xs font-semibold">
            +91 98735 81566
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IoMdMail fill="white" className="text-[20px]" />
          <span className="text-white text-xs font-semibold">
            property@planetx.com
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <SiLinkedin fill="white" />
        <FaInstagram color="white" />
      </div>
    </div>
  );
};
