'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { EnterPhoneNumber } from './(login-phone-number)/phone-number-page'
import { OTPVerification } from './(login-otp)/otp-page'

export default function Login() {
  const [phoneNumberSubmitted, setPhoneNumberSubmitted] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/login.jpg",
    "/login_2.jpg",
    "/login_3.jpg"
  ];

  const imageContent = [
    {
      title: "Discover the Best\nNeighborhoods",
      description: "Explore a vast selection of properties tailored to your preferences."
    },
    {
      title: "Find Your Dream Home",
      description: "Browse thousands of listings with detailed filters."
    },
    {
      title: "Expert Real Estate Advice",
      description: "Connect with top local agents for personalized support."
    }
  ];

  const handleDotClick = (index) => setCurrentImageIndex(index);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-[450px]">
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

      {/* Right Panel (Hidden on small screens) */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          className="h-screen w-full object-cover brightness-[0.85] transition-opacity duration-500"
          height={1080}
          width={720}
          src={backgroundImages[currentImageIndex]}
          alt={`Real estate image ${currentImageIndex + 1}`}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center whitespace-pre-line">
            {imageContent[currentImageIndex].title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-center opacity-90 max-w-md">
            {imageContent[currentImageIndex].description}
          </p>
          <div className="flex gap-2 mt-6 lg:mt-8">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}