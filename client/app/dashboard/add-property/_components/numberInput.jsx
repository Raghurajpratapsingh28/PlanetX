import { Minus, Plus } from "lucide-react";
import React from "react";

const NumberInput = ({ name, value, onChange, error }) => (
  <div>
    <p className="text-base font-poppins text-[#6C696A] mb-2">{name}</p>
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-9 h-9 rounded-full border border-[#E1E1E1] flex items-center justify-center"
      >
        <Minus className="w-5 h-5 text-[#9E9E9E]" />
      </button>
      <span className="text-lg font-poppins text-[#6C696A]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-9 h-9 rounded-full border border-[#E1E1E1] flex items-center justify-center"
      >
        <Plus className="w-5 h-5 text-[#6C696A]" />
      </button>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default NumberInput;
