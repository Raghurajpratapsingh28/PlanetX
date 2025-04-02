import { cn } from "@/lib/utils";

export function StepsSection({ steps, currentStep }) {
  return (
    <div className="box-border flex flex-col items-start p-5 gap-10 w-full md:w-64 bg-white border border-[#E1E1E1] rounded-xl max-h-[375px] max-w-[265px]">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="flex flex-row items-center gap-3.5 w-full"
        >
          <div
            className={cn(
              "flex justify-center items-center w-[35px] h-[35px] rounded-full border text-center",
              currentStep === index + 1
                ? "bg-[#7B00FF] border-[#7B00FF] text-white"
                : "bg-[#F5F5F5] border-[#E1E1E1] text-[#6C696A]"
            )}
          >
            <span className="font-medium text-base leading-[26px]">
              {step.number}
            </span>
          </div>
          <span
            className={cn(
              "font-normal text-base leading-[26px]",
              currentStep === index + 1 ? "text-[#0F0D0D]" : "text-[#6C696A]"
            )}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}
