'use client'
//todo review this draft form (if needed make default in separate file

import { useState } from 'react';
import '@/app/css/movies.css'
import RedirectButton from "@/app/ui/movies/RedirectButton";
export default function UploadMovieForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setMessage('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8081/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Для передачи авторизационных данных
            });

            if (response.ok) {
                setMessage('Movie uploaded successfully');
            } else {
                setMessage('Failed to upload movie');
            }
        } catch (err) {
            console.error('Error during upload:', err);
            setMessage('An error occurred during upload');
        }
    };

    return (
        <div>
            <RedirectButton/>
        <form onSubmit={handleSubmit} className="upload-form">
            <h1>Upload Movie</h1>
            {message && <p>{message}</p>}
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <label htmlFor="image">Image</label>
            <input
                id="image"
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                required
            />
            <button type="submit">Upload</button>
        </form>
        </div>
    );
}