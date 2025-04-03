import Image from "next/image";

export const AppDownloadSection = () => {
  return (
    <section className="flex justify-center w-full px-4 sm:px-6 pt-12 sm:pt-16">
      <div className="relative w-full max-w-[1024px] min-h-[380px] sm:min-h-[450px] bg-gradient-to-br from-[#7C3AED] via-[#B97AFD] to-[#D8B4FE] rounded-[24px] overflow-hidden shadow-2xl">
        {/* Content Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center p-6 sm:p-8 gap-6 sm:gap-8 w-full">
          <div className="flex flex-col gap-6 sm:gap-8 max-w-full sm:max-w-[480px] z-10">
            <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
              <h2 className="font-poppins font-bold text-2xl sm:text-[28px] leading-tight sm:leading-[40px] text-white drop-shadow-md">
                Get Planet X App Today
              </h2>
              <p className="font-poppins font-semibold text-base sm:text-lg leading-6 sm:leading-7 text-white opacity-95">
                Your Dream Home Awaits!
              </p>
            </div>

            <p className="font-poppins font-normal text-sm sm:text-base leading-6 sm:leading-7 text-white opacity-90">
              Discover properties, chat with owners, and manage listings seamlessly—anytime, anywhere.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <a
                href="#"
                className="w-[180px] sm:w-[202.5px] h-[52px] sm:h-[60px] transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/play-store.png"
                  alt="Google Play Store"
                  width={202}
                  height={60}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </a>
              <a
                href="#"
                className="w-[180px] sm:w-[201.93px] h-[52px] sm:h-[60px] transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/apple-store.png"
                  alt="Apple App Store"
                  width={202}
                  height={60}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </a>
            </div>
          </div>
          {/* Phone Mockups */}
          <div className="relative w-full sm:w-[480px] mt-6 sm:mt-0 flex justify-center sm:justify-end">
            {/* Back Phone */}
            <div className="absolute left-0 sm:left-[40px] bottom-[-20px] sm:bottom-[-40px] z-10">
              <Image
                src="/mobile-app-left.png"
                alt="Planet X App Interface Preview Left"
                width={240}
                height={400}
                className="w-[220px] sm:w-[240px] h-[360px] sm:h-[400px] shadow-[20px_8px_12px_-8px_rgba(0,0,0,0.2)] transform rotate-[-6deg] transition-transform duration-300 hover:rotate-[-2deg]"
                priority
              />
            </div>
            {/* Front Phone */}
            <div className="relative right-0 sm:right-[80px] top-[-60px] sm:top-[-90px] w-[240px] sm:w-[260px] h-[400px] sm:h-[440px]">
              <Image
                src="/mobile-app-right.png"
                alt="Planet X App Interface Preview Right"
                width={260}
                height={440}
                className="w-full h-full object-contain shadow-[20px_8px_12px_-8px_rgba(0,0,0,0.2)] transform rotate-[6deg] transition-transform duration-300 hover:rotate-[2deg]"
                priority
              />
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse" />
        <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/15 rounded-full -translate-y-10 translate-x-10 filter blur-xl" />
      </div>
    </section>
  );
};