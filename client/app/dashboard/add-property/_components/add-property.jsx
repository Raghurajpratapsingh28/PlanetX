"use client";

import * as React from "react";
import { BasicInformation } from "./basic-information";
import { StepsSection } from "./steps";
import { Button } from "@/components/ui/button";
import { PropertyDetailsForm } from "./add-property-details";
import { PropertyUpload } from "@/app/dashboard/add-property/_components/property-upload";
import AmenitiesDetails from "./amenities-details";
import AddPrice from "./add-price";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitPropertyDialog from "./dialogSubmitProperty";
import LoadingScreen from "./loader";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { number: 1, title: "Basic Information" },
  { number: 2, title: "Property Details" },
  { number: 3, title: "Photos & Video" },
  { number: 4, title: "Amenities" },
  { number: 5, title: "Add Price" },
];

export function AddPropertyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [propertyData, setPropertyData] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [files, setFiles] = React.useState({ images: [], video: null });
  const [lookingFor, setLookingFor] = React.useState(
    searchParams.get("lookingFor") || "Buyer"
  );
  const [propertyKind, setPropertyKind] = React.useState(
    searchParams.get("propertyKind") || "Residential"
  );
  const [propertyType, setPropertyType] = React.useState(
    searchParams.get("propertyType") || "For Sale"
  );
  const { toast } = useToast();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("lookingFor", lookingFor);
    params.set("propertyKind", propertyKind);
    params.set("propertyType", propertyType);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [lookingFor, propertyKind, propertyType]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
  
    if (Object.keys(propertyData).length === 0) {
      toast({
        title: "Error",
        description: "Property data is missing",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
  
    propertyData.role = lookingFor;
    formData.append("propertyData", JSON.stringify(propertyData));
  
    if (files.images.length > 0) {
      files.images.forEach((image) => {
        formData.append("images", image);
      });
    }
  
    if (files.video) {
      formData.append("video", files.video);
    }
  
    let token = localStorage.getItem("accessToken");
    if (!token) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    token = token.replace(/^"|"$/g, "");
  
    console.log("Submitting property with data:", propertyData);
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/properties/add`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
    console.log(response.data);

      toast({
        title: "Success",
        description: "Property added successfully!",
        variant: "default",
      });
  
      setIsSubmitting(false);
      setCurrentStep(1);
    } catch (error) {
      console.error("Full error:", error);
  
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("No response received. Request details:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
  
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <StepsSection steps={steps} currentStep={currentStep} />
      <div className="flex-1 space-y-8">
        <div>
          {isSubmitting && <LoadingScreen />}
          {currentStep === 1 && (
            <BasicInformation
              lookingFor={lookingFor}
              setLookingFor={setLookingFor}
              propertyKind={propertyKind}
              setPropertyKind={setPropertyKind}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />
          )}
          {currentStep === 2 && (
            <PropertyDetailsForm
              propertyData={propertyData}
              setPropertyData={setPropertyData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 3 && (
            <div className="max-w-[835px] max-h-[14475px]">
              <PropertyUpload
                files={files}
                setFiles={setFiles}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          )}
          {currentStep === 4 && (
            <AmenitiesDetails
              propertyData={propertyData}
              setCurrentStep={setCurrentStep}
              setPropertyData={setPropertyData}
            />
          )}

          {currentStep === 5 && (
            <AddPrice
              propertyData={propertyData}
              setPropertyData={setPropertyData}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            {currentStep} of {steps.length} steps
          </div>
          {currentStep === 6 ? (
            <SubmitPropertyDialog
              handleSubmit={handleSubmit}
              currentStep={currentStep}
            />
          ) : (
            <Button
              onClick={(event) => {
                setCurrentStep((prev) => Math.min(prev + 1, 5));
              }}
              className="bg-[#7B00FF] text-primary-foreground"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
