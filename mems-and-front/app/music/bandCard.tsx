import {useEffect, useState} from "react";
import {Band} from "@/app/music/Bands";
import EditIcon from "./EditIcon";


interface BandCardProps {
    band: Band;
    name: string
    onSave: (name: string, description: string) => void;
}

export default function BandCard({band, name, onSave}: BandCardProps) {
    const [editing, setEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(band.description);

    const imageUrl = `http://localhost:8089${band.imagePath}`;

    const handleSave = () => {
        onSave(name, editedDescription);
        setEditing(false);
    };

    useEffect(() => {
        if (editing) {
            setEditedDescription(band.description);
        }
    }, [editing, band.description]);

    const handleCancel = () => {
        setEditedDescription(band.description);
        setEditing(false);
    };

    return (
        <div className="band-card">
            <img src={imageUrl} alt={band.bandName} />
            <h3>{band.bandName}</h3>

            {editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            resize: 'vertical',
                            minHeight: '60px',
                        }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: '#e0e0e0',
                                color: 'black',
                                border: '1px solid #aaa',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            save
                        </button>
                        <button
                            onClick={handleCancel}
                            style={{
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                border: '1px solid #ccc',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p>{band.description}</p>
                    <EditIcon onClick={() => setEditing(true)} />
                </div>
            )}
        </div>
    );
}
