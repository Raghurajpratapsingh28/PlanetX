
import Image from "next/image"

export const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "We understand your needs and preferences.",
    },
    {
      number: "02",
      title: "Property Search",
      description: "Explore detailed listings with photos, descriptions, and key features to find the right fit.",
    },
    {
      number: "03",
      title: "Negotiation",
      description: "Get the best value for your investment.",
    },
    {
      number: "04",
      title: "Closing",
      description: "Connect with property owners instantly for quick and transparent communication.",
    },
  ]

  return (
    <section className="flex flex-col justify-end items-center px-6 py-12 md:px-24 lg:px-[100px] gap-5 w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-center items-end w-full gap-5 lg:gap-20">
        <div className="flex flex-col items-center lg:items-start lg:pr-8 gap-9 w-full lg:w-[640px]">
          <div className="w-full">
            <h2 className="font-semibold text-3xl lg:text-4xl leading-[1.56] text-[#0F0D0D] font-poppins">
              Our Process
            </h2>
          </div>

          <div className="flex flex-col gap-8 w-full">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-row items-start p-8 gap-5 w-full bg-white border border-[#E1E1E1] rounded-xl"
              >
                <div className="flex justify-center items-center p-[5px] w-12 h-12 bg-[#F2E6FF] rounded-lg">
                  <span className="font-medium text-2xl leading-[38px] text-[#7B00FF] font-poppins">
                    {step.number}
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-[5px] flex-1">
                  <h3 className="font-medium text-xl leading-8 text-[#0F0D0D] font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-base leading-[26px] text-[#6C696A] font-poppins">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-[580px] h-[649px]">
          {/* Small image positioned absolutely */}
          <div className="absolute -top-[71px] -left-10 w-[267px] h-[283px] z-10">
            <Image
              src="/about-section.png"
              alt="Small property consultation image"
              className="rounded-xl object-cover"
              fill
              sizes="267px"
            />
          </div>

          {/* Main large image */}
          <div className="relative w-[530px] h-full">
            <Image
              src="/about-section.png"
              alt="People reviewing property details"
              className="rounded-xl object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 530px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}


