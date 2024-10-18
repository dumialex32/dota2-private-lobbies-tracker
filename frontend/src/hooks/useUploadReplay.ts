import { UPLOAD_URL } from "../../constants";
import { useEffect, useRef, useState } from "react";
import axios, { isAxiosError } from "axios";

const useUploadReplay = () => {
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log(selectedFile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleUploadFileClick = () => {
    uploadFileRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleRemoveFileInput: () => void = () => {
    setSelectedFile(null);
    if (uploadFileRef.current) {
      uploadFileRef.current.value = "";
    }
  };

  const handleAddReplay = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("replay", selectedFile);

    try {
      setIsLoading(true);
      const { data } = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);
      setNotification({ type: "success", message: "Replay uploaded!" });
      handleRemoveFileInput();
    } catch (err: any) {
      console.error(err);
      handleRemoveFileInput();

      if (isAxiosError(err) && err.response?.data.message) {
        setNotification({ type: "error", message: err.response.data.message });
      } else {
        setNotification({ type: "error", message: "Upload failed" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadFileRef,
    selectedFile,
    isLoading,
    notification,
    handleRemoveFileInput,
    handleFileInputChange,
    handleUploadFileClick,
    handleAddReplay,
  };
};

export default useUploadReplay;
