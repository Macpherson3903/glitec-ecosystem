import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DB_URL;
if (!MONGO_URI) throw new Error("MONGO_DB_URL not defined");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGO_URI).then(m => m);
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;