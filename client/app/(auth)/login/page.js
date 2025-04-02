"use client";

import Image from "next/image";
import { useState } from "react";
import { EnterPhoneNumber } from "./(login-phone-number)/phone-number-page";
import { OTPVerification } from "./(login-otp)/otp-page";

export default function Login() {
  const [phoneNumberSubmitted, setPhoneNumberSubmitted] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" >
      {/* Logo */}
      <div className="absolute top-4 cursor-pointer left-4 sm:top-6 sm:left-6 flex items-center" onClick={()=>{window.location.href="/"}}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
        <div className="font-extrabold pl-2 text-xl sm:text-2xl text-gray-800">
          PLANET X
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-6">
            {phoneNumberSubmitted ? (
              <OTPVerification mobileNumber={mobileNumber} />
            ) : (
              <EnterPhoneNumber
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                phoneNumberSubmitted={phoneNumberSubmitted}
                setPhoneNumberSubmitted={setPhoneNumberSubmitted}
              />
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block w-1/2 relative">
          <Image
            className="h-screen w-full object-cover brightness-75"
            height={1080}
            width={720}
            src="/login-page-image.png"
            alt="Building facade"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
              Discover the Best<br />Neighborhoods
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-center opacity-90 max-w-sm lg:max-w-md">
              Explore a vast selection of properties tailored to your preferences. Whether you're buying, selling, or renting, we've got you covered!
            </p>
            <div className="flex gap-2 mt-6 lg:mt-8">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}