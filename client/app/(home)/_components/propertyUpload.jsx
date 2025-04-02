'use client'

import { Store } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const steps = [
  {
    title: "Enter Property Details",
    description: "Enter essential information like location, price, and property type to start.",
  },
  {
    title: "Upload Photos & Video",
    description: "Showcase your property with clear, high-quality images to attract attention.",
  },
  {
    title: "Submit & Go Live",
    description: "Review the details and publish your property. It's now live and ready for buyers or renters!",
  },
]

export const PropertyUpload = () => {
  const router = useRouter();
  return (
    <div className="w-full py-8 md:py-12 lg:py-16 px-4 flex flex-col items-center gap-6 md:gap-8 lg:gap-[35px] bg-white">
      <div className="flex flex-col justify-center items-center gap-2 md:gap-[5px]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-tight md:leading-[50px] font-semibold text-[#0F0D0D] font-poppins text-center px-4">
          Upload Your Property in 3 Easy Steps
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-[120px] max-w-[975px] w-full px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 md:gap-[19px] w-full md:w-[245px] max-w-[300px]"
          >
            <div className="flex items-center justify-center w-[60px] h-[60px] md:w-[75px] md:h-[75px] bg-[#F2E6FF] rounded-lg p-3 md:p-[15px]">
              <Store className="w-8 h-8 md:w-[45px] md:h-[45px] text-[#0F0D0D]" />
            </div>
            <div className="flex flex-col items-center gap-2 md:gap-[5px] w-full">
              <h3 className="font-poppins font-medium text-lg md:text-[20px] leading-6 md:leading-[32px] text-[#0F0D0D] text-center">
                {step.title}
              </h3>
              <p className="font-poppins font-normal text-sm md:text-[16px] leading-5 md:leading-[26px] text-[#6C696A] text-center">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => router.push('/dashboard/add-property')}
        className="bg-[#7B00FF] hover:bg-[#7B00FF]/90 text-white font-poppins font-medium text-sm md:text-[16px] leading-5 md:leading-[26px] px-6 md:px-[30px] py-3 md:py-[15px] h-auto md:h-[56px] rounded-[10px]"
      >
        Add Property
      </Button>
    </div>
  )
}