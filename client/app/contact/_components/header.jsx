
import { ChevronRight } from 'lucide-react'

export const ContactHeader = () => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-8 md:p-16 lg:p-[100px] gap-6 md:gap-[30px] w-full min-h-[200px] md:min-h-[296px] bg-gray-50">
      <div className="flex flex-col items-start gap-2 sm:gap-[10px] w-full max-w-[786px]">
        <div className="flex flex-col items-start gap-3 sm:gap-[15px] w-full">
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-[34px] leading-normal lg:leading-[54px] text-[#0F0D0D]">
            Contact
          </h1>
        </div>
        <div className="flex flex-row items-center gap-2 sm:gap-[10px]">
          <a
            href="/"
            className="font-poppins font-medium text-base sm:text-lg lg:text-[20px] leading-normal lg:leading-[32px] text-[#6C696A] hover:text-[#0F0D0D] transition-colors"
          >
            Home
          </a>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F0D0D]" />
          <span className="font-poppins font-medium text-base sm:text-lg lg:text-[20px] leading-normal lg:leading-[32px] text-[#0F0D0D]">
            Contact
          </span>
        </div>
      </div>
    </div>
  )
}


