/*

This change the type of db image entity from storing string to store buffered data

import mongoose from 'mongoose';
import { MemModel } from './models/memModel';

async function migrateImages() {
    try {
        await mongoose.connect('mongodb://mem_user:mem_secret@localhost:27017/mem_db');
        console.log("Connected to MongoDB for migration");

        const mems = await MemModel.find({});

        for (const mem of mems) {
            if (typeof mem.image === 'string') {

                mem.image = {
                    data: Buffer.from(mem.image, 'base64'),
                    contentType: 'image/jpeg'
                };
                await mem.save();
                console.log(`Updated mem with id: ${mem._id}`);
            }
        }

        console.log("Migration complete");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

migrateImages();
*/
