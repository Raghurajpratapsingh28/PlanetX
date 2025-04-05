
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from 'lucide-react'

export const FAQSection = () => {
  const faqs = [
    {
      question: "How do I search for properties on this platform?",
      answer: "Use the search bar to filter by location, property type, price range, and other preferences."
    },
    {
      question: "How can I edit or update my property listing?",
      answer: "Log into your account, navigate to your listings, and click the edit button to update your property information."
    },
    {
      question: "How do I contact a property owner?",
      answer: "Click on the property listing and use the contact form or direct messaging system to reach out to the owner."
    },
    {
      question: "How do I contact a property owner?",
      answer: "You can message the property owner directly through our platform or use the provided contact information on the listing."
    },
    {
      question: "How do I contact a property owner?",
      answer: "Use our secure messaging system to communicate with property owners directly through the platform."
    },
    {
      question: "How do I contact a property owner?",
      answer: "Find the contact button on any property listing to send a message to the owner."
    },
    {
      question: "Can I list my property for free?",
      answer: "Yes, basic listings are free. Premium features are available for enhanced visibility."
    },
    {
      question: "How can I contact the hotel for special requests?",
      answer: "Special requests can be made directly through the messaging system or by contacting the hotel's front desk."
    }
  ]

  return (
    <div className="flex flex-col items-center px-4 md:px-[105px] py-8 md:py-12 max-w-[1240px] mx-auto bg-white">
      <div className="flex flex-col justify-center items-center mb-8 md:mb-[35px] gap-1.5">
        <h2 className="text-[32px] font-semibold leading-[50px] text-[#0F0D0D] text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg font-medium leading-7 text-[#6C696A] text-center">
          Have Questions? We&apos;ve Got Answers
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-[1030px]">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="mb-[30px] last:mb-0"
          >
            <AccordionTrigger className="flex justify-between items-center p-5 bg-white border border-[#E1E1E1] rounded-xl hover:no-underline [&[data-state=open]]:rounded-t-xl [&[data-state=open]]:rounded-b-none">
              <span className="text-xl font-medium text-[#0F0D0D] text-center flex-grow">
                {faq.question}
              </span>
              {/* <ChevronDown className="h-[35px] w-[35px] shrink-0 text-[#0F0D0D] transition-transform duration-200" /> */}
            </AccordionTrigger>
            <AccordionContent className="bg-[#F5F5F5] border-x border-b border-[#E1E1E1] rounded-b-xl">
              <div className="p-5">
                <p className="text-base font-medium leading-[26px] text-[#6C696A] text-center">
                  {faq.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

