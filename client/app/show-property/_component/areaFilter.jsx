// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Collapsible,
//   CollapsibleTrigger,
//   CollapsibleContent,
// } from "@/components/ui/collapsible";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Button } from "@/components/ui/button";
// import { ChevronDown } from "lucide-react";
// export const AreaFilter = () => {
//   const [minArea, setMinArea] = useState(500);
//   const [maxArea, setMaxArea] = useState(2000);
//   const [sliderArea, setSliderArea] = useState(2000);
//   const router = useRouter();

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     query.set("minArea", minArea);
//     query.set("maxArea", maxArea);
//     router.push(`${window.location.pathname}?${query.toString()}`, {
//       scroll: false,
//     });
//   }, [minArea, maxArea]);

//   const handleSliderChange = (value) => {
//     setSliderArea(value);
//     setMaxArea(value);
//   };

//   return (
//     <Collapsible defaultOpen>
//       <CollapsibleTrigger className="flex items-center justify-between w-full">
//         <h3 className="font-medium">Area (sq. ft.)</h3>
//         <ChevronDown className="h-4 w-4" />
//       </CollapsibleTrigger>
//       <CollapsibleContent className="space-y-4 pt-4">
//         <p className="text-sm">
//           {minArea} sq. ft. to {maxArea} sq. ft.
//         </p>
//         <div className="flex gap-4">
//           <Select onValueChange={(value) => setMinArea(Number(value))}>
//             <SelectTrigger>
//               <SelectValue placeholder="Min Area" />
//             </SelectTrigger>
//             <SelectContent>
//               {[500, 1000, 1500, 2000, 2500].map((value) => (
//                 <SelectItem key={value} value={value.toString()}>
//                   {value} sq. ft.
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Select onValueChange={(value) => setMaxArea(Number(value))}>
//             <SelectTrigger>
//               <SelectValue placeholder="Max Area" />
//             </SelectTrigger>
//             <SelectContent>
//               {[minArea, 2500, 3000, 3500]
//                 .filter((value) => value >= minArea)
//                 .map((value) => (
//                   <SelectItem key={value} value={value.toString()}>
//                     {value} sq. ft.
//                   </SelectItem>
//                 ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <Slider
//           value={[sliderArea]}
//           onValueChange={(value) => handleSliderChange(value[0])}
//           min={500}
//           max={5000}
//           step={100}
//           className="w-full"
//         />
//       </CollapsibleContent>
//     </Collapsible>
//   );
// };
