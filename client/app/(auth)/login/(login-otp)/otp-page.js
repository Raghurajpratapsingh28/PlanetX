"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BACKEND_URL from "@/lib/BACKEND_URL";
import useLocalStorage from "@/hooks/localStorage";

export const OTPVerification = ({ mobileNumber }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isExpired, setIsExpired] = useState(false);
  const [value, setValue] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
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
      const response = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: "+91" + mobileNumber, otp: enteredOtp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Verification failed");
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
      if (!response.ok) throw new Error(data.message || "Failed to resend OTP");
    } catch (err) {
      setError(err.message || "An error occurred while resending OTP");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-[450px] flex flex-col items-center gap-4 sm:gap-6">
        {/* Illustration */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <Image
            src="/otp-page-image.png"
            alt="OTP Verification Illustration"
            width={120}
            height={120}
            className="mx-auto sm:w-[150px] sm:h-[150px]"
          />
        </div>

        {/* Content */}
        <div className="space-y-4 w-full">
          <div className="text-center space-y-1">
            <h1 className="text-xl sm:text-2xl lg:text-[28px] font-semibold leading-tight text-[#0F0D0D]">
              OTP Verification
            </h1>
            <p className="text-sm sm:text-base text-[#6C696A] px-2 sm:px-4">
              We've sent a Verification Code to {mobileNumber}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 sm:gap-4 lg:gap-[18px]">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] bg-[#F5F5F5] rounded-lg text-center text-lg sm:text-xl lg:text-[22px] font-medium border ${
                  digit ? "border-[#7B00FF] text-[#7B00FF]" : "border-[#E1E1E1]"
                } focus:outline-none focus:border-[#7B00FF] focus:ring-1 focus:ring-[#7B00FF]`}
                maxLength={1}
                aria-label={`Digit ${index + 1} of OTP`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>}

          {/* Verify Button */}
          <Button
            onClick={verifyOTP}
            disabled={loading}
            className="w-full h-11 sm:h-12 lg:h-[50px] bg-[#7B00FF] hover:bg-[#7B00FF]/90 rounded-[10px] text-sm sm:text-base font-medium"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {/* Timer and Resend */}
          <div className="space-y-3 sm:space-y-5">
            <div className="flex justify-center items-center gap-1">
              <span className="text-xs sm:text-sm text-[#6C696A]">Code expires in</span>
              <span className="text-xs sm:text-sm text-red-500">{timeLeft}s</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="text-xs sm:text-sm text-[#6C696A]">
                Didn't receive the OTP?
              </span>
              <button
                onClick={resendOTP}
                className="text-xs sm:text-sm text-[#7B00FF] hover:text-[#7B00FF]/90 font-medium"
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