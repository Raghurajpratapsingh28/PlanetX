import React from "react";

const SelectButton = ({ name, options, value, onChange }) => (
  <div>
    <p className="text-base font-poppins text-[#0F0D0D] mb-2">{name}</p>
    <div className="flex gap-2.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`h-[46px] px-[15px] rounded-lg flex items-center justify-center font-poppins
              ${
                option === value
                  ? "bg-[#F5F5F5] border border-[#7B00FF] text-[#7B00FF]"
                  : "border border-[#E1E1E1] text-[#6C696A]"
              }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default SelectButton;
