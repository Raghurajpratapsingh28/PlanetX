import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";


export default function loginLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full">
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
