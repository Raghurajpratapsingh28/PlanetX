"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BACKEND_URL from "@/lib/BACKEND_URL";
import useLocalStorage from "@/hooks/localStorage";
import { useRouter } from "next/navigation";

export const OTPVerification = ({ mobileNumber }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isExpired, setIsExpired] = useState(false);
  const [value, setValue] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      console.log(enteredOtp, mobileNumber);
      const response = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: "+91" + mobileNumber, otp: enteredOtp }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }
  
      console.log("Login successful:", data);
  
      
      setValue(data.accessToken);
      setRefreshToken(data.refreshedToken);
  
      
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "An error occurred while verifying OTP");
    } finally {
      setLoading(false);
    }
  };
  
  
  const resendOTP = async () => {
    setTimeLeft(60);
    setIsExpired(false);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: "+91" + mobileNumber }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      console.log("OTP resent successfully");
    } catch (err) {
      setError(err.message || "An error occurred while resending OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="max-w-[450px] flex flex-col items-center gap-6">
        {/* Illustration */}
        <div className="relative mt-16 pt-6">
          <Image
            src="/otp-page-image.png"
            alt="OTP Verification Illustration"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        <div className="space-y-4 flex-grow flex flex-col justify-between">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-[28px] font-semibold leading-[44px] text-[#0F0D0D]">
              OTP verification
            </h1>
            <p className="text-base text-[#6C696A] px-4">
              We've sent a Verification Code to {mobileNumber}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-[18px]">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-[58px] h-[58px] bg-[#F5F5F5] rounded-lg text-center text-[22px] font-medium
                  ${
                    digit
                      ? "border border-[#7B00FF] text-[#7B00FF]"
                      : "border border-[#E1E1E1]"
                  }
                  focus:outline-none focus:border-[#7B00FF] focus:ring-1 focus:ring-[#7B00FF]`}
                maxLength={1}
                aria-label={`Digit ${index + 1} of OTP`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Verify Button */}
          <Button
            onClick={verifyOTP}
            disabled={loading}
            className="w-[450px] h-[50px] bg-[#7B00FF] hover:bg-[#7B00FF]/90 rounded-[10px] text-base font-medium"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {/* Timer and Resend */}
          <div className="space-y-5">
            <div className="flex justify-center items-center gap-1">
              <span className="text-sm text-[#6C696A]">Code expires in</span>
              <span className="text-sm text-red-500">{timeLeft}s</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="text-sm text-[#6C696A]">
                Didn't receive the OTP?
              </span>
              <button
                onClick={resendOTP}
                className="text-sm text-[#7B00FF] hover:text-[#7B00FF]/90 font-medium"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
