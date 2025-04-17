import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-left ml-8">Privacy Policy</h1>
      <p className="text-[#6C696A] ml-8">Last Updated: January 1, 2025</p>
      <div className="p-5 bg-white rounded-xl border flex flex-col gap-5 shadow-xl">
        {/* 1. Information We Collect */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">01. Information We Collect</h2>
            <p className="text-[#6C696A] mb-4">We may collect the following types of information:</p>
            <div className="flex flex-col gap-3">
              <p className="mt-2 flex flex-col text-[#6C696A]">
                <span className="font-semibold text-black">Personal Information:</span> Name, email, phone number, payment details.
              </p>
              <hr className="my-2" />
              <p className="mt-2 flex flex-col text-[#6C696A]">
                <span className="font-semibold text-black">Usage Data:</span> Interaction with the app, device information, IP address.
              </p>
              <hr className="my-2" />
              <p className="mt-2 flex flex-col text-[#6C696A]">
                <span className="font-semibold text-black">User-Generated Content:</span> Images, videos, and other uploaded content.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 2. How We Use Your Information */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">02. How We Use Your Information</h2>
            <p className="text-[#6C696A] mb-4">We use your information to:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">Provide and improve our services.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Personalize user experience and offer targeted promotions.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Communicate with users regarding updates, offers, and important notices.</p>
            </div>
          </CardContent>
        </Card>

        {/* 3. Marketing and Promotions */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">03. Marketing and Promotions</h2>
            <p className="text-[#6C696A] mb-4">We may use your data for marketing purposes, including:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">Promotional videos and images.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Sending promotional emails and messages, which you can opt out of at any time.</p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Data Sharing and Disclosure */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">04. Data Sharing and Disclosure</h2>
            <p className="text-[#6C696A] mb-4">Your data is handled as follows:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">We do not sell user data to third parties.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Data may be shared with trusted partners for service improvements, compliance, and marketing.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Legal disclosures may be made in compliance with government or law enforcement requests.</p>
            </div>
          </CardContent>
        </Card>

        {/* 5. Data Security */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">05. Data Security</h2>
            <p className="text-[#6C696A] mb-4">We prioritize the security of your data:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">We implement security measures to protect user data from unauthorized access and breaches.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Users are responsible for safeguarding their account credentials.</p>
            </div>
          </CardContent>
        </Card>

        {/* 6. User Rights */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">06. User Rights</h2>
            <p className="text-[#6C696A] mb-4">You have the following rights regarding your data:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">Access, update, or delete your personal information.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Request data deletion by contacting our support team.</p>
            </div>
          </CardContent>
        </Card>

        {/* 7. Children's Privacy */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">07. Children’s Privacy</h2>
            <p className="text-[#6C696A] mb-4">Our policy regarding children:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">PlanetX is available for users of all age groups.</p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Parents or guardians should supervise minors when using our services.</p>
            </div>
          </CardContent>
        </Card>

        {/* 8. Changes to the Privacy Policy */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">08. Changes to the Privacy Policy</h2>
            <p className="text-[#6C696A]">We may update our Privacy Policy periodically. Users will be notified of major changes.</p>
          </CardContent>
        </Card>

        {/* 9. Contact Us */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">09. Contact Us</h2>
            <p className="text-[#6C696A] mb-4">For any questions regarding this Privacy Policy or our privacy practices, please contact us at:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A] flex flex-col">
                <span className="font-semibold text-black">Email:</span> contact@planetx-live.com
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A] flex flex-col">
                <span className="font-semibold text-black">Customer Support:</span> +91 98735 81566
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <p className="text-[#6C696A] ml-8">
        By using PlanetX, you acknowledge that you have read and agree to these Terms and Conditions and Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;