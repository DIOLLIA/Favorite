'use client'
import {FormEvent, useState} from "react";

export function UploadForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors([])
        if (!image) {
            setMessage("Please provide an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const res = await fetch("/mems/upload/api", {
                method: "POST",
                body: formData,
            });
            const result = await res.json();

            if (!res.ok) {
                setErrors(result.error.map((err: { message: string }) => err.message) || ["Upload failed"])
            } else {
                setMessage(result.message || "Upload successful");
                setErrors([]);
            }
            // setMessage(result.message || "Upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            setMessage("Error uploading image.");
            setErrors(["Error uploading image."]); // see what to delete here
        }
    };
    return (
        <form onSubmit={handleSubmit} className="image-form">
            <div className="image-form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="image-form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="image-form-group">
                <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    required
                />
            </div>
            <button type="submit" className="image-form-button">Submit</button>
            {message && <p>{message}</p>}
            {errors.length > 0 && (
                <div id="status-error">
                    {errors.map((error, index) => (
                        <p key={index} className="error-text">
                            {error}
                        </p>
                    ))}
                </div>
            )}
        </form>
    )
}