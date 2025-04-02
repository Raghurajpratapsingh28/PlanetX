
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react'


export const Footer = () => {
  return (
    <footer className="flex flex-col items-start px-6 py-20 md:px-24 gap-8 bg-[#7B00FF] w-full">
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-12 md:gap-24">
        {/* Logo and Description */}
        <div className="flex flex-col items-start gap-4 max-w-[300px]">
          <Image
            src="/logo-footer.png"
            alt="Planet X Logo"
            width={189}
            height={39}
            className="h-10 w-auto"
          />
          <p className="text-white font-medium">
            Connecting you to your dream property with ease — whether you're buying, renting, or listing, we make real estate simple and hassle-free.
          </p>
          <div className="flex gap-4">

            <Link
              href="#"
              className="flex items-center justify-center w-11 h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90"
            >
              <Linkedin
                width={24}
                height={24}
                className="text-[#7B00FF]"
              />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center w-11 h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90"
            >
              <Instagram
                width={24}
                height={24}
                className="text-[#7B00FF]"
              />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center w-11 h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90"
            >
              <Instagram
                width={24}
                height={24}
                className="text-[#7B00FF]"
              />
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center w-11 h-11 bg-[#F2E6FF] rounded-full hover:bg-opacity-90"
            >
              <Instagram
                width={24}
                height={24}
                className="text-[#7B00FF]"
              />
            </Link>

          </div>
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-semibold text-white">Explore</h5>
          <div className="flex flex-col gap-4">
            {['Home', 'Upload Property', 'Rent Property', 'Hotels', 'Paying Guest'].map((link) => (
              <Link key={link} href="#" className="text-white hover:text-opacity-80">
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Others Links */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-semibold text-white">Others</h5>
          <div className="flex flex-col gap-4">
            {['About us', 'Contact', 'Highlights'].map((link) => (
              <Link key={link} href="#" className="text-white hover:text-opacity-80">
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-semibold text-white">Get in Touch</h5>
          <div className="flex flex-col gap-4">
            <Link href="mailto:property@planetx.com" className="flex items-center gap-2 text-white">
              <Mail className="w-6 h-6" />
              property@planetx.com
            </Link>
            <Link href="tel:+919873581566" className="flex items-center gap-2 text-white">
              <Phone className="w-6 h-6" />
              +91 98735 81566
            </Link>
          </div>
          <div className="flex gap-4 mt-4">
            <Link href="#">
              <Image
                src="/play-store-footer.png"
                alt="Get it on Google Play"
                width={152}
                height={45}
                className="h-[45px] w-auto"
              />
            </Link>
            <Link href="#">
              <Image
                src="/app-store-footer.png"
                alt="Download on the App Store"
                width={152}
                height={45}
                className="h-[45px] w-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 text-sm text-white">
        <p>© 2025 Planet X. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="#" className="hover:text-opacity-80">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-opacity-80">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}


