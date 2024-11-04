import mongoose, {Document, Schema} from 'mongoose'

export interface MemCard extends Document {
    //id: number; //is it realy needed
    name: string;
    image: string;
    description: string;
}

const memSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

// eslint-disable-next-line no-var
export var MemModel = mongoose.models.mems_ || mongoose.model<MemCard>("mems_", memSchema);
