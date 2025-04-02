import Image from "next/image";

export const AppDownloadSection = () => {
  return (
    <section className="flex justify-center w-full px-4 sm:px-6 md:px-12 lg:px-[120px] pt-12 md:pt-16 lg:pt-[140px] pb-10">
      <div className="relative w-full max-w-[1280px] min-h-[320px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[500px] bg-gradient-to-r from-[#B97AFD] to-[#CAA9EE] rounded-[24px] overflow-hidden shadow-xl">
        {/* Content Section */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 md:gap-12 lg:gap-[40px] w-full">
          {/* Text Content */}
          <div className="flex flex-col text-center md:text-left max-w-full md:max-w-[580px] lg:max-w-[620px] z-10">
            <div className="flex flex-col gap-3 md:gap-4 mb-5 lg:mb-6">
              <h2 className="font-poppins font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight md:leading-[48px] lg:leading-[56px] text-white tracking-tight">
                Download Our Planet X App
              </h2>
              <p className="font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[22px] leading-6 md:leading-8 text-white opacity-90">
                Your Dream Property is Just a Tap Away!
              </p>
            </div>

            <p className="font-poppins font-normal text-sm sm:text-base md:text-lg lg:text-xl leading-6 md:leading-8 lg:leading-9 text-white opacity-85">
              Explore properties, connect with owners, and manage your listings effortlessly anytime, anywhere.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6 lg:gap-8 mt-6 lg:mt-8">
              <a
                href="#"
                className="w-[160px] sm:w-[180px] md:w-[210px] h-[50px] md:h-[64px] transition-all duration-300 hover:opacity-90 hover:scale-105"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/play-store.png"
                  alt="Google Play Store"
                  width={210}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="#"
                className="w-[160px] sm:w-[180px] md:w-[210px] h-[50px] md:h-[64px] transition-all duration-300 hover:opacity-90 hover:scale-105"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/apple-store.png"
                  alt="Apple App Store"
                  width={210}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="relative w-full md:w-auto mt-8 md:mt-0">
            <div className="hidden md:block absolute right-[220px] lg:right-[300px] xl:right-[340px] top-[-60px] lg:top-[-80px] z-10">
              <Image
                src="/mobile-app-left.png"
                alt="Planet X App Interface Preview Left"
                width={280}
                height={460}
                className="md:w-[260px] lg:w-[300px] xl:w-[320px] md:h-[420px] lg:h-[480px] xl:h-[520px] shadow-[30px_10px_15px_-10px_rgba(0,0,0,0.2)] transform rotate-[-5deg] transition-transform duration-300 hover:rotate-0"
                priority
              />
            </div>
            <div className="relative mx-auto md:absolute md:right-[80px] lg:right-[100px] xl:right-[120px] md:top-[-110px] lg:top-[-140px] w-[260px] md:w-[280px] lg:w-[320px] xl:w-[340px] h-[420px] md:h-[480px] lg:h-[540px] xl:h-[580px]">
              <Image
                src="/mobile-app-right.png"
                alt="Planet X App Interface Preview Right"
                width={340}
                height={580}
                className="w-full h-full object-contain shadow-[30px_10px_15px_-10px_rgba(0,0,0,0.2)] transform rotate-[5deg] transition-transform duration-300 hover:rotate-0"
                priority
              />
            </div>
          </div>
        </div>

        {/* Optional Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
};