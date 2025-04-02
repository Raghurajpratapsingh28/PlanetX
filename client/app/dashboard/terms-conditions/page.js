import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Privacy from "./_components/privacy";

const TermsandConditionPage = () => {
  return (
    <div className="p-6 space-y-6 w-[70vw]">
      <h1 className="text-2xl font-semibold text-left ml-6">
        Terms & Conditions
      </h1>
      <div className="p-5 bg-white rounded-xl border flex flex-col gap-5 shadow-xl">
        {/* 01. Introduction */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">01. Introduction</h2>
            <p className="text-[#6C696A]">
              [Planet X] is a platform that facilitates property rentals by
              connecting property owners (“Owners”) with potential renters
              (“Renters”).
            </p>
          </CardContent>
        </Card>

        {/* 02. Eligibility */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">02. Eligibility</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>To use [Planet X], you must:</p>
              <p className="font-semibold">Be at least 13 years old.</p>
              <hr />
              <p className="font-semibold ">
                Provide accurate and up-to-date information.
              </p>
              <hr />
              <p className="font-semibold ">
                Comply with applicable laws and regulations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 03. User Responsibilities */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              03. User Responsibilities
            </h2>
            <div className="text-[#6C696A] space-y-3">
              <p>You agree to:</p>
              <p className="font-semibold">
                Use the platform for lawful purposes only.
              </p>
              <hr />
              <p className="font-semibold ">
                Ensure all information provided, including property details, is
                accurate.
              </p>
              <hr />
              <p className="font-semibold ">
                Not engage in fraud, harassment, or misuse of the platform.
              </p>
              <hr />
              <p className="font-bold text-black">You understand that:</p>
              <p className="text-[#6C696A] font-semibold">
                Owners are responsible for ensuring properties meet legal
                standards.
              </p>
              <hr />
              <p className="text-[#6C696A] font-semibold">
                Renters must conduct due diligence before rental agreements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 04. Platform Role */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">04. Platform Role</h2>
            <div className="text-[#6C696A] space-y-3">
              <p>
                [Planet X] acts as a facilitator and is not a party to rental
                agreements. We are not responsible for:
              </p>
              <p className="font-semibold ">
                The accuracy of property listings.
              </p>
              <hr />
              <p className="font-semibold ">
                Disputes between Owners and Renters.
              </p>
              <hr />
              <p className="font-semibold ">
                The quality or condition of the properties.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 05. Property Listings */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              05. Property Listings
            </h2>
            <p className="text-[#6C696A] font-semibold">
              Owners must provide accurate property details, including
              descriptions, images, and pricing. Listings may be removed if they
              violate policies.
            </p>
            <hr className="my-3" />
            <p className="text-[#6C696A] font-semibold">
              Listings may be removed or modified at our discretion if found to
              violate these terms or applicable laws.
            </p>
          </CardContent>
        </Card>

        {/* 06. Payments */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">06. Payments</h2>
            <div className="text-[#6C696A] space-y-3 font-semibold">
              <p>Payments may be processed through third-party gateways.</p>
              <hr />
              <p>Users agree to the terms of the payment provider.</p>
              <hr />
              <p>
                We are not liable for disputes, chargebacks, or unauthorized
                transactions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 07. Cancellations and Refunds */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              07. Cancellations and Refunds
            </h2>
            <p className="text-[#6C696A]">
              Cancellations and refunds are subject to agreements between Owners
              and Renters. We recommend defining terms clearly before entering
              agreements.
            </p>
            <hr className="my-4" />
            <p className="text-[#6C696A]">
              We recommend both parties clearly define these terms before
              entering into agreements.
            </p>
          </CardContent>
        </Card>

        {/* 08. Prohibited Activities */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              08. Prohibited Activities
            </h2>
            <div className="text-[#6C696A] space-y-3">
              <p className="text-black font-bold">You agree not to:</p>
              <p className="font-semibold ">
                Post false or misleading property information.
              </p>
              <hr />
              <p className="font-semibold ">
                Promote unrelated services or activities.
              </p>
              <hr />
              <p className="font-semibold ">
                Violate intellectual property rights or laws.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 09. Intellectual Property */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              09. Intellectual Property
            </h2>
            <p className="text-[#6C696A]">
              All content on [Planet X], including text, graphics, logos, and
              software, is owned by or licensed to us and protected under
              copyright laws. You may not reproduce, distribute, or modify any
              content without prior written permission.
            </p>
          </CardContent>
        </Card>

        {/* 10. Limitation of Liability */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              10. Limitation of Liability
            </h2>
            <p className="text-[#6C696A]">[Planet X] is not responsible for:</p>
            <p className="text-[#6C696A] mt-2">
              Any loss, damage, or injury resulting from property rentals or
              platform use.
            </p>
            <hr className="my-3" />
            <p className="text-[#6C696A]">
              Disputes or legal claims arising from agreements between Owners
              and Renters.
            </p>
            <hr className="my-3" />
            <p className="text-[#6C696A]">
              Temporary or permanent platform unavailability.
            </p>
            <hr className="my-3" />
            <p className="text-[#6C696A]">
              Our total liability, if any, will not exceed the fees you paid to
              us in the past six months.
            </p>
          </CardContent>
        </Card>

        {/* 11. Termination */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">11. Termination</h2>
            <p className="text-[#6C696A]">
              We may suspend or terminate accounts for violations, misuse, or
              legal reasons.
            </p>
            <p className="text-[#6C696A] mt-3">Violations of these Terms.</p>
            <hr className="my-3" />
            <p className="text-[#6C696A]">Misuse of the platform.</p>
            <hr className="my-3" />
            <p className="text-[#6C696A]">As required by law.</p>
            <hr className="my-3" />
          </CardContent>
        </Card>

        {/* 12. Privacy */}
        <Privacy />

        {/* 13. Dispute Resolution */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              13. Dispute Resolution
            </h2>
            <p className="text-[#6C696A]">
              Any disputes arising from these Terms will be resolved through:
            </p>
            <h2 className="font-bold text-black mt-3 text-lg">Negotiation:</h2>
            <p className="text-[#6C696A]">
              Initial attempts to resolve disputes informally.
            </p>
            <hr className="my-3" />
            <h2 className="font-bold text-black text-lg">Arbitration:</h2>
            <p className="text-[#6C696A]">
              If negotiation fails, disputes will be settled under applicable
              arbitration laws in [Your Jurisdiction].
            </p>
          </CardContent>
        </Card>

        {/* 14. Governing Law */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">14. Governing Law</h2>
            <p className="text-[#6C696A]">
              These Terms are governed by and construed in accordance with the
              laws of [Your Jurisdiction].
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              15. Changes to the Terms
            </h2>
            <p className="text-[#6C696A]">
              We reserve the right to update or modify these Terms at any time.
              Continued use of the platform constitutes acceptance of the
              revised terms.
            </p>
          </CardContent>
        </Card>

        {/* 15. Contact Us */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">08. Contact Us</h2>
            <p className="text-[#6C696A] mb-4">
              If you have questions or concerns, contact us at:
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A] flex flex-col">
                <span className="font-semibold text-black">Email:</span> [Your
                Email Address]
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A] flex flex-col">
                <span className="font-semibold text-black">Address:</span> [Your
                Business Address]
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsandConditionPage;
