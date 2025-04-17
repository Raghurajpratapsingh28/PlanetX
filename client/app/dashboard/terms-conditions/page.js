import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Privacy from "./_components/privacy";

const TermsandConditionPage = () => {
  return (
    <div className="p-6 space-y-6 w-[70vw]">
      <h1 className="text-2xl font-semibold text-left ml-6">Terms & Conditions</h1>
      <p className="text-[#6C696A] ml-6">Last Updated: January 1, 2025</p>
      <div className="p-5 bg-white rounded-xl border flex flex-col gap-5 shadow-xl">
        {/* 01. Use of Services */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">01. Use of Services</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>You can use our app regardless of your age.</p>
              <hr className="my-2" />
              <p>You agree to provide accurate and complete information when creating an account.</p>
              <hr className="my-2" />
              <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
            </div>
          </CardContent>
        </Card>

        {/* 02. User-Generated Content */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">02. User-Generated Content</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>By uploading images, videos, or other content, you grant PlanetX a non-exclusive, worldwide, royalty-free license to use, modify, and distribute such content for marketing, promotional, and business purposes.</p>
              <hr className="my-2" />
              <p>You must have the necessary rights to upload content and ensure it does not violate any laws or third-party rights.</p>
            </div>
          </CardContent>
        </Card>

        {/* 03. Marketing and Promotions */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">03. Marketing and Promotions</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>By using our services, you consent to receive promotional emails, messages, and advertisements related to our services and offerings.</p>
              <hr className="my-2" />
              <p>You may opt out of marketing communications at any time through account settings or by contacting us.</p>
            </div>
          </CardContent>
        </Card>

        {/* 04. Prohibited Activities */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">04. Prohibited Activities</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>Misuse of our platform, including fraudulent activities, spamming, and violating intellectual property rights, is strictly prohibited.</p>
              <hr className="my-2" />
              <p>Any unlawful use of our platform may result in termination of your account.</p>
            </div>
          </CardContent>
        </Card>

        {/* 05. Payments and Transactions */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">05. Payments and Transactions</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>Transactions on PlanetX must comply with applicable financial and legal regulations.</p>
              <hr className="my-2" />
              <p>Refund policies, if applicable, will be detailed separately in our Refund Policy.</p>
            </div>
          </CardContent>
        </Card>

        {/* 06. Compliance with Laws */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">06. Compliance with Laws</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>PlanetX adheres to applicable laws, including data protection regulations (GDPR, CCPA, etc.), App Store, and Play Store policies.</p>
              <hr className="my-2" />
              <p>Users must comply with all relevant laws while using the platform.</p>
            </div>
          </CardContent>
        </Card>

        {/* 07. Termination of Services */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">07. Termination of Services</h2>
            <p className="text-[#6C696A]">We reserve the right to suspend or terminate accounts that violate our terms or engage in prohibited activities.</p>
          </CardContent>
        </Card>

        {/* 08. Liability and Disclaimers */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">08. Liability and Disclaimers</h2>
            <p className="text-[#6C696A]">We do not guarantee uninterrupted service and are not responsible for any losses due to service interruptions or security breaches.</p>
          </CardContent>
        </Card>

        {/* 09. Changes to Terms */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">09. Changes to Terms</h2>
            <p className="text-[#6C696A]">We may update these terms periodically, and continued use of PlanetX constitutes acceptance of the revised terms.</p>
          </CardContent>
        </Card>

        {/* 10. Contact Us */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p className="text-[#6C696A] mb-4">If you have questions or concerns, contact us at:</p>
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

        {/* 11. Privacy */}
        <Privacy />
      </div>
      <p className="text-[#6C696A] ml-6">
        By accessing or using PlanetX, you agree to be bound by these Terms and Conditions.
      </p>
    </div>
  );
};

export default TermsandConditionPage;