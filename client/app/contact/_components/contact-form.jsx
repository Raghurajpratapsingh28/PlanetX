"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, Mail, Phone, Instagram, Linkedin } from 'lucide-react'
import Image from "next/image"

export const ContactForm = () => {
  return (
    <section className="w-full px-4 py-12 my-8 md:px-6 lg:px-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 lg:flex-row">
        {/* Left side - Contact Form */}
        <div className="flex w-full flex-col gap-5 lg:w-[715px]">
          <h2 className="font-poppins text-2xl font-semibold leading-[50px] text-[#0F0D0D] md:text-3xl lg:text-[32px]">
            Drop Us A Line
          </h2>

          <form className="flex flex-col gap-5">
            {/* Name and Email */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="font-poppins text-base font-medium text-[#0F0D0D]">
                  Name
                </label>
                <Input
                  placeholder="Enter Name"
                  className="h-[58px] border-[#E1E1E1] font-poppins text-base placeholder:text-[#9E9E9E]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-poppins text-base font-medium text-[#0F0D0D]">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  className="h-[58px] border-[#E1E1E1] font-poppins text-base placeholder:text-[#9E9E9E]"
                />
              </div>
            </div>

            {/* Mobile and Subject */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="font-poppins text-base font-medium text-[#0F0D0D]">
                  Mobile Number
                </label>
                <div className="flex h-[58px] items-center gap-3 rounded-lg border border-[#E1E1E1] px-4">
                  <div className="flex items-center gap-1 border-r border-[#9E9E9E] pr-2">
                    <Image
                      src="/placeholder.svg"
                      alt="India flag"
                      width={24}
                      height={16}
                      className="rounded-[1px]"
                    />
                    <span className="font-poppins text-base text-[#424242]">+91</span>
                    <ChevronDown className="h-4 w-4 text-[#0F0D0D]" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="flex-1 border-0 bg-transparent p-0 font-poppins text-base placeholder:text-[#9E9E9E] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-poppins text-base font-medium text-[#0F0D0D]">
                  Subject
                </label>
                <Select>
                  <SelectTrigger className="h-[58px] border-[#E1E1E1] font-poppins text-base">
                    <SelectValue placeholder="Enter Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="font-poppins text-base font-medium text-[#0F0D0D]">
                Message
              </label>
              <Textarea
                placeholder="Enter Message"
                className="min-h-[126px] border-[#E1E1E1] font-poppins text-base placeholder:text-[#9E9E9E]"
              />
            </div>

            <Button className="h-[56px] w-[188px] bg-[#7B00FF] font-poppins text-base font-medium hover:bg-[#7B00FF]/90">
              Submit Request
            </Button>
          </form>
        </div>

        {/* Right side - Contact Information */}
        <Card className="w-full border-[#E1E1E1] lg:w-[505px]">
          <CardContent className="flex flex-col gap-[35px] p-[30px]">
            <h2 className="font-poppins text-2xl font-semibold leading-[50px] text-[#0F0D0D] md:text-3xl lg:text-[32px]">
              Get in Touch
            </h2>

            <div className="flex flex-col gap-[30px]">
              {/* Address */}
              <div className="flex flex-col gap-[5px]">
                <h3 className="font-poppins text-xl font-medium leading-8 text-[#0F0D0D]">
                  Address
                </h3>
                <p className="font-poppins text-base leading-[26px] text-[#6C696A]">
                  101 E 129th St, East Chicago, IN 46312, United States
                </p>
              </div>

              {/* Information */}
              <div className="flex flex-col gap-[5px]">
                <h3 className="font-poppins text-xl font-medium leading-8 text-[#0F0D0D]">
                  Information
                </h3>
                <div className="flex flex-col gap-[15px]">
                  <div className="flex items-center gap-[10px]">
                    <Mail className="h-6 w-6 text-[#6C696A]" />
                    <span className="font-poppins text-sm font-medium text-[#6C696A]">
                      property@planetx.com
                    </span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <Phone className="h-6 w-6 text-[#6C696A]" />
                    <span className="font-poppins text-sm font-medium text-[#6C696A]">
                      +91 98735 81566
                    </span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="flex flex-col gap-[5px]">
                <h3 className="font-poppins text-xl font-medium leading-8 text-[#0F0D0D]">
                  Follow Us
                </h3>
                <div className="flex gap-[15px]">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-full bg-[#F2E6FF] p-[10px] hover:bg-[#F2E6FF]/90"
                  >
                    <Linkedin className="h-6 w-6 text-[#7B00FF]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-full bg-[#F2E6FF] p-[10px] hover:bg-[#F2E6FF]/90"
                  >
                    <Instagram className="h-6 w-6 text-[#7B00FF]" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

