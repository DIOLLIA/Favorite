'use client'

import {useState} from 'react';
import '@/app/css/bands.css'
import RedirectButton from "@/app/ui/movies/RedirectButton";

enum Lang {
    EN = 'en',
    RU = 'ru'
}

export default function UploadBandDescription() {
    const [bandName, setBandName] = useState('');
    const [description, setDescription] = useState('');
    const [lang, setLang] = useState<Lang>(Lang.EN)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bandName', bandName);

        if (lang == Lang.EN) {
            formData.append('bandDescription[EN]', description)
            formData.append('bandDescription[RU]', "")
        } else {
            formData.append('bandDescription[RU]', description)
            formData.append('bandDescription[EN]', "")


        }

        try {
            const response = await fetch('/api/music/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setMessage('Band description created successfully');
            } else {
                setMessage('Failed to add band description');
            }
        } catch (err) {
            console.error('Error during creating band description:', err);
            setMessage('An error occurred during creating band description');
        }
    };

    return (
        <div>
            <RedirectButton/>
            <form onSubmit={handleSubmit} className="upload-form">
                <h1>Upload band description</h1>
                {message && <p>{message}</p>}
                <label htmlFor="bandName">Title</label>
                <input
                    id="title"
                    type="text"
                    value={bandName}
                    onChange={(e) => setBandName(e.target.value)}
                    required
                />
                <div className="radio-group">
                    <label>Language:</label>
                    <label>
                        <input
                            type="radio"
                            name="lang"
                            value={Lang.EN}
                            checked={lang === Lang.EN}
                            onChange={() => setLang(Lang.EN)}
                        />
                        EN
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="lang"
                            value={Lang.RU}
                            checked={lang === Lang.RU}
                            onChange={() => setLang(Lang.RU)}
                        />
                        RU
                    </label>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}