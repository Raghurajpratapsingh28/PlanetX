import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const ReusableCollapsible = ({
  title,
  options,
  selected,
  setSelected,
  paramName,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (selected !== null) {
      const query = new URLSearchParams(window.location.search);
      query.set(paramName, selected);
      router.push(`${window.location.pathname}?${query.toString()}`, {
        scroll: false,
      });
    }
  }, [selected, paramName, router]);

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h3 className="font-medium">{title}</h3>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-wrap gap-2 pt-4">
        {options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className={`rounded-lg transition-colors ${
              selected === option
                ? "bg-purple-100 text-purple-600 border-2 border-purple-600"
                : "text-gray-700"
            }`}
            onClick={() => setSelected(option)}
          >
            {option}
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
