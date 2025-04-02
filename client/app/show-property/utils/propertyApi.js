import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";

const fetchPropertyData = async (token) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/availableProperty`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const propertyData = response.data;
    console.log(propertyData);
  } catch (error) {
    console.error("Error fetching property data:", error);
  }
};
