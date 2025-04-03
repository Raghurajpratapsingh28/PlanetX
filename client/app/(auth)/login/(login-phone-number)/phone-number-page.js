'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import BACKEND_URL from '@/lib/BACKEND_URL'

export const EnterPhoneNumber = ({ mobileNumber, setMobileNumber, setPhoneNumberSubmitted }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOTP = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: `+91${mobileNumber}` }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('OTP sent successfully.');
        setPhoneNumberSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-[450px] flex flex-col gap-4 sm:gap-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-semibold leading-tight text-[#0F0D0D]">
            Login
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium text-[#6C696A]">
            Login to continue using the app
          </p>
        </div>

        {/* Mobile Input */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-medium text-[#0F0D0D]">
            Mobile number
          </label>
          <div className="flex items-center bg-white border border-[#E1E1E1] rounded-lg h-12 sm:h-14 lg:h-[58px] px-3 sm:px-4">
            <div className="flex items-center gap-1 pr-2 sm:pr-4 border-r border-[#9E9E9E]">
              <Image
                src="/flag.png"
                alt="India flag"
                width={20}
                height={14}
                className="rounded sm:w-6 sm:h-4"
              />
              <span className="text-sm sm:text-base text-[#424242]">+91</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#0F0D0D]" />
            </div>
            <Input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter Mobile Number"
              className="border-0 focus-visible:ring-0 text-sm sm:text-base text-[#9E9E9E] h-full"
            />
          </div>
        </div>

        {/* Messages */}
        {errorMessage && <p className="text-red-500 text-xs sm:text-sm">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-xs sm:text-sm">{successMessage}</p>}

        {/* Send OTP Button */}
        <Button
          onClick={handleSendOTP}
          disabled={!/^\d{10}$/.test(mobileNumber)}
          className={`w-full h-11 sm:h-12 lg:h-[50px] rounded-[10px] text-sm sm:text-base font-medium ${
            /^\d{10}$/.test(mobileNumber) ? 'bg-[#7B00FF] hover:bg-[#7B00FF]/90' : 'bg-gray-300'
          }`}
        >
          Send OTP
        </Button>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs sm:text-sm text-[#6C696A] hover:text-[#7B00FF]">
            Back to <span className="text-[#7B00FF]">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};