import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-left ml-8">
        Privacy & Policy
      </h1>
      <div className="p-5 bg-white rounded-xl border flex flex-col gap-5 shadow-xl">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              01. Information We Collect
            </h2>
            <p className="text-[#6C696A] mb-4">
              We may collect the following types of information:
            </p>
            <div className="flex flex-col gap-3">
              <p className="mt-2 flex flex-col  text-[#6C696A]">
                <span className="font-semibold text-black">
                  Personal Information:
                </span>{" "}
                Name, email address, phone number, and any other details you
                share with us.
              </p>
              <hr className="my-2" />
              <p className="mt-2 flex flex-col text-[#6C696A]">
                <span className="font-semibold text-black">Usage Data:</span>{" "}
                Information on how you use our app, including device
                information, IP address, and activity logs.
              </p>
              <hr className="my-2" />
              <p className="mt-2 flex flex-col text-[#6C696A]">
                <span className="font-semibold text-black">
                  Customer-Provided Data:
                </span>{" "}
                Information you provide directly, such as feedback, preferences,
                and uploaded documents.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              02. How We Use Your Data
            </h2>
            <p className="text-[#6C696A] mb-4">
              We collect and process customer data for the following purposes:
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">
                To provide and improve our services.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">
                To personalize your experience on the app.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">
                To communicate updates, promotions, or customer support.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">
                To analyze trends and app performance.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">
                To comply with legal obligations or resolve disputes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">03. Data Sharing</h2>
            <p className="text-[#6C696A] mb-4">
              Your data is never sold or rented to third parties. However, we
              may share your data with:
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">
                <span className="font-semibold text-black">
                  Service Providers:
                </span>{" "}
                Third-party companies that assist us in app functionality.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">
                <span className="font-semibold text-black">
                  Legal Authorities:
                </span>{" "}
                If required by law or to protect the rights of users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">04. Data Security</h2>
            <p className="text-[#6C696A]">
              We use industry-standard encryption and security measures to
              protect your data. However, no method of internet transmission is
              completely secure.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">05. Your Rights</h2>
            <p className="text-[#6C696A] mb-4">You have the right to:</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#6C696A]">
                Access, update, or delete your personal data.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">
                Withdraw consent for data usage at any time.
              </p>
              <hr className="my-2" />
              <p className="text-[#6C696A]">Contact us for data concerns.</p>
            </div>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              06. Children&apos;s Privacy
            </h2>
            <p className="text-[#6C696A]">
              Our app is not intended for children under 13, and we do not
              knowingly collect their data.
            </p>
          </CardContent>
        </Card>

        {/* Updates to Policy */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              07. Updates to this Policy
            </h2>
            <p className="text-[#6C696A]">
              We may update this Privacy Policy periodically. Any changes will
              be notified via email or in-app.
            </p>
          </CardContent>
        </Card>

        {/* Contact Us */}
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

export default PrivacyPolicy;
