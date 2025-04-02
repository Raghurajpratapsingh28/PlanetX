import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SortFilter = () => {
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sortOrder) {
      const query = new URLSearchParams(window.location.search);
      query.set("sort", sortOrder);
      router.push(`${window.location.pathname}?${query.toString()}`, {
        scroll: false,
      });
    }
  }, [sortOrder]);

  return (
    <Select onValueChange={setSortOrder}>
      <SelectTrigger className="w-[160px] ml-auto">
        <SelectValue placeholder="Sort Options" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Price: Low to High</SelectItem>
        <SelectItem value="desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};
