'use client' //Указываем, что этот компонент работает на клиенте (для отправки запроса)
import { FormEvent, useState } from "react";

export function UploadForm() {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [image, setImage] = useState<File | null>(null);
   const [message, setMessage] = useState("");

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!image) {
         setMessage("Please provide an image to upload.");
         return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      try {
         const res = await fetch("/mems/upload", {
            method: "POST",
            body: formData,
         });

         const result = await res.json();
         setMessage(result.message || "Upload failed");
      } catch (error) {
         console.error("Error uploading image:", error);
         setMessage("Error uploading image.");
      }
   };
   return {
      name,
      setName,
      description,
      setDescription,
      setImage,
      message,
      handleSubmit
   }
}