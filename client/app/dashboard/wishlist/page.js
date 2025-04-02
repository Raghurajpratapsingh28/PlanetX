import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import React from "react";

const WishListPage = () => {
  return (
    <div className="p-4">
      <span className="text-xl font-semibold">Wishlist</span>
      <div className="bg-white w-[70vw] flex justify-between p-4 rounded-xl mt-2">
        <Button className="flex items-center gap-2" variant="ghost">
          <SlidersHorizontal />
          <label className="text-lg">Filter</label>
        </Button>
        <div>
          <Select className="focus:outline-none focus:ring-0 outline-none ring-0">
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By:Relevance </SelectLabel>
                <SelectItem value="asc">Newest First</SelectItem>
                <SelectItem value="desc">Oldest First</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
