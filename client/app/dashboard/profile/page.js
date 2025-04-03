"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import BACKEND_URL from "@/lib/BACKEND_URL";

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const ProfilePage = () => {

  useEffect(()=>{
    const token = localStorage.getItem("accessToken")
    if(!token){
      window.location.href="/login"
    }
  },[])

  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(0);
  
  const [userDetails, setUserDetails] = useState({
    name: "", email: "", mobile: "", numberOfProperty: "0",
    whatsappMobile: "", state: "", role: "", city: ""
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
      if (!token) return console.error("No token found");

      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/get-user`, {
          headers: { Authorization: token }
        });
        const userData = response.data.user;

        setUserDetails({
          name: userData.name || "", email: userData.email || "",
          mobile: userData.mobile || "", numberOfProperty: userData.properties?.length || "0",
          whatsappMobile: userData.whatsappMobile || "", state: userData.state || "",
          role: userData.role || "", city: userData.city || ""
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching user details",
          description: "Please try again.",
          action: <ToastAction altText="Try again" onClick={() => setRetry(retry + 1)}>Retry</ToastAction>
        });
        console.error("Error fetching user details:", error);
      }
      setIsLoading(false);
    };

    fetchUserDetails();
  }, [retry, toast]);

  const handleChange = (e) => {
    setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) return toast({ title: "Authorization error", description: "Please login again." });

    try {
      await axios.patch(`${BACKEND_URL}/auth/update-user`, userDetails, {
        headers: { Authorization: token }
      });
      toast({ title: "Profile updated successfully" });
      setIsEditing(false);
    } catch (error) {
      toast({ title: "Update failed", description: error.message });
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) {
      toast({ title: "Authorization error", description: "Please login again." });
      return;
    }
  
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
        headers: { Authorization: token }
      });
      localStorage.removeItem("accessToken");
      toast({ title: "Logged out successfully" });
      window.location.href = "/login";
    } catch (error) {
      toast({ title: "Logout error", description: error.response?.data?.message || "An error occurred." });
      console.error("Error logging out:", error);
    }
  };
  

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible!")) return;

    const token = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    if (!token) return toast({ title: "Authorization error", description: "Please login again." });

    try {
      await axios.delete(`${BACKEND_URL}/auth/delete-user`, { headers: { Authorization: token } });
      localStorage.removeItem("accessToken");
      toast({ title: "Account deleted successfully" });
      window.location.href = "/signup";
    } catch (error) {
      toast({ title: "Deletion failed", description: error.message });
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="p-4 w-[80vw] flex flex-col gap-4 h-[100vh]">
      <h2 className="font-semibold text-lg">Profile</h2>

      <div className="bg-white p-4 flex justify-between items-center rounded-xl">
        <div className="flex items-center gap-6">
          <Avatar className="h-[70px] w-[70px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Hello, {isLoading ? <Skeleton className="h-[20px] w-[100px]" /> : userDetails.name}
            </h3>
            <span className="text-gray-600">
              {isLoading ? <Skeleton className="h-[20px] w-[100px]" /> : userDetails.mobile}
            </span>
          </div>
        </div>
        <Button className="bg-[#7B00FF] w-[150px]" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "Save" : "Edit Profile"}
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl">
        <h2 className="font-semibold mb-2 text-lg">User Details</h2>
        <div className="flex flex-wrap">
          {Object.entries(userDetails).map(([key, value]) => (
            <div key={key} className="w-[50%] mb-2">
              <h1 className="text-[#6C696A] capitalize">{key.replace(/([A-Z])/g, " $1")}</h1>
              {isEditing ? (
                key === "state" || key === "role" ? (
                  <select name={key} value={value} onChange={handleChange} className="border rounded-md p-1 w-[90%] mt-2 h-[40px]">
                    <option value="">{`Select ${key}`}</option>
                    {key === "state" ? statesOfIndia.map(state => <option key={state} value={state}>{state}</option>)
                      : ["buyer", "seller"].map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                ) : (
                  <Input type="text" name={key} value={value} onChange={handleChange} className="border rounded-md p-1 w-[90%] mt-2 h-[40px]" />
                )
              ) : <p>{value || "-"}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Button className="bg-red-600 text-white" onClick={handleLogout}>Logout</Button>
        <Button className="bg-black text-white" onClick={handleDelete}>Delete Account</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
