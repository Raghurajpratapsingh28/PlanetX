"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";

const Privacy = () => {
  const router = useRouter();
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">12. Privacy</h2>
        <p className="text-[#6C696A]">
          Our use of your data is governed by our{" "}
          <a
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              router.push("/dashboard/privacy-policy");
            }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
};

export default Privacy;
