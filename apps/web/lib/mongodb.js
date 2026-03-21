import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

function getMongoUri() {
  return (
    process.env.MONGO_DB_URL ||
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    ""
  );
}

async function connectToDB() {
  const MONGO_URI = getMongoUri();
  if (!MONGO_URI) {
    throw new Error(
      "MongoDB URI missing. Set MONGO_DB_URL (or MONGODB_URI) in apps/web/.env.local — not the repo root."
    );
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;