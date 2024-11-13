import mongoose, {Document, Schema} from 'mongoose'

export interface MemCard extends Document {
    //id: number; //is it realy needed
    name: string;
    image: {
        data: Buffer;
        contentType: string;
    };
    description: string;
}

export const memSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String,
    },
    description: { type: String, required: true },
});


export const MemModel = mongoose.models.mems_ || mongoose.model<MemCard>("mems_", memSchema);
