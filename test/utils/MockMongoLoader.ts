import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectMockDatabase = async () => {
  const mongoDadabase: MongoMemoryServer = await MongoMemoryServer.create();
  const mongoUri = mongoDadabase.getUri();

  await mongoose.connect(mongoUri, { dbName: "testDatabase" });
  console.log(`[*] MockMongoDB ${mongoUri} database is connected`);

  return mongoDadabase;
};

export const disconnectMockDatabase = async (mongoDadabase: MongoMemoryServer) => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoDadabase.stop();
};

export const clearMockDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
