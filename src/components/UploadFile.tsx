"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Spotlight } from "@/components/ui/Spotlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

function UploadFile() {
  const [selectedOption, setSelectedOption] = useState<"file" | "text">("file");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      if (selectedOption === "file" && file) {
        formData.append("file", file);
        console.log("Selected file:", file); // Log the file
      }
      if (selectedOption === "text") {
        formData.append("text", text);
        console.log("Entered text:", text); // Log the text
      }

      const response = await axiosInstance.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPLOAD RESPONSE", response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setUploading(false);
      setText("");
    }
  };

  return (
    <>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="h-auto md:h-screen w-3/6 rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
        <div className="p-20 relative z-10 w-full text-center border border-neutral-500 rounded-md">
          <div className="flex items-center justify-center mb-10">
            <button
              onClick={() => setSelectedOption("file")}
              className={`px-4 py-2 rounded-md mr-6 ${
                selectedOption === "file"
                  ? "relative block text-black dark:text-white dark:bg-zinc-800 "
                  : "relative block text-black dark:text-white"
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setSelectedOption("text")}
              className={`px-4 py-2 rounded-md ${
                selectedOption === "text"
                  ? "relative block text-black dark:text-white dark:bg-zinc-800 "
                  : "relative block text-black dark:text-white"
              }`}
            >
              Paste Text
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            {selectedOption === "file" ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                className={`mb-8 p-2 border text-black border-neutral-300 rounded-md w-full max-w-md h-32 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out ${
                  isDragging ? "bg-gray-200 border-dashed" : ""
                }`}
              >
                {file ? (
                  <p>{file.name}</p>
                ) : (
                  <p>Drag & Drop your file here or click to upload</p>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text here"
                rows={4}
                className="mb-8 p-2 border border-neutral-300 rounded-md w-full outline-none max-w-md h-32 text-black bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
              />
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={uploading}
              className={`relative flex items-center space-x-2 px-6 py-2 transition-colors duration-300 ease-in-out ${
                uploading ? "cursor-wait opacity-50" : ""
              }`}
              style={{ border: "none", background: "none" }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="span"
                className="flex items-center space-x-2 text-sm"
              >
                <span>
                  {uploading
                    ? "Submitting..."
                    : selectedOption === "file"
                    ? "Submit File"
                    : "Submit Text"}
                </span>
              </HoverBorderGradient>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadFile;
