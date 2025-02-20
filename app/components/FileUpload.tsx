"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void
  fileType?: "image" | "video"
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onError = (err: { message: string }) => {
    console.log("Error", err)
    setError(err.message)
    setUploading(false)
  }

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res)
    setUploading(false)
    setError(null)
    onSuccess(res)
  }

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const progressPercentage = (evt.loaded / evt.total) * 100
      onProgress(Math.round(progressPercentage))
    }
  }

  const handleStartUpload = () => {
    setUploading(true)
    setError(null)
  }

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file")
        return false
      }

      if (file.size > 100 * 1024 * 1024) {
        setError("File size should be less than 100MB")
        return false
      }
      return true
    } else {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
      if (!validImageTypes.includes(file.type)) {
        setError("Please upload an image file")
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB")
        return false
      }
      return true
    }
  }

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "sample-video" : "sample-image"}
        folder={fileType === "video" ? "/videos" : "/images"}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
      />
      {uploading && (
        <div className="flex items-center space-x-2 text-sm">
          <Loader2 className="animate-spin size-7" />
          <span>Uploading...</span>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload;