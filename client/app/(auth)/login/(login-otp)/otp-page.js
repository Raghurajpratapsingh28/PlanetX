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
      router.push("/");
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-6">
        {/* Illustration */}
        <div className="flex justify-center">
          <Image
            src="/otp-page-image.png"
            alt="OTP Verification Illustration"
            width={120}
            height={120}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            OTP Verification
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            We&apos;ve sent a verification code to {mobileNumber}
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2 sm:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-md text-center text-lg sm:text-xl font-medium border ${
                digit
                  ? "border-purple-500 text-purple-500"
                  : "border-gray-300 text-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
              maxLength={1}
              aria-label={`Digit ${index + 1} of OTP`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm sm:text-base text-center">
            {error}
          </p>
        )}

        {/* Verify Button */}
        <Button
          onClick={verifyOTP}
          disabled={loading}
          className="w-full py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        {/* Timer and Resend */}
        <div className="space-y-2 text-center">
          <div className="flex justify-center items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">
              Code expires in
            </span>
            <span className="text-xs sm:text-sm text-red-500">
              {timeLeft}s
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <span className="text-xs sm:text-sm text-gray-600">
              Didn&apos;t receive the OTP?
            </span>
            <button
              onClick={resendOTP}
              className={`text-xs sm:text-sm font-medium ${
                isExpired
                  ? "text-purple-600 hover:text-purple-700"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={!isExpired}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};