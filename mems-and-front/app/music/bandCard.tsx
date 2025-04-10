import {useEffect, useState} from "react";
import {Band} from "@/app/music/Bands";
import EditIcon from "./EditIcon";


interface BandCardProps {
    band: Band;
    name: string
    onSave: (name: string, description: string) => void;
}

export default function BandCard({band, name, onSave, isExpanded, onToggleExpand}: BandCardProps & {
    isExpanded: boolean;
    onToggleExpand: () => void;
}) {
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
        <div
            className={`band-card ${isExpanded ? 'expanded' : ''}`}
            onClick={() => {
                if (!editing) {
                    onToggleExpand();
                }
            }}
            style={{ cursor: editing ? 'default' : 'pointer' }}
        >
            <img src={imageUrl} alt={band.bandName} />
            <h3>{band.bandName}</h3>

            {editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '0 10px 10px' }}>
                <textarea
                    className="band-description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                />
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="description-edit-action-button" onClick={(e) => {
                            e.stopPropagation();
                            handleSave();
                        }}>save</button>
                        <button className="description-edit-action-button" onClick={(e) => {
                            e.stopPropagation();
                            handleCancel();
                        }}>cancel</button>
                    </div>
                </div>
            ) : (
                <div
                    className="band-description-preview"
                >
                    <p>{band.description}</p>
                    <EditIcon onClick={(e) => {
                        e.stopPropagation();
                        setEditing(true);
                    }} />
                </div>
            )}
        </div>
    );
}