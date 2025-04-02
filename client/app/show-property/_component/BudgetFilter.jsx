import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const BudgetFilter = () => {
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10);
  const [sliderValue, setSliderValue] = useState(10);
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.set("minPrice", minBudget);
    query.set("maxPrice", maxBudget);
    router.push(`${window.location.pathname}?${query.toString()}`, {
      scroll: false,
    });
  }, [minBudget, maxBudget]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setMaxBudget(value);
  };

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h3 className="font-medium">Budget</h3>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        <p className="text-sm">
          ₹ {minBudget}L to ₹ {maxBudget}L
        </p>
        <div className="flex gap-4">
          <Select onValueChange={(value) => setMinBudget(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Min Budget" />
            </SelectTrigger>
            <SelectContent>
              {[0, 5, 10, 15, 20].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  ₹ {value}L
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setMaxBudget(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Max Budget" />
            </SelectTrigger>
            <SelectContent>
              {[minBudget, 10, 15, 20, 25]
                .filter((value) => value >= minBudget)
                .map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    ₹ {value}L
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <Slider
          value={[sliderValue]}
          onValueChange={(value) => handleSliderChange(value[0])}
          min={0}
          max={50}
          step={1}
          className="w-full"
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BudgetFilter;
