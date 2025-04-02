"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
  const [retry, setRetry] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    numberOfProperty: "",
    whatsappMobile: "",
    state: "",
    role: "",
    city: "",
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage
          .getItem("accessToken")
          ?.replace(/^"|"$/g, "");
        if (!token) {
          console.error("No token found");
          return;
        }
        setIsLoadingUserDetails(true);
        const response = await axios.get(`${BACKEND_URL}/auth/get-user`, {
          headers: { Authorization: token },
        });
        const userData = response.data.user;
        setUserDetails({
          name: userData.name || "",
          email: userData.email || "",
          mobile: userData.mobile || "",
          numberOfProperty: userData.properties
            ? userData.properties.length
            : "0",
          whatsappMobile: userData.whatsappMobile || "",
          state: userData.state || "",
          role: userData.role || "",
          city: userData.city || "",
        });
        setIsLoadingUserDetails(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => setRetry(retry + 1)}
            >
              Try again
            </ToastAction>
          ),
        });
        setIsLoadingUserDetails(false);
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [retry, toast]);
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken").replace(/^"|"$/g, "");
      const data = await axios.patch(
        `http://localhost:5000/api/auth/update-user`,
        userDetails,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast({ title: "Property Update successfully" });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error updating user",
        description: error.message,
      });
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-4 w-[80vw] flex flex-col gap-4 h-[100vh]">
      <h2 className="font-semibold text-lg">Profile</h2>
      <div className="bg-white p-4 flex justify-between items-center rounded-xl">
        <div className="flex justify-center items-center gap-6">
          <Avatar className="h-[70px] w-[70px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Hello,{" "}
              {isLoadingUserDetails ? (
                <Skeleton className="h-[20px] w-[100px]"></Skeleton>
              ) : (
                userDetails.name
              )}
            </h3>
            <span className="text-gray-600">
              {isLoadingUserDetails ? (
                <Skeleton className="h-[20px] w-[100px]"></Skeleton>
              ) : (
                userDetails.mobile
              )}
            </span>
          </div>
        </div>

        <Button
          className="bg-[#7B00FF] w-[150px]"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </Button>
      </div>
      <div className="bg-white p-4 rounded-xl ">
        <h2 className="font-semibold mb-2 text-lg">User Details</h2>
        <div className="flex flex-wrap">
          {Object.entries(userDetails).map(([key, value]) => (
            <div key={key} className="w-[50%] mb-2">
              <h1 className="text-[#6C696A] capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h1>
              {isEditing ? (
                key === "state" ? (
                  <select
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded-md p-1 w-[90%] mt-2 h-[40px]"
                  >
                    <option value="">Select State</option>
                    {statesOfIndia.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                ) : key === "role" ? (
                  <select
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded-md p-1 w-[90%] mt-2 h-[40px]"
                  >
                    <option value="">Select Role</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                ) : key === "whatsappMobile" ? (
                  <div className="flex items-center gap-2 border rounded-md p-1 w-[90%] mt-2">
                    <span className="ml-2 flex gap-1 pr-3 border-r-[4px] border-gray-300">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        alt="India flag"
                        width={20}
                        height={10}
                        className="rounded"
                      />{" "}
                      +91
                    </span>
                    <Input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="border-none outline-none flex-1"
                      placeholder="Enter WhatsApp number"
                    />
                  </div>
                ) : key === "mobile" ? (
                  <div className="flex items-center gap-2  rounded-md p-1 w-[90%] mt-2">
                    <span className="ml-2 flex gap-1 pr-3 border-r-[4px] border-gray-300">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        alt="India flag"
                        width={20}
                        height={10}
                        className="rounded"
                      />{" "}
                      +91
                    </span>
                    <p>{userDetails.mobile.replace("+91", "")}</p>
                  </div>
                ) : key === "numberOfProperty" ? (
                  <div className="flex items-center gap-2  rounded-md p-1 w-[90%] mt-2">
                    <p>{userDetails.numberOfProperty}</p>
                  </div>
                ) : (
                  <Input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded-md p-1 w-[90%] mt-2 h-[40px]"
                    placeholder={`Enter ${key.toLowerCase()}`}
                  />
                )
              ) : (
                <p>{value || "-"}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
