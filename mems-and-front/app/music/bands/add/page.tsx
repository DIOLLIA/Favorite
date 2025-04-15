'use client'

import {useState} from 'react';
import '@/app/css/movies.css'
import '@/app/css/music.css'
import RedirectButton from "@/app/ui/music/AddButton";

export default function UploadBandForm() {
    const [name, setName] = useState('');
    const [descriptionRu, setDescriptionRu] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [enableDescriptionRu, setEnableDescriptionRu] = useState(false);
    const [enableDescriptionEn, setEnableDescriptionEn] = useState(false);
    const [imageName, setImageName] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageName) {
            setMessage('Please provide an image name');
            return;
        }

        const description: { [key: string]: string } = {};
        description["EN"] = descriptionEn.trim();
        description["RU"] = descriptionRu.trim();

            const payload = {
                name: name.trim(),
                description,
                imagePath: imageName.trim(),
            };

        try {
            const response = await fetch('/api/music/bands/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage('Band uploaded successfully');
            } else {
                setMessage('Failed to upload band');
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
                <h1>Upload Band</h1>
                {message && <p>{message}</p>}

                <label htmlFor="title">Title</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div className="description-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={enableDescriptionRu}
                            onChange={() => setEnableDescriptionRu(!enableDescriptionRu)}
                        />
                        Description RU
                    </label>
                    {enableDescriptionRu && (
                        <textarea
                            className="description-textarea"
                            value={descriptionRu}
                            onChange={(e) => setDescriptionRu(e.target.value)}
                            placeholder="вводи по русски"
                            rows={4}
                        />
                    )}

                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={enableDescriptionEn}
                            onChange={() => setEnableDescriptionEn(!enableDescriptionEn)}
                        />
                        Description EN
                    </label>
                    {enableDescriptionEn && (
                        <textarea
                            className="description-textarea"
                            value={descriptionEn}
                            onChange={(e) => setDescriptionEn(e.target.value)}
                            placeholder="Enter description part 2"
                        />
                    )}
                </div>

                <label htmlFor="imageName">Image name</label>
                <input
                    id="imageName"
                    type="text"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    required
                />

                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
