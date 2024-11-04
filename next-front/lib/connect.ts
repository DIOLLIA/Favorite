import mongoose from "mongoose";
//TODO change the connection

// const MONGODB_URI: string = "localhost:27017/mem_db"
const MONGODB_URI: string = "mongodb://mem_user:mem_secret@localhost:27017?authSource=mem_db"

// const user: string = "mem_user"
// const pwd: string = "mem_secret"
const dbName: string = "mem_db"


// export const mongoClient = mongoose.connect(MONGODB_URI, {user: user, pass: pwd, dbName: dbName})
export const mongoClient = mongoose.connect(MONGODB_URI,{dbName: dbName})
