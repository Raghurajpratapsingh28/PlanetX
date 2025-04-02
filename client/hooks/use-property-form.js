"use client"

import { useState } from "react"

const initialState = {
  propertyTitle: "",
  location: "",
  state: "",
  locality: "",
  subLocality: "",
  apartment: "",
  houseNo: "",
  bedrooms: "1",
  bathrooms: "1",
  balconies: "1",
  carpetArea: {
    value: "",
    unit: "sqft",
  },
  builtUpArea: {
    value: "",
    unit: "sqft",
  },
  otherRooms: ["Pooja Room"],
  furnishingStatus: "Unfurnished",
  totalFloors: "",
  propertyOnFloor: "",
  coveredParking: 0,
  openParking: 0,
  availabilityStatus: "Ready to move",
  buildingType: "Resale",
  reraStatus: "RERA-Registered",
  availableFrom: "",
  propertyAge: "",
  description: "",
}

export function usePropertyForm(onSubmit) {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.propertyTitle) {
      newErrors.propertyTitle = "Property title is required"
    }
    if (!formData.location) {
      newErrors.location = "Location is required"
    }
    if (!formData.state) {
      newErrors.state = "State is required"
    }
    if (!formData.locality) {
      newErrors.locality = "Locality is required"
    }
    if (!formData.apartment) {
      newErrors.apartment = "Apartment is required"
    }
    if (!formData.carpetArea.value) {
      newErrors.carpetArea = "Carpet area is required"
    }
    if (!formData.description) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    setIsSubmitting(true)

    if (validateForm()) {
      try {
        await onSubmit?.(formData)
        // Optional: Reset form after successful submission
        // setFormData(initialState)
      } catch (error) {
        console.error("Form submission error:", error)
        setErrors({ submit: "Failed to submit form. Please try again." })
      }
    }

    setIsSubmitting(false)
  }

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const resetForm = () => {
    setFormData(initialState)
    setErrors({})
  }

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm,
  }
}
