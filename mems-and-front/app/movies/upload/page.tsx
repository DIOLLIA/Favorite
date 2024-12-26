'use client'
//todo review this draft form (if needed make default in separate file

import {useState} from 'react';
import '@/app/css/movies.css'
import RedirectButton from "@/app/ui/movies/RedirectButton";

export default function UploadMovieForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imagePath, setImagePath] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagePath) {
            setMessage('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imagePath);
        formData.append('tags', tags);

        try {
            const response = await fetch('http://localhost:8081/movies/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Для передачи авторизационных данных //todo check with SS
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
                <label htmlFor="imagePath">Image path</label>
                <input
                    id="imagePath"
                    type="text"
                    onChange={(e) => setImagePath(e.target.value)}
                    required
                />
                <label htmlFor="tags">Tags</label>
                <input
                    id="tags"
                    type="text"
                    onChange={(e) => setTags(e.target.value)}
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}