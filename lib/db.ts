import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGO_URI!;

console.log(MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error("No MONGO_URI provided");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {

  // 1. if cached.conn exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // 2. if cached promise does not exist, create it 
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    }
    
    cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then(() => mongoose.connection)
  }

  // 3. if promise exists, wait for it to resolve
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.conn = null;
    throw error;
  }

  return cached.conn;
}