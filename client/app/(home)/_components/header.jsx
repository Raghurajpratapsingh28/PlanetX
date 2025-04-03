import { FaPhoneAlt, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiLinkedin, SiX } from "react-icons/si";

export const Header = () => {
  const contacts = [
    { icon: <FaPhoneAlt fill="white" />, text: "+91 98735 81566" },
    { icon: <IoMdMail fill="white" className="text-[20px]" />, text: "property@planetx.com" },
  ];

  const socialLinks = [
    { icon: <SiLinkedin fill="white" />, href: "https://www.linkedin.com/in/planet-x-596924356/" },
    { icon: <FaInstagram color="white" />, href: "https://www.instagram.com/_planetx_live/?hl=en" },
    { icon: <FaFacebookF fill="white" />, href: "https://www.facebook.com/profile.php?id=61574182288463" },
    { icon: <FaYoutube fill="white" />, href: "https://www.youtube.com/@PlanetX-live" },
    { icon: <SiX fill="white" />, href: "https://x.com/Planetx_live" },
  ];

  return (
    <header className="bg-[#7B00FF] py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 lg:gap-6">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-white text-sm sm:text-base">{contact.icon}</span>
            <span className="text-white text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">
              {contact.text}
            </span>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex gap-3 sm:gap-4 lg:gap-5">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg sm:text-xl lg:text-2xl hover:scale-110 transition-transform duration-200"
            aria-label={`Visit our ${link.href.split(".com")[0].split("//")[1]} page`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </header>
  );
};