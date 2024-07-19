"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

function UploadFile() {
  const [message, setMessage] = useState("Loading");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/upload");
        console.log("FETCHED DATA", response.data);
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>{message}</div>;
}

export default UploadFile;