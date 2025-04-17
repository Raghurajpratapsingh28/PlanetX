import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-start px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20 gap-6 sm:gap-8 bg-[#7B00FF] w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-8 sm:gap-12 md:gap-16 lg:gap-24 max-w-[1280px] mx-auto">
        {/* Logo and Description */}
        <div className="flex flex-col items-start gap-4 max-w-[280px] sm:max-w-[300px]">
          <Image
            src="/logo-footer.png"
            alt="Planet X Logo"
            width={189}
            height={39}
            className="h-8 sm:h-10 w-auto"
          />
          <p className="text-white font-medium text-sm sm:text-base leading-6">
            Connecting you to your dream property with ease — whether you're buying, renting, or listing, we make real estate simple and hassle-free.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90 transition-all duration-200"
            >
              <Linkedin width={20} height={20} sm={{ width: 24, height: 24 }} className="text-[#7B00FF]" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90 transition-all duration-200"
            >
              <Instagram width={20} height={20} sm={{ width: 24, height: 24 }} className="text-[#7B00FF]" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90 transition-all duration-200"
            >
              <Instagram width={20} height={20} sm={{ width: 24, height: 24 }} className="text-[#7B00FF]" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90 transition-all duration-200"
            >
              <Instagram width={20} height={20} sm={{ width: 24, height: 24 }} className="text-[#7B00FF]" />
            </Link>
          </div>
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4">
          <h5 className="text-lg sm:text-xl font-semibold text-white">Explore</h5>
          <div className="flex flex-col gap-3 sm:gap-4">
            {["Home", "Upload Property", "Rent Property", "Hotels", "Paying Guest"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-white text-sm sm:text-base hover:text-opacity-80 transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Others Links */}
        <div className="flex flex-col gap-4">
          <h5 className="text-lg sm:text-xl font-semibold text-white">Others</h5>
          <div className="flex flex-col gap-3 sm:gap-4">
            {["About us", "Contact", "Highlights"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-white text-sm sm:text-base hover:text-opacity-80 transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col gap-4">
          <h5 className="text-lg sm:text-xl font-semibold text-white">Get in Touch</h5>
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link href="mailto:Contact@planetx-live.com" className="flex items-center gap-2 text-white text-sm sm:text-base">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              Contact@planetx-live.com
            </Link>
            <Link href="tel:+919873581566" className="flex items-center gap-2 text-white text-sm sm:text-base">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              +91 98735 81566
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
            <Link href="#" className="w-full sm:w-auto">
              <Image
                src="/play-store-footer.png"
                alt="Get it on Google Play"
                width={130}
                height={38}
                className="h-[38px] sm:h-[45px] w-auto"
              />
            </Link>
            <Link href="#" className="w-full sm:w-auto">
              <Image
                src="/app-store-footer.png"
                alt="Download on the App Store"
                width={130}
                height={38}
                className="h-[38px] sm:h-[45px] w-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/50 max-w-[1280px] mx-auto" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 text-xs sm:text-sm text-white max-w-[1280px] mx-auto">
        <p>© 2025 Planet X. All rights reserved.</p>
        <div className="flex gap-4 sm:gap-5">
          <Link href="#" className="hover:text-opacity-80 transition-colors duration-200">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-opacity-80 transition-colors duration-200">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};