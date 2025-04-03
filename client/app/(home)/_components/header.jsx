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
    <header className="bg-[#7B00FF] py-2 px-8 flex justify-between items-center">
      <div className="flex gap-5">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center gap-2">
            {contact.icon}
            <span className="text-white text-xs font-semibold">{contact.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            {link.icon}
          </a>
        ))}
      </div>
    </header>
  );
};
